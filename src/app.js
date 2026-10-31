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
  detectSubGadgetFromHit
} from './data.js';
import {
  createStudioEnvironment,
  createFloorTexture,
  createZebraBlindTexture,
  buildFurnitureMesh
} from './models.js';

class RoomSimulatorApp {
  constructor() {
    this.room = JSON.parse(JSON.stringify(DEFAULT_ROOM));
    this.activeComboId = 'ingeniero_esencial';
    this.drawerOpen = true;
    this.isTheaterFullscreen = false;

    this.selectedZones = {
      vibecoding_zone: 'vibe_27_mx',
      engineer_pegboard_zone: 'eng_yolispa_lab',
      shelves_zone: 'sh_lack_black',
      lighting_zone: 'light_xiaomi_govee',
      soccer_zone: 'soc_frame_ball',
      storage_underbed_door_zone: 'st_skubb_basic'
    };

    this.items = [];
    this.selectedId = null;
    this.selectedSubGadgetId = null;
    this.lightingMode = 'warm_minimal';

    // Navegación y animación suave de cámara (Fly-To)
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

    // Grupos Three.js
    this.furnitureMeshes = new Map();
    this.wallGroups = {};
    this.architectureGroup = new THREE.Group();
    this.furnitureGroup = new THREE.Group();
    this.lightsGroup = new THREE.Group();
    this.selectionGroup = new THREE.Group();

    this.initScene();
    this.applyCombo('ingeniero_esencial');
    this.setupInteraction();
    this.setupWalkControls();
    this.initUI();
    this.animate();
  }

  initScene() {
    this.container = document.getElementById('viewport-container');
    const w = this.container.clientWidth || window.innerWidth;
    const h = this.container.clientHeight || window.innerHeight;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0b0e14);
    // Mapa de entorno PBR Studio para reflejos realistas en metales, pantallas, cristal y madera
    this.scene.environment = createStudioEnvironment();

    // near = 0.02 permite hacer zoom extremo a 12 cm de cualquier gadget sin recortar geometría
    this.camera = new THREE.PerspectiveCamera(50, w / h, 0.02, 35);
    this.camera.position.set(-0.15, 2.25, 2.55);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.18;
    this.container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.controls.target.set(0, 0.82, -0.10);
    this.controls.maxPolarAngle = Math.PI * 0.495;
    this.controls.minDistance = 0.12;
    this.controls.maxDistance = 8.0;

    // Cancelar animación automática si el usuario mueve el mouse manualmente
    this.controls.addEventListener('start', () => {
      this.camAnim = null;
    });

    this.scene.add(this.architectureGroup);
    this.scene.add(this.furnitureGroup);
    this.scene.add(this.lightsGroup);
    this.scene.add(this.selectionGroup);

