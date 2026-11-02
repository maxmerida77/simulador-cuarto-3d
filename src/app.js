import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  DEFAULT_ROOM,
  PRODUCT_ZONES,
  WALL_PALETTES,
  BEDDING_THEMES,
  LED_COLORS,
  CATALOG,
  BASE_ROOM_ITEMS,
  CLUTTER_ROOM_ITEMS,
  QUICK_COMBOS,
  SUB_GADGETS_DB,
  ITEM_INSPECTOR_DB,
  UI_LABELS,
  LIGHT_SCENES,
  detectSubGadgetFromHit
} from './data.js';
import {
  createStudioEnvironment,
  createFloorTexture,
  createZebraBlindTexture,
  createWorkflowScreenTexture,
  buildFurnitureMesh
} from './models.js';

const HISTORY_LIMIT = 60;

const CAMERA_PRESETS = {
  orbit_3d:        { pos: [-0.15, 2.22, 2.50],  target: [0, 0.82, -0.10],      fov: 50, wallMode: 'auto' },
  desk_front:      { pos: [-0.38, 1.04, -0.66], target: [-0.94, 0.90, -0.66],  fov: 38, wallMode: 'full' },
  desk_corner:     { pos: [-0.40, 1.10, -0.76], target: [-0.92, 0.96, -1.25],  fov: 36, wallMode: 'full' },
  desk_lab:        { pos: [-0.34, 1.12, -0.78], target: [-0.34, 0.82, -1.25],  fov: 36, wallMode: 'full' },
  desk_pegboard:   { pos: [-0.28, 1.24, -0.28], target: [-1.08, 1.18, -0.28],  fov: 40, wallMode: 'full' },
  whiteboard_view: { pos: [-0.38, 1.16, 0.45],  target: [-0.38, 1.15, 1.48],  fov: 42, wallMode: 'full' },
  zoom_desk:       { pos: [-0.38, 1.04, -0.66], target: [-0.94, 0.90, -0.66],  fov: 38, wallMode: 'full' },
  zoom_lab:        { pos: [-0.34, 1.12, -0.78], target: [-0.34, 0.82, -1.25],  fov: 36, wallMode: 'full' },
  zoom_shelves:    { pos: [-0.28, 1.24, -0.28], target: [-1.08, 1.18, -0.28],  fov: 40, wallMode: 'full' },
  zoom_underbed:   { pos: [-0.42, 0.56, 0.48],  target: [0.58, 0.22, 0.48],    fov: 45, wallMode: 'full' },
  zoom_soccer:     { pos: [-0.28, 1.80, 0.48],  target: [1.10, 1.80, 0.48],    fov: 46, wallMode: 'full' },
  top_2d:          { pos: [0, 4.35, 0.01],      target: [0, 0, 0],             fov: 42, wallMode: 'auto' }
};

const fmtPrice = (n) => `$${n.toLocaleString('es-MX')}`;
const clone = (o) => JSON.parse(JSON.stringify(o));

class RoomSimulatorApp {
  constructor() {
    this.room = clone(DEFAULT_ROOM);
    this.activeComboId = 'ingeniero_esencial';
    this.drawerOpen = true;
    this.isTheaterFullscreen = false;

    this.selectedZones = {};
    this.items = [];
    this.selectedId = null;
    this.selectedSubGadgetId = null;
    this.lightingMode = 'warm_minimal';

    // Escena de luz activa (domótica simulada)
    this.lightScene = 'normal';

    // Flujo de trabajo en pantalla (Claude Code / KiCad PCB / Control PID)
    this.workflowMode = 'claude_code';

    // Sistema de Domótica Interactiva (Tuya WiFi / Zigbee / Alexa)
    this.domotica = {
      outlet1_iron: true,      // Toma 1: Cautín FNIRSI (65W calentando / 0W apagado)
      outlet2_lights: true,    // Toma 2: Iluminación & Tira LED (24W)
      outlet3_gan: true,       // Toma 3: Cargador GaN 100W Laptop TUF (58W)
      outlet4_fan: false,      // Toma 4: Periféricos / Ventilador USB (8W)
      blindOpenPercent: 40     // Persiana motorizada: 0% cerrada a 100% sol total
    };
    this.domoticaDrawerOpen = false;

    // Deshacer / Rehacer
    this.undoStack = [];
    this.redoStack = [];

    // Antes / Después
    this.compareMode = false;
    this.compareSplit = 0.5;
    this.beforeBuilt = false;

    // Navegación
    this.navMode = 'orbit';
    this.camAnim = null;
    this.walkYaw = -3.05;
    this.walkPitch = -0.08;
    this.walkEyeHeight = 1.62;
    this.keysPressed = {};
    this.isLookingWalk = false;

    // Interacción 3D
    this.isDragging = false;
    this.dragPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    this.dragOffset = new THREE.Vector3();
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
    this.pointerDownPos = new THREE.Vector2();

    // Grupos "Después" (estado actual configurable)
    this.furnitureMeshes = new Map();
    this.wallGroups = {};
    this.ceilingMesh = null;
    this.architectureGroup = new THREE.Group();
    this.furnitureGroup = new THREE.Group();
    this.lightsGroup = new THREE.Group();
    this.selectionGroup = new THREE.Group();

    // Grupo "Antes" (tu cuarto según las fotos)
    this.beforeRoot = new THREE.Group();
    this.beforeRoot.visible = false;
    this.beforeArch = new THREE.Group();
    this.beforeLights = new THREE.Group();
    this.beforeFurniture = new THREE.Group();
    this.beforeRoot.add(this.beforeArch, this.beforeLights, this.beforeFurniture);
    this.beforeWallGroups = {};
    this.beforeCeiling = null;
    this.beforeFurnitureMeshes = new Map();

    this.initScene();
    this.applyCombo('ingeniero_esencial', { record: false });
    this.setupInteraction();
    this.setupKeyboard();
    this.initUI();
    this.applyUrlParams();
    this.animate();
  }

  // Permite abrir directo una escena / vista: ?scene=match&compare=1&cam=desk_front
  applyUrlParams() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('scene') && LIGHT_SCENES[params.get('scene')]) this.setLightScene(params.get('scene'));
    if (params.get('cam')) this.setCameraPreset(params.get('cam'));
    if (params.get('compare') === '1') this.toggleCompare(true);
    if (params.get('menu') === '0') this.toggleDrawer(false);
  }

  // ==========================================================================
  // ESCENA / RENDER
  // ==========================================================================
  initScene() {
    this.container = document.getElementById('viewport-container');
    const w = this.container.clientWidth || window.innerWidth;
    const h = this.container.clientHeight || window.innerHeight;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0b0e14);
    this.scene.environment = createStudioEnvironment();

    this.camera = new THREE.PerspectiveCamera(50, w / h, 0.02, 35);
    this.camera.position.set(...CAMERA_PRESETS.orbit_3d.pos);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(w, h, false);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.18;
    this.container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.target.set(...CAMERA_PRESETS.orbit_3d.target);
    this.controls.maxPolarAngle = Math.PI * 0.495;
    this.controls.minDistance = 0.12;
    this.controls.maxDistance = 8.0;
    this.controls.addEventListener('start', () => { this.camAnim = null; });

    this.scene.add(this.architectureGroup, this.furnitureGroup, this.lightsGroup, this.selectionGroup, this.beforeRoot);

    window.addEventListener('resize', () => this.onResize());
    if (typeof ResizeObserver !== 'undefined') {
      new ResizeObserver(() => this.onResize()).observe(this.container);
    }
  }

  onResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const rect = this.container.getBoundingClientRect();
    const w = Math.floor(rect.width);
    const h = Math.floor(rect.height);
    if (w <= 10 || h <= 10) return;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h, false);
  }

  // Estado del cuarto con el color LED de la escena aplicado
  getRenderRoom() {
    const sc = LIGHT_SCENES[this.lightScene] || LIGHT_SCENES.normal;
    return { ...this.room, ledColorMode: sc.led || this.room.ledColorMode };
  }

  // ==========================================================================
  // ESTADO: ZONAS, COMBOS, HISTORIAL
  // ==========================================================================
  rebuildSceneFromZones() {
    let replaceChair = false;
    this.lightingMode = 'current_bulb';
    const spawned = [];

    PRODUCT_ZONES.forEach(zone => {
      const opt = zone.options.find(o => o.id === (this.selectedZones[zone.id] || 'none'));
      if (!opt) return;
      if (opt.replaceChair) replaceChair = true;
      if (opt.lightingMode) this.lightingMode = opt.lightingMode;
      (opt.spawnItems || []).forEach(sp => spawned.push(clone(sp)));
    });

    const baseItems = clone(BASE_ROOM_ITEMS).filter(it => !(replaceChair && it.type === 'current_chair'));
    const clutterItems = this.room.showClutter ? clone(CLUTTER_ROOM_ITEMS) : [];

    this.items = [...baseItems, ...clutterItems, ...spawned];
    this.buildArchitecture();
    this.rebuildFurnitureMeshes();
    this.updateBudgetUI();
  }

  applyCombo(comboId, { record = true } = {}) {
    const combo = QUICK_COMBOS[comboId];
    if (!combo) return;
    if (record) this.pushHistory();
    this.activeComboId = comboId;
    this.room.showClutter = combo.showClutter;
    this.room.beddingTheme = combo.beddingTheme;
    this.room.ledColorMode = combo.ledColorMode;

    const pal = WALL_PALETTES.find(p => p.id === combo.wallPalette) || WALL_PALETTES[0];
    this.room.wallColor = pal.wall;
    this.room.accentColor = pal.accent;
    this.room.accentWall = pal.accentWall;

    this.selectedZones = { ...combo.zones };
    this.clearSelection();
    this.rebuildSceneFromZones();
    this.syncUIState();
  }

  selectZoneOption(zoneId, optionId) {
    if (this.selectedZones[zoneId] === optionId) return;
    this.pushHistory();
    this.activeComboId = 'custom';
    this.selectedZones[zoneId] = optionId;
    if (optionId !== 'none' && (zoneId === 'storage_underbed_door_zone' || zoneId === 'soccer_zone')) {
      this.room.showClutter = false;
    }
    this.rebuildSceneFromZones();
    this.syncUIState();
  }

  snapshot() {
    return {
      items: clone(this.items),
      selectedZones: { ...this.selectedZones },
      room: clone(this.room),
      activeComboId: this.activeComboId,
      lightingMode: this.lightingMode,
      workflowMode: this.workflowMode,
      domotica: clone(this.domotica)
    };
  }

  restore(snap) {
    this.items = clone(snap.items);
    this.selectedZones = { ...snap.selectedZones };
    this.room = clone(snap.room);
    this.activeComboId = snap.activeComboId;
    this.lightingMode = snap.lightingMode;
    if (snap.workflowMode) this.workflowMode = snap.workflowMode;
    if (snap.domotica) {
      this.domotica = clone(snap.domotica);
    }
    if (this.selectedId && !this.items.find(i => i.id === this.selectedId)) {
      this.selectedId = null;
      this.selectedSubGadgetId = null;
    }
    this.buildArchitecture();
    this.rebuildFurnitureMeshes();
    this.updateDomoticaStateIn3D();
    this.updateDomoticaUI();
    this.updateBudgetUI();
    this.syncUIState();
  }

  pushHistory() {
    this.undoStack.push(this.snapshot());
    if (this.undoStack.length > HISTORY_LIMIT) this.undoStack.shift();
    this.redoStack = [];
    this.updateHistoryButtons();
  }

  undo() {
    if (!this.undoStack.length) return;
    this.redoStack.push(this.snapshot());
    this.restore(this.undoStack.pop());
    this.updateHistoryButtons();
    this.showToast('↶ Cambio deshecho');
  }

  redo() {
    if (!this.redoStack.length) return;
    this.undoStack.push(this.snapshot());
    this.restore(this.redoStack.pop());
    this.updateHistoryButtons();
    this.showToast('↷ Cambio rehecho');
  }

  updateHistoryButtons() {
    const u = document.getElementById('btn-undo');
    const r = document.getElementById('btn-redo');
    if (u) {
      u.disabled = this.undoStack.length === 0;
      u.title = `Deshacer (Ctrl+Z)${this.undoStack.length ? ` · ${this.undoStack.length}` : ''}`;
    }
    if (r) r.disabled = this.redoStack.length === 0;
  }

  showToast(msg) {
    const t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.remove('hidden');
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => t.classList.add('hidden'), 1400);
  }

  // ==========================================================================
  // ARQUITECTURA E ILUMINACIÓN (reutilizable para "Antes" y "Después")
  // ==========================================================================
  buildArchitecture() {
    const res = this.buildArchitectureInto(
      this.architectureGroup, this.lightsGroup, this.getRenderRoom(), this.lightingMode, this.lightScene
    );
    this.wallGroups = res.wallGroups;
    this.ceilingMesh = res.ceilingMesh;
    this.renderer.toneMappingExposure = this.lightScene === 'sleep' ? 1.0 : 1.18;
    this.updateBlindIn3D();
  }

  buildArchitectureInto(archGroup, lightsGroup, roomState, lightingMode, sceneId) {
    archGroup.clear();
    lightsGroup.clear();

    const { width: W, depth: D, height: H } = roomState;
    const wallT = 0.075;

    const floorMat = new THREE.MeshStandardMaterial({
      map: createFloorTexture(roomState.floorType), roughness: 0.36, metalness: 0.10
    });
    const floorMesh = new THREE.Mesh(new THREE.BoxGeometry(W + wallT * 2, 0.06, D + wallT * 2), floorMat);
    floorMesh.position.set(0, -0.03, 0);
    floorMesh.receiveShadow = true;
    archGroup.add(floorMesh);

    const getWallMat = (side) => new THREE.MeshStandardMaterial({
      color: new THREE.Color(roomState.accentWall === side ? roomState.accentColor : roomState.wallColor),
      roughness: 0.72,
      metalness: 0.03
    });
    const baseboardMat = new THREE.MeshStandardMaterial({ color: 0x1e2128, roughness: 0.45 });

    const wallGroups = {
      north: new THREE.Group(),
      south: new THREE.Group(),
      west: new THREE.Group(),
      east: new THREE.Group()
    };

    // Pared Norte (ventana + clóset)
    const northWall = new THREE.Mesh(new THREE.BoxGeometry(W + wallT * 2, H, wallT), getWallMat('north'));
    northWall.position.set(0, H / 2, -D / 2 - wallT / 2);
    northWall.receiveShadow = true;
    wallGroups.north.add(northWall);
    const northBase = new THREE.Mesh(new THREE.BoxGeometry(W, 0.07, 0.015), baseboardMat);
    northBase.position.set(0, 0.035, -D / 2 + 0.008);
    wallGroups.north.add(northBase);

    const winW = 1.08;
    const winH = 1.26;
    const winX = -W / 2 + 0.04 + winW / 2;
    const winY = 1.44;
    const frameMat = new THREE.MeshStandardMaterial({ color: 0xe5e7eb, roughness: 0.30, metalness: 0.2 });

    // Marco exterior de la ventana
    const frameMesh = new THREE.Mesh(new THREE.BoxGeometry(winW + 0.05, winH + 0.05, 0.03), frameMat);
    frameMesh.position.set(winX, winY, -D / 2 + 0.012);
    wallGroups.north.add(frameMesh);

    // Vidrio de ventana semitransparente con tinte azul
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x93c5fd,
      roughness: 0.15,
      metalness: 0.85,
      transparent: true,
      opacity: 0.35
    });
    const glassMesh = new THREE.Mesh(new THREE.BoxGeometry(winW, winH, 0.008), glassMat);
    glassMesh.position.set(winX, winY, -D / 2 + 0.014);
    wallGroups.north.add(glassMesh);

    // Riel superior de la persiana
    const headRail = new THREE.Mesh(new THREE.BoxGeometry(winW + 0.05, 0.065, 0.065), frameMat);
    headRail.position.set(winX, winY + winH / 2 + 0.02, -D / 2 + 0.03);
    wallGroups.north.add(headRail);

    // Motor tubular inteligente Tuya/Zigbee en el extremo derecho del riel
    const motorMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.7, roughness: 0.35 });
    const motorMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.07, 16), motorMat);
    motorMesh.rotation.z = Math.PI / 2;
    motorMesh.position.set(winX + winW / 2 - 0.035, winY + winH / 2 + 0.02, -D / 2 + 0.032);
    wallGroups.north.add(motorMesh);
    const motorLed = new THREE.Mesh(new THREE.CylinderGeometry(0.002, 0.002, 0.006, 8), new THREE.MeshBasicMaterial({ color: 0x38bdf8 }));
    motorLed.position.set(winX + winW / 2 - 0.01, winY + winH / 2 + 0.02, -D / 2 + 0.046);
    wallGroups.north.add(motorLed);

    // Malla de persiana Zebra con metadatos para escalar
    const blindMat = new THREE.MeshStandardMaterial({
      map: createZebraBlindTexture(),
      roughness: 0.50,
      emissive: new THREE.Color(sceneId === 'sleep' ? 0x0b1530 : 0x1e293b),
      emissiveIntensity: 0.12
    });
    const blindMesh = new THREE.Mesh(new THREE.BoxGeometry(winW, winH, 0.018), blindMat);
    blindMesh.position.set(winX, winY, -D / 2 + 0.022);
    blindMesh.userData = { isSmartBlind: true, winX, winY, winH };
    wallGroups.north.add(blindMesh);

    // Pared Sur
    const southWall = new THREE.Mesh(new THREE.BoxGeometry(W + wallT * 2, H, wallT), getWallMat('south'));
    southWall.position.set(0, H / 2, D / 2 + wallT / 2);
    southWall.receiveShadow = true;
    wallGroups.south.add(southWall);
    const southBase = new THREE.Mesh(new THREE.BoxGeometry(W, 0.07, 0.015), baseboardMat);
    southBase.position.set(0, 0.035, D / 2 - 0.008);
    wallGroups.south.add(southBase);

    // Pared Oeste (TV, escritorio, espejo, puerta)
    const westWall = new THREE.Mesh(new THREE.BoxGeometry(wallT, H, D), getWallMat('west'));
    westWall.position.set(-W / 2 - wallT / 2, H / 2, 0);
    westWall.receiveShadow = true;
    wallGroups.west.add(westWall);
    const westBase = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.07, D - 0.85), baseboardMat);
    westBase.position.set(-W / 2 + 0.008, 0.035, -0.42);
    wallGroups.west.add(westBase);

    const doorW = 0.80;
    const doorH = 2.04;
    const doorFrameMat = new THREE.MeshStandardMaterial({ color: 0x7c5332, roughness: 0.55 });
    const woodDoorMat = new THREE.MeshStandardMaterial({ color: 0x9e6f46, roughness: 0.45 });
    const doorCenterZ = D / 2 - doorW / 2 - 0.04;
    const doorFrame = new THREE.Mesh(new THREE.BoxGeometry(0.02, doorH, doorW), doorFrameMat);
    doorFrame.position.set(-W / 2 + 0.01, doorH / 2, doorCenterZ);
    wallGroups.west.add(doorFrame);

    const doorPivot = new THREE.Group();
    doorPivot.position.set(-W / 2 + 0.02, 0, D / 2 - 0.04);
    doorPivot.rotation.y = -0.28;
    const doorLeaf = new THREE.Mesh(new THREE.BoxGeometry(0.038, doorH, doorW), woodDoorMat);
    doorLeaf.position.set(0, doorH / 2, -doorW / 2);
    doorLeaf.castShadow = true;
    doorPivot.add(doorLeaf);
    const handle = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, 0.02, 0.09),
      new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.88, roughness: 0.18 })
    );
    handle.position.set(0.03, 0.96, -doorW + 0.09);
    doorPivot.add(handle);
    wallGroups.west.add(doorPivot);

    // Pared Este (literas)
    const eastWall = new THREE.Mesh(new THREE.BoxGeometry(wallT, H, D), getWallMat('east'));
    eastWall.position.set(W / 2 + wallT / 2, H / 2, 0);
    eastWall.receiveShadow = true;
    wallGroups.east.add(eastWall);
    const eastBase = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.07, D), baseboardMat);
    eastBase.position.set(W / 2 - 0.008, 0.035, 0);
    wallGroups.east.add(eastBase);

    Object.values(wallGroups).forEach(g => archGroup.add(g));

    const ceilingMesh = new THREE.Mesh(
      new THREE.BoxGeometry(W + wallT * 2, 0.05, D + wallT * 2),
      new THREE.MeshStandardMaterial({ color: 0xf3f4f6, roughness: 0.85 })
    );
    ceilingMesh.position.set(0, H + 0.025, 0);
    archGroup.add(ceilingMesh);

    this.buildLightingInto(lightsGroup, roomState, lightingMode, sceneId);
    return { wallGroups, ceilingMesh };
  }

  buildLightingInto(lightsGroup, roomState, lightingMode, sceneId) {
    const { width: W, depth: D, height: H } = roomState;
    const mode = lightingMode;
    const ledObj = LED_COLORS.find(l => l.id === roomState.ledColorMode) || LED_COLORS[0];

    // Valores base según la iluminación elegida en el catálogo
    let ambI = mode === 'setup_night' ? 0.55 : mode === 'warm_minimal' ? 0.75 : 0.85;
    let hemiI = 0.65;
    let mainColor = mode === 'current_bulb' ? 0xf8fafc : mode === 'warm_minimal' ? 0xffedd5 : 0xe0f2fe;
    let mainI = mode === 'setup_night' ? 0.90 : 2.0;
    let winColor = 0xfef3c7;
    let winI = 0.50;

    // Ajustes por escena de luz
    if (sceneId === 'code') {
      ambI = 0.50; hemiI = 0.40; mainColor = 0xe0f2fe; mainI = 0.95; winI = 0.18;
    } else if (sceneId === 'match') {
      ambI = 0.28; hemiI = 0.22; mainColor = 0xffedd5; mainI = 0.30; winI = 0.04;
    } else if (sceneId === 'sleep') {
      ambI = 0.10; hemiI = 0.07; mainI = 0; winColor = 0x93c5fd; winI = 0.16;
    }

    lightsGroup.add(new THREE.AmbientLight(0xffffff, ambI));
    const hemi = new THREE.HemisphereLight(0xffffff, 0x334155, hemiI);
    hemi.position.set(0, H, 0);
    lightsGroup.add(hemi);

    // Lámpara de techo (se ve apagada si la escena la apaga)
    const fixtureOn = mainI > 0.05;
    const ceilingFixture = new THREE.Group();
    ceilingFixture.position.set(0, H, 0);
    if (mode === 'current_bulb') {
      const socketMat = new THREE.MeshStandardMaterial({ color: 0xe5e7eb });
      const rose = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.02, 16), socketMat);
      rose.position.y = -0.01;
      ceilingFixture.add(rose);
      const cord = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.14, 8), socketMat);
      cord.position.y = -0.08;
      ceilingFixture.add(cord);
      const bulb = new THREE.Mesh(
        new THREE.SphereGeometry(0.045, 16, 16),
        new THREE.MeshBasicMaterial({ color: fixtureOn ? 0xffffff : 0x3a3f48 })
      );
      bulb.position.y = -0.17;
      ceilingFixture.add(bulb);
    } else {
      const rim = new THREE.Mesh(
        new THREE.CylinderGeometry(0.22, 0.22, 0.03, 28),
        new THREE.MeshStandardMaterial({ color: 0x1e2026 })
      );
      rim.position.y = -0.015;
      ceilingFixture.add(rim);
      const diffuser = new THREE.Mesh(
        new THREE.CylinderGeometry(0.19, 0.19, 0.032, 28),
        new THREE.MeshBasicMaterial({ color: !fixtureOn ? 0x2a2e36 : mode === 'setup_night' ? ledObj.hex : 0xfff7ed })
      );
      diffuser.position.y = -0.016;
      ceilingFixture.add(diffuser);
    }
    lightsGroup.add(ceilingFixture);

    const mainLight = new THREE.PointLight(mainColor, mainI, 7.5, 1.2);
    mainLight.position.set(0, H - 0.22, 0);
    mainLight.castShadow = fixtureOn;
    mainLight.shadow.mapSize.set(1024, 1024);
    mainLight.shadow.bias = -0.0015;
    lightsGroup.add(mainLight);

    const winLight = new THREE.DirectionalLight(winColor, winI);
    winLight.position.set(-0.5, 1.8, -D / 2 - 0.8);
    winLight.userData = { isWinLight: true, baseIntensity: winI };
    lightsGroup.add(winLight);

    // Luces extra de cada escena
    if (sceneId === 'code') {
      // Barra de luz del monitor iluminando teclado y escritorio
      const deskLight = new THREE.PointLight(0xf1f5ff, 1.1, 1.4, 1.6);
      deskLight.position.set(-0.86, 1.28, -0.66);
      lightsGroup.add(deskLight);
    } else if (sceneId === 'match') {
      // Resplandor de la TV con el partido + LED de afición
      const tvGlow = new THREE.PointLight(0x9fd3ff, 1.5, 2.0, 1.5);
      tvGlow.position.set(-0.92, 1.64, -0.98);
      lightsGroup.add(tvGlow);
      const fanGlow = new THREE.PointLight(ledObj.hex, 1.2, 2.6, 1.4);
      fanGlow.position.set(0.20, 1.95, 0.48);
      lightsGroup.add(fanGlow);
    } else if (sceneId === 'sleep') {
      // Luz tenue cálida bajo la litera superior
      const nightLight = new THREE.PointLight(0xffb347, 0.45, 1.5, 1.6);
      nightLight.position.set(0.62, 1.14, 0.48);
      lightsGroup.add(nightLight);
    }
  }

  // ==========================================================================
  // MUEBLES
  // ==========================================================================
  rebuildFurnitureMeshes() {
    this.furnitureGroup.clear();
    this.furnitureMeshes.clear();
    const roomState = this.getRenderRoom();

    this.items.forEach(item => {
      const mesh = buildFurnitureMesh(item, roomState);
      mesh.position.set(item.x, item.elevation || 0, item.z);
      mesh.rotation.y = item.rotY || 0;
      this.applySceneToMesh(mesh);
      this.furnitureGroup.add(mesh);
      this.furnitureMeshes.set(item.id, mesh);
    });

    if (this.workflowMode) {
      this.setWorkflowMode(this.workflowMode, { showFeedback: false });
    }

    this.updateDomoticaStateIn3D();
    this.updateSelectionHighlight();
  }

  // Apaga pantallas al dormir y ajusta intensidad de las tiras LED según la escena
  applySceneToMesh(mesh) {
    const sc = this.lightScene;
    if (sc === 'normal') return;
    const ledFactor = sc === 'sleep' ? 0.35 : sc === 'match' ? 1.35 : 1.0;
    mesh.traverse(obj => {
      if (obj.isPointLight) obj.intensity *= ledFactor;
      if (sc === 'sleep' && obj.isMesh && obj.material && obj.material.isMeshBasicMaterial && obj.material.map) {
        obj.material.color.setHex(0x0c0d10);
      }
    });
  }

  setLightScene(sceneId) {
    if (!LIGHT_SCENES[sceneId]) return;
    this.lightScene = sceneId;
    this.buildArchitecture();
    this.rebuildFurnitureMeshes();
    document.querySelectorAll('.scene-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.scene === sceneId);
    });
    this.showToast(`${LIGHT_SCENES[sceneId].icon} Escena: ${LIGHT_SCENES[sceneId].name}`);
  }

  setWorkflowMode(mode, { showFeedback = true } = {}) {
    this.workflowMode = mode;
    const mainTex = createWorkflowScreenTexture(mode, 'main_monitor');
    const lapTex = createWorkflowScreenTexture(mode, 'laptop');
    const vertTex = createWorkflowScreenTexture(mode, 'vertical_monitor');

    this.furnitureGroup.traverse(obj => {
      if (obj.isMesh && obj.material && obj.material.isMeshBasicMaterial) {
        if (obj.userData?.isScreen === 'main_monitor') {
          obj.material.map = mainTex;
          obj.material.needsUpdate = true;
        } else if (obj.userData?.isScreen === 'laptop') {
          obj.material.map = lapTex;
          obj.material.needsUpdate = true;
        } else if (obj.userData?.isScreen === 'vertical_monitor') {
          obj.material.map = vertTex;
          obj.material.needsUpdate = true;
        }
      }
    });

    document.querySelectorAll('.wf-pill').forEach(b => {
      b.classList.toggle('active', b.dataset.workflow === mode);
    });

    if (showFeedback) {
      const labels = {
        claude_code: '🤖 Flujo: Claude Code & Codex (Opus 5.5)',
        pcb_kicad: '⚡ Flujo: KiCad 8.0 PCB 4 Capas (ESP32-S3)',
        control_firmware: '📈 Flujo: Control PID en Tiempo Real (PlatformIO C++)'
      };
      this.showToast(labels[mode] || `Flujo: ${mode}`);
    }
  }

  cycleWorkflowMode() {
    const order = ['claude_code', 'pcb_kicad', 'control_firmware'];
    const nextIdx = (order.indexOf(this.workflowMode) + 1) % order.length;
    this.setWorkflowMode(order[nextIdx]);
  }

  // ==========================================================================
  // DOMÓTICA INTERACTIVA (TUYA WIFI / ZIGBEE / ALEXA)
  // ==========================================================================
  calcTelemetry() {
    let watts = 4.5; // Consumo base (Alexa Echo Pop en standby + ESP32/WiFi)
    if (this.domotica.outlet1_iron) watts += 65;    // Cautín FNIRSI Soldering Pen (65W PD)
    if (this.domotica.outlet2_lights) watts += 24;  // Barra de luz monitor + tira LED
    if (this.domotica.outlet3_gan) watts += 58;     // Cargador GaN 100W (Laptop TUF + Celular)
    if (this.domotica.outlet4_fan) watts += 12;     // Ventilador USB mesa / periféricos

    const amps = (watts / 127).toFixed(2);
    const kwhDay = ((watts * 8.5) / 1000).toFixed(2);
    const monthlyMxn = Math.round((watts * 8.5 * 30 / 1000) * 1.45);

    return { watts, amps, kwhDay, monthlyMxn };
  }

  setOutlet(outletKey, state, { record = true } = {}) {
    if (this.domotica[outletKey] === Boolean(state)) return;
    if (record) this.pushHistory();
    this.domotica[outletKey] = Boolean(state);
    this.updateDomoticaStateIn3D();
    this.updateDomoticaUI();

    const names = {
      outlet1_iron: 'Cautín FNIRSI',
      outlet2_lights: 'Luz de monitor y LED',
      outlet3_gan: 'Cargador GaN 100W',
      outlet4_fan: 'Ventilador USB'
    };
    const name = names[outletKey] || 'Salida AC';
    this.showToast(`${state ? '⚡' : '🔌'} ${name}: ${state ? 'ENCENDIDO' : 'APAGADO'}`);
  }

  killAllOutlets() {
    this.pushHistory();
    this.domotica.outlet1_iron = false;
    this.domotica.outlet2_lights = false;
    this.domotica.outlet3_gan = false;
    this.domotica.outlet4_fan = false;
    this.updateDomoticaStateIn3D();
    this.updateDomoticaUI();
    this.showToast('⚠️ Corte general: todas las tomas apagadas');
  }

  setBlindOpen(percent, { record = true } = {}) {
    const val = Math.max(0, Math.min(100, Math.round(Number(percent) || 0)));
    if (this.domotica.blindOpenPercent === val) return;
    if (record) this.pushHistory();
    this.domotica.blindOpenPercent = val;
    this.updateBlindIn3D();
    this.updateDomoticaUI();
  }

  updateBlindIn3D() {
    const pct = this.domotica.blindOpenPercent;
    let blindMesh = null;
    this.architectureGroup.traverse(child => {
      if (child.userData?.isSmartBlind) blindMesh = child;
    });

    if (blindMesh) {
      const scaleY = Math.max(0.06, (100 - pct) / 100);
      blindMesh.scale.y = scaleY;
      const winY = blindMesh.userData.winY || 1.44;
      const winH = blindMesh.userData.winH || 1.26;
      blindMesh.position.y = (winY + winH / 2) - (winH * scaleY) / 2;
    }

    let winLight = null;
    this.lightsGroup.traverse(child => {
      if (child.userData?.isWinLight) winLight = child;
    });

    if (winLight) {
      const daylightFactor = 0.10 + (pct / 100) * 1.30;
      winLight.intensity = (winLight.userData.baseIntensity || 0.5) * daylightFactor;
      winLight.castShadow = pct > 20;
    }
  }

  updateDomoticaStateIn3D() {
    this.furnitureGroup.traverse(child => {
      if (child.userData?.isOutletLed) {
        const out = child.userData.isOutletLed;
        let isOn = false;
        if (out === 1) isOn = this.domotica.outlet1_iron;
        else if (out === 2) isOn = this.domotica.outlet2_lights;
        else if (out === 3) isOn = this.domotica.outlet3_gan;
        else if (out === 4) isOn = this.domotica.outlet4_fan;
        else if (out === 'usb') isOn = this.domotica.outlet3_gan;

        if (child.material) {
          child.material.color.setHex(isOn ? (out === 'usb' ? 0x38bdf8 : 0x22c55e) : 0x334155);
        }
      }

      if (child.userData?.isFnirsiTip) {
        if (child.material) {
          if (this.domotica.outlet1_iron) {
            child.material.emissive.setHex(0xf97316);
            child.material.emissiveIntensity = 0.95;
          } else {
            child.material.emissive.setHex(0x000000);
            child.material.emissiveIntensity = 0.0;
          }
        }
      }
    });

    this.updateBlindIn3D();
  }

  updateDomoticaUI() {
    const sw1 = document.getElementById('domo-switch-1');
    const sw2 = document.getElementById('domo-switch-2');
    const sw3 = document.getElementById('domo-switch-3');
    const sw4 = document.getElementById('domo-switch-4');
    if (sw1) sw1.checked = !!this.domotica.outlet1_iron;
    if (sw2) sw2.checked = !!this.domotica.outlet2_lights;
    if (sw3) sw3.checked = !!this.domotica.outlet3_gan;
    if (sw4) sw4.checked = !!this.domotica.outlet4_fan;

    const bSlider = document.getElementById('domo-blind-slider');
    const bBadge = document.getElementById('blind-pct-badge');
    if (bSlider) bSlider.value = this.domotica.blindOpenPercent;
    if (bBadge) bBadge.textContent = `${this.domotica.blindOpenPercent}%`;

    const telem = this.calcTelemetry();
    const wEl = document.getElementById('telem-watts');
    const aEl = document.getElementById('telem-amps');
    const kEl = document.getElementById('telem-kwh');
    const cEl = document.getElementById('telem-cost');
    const badgeEl = document.getElementById('domo-power-badge');

    if (wEl) wEl.textContent = telem.watts.toFixed(0);
    if (aEl) aEl.textContent = `${telem.amps} A`;
    if (kEl) kEl.textContent = `${telem.kwhDay} kWh`;
    if (cEl) cEl.textContent = `$${telem.monthlyMxn} MXN`;
    if (badgeEl) badgeEl.textContent = `${telem.watts.toFixed(0)} W`;
  }

  toggleDomoticaDrawer(force) {
    const drawer = document.getElementById('domotica-drawer');
    const btn = document.getElementById('btn-toggle-domotica');
    if (!drawer) return;
    const shouldOpen = force !== undefined ? force : drawer.classList.contains('hidden');
    if (shouldOpen) {
      drawer.classList.remove('hidden');
      btn?.classList.add('active');
      this.domoticaDrawerOpen = true;
      this.clearSelection();
      this.updateSelectionHighlight();
      this.updateDomoticaUI();
    } else {
      drawer.classList.add('hidden');
      btn?.classList.remove('active');
      this.domoticaDrawerOpen = false;
    }
  }

  playAlexaChime() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!this.audioCtx) this.audioCtx = new AudioCtx();
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      const now = this.audioCtx.currentTime;

      const osc1 = this.audioCtx.createOscillator();
      const gain1 = this.audioCtx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, now);
      gain1.gain.setValueAtTime(0.0001, now);
      gain1.gain.exponentialRampToValueAtTime(0.18, now + 0.03);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
      osc1.connect(gain1);
      gain1.connect(this.audioCtx.destination);
      osc1.start(now);
      osc1.stop(now + 0.24);

      const osc2 = this.audioCtx.createOscillator();
      const gain2 = this.audioCtx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(880, now + 0.16);
      gain2.gain.setValueAtTime(0.0001, now + 0.16);
      gain2.gain.exponentialRampToValueAtTime(0.22, now + 0.19);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.52);
      osc2.connect(gain2);
      gain2.connect(this.audioCtx.destination);
      osc2.start(now + 0.16);
      osc2.stop(now + 0.55);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  triggerAlexaPulse(durationMs = 2800) {
    this.playAlexaChime();
    let ringMesh = null;
    let glowLight = null;

    this.furnitureGroup.traverse(child => {
      if (child.userData?.isAlexaRing) ringMesh = child;
      if (child.userData?.isAlexaGlow) glowLight = child;
    });

    if (!ringMesh && !glowLight) return;

    const start = performance.now();
    const origGlowI = glowLight ? glowLight.intensity : 0.35;
    if (this.alexaPulseRaf) cancelAnimationFrame(this.alexaPulseRaf);

    const animatePulse = (t) => {
      const elapsed = t - start;
      if (elapsed > durationMs) {
        if (glowLight) glowLight.intensity = origGlowI;
        if (ringMesh) ringMesh.material.color.setHex(0x00f0ff);
        return;
      }
      const pulse = 0.5 + 0.5 * Math.sin((elapsed / 160) * Math.PI);
      if (glowLight) glowLight.intensity = 0.35 + pulse * 1.5;
      if (ringMesh) {
        ringMesh.material.color.setHex(pulse > 0.5 ? 0x38bdf8 : 0x00f0ff);
      }
      this.alexaPulseRaf = requestAnimationFrame(animatePulse);
    };
    this.alexaPulseRaf = requestAnimationFrame(animatePulse);
  }

  executeAlexaCommand(rawCmd) {
    if (!rawCmd) return;
    const cmd = rawCmd.toLowerCase().trim().replace(/^alexa[, ]*/i, '');
    this.triggerAlexaPulse(3200);

    let feedbackMsg = '';
    this.pushHistory();

    if (cmd.includes('ingenieria') || cmd.includes('estudiar') || cmd.includes('lab') || cmd.includes('pcb')) {
      this.setWorkflowMode('pcb_kicad');
      this.setLightScene('code');
      this.domotica.outlet1_iron = true;
      this.domotica.outlet2_lights = true;
      this.domotica.outlet3_gan = true;
      this.domotica.blindOpenPercent = 20;
      feedbackMsg = '⚡ "Modo ingeniería activado: KiCad PCB, cautín a 380°C y persiana al 20%"';
    } else if (cmd.includes('vibecoding') || cmd.includes('programar') || cmd.includes('claude') || cmd.includes('codex')) {
      this.setWorkflowMode('claude_code');
      this.setLightScene('code');
      this.domotica.outlet1_iron = false;
      this.domotica.outlet2_lights = true;
      this.domotica.outlet3_gan = true;
      this.domotica.blindOpenPercent = 35;
      feedbackMsg = '🤖 "Modo vibecoding: Claude Code listo, cautín apagado por seguridad"';
    } else if (cmd.includes('partido') || cmd.includes('futbol') || cmd.includes('america')) {
      this.setLightScene('match');
      this.domotica.outlet1_iron = false;
      this.domotica.outlet2_lights = false;
      this.domotica.outlet4_fan = true;
      this.domotica.blindOpenPercent = 10;
      feedbackMsg = '⚽ "¡Modo partido activado! Iluminación de afición azulcrema y persiana abajo"';
    } else if (cmd.includes('apaga') && (cmd.includes('cautin') || cmd.includes('soldador'))) {
      this.domotica.outlet1_iron = false;
      feedbackMsg = '🔥 "Cautín FNIRSI apagado. Consumo en toma 1 reducido a 0 Watts"';
    } else if (cmd.includes('enciende') && (cmd.includes('cautin') || cmd.includes('soldador'))) {
      this.domotica.outlet1_iron = true;
      feedbackMsg = '🔥 "Cautín FNIRSI encendido en toma 1. Calentando a 380°C"';
    } else if (cmd.includes('abre') && cmd.includes('persiana')) {
      this.domotica.blindOpenPercent = 100;
      feedbackMsg = '☀️ "Persiana Zebra abierta al 100%. Entrando luz solar"';
    } else if (cmd.includes('cierra') && cmd.includes('persiana')) {
      this.domotica.blindOpenPercent = 0;
      feedbackMsg = '🪟 "Persiana Zebra cerrada al 100%"';
    } else if (cmd.includes('apaga todo') || cmd.includes('buenas noches') || cmd.includes('dormir')) {
      this.setLightScene('sleep');
      this.domotica.outlet1_iron = false;
      this.domotica.outlet2_lights = false;
      this.domotica.outlet4_fan = false;
      this.domotica.blindOpenPercent = 0;
      feedbackMsg = '🌙 "Buenas noches: persiana cerrada, tomas apagadas y luz nocturna tenue"';
    } else {
      feedbackMsg = `🗣️ Alexa entendió: "${rawCmd}"`;
    }

    this.updateDomoticaStateIn3D();
    this.updateDomoticaUI();
    this.showToast(feedbackMsg);
  }

  // ==========================================================================
  // ANTES / DESPUÉS
  // ==========================================================================
  buildBeforeState() {
    const actual = QUICK_COMBOS.actual;
    const pal = WALL_PALETTES.find(p => p.id === actual.wallPalette) || WALL_PALETTES[0];
    const beforeRoom = {
      ...clone(DEFAULT_ROOM),
      showClutter: true,
      beddingTheme: actual.beddingTheme,
      ledColorMode: actual.ledColorMode,
      wallColor: pal.wall,
      accentColor: pal.accent,
      accentWall: pal.accentWall,
      floorType: 'dark_wood_tile'
    };

    const res = this.buildArchitectureInto(this.beforeArch, this.beforeLights, beforeRoom, 'current_bulb', 'normal');
    this.beforeWallGroups = res.wallGroups;
    this.beforeCeiling = res.ceilingMesh;

    this.beforeFurniture.clear();
    this.beforeFurnitureMeshes.clear();
    [...clone(BASE_ROOM_ITEMS), ...clone(CLUTTER_ROOM_ITEMS)].forEach(item => {
      const mesh = buildFurnitureMesh(item, beforeRoom);
      mesh.position.set(item.x, item.elevation || 0, item.z);
      mesh.rotation.y = item.rotY || 0;
      this.beforeFurniture.add(mesh);
      this.beforeFurnitureMeshes.set(item.id, mesh);
    });
    this.beforeBuilt = true;
  }

  toggleCompare(force) {
    this.compareMode = typeof force === 'boolean' ? force : !this.compareMode;
    if (this.compareMode && !this.beforeBuilt) this.buildBeforeState();
    document.getElementById('compare-overlay')?.classList.toggle('hidden', !this.compareMode);
    document.getElementById('btn-compare')?.classList.toggle('active', this.compareMode);
    this.updateCompareHandle();
    if (this.compareMode) this.showToast('◐ Desliza la barra para comparar');
  }

  updateCompareHandle() {
    const handle = document.getElementById('compare-handle');
    if (handle) handle.style.left = `${this.compareSplit * 100}%`;
  }

  setAfterVisible(v) {
    this.architectureGroup.visible = v;
    this.furnitureGroup.visible = v;
    this.lightsGroup.visible = v;
    this.selectionGroup.visible = v;
  }

  // ==========================================================================
  // SELECCIÓN Y FICHA
  // ==========================================================================
  clearSelection() {
    this.selectedId = null;
    this.selectedSubGadgetId = null;
  }

  updateSelectionHighlight() {
    this.selectionGroup.clear();
    const inspector = document.getElementById('room-item-inspector');
    const pinEl = document.getElementById('floating-3d-pin');

    const item = this.selectedId ? this.items.find(i => i.id === this.selectedId) : null;
    const mesh = this.selectedId ? this.furnitureMeshes.get(this.selectedId) : null;
    if (!item || !mesh) {
      inspector?.classList.add('hidden');
      pinEl?.classList.add('hidden');
      return;
    }

    this.selectionGroup.add(new THREE.BoxHelper(mesh, 0xf59e0b));

    const spec = CATALOG[item.type] || { name: item.type, w: 0.4, d: 0.4, h: 0.4 };
    const parentInfo = ITEM_INSPECTOR_DB[item.type] || {
      badge: '📦 Artículo',
      price: '-',
      dims: `${Math.round(spec.w * 100)} × ${Math.round(spec.d * 100)} × ${Math.round(spec.h * 100)} cm`,
      desc: spec.name,
      cameraPreset: 'orbit_3d',
      links: []
    };
    const subInfo = this.selectedSubGadgetId ? SUB_GADGETS_DB[this.selectedSubGadgetId] : null;
    const active = subInfo
      ? { badge: subInfo.badge, title: subInfo.name, price: subInfo.price, dims: subInfo.dims, desc: subInfo.desc, links: subInfo.links || [] }
      : { badge: parentInfo.badge, title: spec.name, price: parentInfo.price, dims: parentInfo.dims, desc: parentInfo.desc, links: parentInfo.links || [] };
    this.activeInspectorCameraPreset = (subInfo && subInfo.cameraPreset) || parentInfo.cameraPreset || 'orbit_3d';

    if (inspector) {
      document.getElementById('insp-badge').textContent = active.badge;
      document.getElementById('insp-title').textContent = active.title;
      document.getElementById('insp-price').textContent = active.price;
      document.getElementById('insp-dims').textContent = `📐 ${active.dims}`;
      document.getElementById('insp-desc').textContent = active.desc;

      const subWrap = document.getElementById('insp-subgadgets-wrap');
      const subList = document.getElementById('insp-subgadgets-list');
      if (parentInfo.subGadgets && parentInfo.subGadgets.length && subWrap && subList) {
        subWrap.classList.remove('hidden');
        subList.innerHTML = '';
        const mkPill = (label, id) => {
          const b = document.createElement('button');
          b.className = `subgadget-pill ${this.selectedSubGadgetId === id ? 'active' : ''}`;
          b.textContent = label;
          b.addEventListener('click', () => {
            this.selectedSubGadgetId = id;
            this.updateSelectionHighlight();
          });
          subList.appendChild(b);
        };
        mkPill('Todo', null);
        parentInfo.subGadgets.forEach(id => {
          const sg = SUB_GADGETS_DB[id];
          if (sg) mkPill(sg.short || this.shortGadgetName(sg.name), id);
        });
      } else {
        subWrap?.classList.add('hidden');
      }

      const linksBox = document.getElementById('insp-links-wrap');
      if (linksBox) {
        linksBox.innerHTML = this.linksHtml(active.links);
        linksBox.classList.toggle('hidden', !active.links.length);
      }
      inspector.classList.remove('hidden');
    }

    if (pinEl) {
      document.getElementById('pin-3d-name').textContent = subInfo ? this.shortGadgetName(subInfo.name) : this.shortGadgetName(spec.name);
      document.getElementById('pin-3d-price').textContent = active.price.split(' (')[0];
      pinEl.classList.remove('hidden');
      this.updateFloating3DPin();
    }
  }

  shortGadgetName(name) {
    return name
      .split(' (')[0]
      .replace(/^(Teclado|Mouse Ergonómico|Reloj Inteligente Pixel|Mini Monitor|Monitor Principal|Tapete de Silicón Térmico y Magnético|Cautín Inteligente|Organizador de Pared Perforado|Osciloscopio \+ Multímetro Digital|Estación de Carga)\s+/i, '')
      .split(' + ')[0]
      .slice(0, 34);
  }

  linksHtml(links) {
    return (links || []).map(lk => {
      const isAli = lk.url.includes('aliexpress.com');
      const label = lk.label.replace(/^AliExpress:\s*/i, '');
      return `<a href="${lk.url}" target="_blank" rel="noopener noreferrer" class="opt-link-chip ${isAli ? 'aliexpress' : ''}">${isAli ? '🟠' : '🔗'} ${label} ↗</a>`;
    }).join('');
  }

  updateFloating3DPin() {
    const pinEl = document.getElementById('floating-3d-pin');
    if (!pinEl || !this.selectedId || pinEl.classList.contains('hidden')) return;
    const item = this.items.find(i => i.id === this.selectedId);
    const mesh = this.furnitureMeshes.get(this.selectedId);
    if (!item || !mesh) {
      pinEl.classList.add('hidden');
      return;
    }

    const spec = CATALOG[item.type] || { h: 0.3 };
    const subInfo = this.selectedSubGadgetId ? SUB_GADGETS_DB[this.selectedSubGadgetId] : null;
    const p = new THREE.Vector3();
    if (subInfo && subInfo.localOffset) {
      p.set(...subInfo.localOffset);
      mesh.localToWorld(p);
      p.y += 0.08;
    } else {
      p.set(item.x, (item.elevation || 0) + (spec.h || 0.3) * 0.85, item.z);
    }
    p.project(this.camera);
    if (p.z > 1) {
      pinEl.style.opacity = '0';
      return;
    }
    const w = this.container.clientWidth;
    const h = this.container.clientHeight;
    pinEl.style.opacity = '1';
    pinEl.style.left = `${Math.max(60, Math.min(w - 60, (p.x * 0.5 + 0.5) * w))}px`;
    pinEl.style.top = `${Math.max(56, Math.min(h - 60, (-p.y * 0.5 + 0.5) * h))}px`;
  }

  // ==========================================================================
  // PAREDES INTELIGENTES
  // ==========================================================================
  updateSmartWalls() {
    const camPos = this.camera.position;
    const { width: W, depth: D, height: H } = this.room;
    const mode = this.room.wallMode;

    const insideRoom =
      this.navMode === 'walk' ||
      (Math.abs(camPos.x) < W / 2 - 0.02 && Math.abs(camPos.z) < D / 2 - 0.02 && camPos.y < H - 0.05);

    const states = {
      north: mode === 'full' || insideRoom ? 1 : camPos.z < -D / 2 - 0.05 ? 0.06 : 1,
      south: mode === 'full' || insideRoom ? 1 : camPos.z > D / 2 + 0.05 ? 0.06 : 1,
      west:  mode === 'full' || insideRoom ? 1 : camPos.x < -W / 2 - 0.05 ? 0.06 : 1,
      east:  mode === 'full' || insideRoom ? 1 : camPos.x > W / 2 + 0.05 ? 0.06 : 1
    };
    const ceilingVisible = insideRoom && camPos.y < 1.85;

    const apply = (groups, ceiling) => {
      Object.entries(states).forEach(([side, s]) => {
        const g = groups[side];
        if (g) g.scale.y = THREE.MathUtils.lerp(g.scale.y, s, 0.25);
      });
      if (ceiling) ceiling.visible = ceilingVisible;
    };
    apply(this.wallGroups, this.ceilingMesh);
    if (this.beforeBuilt) apply(this.beforeWallGroups, this.beforeCeiling);

    // Ocultar la silla cuando la cámara está pegada al escritorio
    const hideChair = Math.hypot(camPos.x + 0.40, camPos.z + 0.68) < 0.56 && camPos.y < 1.40;
    ['chair_1', 'upg_ds_3'].forEach(id => {
      const m1 = this.furnitureMeshes.get(id);
      if (m1) m1.visible = !hideChair;
      const m2 = this.beforeFurnitureMeshes.get(id);
      if (m2) m2.visible = !hideChair;
    });
  }

  // ==========================================================================
  // INTERACCIÓN CON EL MOUSE
  // ==========================================================================
  setupInteraction() {
    const dom = this.renderer.domElement;
    const hoverTip = document.getElementById('hover-3d-tooltip');
    let lastLookX = 0;
    let lastLookY = 0;
    let dragArmed = false;

    const setPointer = (e) => {
      const rect = dom.getBoundingClientRect();
      this.pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    // En modo comparar, la mitad izquierda es "Antes" (solo vista, no editable)
    const isOnBeforeSide = (e) => {
      if (!this.compareMode) return false;
      const rect = dom.getBoundingClientRect();
      return (e.clientX - rect.left) / rect.width < this.compareSplit;
    };

    const pickFurniture = () => {
      const hits = this.raycaster.intersectObjects(this.furnitureGroup.children, true);
      for (const hit of hits) {
        let obj = hit.object;
        while (obj && !obj.userData?.isFurniture) obj = obj.parent;
        if (obj && obj.visible && obj.userData?.id) return { obj, point: hit.point };
      }
      return null;
    };

    dom.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      this.pointerDownPos.set(e.clientX, e.clientY);
      lastLookX = e.clientX;
      lastLookY = e.clientY;
      dragArmed = false;
      if (isOnBeforeSide(e)) return;

      setPointer(e);
      this.raycaster.setFromCamera(this.pointer, this.camera);
      const picked = pickFurniture();
      if (picked) {
        const { obj, point } = picked;
        this.selectedId = obj.userData.id;
        this.selectedSubGadgetId = detectSubGadgetFromHit(obj.userData.type, obj.worldToLocal(point.clone()));
        this.updateSelectionHighlight();

        const item = this.items.find(i => i.id === obj.userData.id);
        this.dragPlane.set(new THREE.Vector3(0, 1, 0), -(item?.elevation || 0));
        const ip = new THREE.Vector3();
        if (this.raycaster.ray.intersectPlane(this.dragPlane, ip)) {
          this.dragOffset.subVectors(obj.position, ip);
          dragArmed = true;
        }
        return;
      }
      if (this.navMode === 'walk') this.isLookingWalk = true;
    });

    window.addEventListener('pointermove', (e) => {
      // Empezar a arrastrar solo si el mouse se mueve más de 6 px (clic simple = solo seleccionar)
      if (dragArmed && !this.isDragging && this.selectedId) {
        if (Math.hypot(e.clientX - this.pointerDownPos.x, e.clientY - this.pointerDownPos.y) > 6) {
          this.pushHistory();
          this.isDragging = true;
          if (this.navMode !== 'walk') this.controls.enabled = false;
          dom.style.cursor = 'grabbing';
          hoverTip?.classList.add('hidden');
        }
      }

      if (this.isDragging && this.selectedId) {
        setPointer(e);
        this.raycaster.setFromCamera(this.pointer, this.camera);
        const ip = new THREE.Vector3();
        if (this.raycaster.ray.intersectPlane(this.dragPlane, ip)) {
          const item = this.items.find(i => i.id === this.selectedId);
          const mesh = this.furnitureMeshes.get(this.selectedId);
          if (!item || !mesh) return;
          const halfW = this.room.width / 2 - 0.08;
          const halfD = this.room.depth / 2 - 0.08;
          const nx = Math.max(-halfW, Math.min(halfW, Math.round((ip.x + this.dragOffset.x) * 50) / 50));
          const nz = Math.max(-halfD, Math.min(halfD, Math.round((ip.z + this.dragOffset.z) * 50) / 50));
          item.x = nx;
          item.z = nz;
          mesh.position.x = nx;
          mesh.position.z = nz;
          this.selectionGroup.clear();
          this.selectionGroup.add(new THREE.BoxHelper(mesh, 0xf59e0b));
        }
        return;
      }

      if (this.navMode === 'walk' && this.isLookingWalk) {
        this.walkYaw -= (e.clientX - lastLookX) * 0.005;
        this.walkPitch = Math.max(-1.1, Math.min(1.1, this.walkPitch - (e.clientY - lastLookY) * 0.005));
        lastLookX = e.clientX;
        lastLookY = e.clientY;
        return;
      }

      // Tooltip corto al pasar el mouse
      if (e.target === dom && !dragArmed && !isOnBeforeSide(e)) {
        setPointer(e);
        this.raycaster.setFromCamera(this.pointer, this.camera);
        const picked = pickFurniture();
        if (picked) {
          const { obj, point } = picked;
          const subId = detectSubGadgetFromHit(obj.userData.type, obj.worldToLocal(point.clone()));
          const sub = subId ? SUB_GADGETS_DB[subId] : null;
          const label = sub ? this.shortGadgetName(sub.name) : this.shortGadgetName(obj.userData.name || obj.userData.type);
          dom.style.cursor = 'pointer';
          if (hoverTip) {
            const rect = this.container.getBoundingClientRect();
            hoverTip.textContent = label;
            hoverTip.style.left = `${Math.min(rect.width - 200, Math.max(8, e.clientX - rect.left))}px`;
            hoverTip.style.top = `${Math.max(46, e.clientY - rect.top)}px`;
            hoverTip.classList.remove('hidden');
          }
          return;
        }
      }
      if (!this.isDragging) dom.style.cursor = 'default';
      hoverTip?.classList.add('hidden');
    });

    window.addEventListener('pointerup', (e) => {
      this.isLookingWalk = false;
      dragArmed = false;
      if (this.isDragging) {
        this.isDragging = false;
        if (this.navMode !== 'walk') this.controls.enabled = true;
        dom.style.cursor = 'default';
        this.updateSelectionHighlight();
        return;
      }
      const dist = Math.hypot(e.clientX - this.pointerDownPos.x, e.clientY - this.pointerDownPos.y);
      if (dist < 4 && e.target === dom && !isOnBeforeSide(e)) {
        setPointer(e);
        this.raycaster.setFromCamera(this.pointer, this.camera);
        const hits = this.raycaster.intersectObjects(this.furnitureGroup.children, true);
        if (hits.length > 0) {
          const hitObj = hits[0].object;
          if (hitObj?.userData?.isScreen) {
            this.cycleWorkflowMode();
          } else if (
            this.selectedSubGadgetId === 'alexa_echo' ||
            this.selectedSubGadgetId === 'smart_power_strip' ||
            hitObj.userData?.isOutletLed ||
            hitObj.userData?.isAlexaRing ||
            hitObj.userData?.isFnirsiTip
          ) {
            this.toggleDomoticaDrawer(true);
            if (this.selectedSubGadgetId === 'alexa_echo' || hitObj.userData?.isAlexaRing) {
              this.triggerAlexaPulse(2400);
            }
          }
        }

        // Clic en la ventana / persiana inteligente
        const archHits = this.raycaster.intersectObjects(this.architectureGroup.children, true);
        if (archHits.length > 0 && archHits[0].object?.userData?.isSmartBlind) {
          this.toggleDomoticaDrawer(true);
          this.showToast('🪟 Persiana Zebra Inteligente seleccionada');
        }

        if (!pickFurniture()) {
          this.clearSelection();
          this.updateSelectionHighlight();
        }
      }
    });

    // Barra de Antes / Después
    const handle = document.getElementById('compare-handle');
    let draggingSplit = false;
    handle?.addEventListener('pointerdown', (e) => {
      draggingSplit = true;
      e.preventDefault();
      e.stopPropagation();
    });
    window.addEventListener('pointermove', (e) => {
      if (!draggingSplit) return;
      const rect = this.container.getBoundingClientRect();
      this.compareSplit = Math.max(0.04, Math.min(0.96, (e.clientX - rect.left) / rect.width));
      this.updateCompareHandle();
    });
    window.addEventListener('pointerup', () => { draggingSplit = false; });
  }

  // ==========================================================================
  // TECLADO: Ctrl+Z, Ctrl+Y, Supr, R, WASD
  // ==========================================================================
  setupKeyboard() {
    window.addEventListener('keydown', (e) => {
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
      const ctrl = e.ctrlKey || e.metaKey;

      if (ctrl && e.code === 'KeyZ' && !e.shiftKey) {
        e.preventDefault();
        this.undo();
        return;
      }
      if (ctrl && (e.code === 'KeyY' || (e.code === 'KeyZ' && e.shiftKey))) {
        e.preventDefault();
        this.redo();
        return;
      }
      if (e.code === 'Escape') {
        this.clearSelection();
        this.updateSelectionHighlight();
        return;
      }

      this.keysPressed[e.code] = true;
      if ((e.code === 'Delete' || e.code === 'Backspace') && this.selectedId) this.deleteSelected();
      if (e.code === 'KeyR' && this.selectedId && !ctrl) this.rotateSelected(45);
    });
    window.addEventListener('keyup', (e) => { this.keysPressed[e.code] = false; });
  }

  updateWalkMovement() {
    if (this.navMode !== 'walk') return;
    const speed = 0.032;
    const forward = new THREE.Vector3(Math.sin(this.walkYaw), 0, Math.cos(this.walkYaw)).normalize();
    const right = new THREE.Vector3(forward.z, 0, -forward.x).normalize();
    const k = this.keysPressed;
    if (k.KeyW || k.ArrowUp) this.camera.position.addScaledVector(forward, speed);
    if (k.KeyS || k.ArrowDown) this.camera.position.addScaledVector(forward, -speed);
    if (k.KeyA || k.ArrowLeft) this.camera.position.addScaledVector(right, speed);
    if (k.KeyD || k.ArrowRight) this.camera.position.addScaledVector(right, -speed);

    const limX = this.room.width / 2 - 0.18;
    const limZ = this.room.depth / 2 - 0.18;
    this.camera.position.x = Math.max(-limX, Math.min(limX, this.camera.position.x));
    this.camera.position.z = Math.max(-limZ, Math.min(limZ, this.camera.position.z));
    this.camera.position.y = this.walkEyeHeight;

    const lookDir = new THREE.Vector3(
      Math.sin(this.walkYaw) * Math.cos(this.walkPitch),
      Math.sin(this.walkPitch),
      Math.cos(this.walkYaw) * Math.cos(this.walkPitch)
    );
    this.controls.target.copy(this.camera.position).add(lookDir);
  }

  // ==========================================================================
  // ACCIONES SOBRE EL OBJETO SELECCIONADO (todas se pueden deshacer)
  // ==========================================================================
  rotateSelected(deltaDeg) {
    const item = this.items.find(i => i.id === this.selectedId);
    if (!item) return;
    this.pushHistory();
    item.rotY = (item.rotY || 0) + (deltaDeg * Math.PI) / 180;
    const mesh = this.furnitureMeshes.get(item.id);
    if (mesh) mesh.rotation.y = item.rotY;
    this.updateSelectionHighlight();
  }

  elevateSelected(deltaY) {
    const item = this.items.find(i => i.id === this.selectedId);
    if (!item) return;
    this.pushHistory();
    item.elevation = Math.max(0, Math.min(2.0, (item.elevation || 0) + deltaY));
    const mesh = this.furnitureMeshes.get(item.id);
    if (mesh) mesh.position.y = item.elevation;
    this.updateSelectionHighlight();
  }

  deleteSelected() {
    if (!this.selectedId) return;
    this.pushHistory();
    this.items = this.items.filter(i => i.id !== this.selectedId);
    this.clearSelection();
    this.rebuildFurnitureMeshes();
    this.showToast('🗑️ Quitado · Ctrl+Z para regresarlo');
  }

  // ==========================================================================
  // CÁMARA
  // ==========================================================================
  setCameraPreset(viewId) {
    document.querySelectorAll('[data-cam-preset]').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-cam-preset') === viewId);
    });

    if (viewId === 'walk') {
      this.camAnim = null;
      this.navMode = 'walk';
      this.controls.enabled = false;
      this.camera.fov = 70;
      this.camera.updateProjectionMatrix();
      this.camera.position.set(-0.22, this.walkEyeHeight, 0.78);
      this.walkYaw = -3.05;
      this.walkPitch = -0.08;
      this.updateWalkMovement();
      return;
    }

    this.navMode = 'orbit';
    this.controls.enabled = true;
    const p = CAMERA_PRESETS[viewId] || CAMERA_PRESETS.orbit_3d;
    this.room.wallMode = p.wallMode;
    this.camAnim = {
      startPos: this.camera.position.clone(),
      endPos: new THREE.Vector3(...p.pos),
      startTarget: this.controls.target.clone(),
      endTarget: new THREE.Vector3(...p.target),
      startFov: this.camera.fov,
      endFov: p.fov,
      progress: 0
    };
  }

  // ==========================================================================
  // INTERFAZ
  // ==========================================================================
  toggleDrawer(forceState) {
    this.drawerOpen = typeof forceState === 'boolean' ? forceState : !this.drawerOpen;
    document.getElementById('main-layout')?.classList.toggle('drawer-closed', !this.drawerOpen);
    document.getElementById('btn-toggle-drawer-top')?.classList.toggle('active', this.drawerOpen);
    requestAnimationFrame(() => this.onResize());
    setTimeout(() => this.onResize(), 120);
  }

  toggleFullscreen() {
    const fsBtn = document.getElementById('btn-fullscreen');
    if (!document.fullscreenElement && !this.isTheaterFullscreen) {
      this.isTheaterFullscreen = true;
      document.body.classList.add('theater-fullscreen');
      this.toggleDrawer(false);
      document.documentElement.requestFullscreen?.().catch(() => {});
      if (fsBtn) { fsBtn.textContent = '✕'; fsBtn.title = 'Salir de pantalla completa'; }
    } else {
      this.isTheaterFullscreen = false;
      document.body.classList.remove('theater-fullscreen');
      if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
      this.toggleDrawer(true);
      if (fsBtn) { fsBtn.textContent = '⛶'; fsBtn.title = 'Pantalla completa'; }
    }
    requestAnimationFrame(() => this.onResize());
    setTimeout(() => this.onResize(), 220);
  }

  updateBudgetUI() {
    let total = 0;
    let count = 0;
    PRODUCT_ZONES.forEach(zone => {
      const opt = zone.options.find(o => o.id === this.selectedZones[zone.id]);
      if (opt && opt.price > 0) {
        total += opt.price;
        count++;
      }
    });
    const el = document.getElementById('budget-total-amount');
    if (el) el.textContent = fmtPrice(total);
    const pill = document.getElementById('budget-pill');
    if (pill) pill.title = `Total aproximado · ${count} de ${PRODUCT_ZONES.length} zonas`;
  }

  initUI() {
    // Combos (etiquetas cortas)
    const comboBar = document.getElementById('quick-combos-bar');
    if (comboBar) {
      comboBar.innerHTML = '';
      Object.entries(QUICK_COMBOS).forEach(([id, combo]) => {
        const btn = document.createElement('button');
        btn.className = 'combo-pill';
        btn.dataset.comboId = id;
        btn.textContent = UI_LABELS.combos[id] || combo.name;
        btn.title = combo.name;
        btn.addEventListener('click', () => this.applyCombo(id));
        comboBar.appendChild(btn);
      });
    }

    // Escenas de luz
    const sceneBar = document.getElementById('scene-bar');
    if (sceneBar) {
      sceneBar.innerHTML = '';
      Object.values(LIGHT_SCENES).forEach(sc => {
        const btn = document.createElement('button');
        btn.className = `scene-btn ${sc.id === this.lightScene ? 'active' : ''}`;
        btn.dataset.scene = sc.id;
        btn.title = `Escena: ${sc.name}`;
        btn.innerHTML = `${sc.icon}<span class="scene-label">${sc.name}</span>`;
        btn.addEventListener('click', () => this.setLightScene(sc.id));
        sceneBar.appendChild(btn);
      });
    }

    this.renderZonesUI();
    this.renderFinishesUI();

    document.getElementById('btn-toggle-drawer-top')?.addEventListener('click', () => this.toggleDrawer());
    document.getElementById('btn-toggle-drawer-top')?.classList.add('active');
    document.getElementById('btn-fullscreen')?.addEventListener('click', () => this.toggleFullscreen());
    document.getElementById('btn-undo')?.addEventListener('click', () => this.undo());
    document.getElementById('btn-redo')?.addEventListener('click', () => this.redo());
    document.getElementById('btn-compare')?.addEventListener('click', () => this.toggleCompare());

    document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement && this.isTheaterFullscreen) {
        this.isTheaterFullscreen = false;
        document.body.classList.remove('theater-fullscreen');
        this.toggleDrawer(true);
        const fsBtn = document.getElementById('btn-fullscreen');
        if (fsBtn) { fsBtn.textContent = '⛶'; fsBtn.title = 'Pantalla completa'; }
      }
      this.onResize();
    });

    document.getElementById('switch-show-clutter')?.addEventListener('change', (e) => {
      this.pushHistory();
      this.room.showClutter = e.target.checked;
      this.rebuildSceneFromZones();
    });

    document.querySelectorAll('[data-cam-preset]').forEach(btn => {
      btn.addEventListener('click', () => this.setCameraPreset(btn.getAttribute('data-cam-preset')));
    });

    document.querySelectorAll('.wf-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        this.setWorkflowMode(btn.dataset.workflow);
      });
    });

    document.getElementById('btn-close-inspector')?.addEventListener('click', () => {
      this.clearSelection();
      this.updateSelectionHighlight();
    });
    document.getElementById('act-zoom-item')?.addEventListener('click', () => {
      this.setCameraPreset(this.activeInspectorCameraPreset || 'orbit_3d');
    });
    document.getElementById('act-rot-l')?.addEventListener('click', () => this.rotateSelected(-45));
    document.getElementById('act-rot-r')?.addEventListener('click', () => this.rotateSelected(45));
    document.getElementById('act-elev-up')?.addEventListener('click', () => this.elevateSelected(0.08));
    document.getElementById('act-elev-dn')?.addEventListener('click', () => this.elevateSelected(-0.08));
    document.getElementById('act-del')?.addEventListener('click', () => this.deleteSelected());

    document.getElementById('finishes-toggle')?.addEventListener('click', () => {
      document.getElementById('finishes-body')?.classList.toggle('collapsed');
      document.getElementById('finishes-card')?.classList.toggle('open');
    });

    document.getElementById('btn-screenshot')?.addEventListener('click', () => {
      this.renderFrame();
      const link = document.createElement('a');
      link.download = 'mi_cuarto.png';
      link.href = this.renderer.domElement.toDataURL('image/png');
      link.click();
    });

    // Domótica: Botón de apertura / cierre del panel
    document.getElementById('btn-toggle-domotica')?.addEventListener('click', () => {
      this.toggleDomoticaDrawer();
    });
    document.getElementById('btn-close-domotica')?.addEventListener('click', () => {
      this.toggleDomoticaDrawer(false);
    });

    // Domótica: Switches de tomas Tuya
    document.getElementById('domo-switch-1')?.addEventListener('change', (e) => {
      this.setOutlet('outlet1_iron', e.target.checked);
    });
    document.getElementById('domo-switch-2')?.addEventListener('change', (e) => {
      this.setOutlet('outlet2_lights', e.target.checked);
    });
    document.getElementById('domo-switch-3')?.addEventListener('change', (e) => {
      this.setOutlet('outlet3_gan', e.target.checked);
    });
    document.getElementById('domo-switch-4')?.addEventListener('change', (e) => {
      this.setOutlet('outlet4_fan', e.target.checked);
    });

    // Domótica: Botón corte general de emergencia
    document.getElementById('btn-kill-all-outlets')?.addEventListener('click', () => {
      this.killAllOutlets();
    });

    // Domótica: Slider de persiana motorizada
    const blindSlider = document.getElementById('domo-blind-slider');
    blindSlider?.addEventListener('input', (e) => {
      this.setBlindOpen(e.target.value, { record: false });
    });
    blindSlider?.addEventListener('change', (e) => {
      this.setBlindOpen(e.target.value, { record: true });
    });

    // Domótica: Botones presets de persiana
    document.querySelectorAll('[data-blind]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.setBlindOpen(btn.getAttribute('data-blind'));
      });
    });

    // Domótica: Rutinas de voz de Alexa
    document.querySelectorAll('[data-alexa]').forEach(btn => {
      btn.addEventListener('click', () => {
        const cmd = btn.getAttribute('data-alexa');
        this.executeAlexaCommand(cmd);
      });
    });

    // Domótica: Input de voz libre Alexa
    document.getElementById('alexa-voice-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('alexa-cmd-input');
      if (input && input.value.trim()) {
        this.executeAlexaCommand(input.value.trim());
        input.value = '';
      }
    });

    this.updateDomoticaUI();
    this.updateHistoryButtons();
    this.syncUIState();
  }

  // Catálogo compacto: nombre corto + precio; el detalle sale con ⓘ
  renderZonesUI() {
    const container = document.getElementById('zones-accordion-list');
    if (!container) return;
    container.innerHTML = '';

    PRODUCT_ZONES.forEach(zone => {
      const lbl = UI_LABELS.zones[zone.id] || { icon: '•', short: zone.title };
      const card = document.createElement('div');
      card.className = 'zone-card';
      card.innerHTML = `
        <button class="zone-header" title="${zone.title}">
          <span class="z-icon">${lbl.icon}</span>
          <span class="z-name">${lbl.short}</span>
          <span class="z-choice" id="choice-label-${zone.id}"></span>
          <span class="z-chev">▾</span>
        </button>
        <div class="zone-body collapsed"></div>
      `;
      const body = card.querySelector('.zone-body');

      // Abrir una zona también lleva la cámara a esa zona
      card.querySelector('.zone-header').addEventListener('click', () => {
        const willOpen = body.classList.contains('collapsed');
        container.querySelectorAll('.zone-card').forEach(c => {
          c.classList.remove('open');
          c.querySelector('.zone-body').classList.add('collapsed');
        });
        if (willOpen) {
          body.classList.remove('collapsed');
          card.classList.add('open');
          if (zone.cameraPreset) this.setCameraPreset(zone.cameraPreset);
        }
      });

      zone.options.forEach(opt => {
        const row = document.createElement('div');
        row.className = 'opt-row';
        row.dataset.zoneId = zone.id;
        row.dataset.optId = opt.id;
        row.innerHTML = `
          <span class="opt-radio"></span>
          <span class="opt-name">${UI_LABELS.options[opt.id] || opt.name}</span>
          <span class="opt-price">${opt.price === 0 ? '—' : fmtPrice(opt.price)}</span>
          ${opt.id !== 'none' ? '<button class="opt-info" title="Ver detalle y links">ⓘ</button>' : ''}
        `;
        row.addEventListener('click', (e) => {
          if (e.target.closest('.opt-info')) return;
          this.selectZoneOption(zone.id, opt.id);
        });
        body.appendChild(row);

        if (opt.id !== 'none') {
          const detail = document.createElement('div');
          detail.className = 'opt-detail hidden';
          detail.innerHTML = `
            ${opt.dims && opt.dims !== '-' ? `<div class="opt-meta">${opt.dims} · ${opt.store}</div>` : ''}
            <div class="opt-desc">${opt.desc}</div>
            ${opt.links && opt.links.length ? `<div class="opt-links">${this.linksHtml(opt.links)}</div>` : ''}
          `;
          body.appendChild(detail);
          const infoBtn = row.querySelector('.opt-info');
          infoBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const show = detail.classList.contains('hidden');
            detail.classList.toggle('hidden', !show);
            infoBtn.classList.toggle('active', show);
          });
        }
      });

      container.appendChild(card);
    });
  }

  renderFinishesUI() {
    const mk = (boxId, list, colorOf, onPick, dataKey) => {
      const box = document.getElementById(boxId);
      if (!box) return;
      box.innerHTML = '';
      list.forEach(it => {
        const btn = document.createElement('button');
        btn.className = 'color-pill';
        if (dataKey) btn.dataset[dataKey] = it.id;
        btn.title = it.name;
        btn.innerHTML = `<i style="background:${colorOf(it)}"></i><span>${it.name.split(' (')[0]}</span>`;
        btn.addEventListener('click', () => {
          this.pushHistory();
          onPick(it);
          this.syncUIState();
        });
        box.appendChild(btn);
      });
    };

    mk('led-colors-row', LED_COLORS, l => l.css, (led) => {
      this.room.ledColorMode = led.id;
      this.buildArchitecture();
      this.rebuildFurnitureMeshes();
    }, 'ledId');

    mk('wall-palettes-row', WALL_PALETTES, p => p.accent, (pal) => {
      this.room.wallColor = pal.wall;
      this.room.accentColor = pal.accent;
      this.room.accentWall = pal.accentWall;
      this.buildArchitecture();
    });

    mk('bedding-themes-row', BEDDING_THEMES, b => b.primary, (b) => {
      this.room.beddingTheme = b.id;
      this.rebuildFurnitureMeshes();
    });

    mk('floor-types-row', [
      { id: 'dark_wood_tile', name: 'Gris actual', color: '#4a4e54' },
      { id: 'light_oak', name: 'Roble claro', color: '#c2ab8b' }
    ], f => f.color, (fl) => {
      this.room.floorType = fl.id;
      this.buildArchitecture();
    });
  }

  syncUIState() {
    document.querySelectorAll('.combo-pill').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.comboId === this.activeComboId);
    });

    const clutterSwitch = document.getElementById('switch-show-clutter');
    if (clutterSwitch) clutterSwitch.checked = !!this.room.showClutter;

    PRODUCT_ZONES.forEach(zone => {
      const activeOptId = this.selectedZones[zone.id] || 'none';
      const labelEl = document.getElementById(`choice-label-${zone.id}`);
      if (labelEl) {
        labelEl.textContent = activeOptId === 'none' ? '—' : (UI_LABELS.options[activeOptId] || activeOptId);
      }
      document.querySelectorAll(`.opt-row[data-zone-id="${zone.id}"]`).forEach(row => {
        row.classList.toggle('selected', row.dataset.optId === activeOptId);
      });
    });

    document.querySelectorAll('[data-led-id]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.ledId === this.room.ledColorMode);
    });
    this.updateBudgetUI();
  }

  // ==========================================================================
  // LOOP
  // ==========================================================================
  renderFrame() {
    if (!this.compareMode) {
      this.renderer.render(this.scene, this.camera);
      return;
    }
    const w = this.container.clientWidth;
    const h = this.container.clientHeight;
    const split = Math.round(this.compareSplit * w);

    this.renderer.setScissorTest(true);

    // Izquierda: ANTES (tu cuarto según las fotos)
    this.setAfterVisible(false);
    this.beforeRoot.visible = true;
    this.renderer.setScissor(0, 0, split, h);
    this.renderer.render(this.scene, this.camera);

    // Derecha: DESPUÉS (tu propuesta)
    this.setAfterVisible(true);
    this.beforeRoot.visible = false;
    this.renderer.setScissor(split, 0, w - split, h);
    this.renderer.render(this.scene, this.camera);

    this.renderer.setScissorTest(false);
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    if (this.camAnim) {
      this.camAnim.progress = Math.min(1, this.camAnim.progress + 0.06);
      const t = 1 - Math.pow(1 - this.camAnim.progress, 3);
      this.camera.position.lerpVectors(this.camAnim.startPos, this.camAnim.endPos, t);
      this.controls.target.lerpVectors(this.camAnim.startTarget, this.camAnim.endTarget, t);
      this.camera.fov = THREE.MathUtils.lerp(this.camAnim.startFov, this.camAnim.endFov, t);
      this.camera.updateProjectionMatrix();
      this.controls.update();
      if (this.camAnim.progress >= 1) this.camAnim = null;
    } else if (this.navMode === 'walk') {
      this.updateWalkMovement();
    } else {
      this.controls.update();
    }

    this.updateSmartWalls();
    this.updateFloating3DPin();
    this.renderFrame();
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.roomApp = new RoomSimulatorApp();
});