    window.addEventListener('resize', () => this.onResize());
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => this.onResize());
      this.resizeObserver.observe(this.container);
    }
  }

  onResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const rect = this.container.getBoundingClientRect();
    const w = Math.floor(rect.width) || this.container.clientWidth || window.innerWidth;
    const h = Math.floor(rect.height) || this.container.clientHeight || window.innerHeight;
    if (w <= 10 || h <= 10) return;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h, false);
  }

  toggleDrawer(forceState) {
    this.drawerOpen = typeof forceState === 'boolean' ? forceState : !this.drawerOpen;
    const layout = document.getElementById('main-layout');
    if (layout) {
      layout.classList.toggle('drawer-closed', !this.drawerOpen);
    }
    const floatBtn = document.getElementById('btn-toggle-drawer-float');
    if (floatBtn) {
      floatBtn.textContent = this.drawerOpen
        ? '☰ Ocultar Catálogo'
        : '☰ Abrir Catálogo';
    }
    const topBtn = document.getElementById('btn-toggle-drawer-top');
    if (topBtn) {
      topBtn.textContent = this.drawerOpen
        ? '☰ Catálogo'
        : '☰ Abrir Catálogo';
    }
    requestAnimationFrame(() => this.onResize());
    setTimeout(() => this.onResize(), 60);
    setTimeout(() => this.onResize(), 200);
  }

  toggleFullscreen() {
    const fsBtn = document.getElementById('btn-fullscreen');
    const isNativeFs = !!document.fullscreenElement;

    if (!isNativeFs && !this.isTheaterFullscreen) {
      this.isTheaterFullscreen = true;
      document.body.classList.add('theater-fullscreen');
      this.toggleDrawer(false);

      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
      if (fsBtn) fsBtn.textContent = '✕ Salir Pantalla Completa';
    } else {
      this.isTheaterFullscreen = false;
      document.body.classList.remove('theater-fullscreen');
      if (document.fullscreenElement && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      this.toggleDrawer(true);
      if (fsBtn) fsBtn.textContent = '⛶ Pantalla Completa';
    }
    requestAnimationFrame(() => this.onResize());
    setTimeout(() => this.onResize(), 60);
    setTimeout(() => this.onResize(), 220);
  }

  rebuildSceneFromZones() {
    let replaceChair = false;
    this.lightingMode = 'current_bulb';

    const spawnedUpgrades = [];
    PRODUCT_ZONES.forEach(zone => {
      const chosenOptId = this.selectedZones[zone.id] || 'none';
      const opt = zone.options.find(o => o.id === chosenOptId);
      if (!opt) return;
      if (opt.replaceChair) replaceChair = true;
      if (opt.lightingMode) this.lightingMode = opt.lightingMode;
      if (opt.spawnItems && opt.spawnItems.length > 0) {
        opt.spawnItems.forEach(sp => {
          spawnedUpgrades.push(JSON.parse(JSON.stringify(sp)));
        });
      }
    });

    const baseItems = JSON.parse(JSON.stringify(BASE_ROOM_ITEMS)).filter(it => {
      if (replaceChair && it.type === 'current_chair') return false;
      return true;
    });

    const clutterItems = this.room.showClutter
      ? JSON.parse(JSON.stringify(CLUTTER_ROOM_ITEMS))
      : [];

    this.items = [...baseItems, ...clutterItems, ...spawnedUpgrades];
    this.buildArchitecture();
    this.rebuildFurnitureMeshes();
    this.updateBudgetUI();
  }

  applyCombo(comboId) {
    const combo = QUICK_COMBOS[comboId];
    if (!combo) return;
    this.activeComboId = comboId;
    this.room.showClutter = combo.showClutter;
    this.room.beddingTheme = combo.beddingTheme;
    this.room.ledColorMode = combo.ledColorMode;

    const pal = WALL_PALETTES.find(p => p.id === combo.wallPalette) || WALL_PALETTES[0];
    this.room.wallColor = pal.wall;
    this.room.accentColor = pal.accent;
    this.room.accentWall = pal.accentWall;

    this.selectedZones = { ...combo.zones };
    this.selectedId = null;

    this.rebuildSceneFromZones();
    this.syncUIState();
  }

  selectZoneOption(zoneId, optionId) {
    this.activeComboId = 'custom';
    this.selectedZones[zoneId] = optionId;
    if (optionId !== 'none' && (zoneId === 'storage_underbed_door_zone' || zoneId === 'soccer_zone')) {
      this.room.showClutter = false;
    }
    this.rebuildSceneFromZones();
    this.syncUIState();
  }

  buildArchitecture() {
    while (this.architectureGroup.children.length > 0) {
      this.architectureGroup.remove(this.architectureGroup.children[0]);
    }
    while (this.lightsGroup.children.length > 0) {
      this.lightsGroup.remove(this.lightsGroup.children[0]);
    }

    const { width: W, depth: D, height: H } = this.room;
    const wallT = 0.075;

    const floorTex = createFloorTexture(this.room.floorType);
    const floorMat = new THREE.MeshStandardMaterial({
      map: floorTex,
      roughness: 0.36,
      metalness: 0.10
    });
    const floorMesh = new THREE.Mesh(new THREE.BoxGeometry(W + wallT * 2, 0.06, D + wallT * 2), floorMat);
    floorMesh.position.set(0, -0.03, 0);
    floorMesh.receiveShadow = true;
    this.architectureGroup.add(floorMesh);

    const getWallMat = (side) => {
      const isAccent = this.room.accentWall === side;
      const col = isAccent ? this.room.accentColor : this.room.wallColor;
      return new THREE.MeshStandardMaterial({
        color: new THREE.Color(col),
        roughness: 0.72,
        metalness: 0.03
      });
    };

    const baseboardMat = new THREE.MeshStandardMaterial({ color: 0x1e2128, roughness: 0.45 });

    this.wallGroups = {
      north: new THREE.Group(),
      south: new THREE.Group(),
      west: new THREE.Group(),
      east: new THREE.Group()
    };

    // --- PARED NORTE (Ventana a la izq + Clóset a la der) ---
    const northWall = new THREE.Mesh(new THREE.BoxGeometry(W + wallT * 2, H, wallT), getWallMat('north'));
    northWall.position.set(0, H / 2, -D / 2 - wallT / 2);
    northWall.receiveShadow = true;
    this.wallGroups.north.add(northWall);
    const northBase = new THREE.Mesh(new THREE.BoxGeometry(W, 0.07, 0.015), baseboardMat);
    northBase.position.set(0, 0.035, -D / 2 + 0.008);
    this.wallGroups.north.add(northBase);

    const winW = 1.08;
    const winH = 1.26;
    const winX = -W / 2 + 0.04 + winW / 2;
    const winY = 1.44;
    const frameMat = new THREE.MeshStandardMaterial({ color: 0xe5e7eb, roughness: 0.30, metalness: 0.2 });
    const blindMat = new THREE.MeshStandardMaterial({
      map: createZebraBlindTexture(),
      roughness: 0.50,
      emissive: new THREE.Color(0x1e293b),
      emissiveIntensity: 0.12
    });
    const headRail = new THREE.Mesh(new THREE.BoxGeometry(winW + 0.04, 0.065, 0.065), frameMat);
    headRail.position.set(winX, winY + winH / 2 + 0.02, -D / 2 + 0.03);
    this.wallGroups.north.add(headRail);
    const blindMesh = new THREE.Mesh(new THREE.BoxGeometry(winW, winH, 0.02), blindMat);
    blindMesh.position.set(winX, winY, -D / 2 + 0.015);
    this.wallGroups.north.add(blindMesh);

    // --- PARED SUR (Puerta a la izq, Mueble/Jersey al centro, Pie Literas a la der) ---
    const southWall = new THREE.Mesh(new THREE.BoxGeometry(W + wallT * 2, H, wallT), getWallMat('south'));
    southWall.position.set(0, H / 2, D / 2 + wallT / 2);
    southWall.receiveShadow = true;
    this.wallGroups.south.add(southWall);
    const southBase = new THREE.Mesh(new THREE.BoxGeometry(W, 0.07, 0.015), baseboardMat);
    southBase.position.set(0, 0.035, D / 2 - 0.008);
    this.wallGroups.south.add(southBase);

    // --- PARED OESTE (TV + Escritorio + Panel Yolispa + Mueble Espejo + Puerta) ---
    const westWall = new THREE.Mesh(new THREE.BoxGeometry(wallT, H, D), getWallMat('west'));
    westWall.position.set(-W / 2 - wallT / 2, H / 2, 0);
    westWall.receiveShadow = true;
    this.wallGroups.west.add(westWall);
    const westBase = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.07, D - 0.85), baseboardMat);
    westBase.position.set(-W / 2 + 0.008, 0.035, -0.42);
    this.wallGroups.west.add(westBase);

    const doorW = 0.80;
    const doorH = 2.04;
    const doorFrameMat = new THREE.MeshStandardMaterial({ color: 0x7c5332, roughness: 0.55 });
    const woodDoorMat = new THREE.MeshStandardMaterial({ color: 0x9e6f46, roughness: 0.45 });
    const doorCenterZ = D / 2 - doorW / 2 - 0.04;
    const doorFrame = new THREE.Mesh(new THREE.BoxGeometry(0.02, doorH, doorW), doorFrameMat);
    doorFrame.position.set(-W / 2 + 0.01, doorH / 2, doorCenterZ);
    this.wallGroups.west.add(doorFrame);

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
    this.wallGroups.west.add(doorPivot);

    // --- PARED ESTE (Costado Clóset + Literas) ---
    const eastWall = new THREE.Mesh(new THREE.BoxGeometry(wallT, H, D), getWallMat('east'));
    eastWall.position.set(W / 2 + wallT / 2, H / 2, 0);
    eastWall.receiveShadow = true;
    this.wallGroups.east.add(eastWall);
    const eastBase = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.07, D), baseboardMat);
    eastBase.position.set(W / 2 - 0.008, 0.035, 0);
    this.wallGroups.east.add(eastBase);

    Object.values(this.wallGroups).forEach(g => this.architectureGroup.add(g));

    this.ceilingMesh = new THREE.Mesh(
      new THREE.BoxGeometry(W + wallT * 2, 0.05, D + wallT * 2),
      new THREE.MeshStandardMaterial({ color: 0xf3f4f6, roughness: 0.85 })
    );
    this.ceilingMesh.position.set(0, H + 0.025, 0);
    this.architectureGroup.add(this.ceilingMesh);

    this.buildLighting(W, D, H);
  }

  buildLighting(W, D, H) {
    const mode = this.lightingMode;
    const ledObj = LED_COLORS.find(l => l.id === this.room.ledColorMode) || LED_COLORS[0];

    const ambIntensity = mode === 'setup_night' ? 0.55 : mode === 'warm_minimal' ? 0.75 : 0.85;
    this.lightsGroup.add(new THREE.AmbientLight(0xffffff, ambIntensity));

    const hemi = new THREE.HemisphereLight(0xffffff, 0x334155, 0.65);
    hemi.position.set(0, H, 0);
    this.lightsGroup.add(hemi);

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
        new THREE.MeshBasicMaterial({ color: 0xffffff })
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
        new THREE.MeshBasicMaterial({ color: mode === 'setup_night' ? ledObj.hex : 0xfff7ed })
      );
      diffuser.position.y = -0.016;
      ceilingFixture.add(diffuser);
    }
    this.lightsGroup.add(ceilingFixture);

    const mainLightColor = mode === 'current_bulb' ? 0xf8fafc : mode === 'warm_minimal' ? 0xffedd5 : 0xe0f2fe;
    const mainLightIntensity = mode === 'setup_night' ? 0.90 : 2.0;
    const mainLight = new THREE.PointLight(mainLightColor, mainLightIntensity, 7.5, 1.2);
    mainLight.position.set(0, H - 0.22, 0);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 1024;
    mainLight.shadow.mapSize.height = 1024;
    mainLight.shadow.bias = -0.0015;
    this.lightsGroup.add(mainLight);

    const winLight = new THREE.DirectionalLight(0xfef3c7, 0.50);
    winLight.position.set(-0.5, 1.8, -D / 2 - 0.8);
    this.lightsGroup.add(winLight);
  }

  rebuildFurnitureMeshes() {
    while (this.furnitureGroup.children.length > 0) {
      this.furnitureGroup.remove(this.furnitureGroup.children[0]);
    }
    this.furnitureMeshes.clear();

    this.items.forEach(item => {
      const mesh = buildFurnitureMesh(item, this.room);
      mesh.position.set(item.x, item.elevation || 0, item.z);
      mesh.rotation.y = item.rotY || 0;
      this.furnitureGroup.add(mesh);
      this.furnitureMeshes.set(item.id, mesh);
    });

    this.updateSelectionHighlight();
  }

  updateSelectionHighlight() {
    while (this.selectionGroup.children.length > 0) {
      this.selectionGroup.remove(this.selectionGroup.children[0]);
    }
    const inspector = document.getElementById('room-item-inspector');
    const pinEl = document.getElementById('floating-3d-pin');

    if (!this.selectedId) {
      if (inspector) inspector.classList.add('hidden');
      if (pinEl) pinEl.classList.add('hidden');
      return;
    }

    const item = this.items.find(i => i.id === this.selectedId);
    const mesh = this.furnitureMeshes.get(this.selectedId);
    if (!item || !mesh) {
      if (inspector) inspector.classList.add('hidden');
      if (pinEl) pinEl.classList.add('hidden');
      return;
    }

    const boxHelper = new THREE.BoxHelper(mesh, 0xf59e0b);
    this.selectionGroup.add(boxHelper);

    const spec = CATALOG[item.type] || { name: item.type, w: 0.4, d: 0.4, h: 0.4 };
    const parentInfo = ITEM_INSPECTOR_DB[item.type] || {
      badge: '📦 Artículo del Cuarto',
      price: '-',
      dims: `${Math.round(spec.w * 100)} × ${Math.round(spec.d * 100)} × ${Math.round(spec.h * 100)} cm`,
      desc: spec.name,
      cameraPreset: 'orbit_3d',
      links: []
    };

    const subInfo = this.selectedSubGadgetId ? SUB_GADGETS_DB[this.selectedSubGadgetId] : null;
    const activeBadge = subInfo ? subInfo.badge : parentInfo.badge;
    const activeTitle = subInfo ? subInfo.name : spec.name;
    const activePrice = subInfo ? subInfo.price : parentInfo.price;
    const activeDims = subInfo ? subInfo.dims : parentInfo.dims;
    const activeDesc = subInfo ? subInfo.desc : parentInfo.desc;
    const activeLinks = subInfo ? subInfo.links : (parentInfo.links || []);
    this.activeInspectorCameraPreset = (subInfo && subInfo.cameraPreset) || parentInfo.cameraPreset || 'orbit_3d';

    if (inspector) {
      document.getElementById('insp-badge').textContent = activeBadge;
      document.getElementById('insp-title').textContent = activeTitle;
      document.getElementById('insp-price').textContent = activePrice;
      document.getElementById('insp-dims').textContent = `📐 ${activeDims}`;
      document.getElementById('insp-desc').textContent = activeDesc;

      // Renderizar píldoras de sub-gadgets si el artículo tiene varios componentes
      const subWrap = document.getElementById('insp-subgadgets-wrap');
      const subList = document.getElementById('insp-subgadgets-list');
      if (parentInfo.subGadgets && parentInfo.subGadgets.length > 0 && subWrap && subList) {
        subWrap.classList.remove('hidden');
        subList.innerHTML = '';

        const allBtn = document.createElement('button');
        allBtn.className = `subgadget-pill ${!this.selectedSubGadgetId ? 'active' : ''}`;
        allBtn.textContent = '📦 Kit Completo';
        allBtn.addEventListener('click', () => {
          this.selectedSubGadgetId = null;
          this.updateSelectionHighlight();
        });
        subList.appendChild(allBtn);

        parentInfo.subGadgets.forEach(sgId => {
          const sg = SUB_GADGETS_DB[sgId];
          if (!sg) return;
          const btn = document.createElement('button');
          btn.className = `subgadget-pill ${this.selectedSubGadgetId === sgId ? 'active' : ''}`;
          btn.textContent = sg.name.split(' (')[0].replace('Teclado ', '⌨️ ').replace('Mouse Ergonómico ', '🖱️ ').replace('Reloj Inteligente Pixel ', '🕒 ').replace('Mini Monitor ', '📺 ').replace('Monitor Principal ', '🖥️ ').replace('Monitor 24" ', '💻 ').replace('Tapete de Silicón Térmico y Magnético ', '🟦 ').replace('Cautín Inteligente USB-C ', '🔥 ').replace('Prototipo de Brazo Robótico + ', '🤖 ').replace('Gavetero Organizador de 12 Cajones ', '🗄️ ').replace('Estación de Carga ', '⚡ ').replace('Organizador de Pared Perforado ', '🧰 ').replace('Osciloscopio + Multímetro Digital ', '📟 ');
          btn.addEventListener('click', () => {
            this.selectedSubGadgetId = sgId;
            this.updateSelectionHighlight();
          });
          subList.appendChild(btn);
        });
      } else if (subWrap) {
        subWrap.classList.add('hidden');
      }

      // Renderizar links de compra directos dentro de la ficha 3D
      const linksBox = document.getElementById('insp-links-wrap');
      if (linksBox) {
        if (activeLinks && activeLinks.length > 0) {
          linksBox.innerHTML = activeLinks.map(lk => {
            const isAli = lk.url.includes('aliexpress.com');
            return `<a href="${lk.url}" target="_blank" rel="noopener noreferrer" class="opt-link-chip ${isAli ? 'aliexpress' : ''}">${isAli ? '🟠' : '🔗'} ${lk.label} ↗</a>`;
          }).join('');
          linksBox.classList.remove('hidden');
        } else {
          linksBox.innerHTML = '';
          linksBox.classList.add('hidden');
        }
      }

      inspector.classList.remove('hidden');
    }

    if (pinEl) {
      document.getElementById('pin-3d-name').textContent = activeTitle;
      document.getElementById('pin-3d-price').textContent = activePrice;
      pinEl.classList.remove('hidden');
      this.updateFloating3DPin();
    }
  }

  updateFloating3DPin() {
    const pinEl = document.getElementById('floating-3d-pin');
    if (!pinEl || !this.selectedId || pinEl.classList.contains('hidden')) return;

    const item = this.items.find(i => i.id === this.selectedId);
    const mesh = this.furnitureMeshes.get(this.selectedId);
    if (!item || !mesh || !this.container) {
      pinEl.classList.add('hidden');
      return;
    }

    const spec = CATALOG[item.type] || { h: 0.3 };
    const subInfo = this.selectedSubGadgetId ? SUB_GADGETS_DB[this.selectedSubGadgetId] : null;
    const anchorWorld = new THREE.Vector3();

    if (subInfo && subInfo.localOffset) {
      anchorWorld.set(...subInfo.localOffset);
      mesh.localToWorld(anchorWorld);
      anchorWorld.y += 0.08;
    } else {
      anchorWorld.set(item.x, (item.elevation || 0) + (spec.h || 0.3) * 0.85, item.z);
    }

    anchorWorld.project(this.camera);
    if (anchorWorld.z > 1) {
      pinEl.style.opacity = '0';
      return;
    }

    const w = this.container.clientWidth;
    const h = this.container.clientHeight;
    const px = (anchorWorld.x * 0.5 + 0.5) * w;
    const py = (-anchorWorld.y * 0.5 + 0.5) * h;

    pinEl.style.opacity = '1';
    pinEl.style.left = `${Math.max(70, Math.min(w - 70, px))}px`;
    pinEl.style.top = `${Math.max(58, Math.min(h - 55, py))}px`;
  }

  updateSmartWalls() {
    if (!this.wallGroups.north) return;
    const mode = this.room.wallMode;
    const camPos = this.camera.position;
    const { width: W, depth: D, height: H } = this.room;

    const insideRoom =
      this.navMode === 'walk' ||
      (Math.abs(camPos.x) < W / 2 - 0.02 && Math.abs(camPos.z) < D / 2 - 0.02 && camPos.y < H - 0.05);

    if (this.ceilingMesh) {
      this.ceilingMesh.visible = insideRoom && camPos.y < 1.85;
    }

    // Solo bajar una pared cuando la cámara está fuera del cuarto mirando hacia adentro
    const states = {
      north: mode === 'full' || insideRoom ? 1 : camPos.z < -D / 2 - 0.05 ? 0.06 : 1,
      south: mode === 'full' || insideRoom ? 1 : camPos.z > D / 2 + 0.05 ? 0.06 : 1,
      west:  mode === 'full' || insideRoom ? 1 : camPos.x < -W / 2 - 0.05 ? 0.06 : 1,
      east:  mode === 'full' || insideRoom ? 1 : camPos.x > W / 2 + 0.05 ? 0.06 : 1
    };

    Object.entries(states).forEach(([side, scaleY]) => {
      const grp = this.wallGroups[side];
      if (!grp) return;
      grp.scale.y = THREE.MathUtils.lerp(grp.scale.y, scaleY, 0.25);
    });

    // Ocultar automáticamente el respaldo de la silla cuando la cámara está en vista de cerca del escritorio
    const distToChair = Math.hypot(camPos.x - (-0.40), camPos.z - (-0.68));
    const hideChairForCloseUp = distToChair < 0.56 && camPos.y < 1.40;
    ['chair_1', 'upg_ds_3'].forEach(chairId => {
      const chairMesh = this.furnitureMeshes.get(chairId);
      if (chairMesh) {
        chairMesh.visible = !hideChairForCloseUp;
      }
    });
  }

  setupInteraction() {
    const dom = this.renderer.domElement;
    const hoverTip = document.getElementById('hover-3d-tooltip');
    let lastLookX = 0;
    let lastLookY = 0;
    let dragArmed = false;

    const getNormalizedPointer = (e) => {
      const rect = dom.getBoundingClientRect();
      this.pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    dom.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      this.pointerDownPos.set(e.clientX, e.clientY);
      lastLookX = e.clientX;
      lastLookY = e.clientY;
      dragArmed = false;

      getNormalizedPointer(e);
      this.raycaster.setFromCamera(this.pointer, this.camera);

      const hits = this.raycaster.intersectObjects(this.furnitureGroup.children, true);
      if (hits.length > 0) {
        let obj = hits[0].object;
        while (obj && !obj.userData?.isFurniture) {
          obj = obj.parent;
        }
        if (obj && obj.userData?.id) {
          this.selectedId = obj.userData.id;
          const localPt = obj.worldToLocal(hits[0].point.clone());
          this.selectedSubGadgetId = detectSubGadgetFromHit(obj.userData.type, localPt);
          this.updateSelectionHighlight();

          const item = this.items.find(i => i.id === obj.userData.id);
          const planeY = item?.elevation || 0;
          this.dragPlane.set(new THREE.Vector3(0, 1, 0), -planeY);

          const intersectPt = new THREE.Vector3();
          if (this.raycaster.ray.intersectPlane(this.dragPlane, intersectPt)) {
            this.dragOffset.subVectors(obj.position, intersectPt);
            dragArmed = true;
          }
          return;
        }
      }

      if (this.navMode === 'walk') {
        this.isLookingWalk = true;
      }
    });

    window.addEventListener('pointermove', (e) => {
      if (dragArmed && !this.isDragging && this.selectedId) {
        const moveDist = Math.hypot(e.clientX - this.pointerDownPos.x, e.clientY - this.pointerDownPos.y);
        if (moveDist > 6) {
          this.isDragging = true;
          if (this.navMode !== 'walk') this.controls.enabled = false;
          dom.style.cursor = 'grabbing';
          if (hoverTip) hoverTip.classList.add('hidden');
        }
      }

      if (this.isDragging && this.selectedId) {
        getNormalizedPointer(e);
        this.raycaster.setFromCamera(this.pointer, this.camera);

        const intersectPt = new THREE.Vector3();
        if (this.raycaster.ray.intersectPlane(this.dragPlane, intersectPt)) {
          const item = this.items.find(i => i.id === this.selectedId);
          const mesh = this.furnitureMeshes.get(this.selectedId);
          if (!item || !mesh) return;

          const halfW = this.room.width / 2 - 0.08;
          const halfD = this.room.depth / 2 - 0.08;

          let nx = Math.round((intersectPt.x + this.dragOffset.x) * 50) / 50;
          let nz = Math.round((intersectPt.z + this.dragOffset.z) * 50) / 50;
          nx = Math.max(-halfW, Math.min(halfW, nx));
          nz = Math.max(-halfD, Math.min(halfD, nz));

          item.x = nx;
          item.z = nz;
          mesh.position.x = nx;
          mesh.position.z = nz;
          this.updateSelectionHighlight();
        }
        return;
      }

      if (this.navMode === 'walk' && this.isLookingWalk) {
        const dx = e.clientX - lastLookX;
        const dy = e.clientY - lastLookY;
        lastLookX = e.clientX;
        lastLookY = e.clientY;
        this.walkYaw -= dx * 0.005;
        this.walkPitch = Math.max(-1.1, Math.min(1.1, this.walkPitch - dy * 0.005));
        return;
      }

      // Tooltip en vivo al pasar el mouse sobre cualquier artículo en 3D
      if (e.target === dom && !dragArmed) {
        getNormalizedPointer(e);
        this.raycaster.setFromCamera(this.pointer, this.camera);
        const hits = this.raycaster.intersectObjects(this.furnitureGroup.children, true);
        if (hits.length > 0) {
          let obj = hits[0].object;
          while (obj && !obj.userData?.isFurniture) {
            obj = obj.parent;
          }
          if (obj && obj.userData?.type) {
            const localPt = obj.worldToLocal(hits[0].point.clone());
            const subId = detectSubGadgetFromHit(obj.userData.type, localPt);
            const subObj = subId ? SUB_GADGETS_DB[subId] : null;
            const label = subObj ? `${subObj.name} · ${subObj.price}` : (obj.userData.name || obj.userData.type);

            dom.style.cursor = 'pointer';
            if (hoverTip && this.container) {
              const rect = this.container.getBoundingClientRect();
              hoverTip.textContent = `👆 Clic para ver: ${label}`;
              hoverTip.style.left = `${Math.min(rect.width - 230, Math.max(10, e.clientX - rect.left))}px`;
              hoverTip.style.top = `${Math.max(46, e.clientY - rect.top)}px`;
              hoverTip.classList.remove('hidden');
            }
            return;
          }
        }
      }
      if (!this.isDragging) dom.style.cursor = 'default';
      if (hoverTip) hoverTip.classList.add('hidden');
    });

    window.addEventListener('pointerup', (e) => {
      this.isLookingWalk = false;
      dragArmed = false;
      if (this.isDragging) {
        this.isDragging = false;
        if (this.navMode !== 'walk') this.controls.enabled = true;
        dom.style.cursor = 'default';
      } else {
        const dist = Math.hypot(e.clientX - this.pointerDownPos.x, e.clientY - this.pointerDownPos.y);
        if (dist < 4 && e.target === dom) {
          getNormalizedPointer(e);
          this.raycaster.setFromCamera(this.pointer, this.camera);
          const hits = this.raycaster.intersectObjects(this.furnitureGroup.children, true);
          if (hits.length === 0) {
            this.selectedId = null;
            this.selectedSubGadgetId = null;
            this.updateSelectionHighlight();
          }
        }
      }
    });
  }

  setupWalkControls() {
    window.addEventListener('keydown', (e) => {
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
      this.keysPressed[e.code] = true;
      if ((e.code === 'Delete' || e.code === 'Backspace') && this.selectedId) {
        this.deleteSelected();
      }
      if (e.code === 'KeyR' && this.selectedId) {
        this.rotateSelected(45);
      }
    });
    window.addEventListener('keyup', (e) => {
      this.keysPressed[e.code] = false;
    });
  }

  updateWalkMovement() {
    if (this.navMode !== 'walk') return;
    const speed = 0.032;
    const forward = new THREE.Vector3(Math.sin(this.walkYaw), 0, Math.cos(this.walkYaw)).normalize();
    const right = new THREE.Vector3(forward.z, 0, -forward.x).normalize();

    if (this.keysPressed['KeyW'] || this.keysPressed['ArrowUp']) this.camera.position.addScaledVector(forward, speed);
    if (this.keysPressed['KeyS'] || this.keysPressed['ArrowDown']) this.camera.position.addScaledVector(forward, -speed);
    if (this.keysPressed['KeyA'] || this.keysPressed['ArrowLeft']) this.camera.position.addScaledVector(right, speed);
    if (this.keysPressed['KeyD'] || this.keysPressed['ArrowRight']) this.camera.position.addScaledVector(right, -speed);

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

  rotateSelected(deltaDeg) {
    if (!this.selectedId) return;
    const item = this.items.find(i => i.id === this.selectedId);
    if (!item) return;
    item.rotY = (item.rotY || 0) + (deltaDeg * Math.PI) / 180;
    const mesh = this.furnitureMeshes.get(item.id);
    if (mesh) mesh.rotation.y = item.rotY;
    this.updateSelectionHighlight();
  }

  elevateSelected(deltaY) {
    if (!this.selectedId) return;
    const item = this.items.find(i => i.id === this.selectedId);
    if (!item) return;
    item.elevation = Math.max(0, Math.min(2.0, (item.elevation || 0) + deltaY));
    const mesh = this.furnitureMeshes.get(item.id);
    if (mesh) mesh.position.y = item.elevation;
    this.updateSelectionHighlight();
  }

  deleteSelected() {
    if (!this.selectedId) return;
    this.items = this.items.filter(i => i.id !== this.selectedId);
    this.selectedId = null;
    this.rebuildFurnitureMeshes();
  }

  // Presets de cámara y Zoom a Zonas Clave con transición suave
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

    const presets = {
      orbit_3d:      { pos: [-0.15, 2.22, 2.50],  target: [0, 0.82, -0.10],      fov: 50, wallMode: 'auto' },
      desk_front:    { pos: [-0.38, 1.04, -0.66], target: [-0.94, 0.90, -0.66],  fov: 38, wallMode: 'full' },
      desk_corner:   { pos: [-0.40, 1.10, -0.76], target: [-0.92, 0.96, -1.25],  fov: 36, wallMode: 'full' },
      desk_lab:      { pos: [-0.34, 1.12, -0.78], target: [-0.34, 0.82, -1.25],  fov: 36, wallMode: 'full' },
      desk_pegboard: { pos: [-0.28, 1.24, -0.28], target: [-1.08, 1.18, -0.28],  fov: 40, wallMode: 'full' },
      zoom_desk:     { pos: [-0.38, 1.04, -0.66], target: [-0.94, 0.90, -0.66],  fov: 38, wallMode: 'full' },
      zoom_lab:      { pos: [-0.34, 1.12, -0.78], target: [-0.34, 0.82, -1.25],  fov: 36, wallMode: 'full' },
      zoom_shelves:  { pos: [-0.28, 1.24, -0.28], target: [-1.08, 1.18, -0.28],  fov: 40, wallMode: 'full' },
      zoom_underbed: { pos: [-0.42, 0.56, 0.48],  target: [0.58, 0.22, 0.48],    fov: 45, wallMode: 'full' },
      zoom_soccer:   { pos: [-0.28, 1.80, 0.48],  target: [1.10, 1.80, 0.48],    fov: 46, wallMode: 'full' },
      top_2d:        { pos: [0, 4.35, 0.01],      target: [0, 0, 0],             fov: 42, wallMode: 'auto' }
    };

    const p = presets[viewId] || presets.orbit_3d;
    this.room.wallMode = p.wallMode;

    // Iniciar vuelo suave de cámara (Fly-To)
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

  updateBudgetUI() {
    let total = 0;
    let activeCount = 0;
    PRODUCT_ZONES.forEach(zone => {
      const chosenId = this.selectedZones[zone.id];
      const opt = zone.options.find(o => o.id === chosenId);
      if (opt && opt.price > 0) {
        total += opt.price;
        activeCount++;
      }
    });

    const priceEl = document.getElementById('budget-total-amount');
    const subEl = document.getElementById('budget-items-count');
    if (priceEl) priceEl.textContent = `$${total.toLocaleString('es-MX')} MXN`;
    if (subEl) subEl.textContent = `${activeCount} de 6 zonas personalizadas`;
  }

  initUI() {
    const comboBar = document.getElementById('quick-combos-bar');
    if (comboBar) {
      comboBar.innerHTML = '';
      Object.entries(QUICK_COMBOS).forEach(([id, combo]) => {
        const btn = document.createElement('button');
        btn.className = 'combo-pill';
        btn.dataset.comboId = id;
        btn.textContent = combo.name;
        btn.addEventListener('click', () => this.applyCombo(id));
        comboBar.appendChild(btn);
      });
    }

    this.renderZonesUI();
    this.renderFinishesUI();

    document.getElementById('btn-toggle-drawer-top')?.addEventListener('click', () => this.toggleDrawer());
    document.getElementById('btn-toggle-drawer-float')?.addEventListener('click', () => this.toggleDrawer());
    document.getElementById('btn-fullscreen')?.addEventListener('click', () => this.toggleFullscreen());

    document.addEventListener('fullscreenchange', () => {
      const fsBtn = document.getElementById('btn-fullscreen');
      if (!document.fullscreenElement && this.isTheaterFullscreen) {
        document.body.classList.remove('theater-fullscreen');
        this.isTheaterFullscreen = false;
        this.toggleDrawer(true);
        if (fsBtn) fsBtn.textContent = '⛶ Ver Cuarto en Pantalla Completa';
      }
      this.onResize();
    });

    const clutterSwitch = document.getElementById('switch-show-clutter');
    if (clutterSwitch) {
      clutterSwitch.addEventListener('change', (e) => {
        this.room.showClutter = e.target.checked;
        this.rebuildSceneFromZones();
      });
    }

    document.querySelectorAll('[data-cam-preset]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.setCameraPreset(btn.getAttribute('data-cam-preset'));
      });
    });

    document.getElementById('btn-close-inspector')?.addEventListener('click', () => {
      this.selectedId = null;
      this.selectedSubGadgetId = null;
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

    document.getElementById('btn-screenshot')?.addEventListener('click', () => {
      this.renderer.render(this.scene, this.camera);
      const link = document.createElement('a');
      link.download = `mi_cuarto_personalizado.png`;
      link.href = this.renderer.domElement.toDataURL('image/png');
      link.click();
    });

    this.syncUIState();
  }

  renderZonesUI() {
    const container = document.getElementById('zones-accordion-list');
    if (!container) return;
    container.innerHTML = '';

    PRODUCT_ZONES.forEach((zone, zIdx) => {
      const card = document.createElement('div');
      card.className = 'zone-card';
      card.innerHTML = `
        <div class="zone-header" data-zone-toggle="${zone.id}">
          <div>
            <div class="zone-title">${zone.title}</div>
            <div class="zone-current-choice" id="choice-label-${zone.id}">Seleccionando...</div>
          </div>
          <div class="zone-actions-right">
            <button class="zone-zoom-btn" data-zone-zoom="${zone.cameraPreset || 'orbit_3d'}" title="Hacer zoom 3D a esta zona">🔍 Zoom</button>
            <span class="zone-chevron">▾</span>
          </div>
        </div>
        <div class="zone-body ${zIdx > 2 ? 'collapsed' : ''}" id="zone-body-${zone.id}">
          <p class="zone-subtitle">${zone.subtitle}</p>
          <div class="options-grid" id="opts-${zone.id}"></div>
        </div>
      `;

      const headerEl = card.querySelector('.zone-header');
      headerEl.addEventListener('click', (e) => {
        if (e.target.closest('.zone-zoom-btn')) return;
        const body = card.querySelector('.zone-body');
        body.classList.toggle('collapsed');
      });

      const zoomBtn = card.querySelector('.zone-zoom-btn');
      zoomBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.setCameraPreset(zone.cameraPreset || 'orbit_3d');
      });

      const optsBox = card.querySelector(`#opts-${zone.id}`);
      zone.options.forEach(opt => {
        const optCard = document.createElement('div');
        optCard.className = 'option-card';
        optCard.dataset.zoneId = zone.id;
        optCard.dataset.optId = opt.id;

        const linksHtml = (opt.links && opt.links.length > 0)
          ? `<div class="opt-links">
              ${opt.links.map(lk => {
                const isAli = lk.url.includes('aliexpress.com');
                return `<a href="${lk.url}" target="_blank" rel="noopener noreferrer" class="opt-link-chip ${isAli ? 'aliexpress' : ''}">${isAli ? '🟠' : '🔗'} ${lk.label} ↗</a>`;
              }).join('')}
            </div>`
          : '';

        optCard.innerHTML = `
          <div class="opt-top">
            <span class="opt-name">${opt.name}</span>
            <span class="opt-price">${opt.price === 0 ? 'Actual' : '$' + opt.price.toLocaleString('es-MX')}</span>
          </div>
          ${opt.dims !== '-' ? `<div class="opt-meta">${opt.dims} · <strong>${opt.store}</strong></div>` : ''}
          <div class="opt-desc">${opt.desc}</div>
          ${linksHtml}
        `;

        optCard.addEventListener('click', () => {
          this.selectZoneOption(zone.id, opt.id);
        });
        optsBox.appendChild(optCard);
      });

      container.appendChild(card);
    });
  }

  renderFinishesUI() {
    const ledBox = document.getElementById('led-colors-row');
    if (ledBox) {
      ledBox.innerHTML = '';
      LED_COLORS.forEach(led => {
        const btn = document.createElement('button');
        btn.className = 'color-pill';
        btn.dataset.ledId = led.id;
        btn.innerHTML = `<i style="background:${led.css}"></i><span>${led.name}</span>`;
        btn.addEventListener('click', () => {
          this.room.ledColorMode = led.id;
          this.buildArchitecture();
          this.rebuildFurnitureMeshes();
          this.syncUIState();
        });
        ledBox.appendChild(btn);
      });
    }

    const wallBox = document.getElementById('wall-palettes-row');
    if (wallBox) {
      wallBox.innerHTML = '';
      WALL_PALETTES.forEach(pal => {
        const btn = document.createElement('button');
        btn.className = 'color-pill';
        btn.innerHTML = `<i style="background:${pal.accent}"></i><span>${pal.name}</span>`;
        btn.addEventListener('click', () => {
          this.room.wallColor = pal.wall;
          this.room.accentColor = pal.accent;
          this.room.accentWall = pal.accentWall;
          this.buildArchitecture();
        });
        wallBox.appendChild(btn);
      });
    }

    const bedBox = document.getElementById('bedding-themes-row');
    if (bedBox) {
      bedBox.innerHTML = '';
      BEDDING_THEMES.forEach(b => {
        const btn = document.createElement('button');
        btn.className = 'color-pill';
        btn.innerHTML = `<i style="background:${b.primary}"></i><span>${b.name}</span>`;
        btn.addEventListener('click', () => {
          this.room.beddingTheme = b.id;
          this.rebuildFurnitureMeshes();
        });
        bedBox.appendChild(btn);
      });
    }

    const floorBox = document.getElementById('floor-types-row');
    if (floorBox) {
      floorBox.innerHTML = '';
      const floors = [
        { id: 'dark_wood_tile', name: 'Cerámica Gris Veteada (Actual)', color: '#4a4e54' },
        { id: 'light_oak', name: 'Madera Roble Nórdico Claro', color: '#c2ab8b' }
      ];
      floors.forEach(fl => {
        const btn = document.createElement('button');
        btn.className = 'color-pill';
        btn.innerHTML = `<i style="background:${fl.color}"></i><span>${fl.name}</span>`;
        btn.addEventListener('click', () => {
          this.room.floorType = fl.id;
          this.buildArchitecture();
        });
        floorBox.appendChild(btn);
      });
    }
  }

  syncUIState() {
    document.querySelectorAll('.combo-pill').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.comboId === this.activeComboId);
    });

    const clutterSwitch = document.getElementById('switch-show-clutter');
    if (clutterSwitch) clutterSwitch.checked = !!this.room.showClutter;

    PRODUCT_ZONES.forEach(zone => {
      const activeOptId = this.selectedZones[zone.id] || 'none';
      const activeOpt = zone.options.find(o => o.id === activeOptId);
      const labelEl = document.getElementById(`choice-label-${zone.id}`);
      if (labelEl && activeOpt) {
        labelEl.textContent = activeOpt.name;
      }

      document.querySelectorAll(`.option-card[data-zone-id="${zone.id}"]`).forEach(card => {
        card.classList.toggle('selected', card.dataset.optId === activeOptId);
      });
    });

    document.querySelectorAll('[data-led-id]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.ledId === this.room.ledColorMode);
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    if (this.camAnim) {
      this.camAnim.progress = Math.min(1, this.camAnim.progress + 0.06);
      const t = 1 - Math.pow(1 - this.camAnim.progress, 3); // Ease-out cubic
      this.camera.position.lerpVectors(this.camAnim.startPos, this.camAnim.endPos, t);
      this.controls.target.lerpVectors(this.camAnim.startTarget, this.camAnim.endTarget, t);
      this.camera.fov = THREE.MathUtils.lerp(this.camAnim.startFov, this.camAnim.endFov, t);
      this.camera.updateProjectionMatrix();
      this.controls.update();
      if (this.camAnim.progress >= 1) {
        this.camAnim = null;
      }
    } else if (this.navMode === 'walk') {
      this.updateWalkMovement();
    } else {
      this.controls.update();
    }

    this.updateSmartWalls();
    this.updateFloating3DPin();
    this.renderer.render(this.scene, this.camera);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.roomApp = new RoomSimulatorApp();
});
