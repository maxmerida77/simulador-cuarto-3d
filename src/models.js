import * as THREE from 'three';
import { CATALOG, BEDDING_THEMES, LED_COLORS } from './data.js';

// ============================================================================
// MAPA DE ENTORNO PROCEDURAL (HDRI STUDIO) Y TEXTURAS PBR DE ALTA DEFINICIÓN
// ============================================================================

export function createStudioEnvironment() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createLinearGradient(0, 0, 0, 256);
  grad.addColorStop(0, '#334155');
  grad.addColorStop(0.45, '#1e293b');
  grad.addColorStop(0.5, '#0f172a');
  grad.addColorStop(1, '#090d14');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 256);

  ctx.fillStyle = 'rgba(255, 247, 237, 0.65)';
  ctx.fillRect(60, 20, 140, 45);
  ctx.fillStyle = 'rgba(56, 189, 248, 0.35)';
  ctx.fillRect(280, 35, 160, 50);

  const tex = new THREE.CanvasTexture(canvas);
  tex.mapping = THREE.EquirectangularReflectionMapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function createFloorTexture(floorType = 'dark_wood_tile') {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  const isLight = floorType === 'light_oak';
  ctx.fillStyle = isLight ? '#c2ab8b' : '#4a4e54';
  ctx.fillRect(0, 0, 1024, 1024);

  const cols = 4;
  const rows = 14;
  const w = canvas.width / cols;
  const h = canvas.height / rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const offset = (r % 2) * (w * 0.5);
      const x = (c * w + offset) % canvas.width;
      const y = r * h;

      const shade = (Math.sin(r * 3.1 + c * 1.7) * 8) | 0;
      const baseR = (isLight ? 188 : 74) + shade;
      const baseG = (isLight ? 165 : 78) + shade;
      const baseB = (isLight ? 132 : 84) + shade;

      ctx.fillStyle = `rgb(${baseR},${baseG},${baseB})`;
      ctx.fillRect(x, y, w - 3, h - 3);

      ctx.fillStyle = isLight ? 'rgba(95,70,45,0.10)' : 'rgba(20,22,26,0.22)';
      for (let i = 0; i < 12; i++) {
        const gy = y + ((i * 7 + r * 3) % (h - 6));
        ctx.fillRect(x + 2, gy, w - 7, 1.5);
      }

      ctx.strokeStyle = 'rgba(15, 18, 24, 0.55)';
      ctx.lineWidth = 2.5;
      ctx.strokeRect(x, y, w - 2, h - 2);
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2.4, 3.0);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createWoodGrainTexture(baseHex, lineRgba) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = baseHex;
  ctx.fillRect(0, 0, 256, 256);
  ctx.fillStyle = lineRgba;
  for (let i = 0; i < 70; i++) {
    const y = (i * 3.7) % 256;
    ctx.fillRect(0, y, 256, 1 + (i % 2));
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createQuiltedFabricTexture(baseHex) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = baseHex;
  ctx.fillRect(0, 0, 256, 256);
  ctx.strokeStyle = 'rgba(0,0,0,0.28)';
  ctx.lineWidth = 2;
  const step = 64;
  for (let x = 0; x <= 256; x += step) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 256); ctx.stroke();
  }
  for (let y = 0; y <= 256; y += step) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(256, y); ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 4);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function createZebraBlindTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  const stripes = 14;
  const sh = canvas.height / stripes;
  for (let i = 0; i < stripes; i++) {
    if (i % 2 === 0) {
      ctx.fillStyle = '#6c727c';
      ctx.fillRect(0, i * sh, 512, sh);
    } else {
      ctx.fillStyle = '#a6b0be';
      ctx.fillRect(0, i * sh, 512, sh);
      ctx.fillStyle = 'rgba(255,255,255,0.38)';
      for (let y = i * sh; y < (i + 1) * sh; y += 4) {
        ctx.fillRect(0, y, 512, 1.5);
      }
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function createSoccerBallTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, 0, 256, 256);

  ctx.fillStyle = '#111827';
  const pts = [
    [64, 64], [192, 64], [128, 128], [64, 192], [192, 192], [128, 24], [24, 128], [232, 128]
  ];
  pts.forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x, y, 24, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 3;
  pts.forEach(([x, y]) => {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(128, 128);
    ctx.stroke();
  });

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createSoccerScarfTexture(variant = 'celeste') {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 160;
  const ctx = canvas.getContext('2d');

  if (variant === 'celeste') {
    ctx.fillStyle = '#0284c7';
    ctx.fillRect(0, 0, 1024, 160);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(90, 14, 844, 132);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(90, 14, 844, 18);
    ctx.fillRect(90, 128, 844, 18);
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(110, 14, 28, 132);
    ctx.fillRect(886, 14, 28, 132);
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath(); ctx.arc(195, 80, 34, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(829, 80, 34, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 52px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('★  LA MÁQUINA / CAMPEÓN  ★', 512, 98);
  } else if (variant === 'champions') {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, 1024, 160);
    ctx.fillStyle = '#1e3a8a';
    ctx.fillRect(90, 16, 844, 128);
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 8;
    ctx.strokeRect(96, 22, 832, 116);
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 48px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('★ ★ ★  CHAMPIONS  ★ ★ ★', 512, 97);
  } else {
    ctx.fillStyle = '#111827';
    ctx.fillRect(0, 0, 1024, 160);
    ctx.fillStyle = '#dc2626';
    ctx.fillRect(90, 20, 844, 120);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(90, 20, 844, 14);
    ctx.fillRect(90, 126, 844, 14);
    ctx.font = 'bold 48px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('MATCHDAY  ·  ESTADIO', 512, 97);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createTufBoxTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#b68e56';
  ctx.fillRect(0, 0, 512, 256);
  ctx.fillStyle = '#22252a';
  ctx.font = 'bold 48px sans-serif';
  ctx.fillText('TUF GAMING F15', 36, 110);
  ctx.fillStyle = '#374151';
  ctx.fillRect(36, 140, 290, 65);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createYellowBlanketTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 384;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#dfd09f';
  ctx.fillRect(0, 0, 512, 384);
  ctx.fillStyle = '#eee6cb';
  ctx.fillRect(55, 30, 402, 230);
  ctx.strokeStyle = '#b89446';
  ctx.lineWidth = 6;
  ctx.strokeRect(55, 30, 402, 230);
  ctx.fillStyle = '#c28e38';
  ctx.beginPath();
  ctx.arc(210, 60, 22, 0, Math.PI * 2);
  ctx.arc(305, 65, 18, 0, Math.PI * 2);
  ctx.fill();
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createKaisiMatTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 360;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#1e3a5f';
  ctx.fillRect(0, 0, 512, 360);

  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 3;
  ctx.strokeRect(10, 10, 492, 340);

  for (let i = 0; i < 8; i++) {
    ctx.fillStyle = '#152a47';
    ctx.fillRect(20 + i * 58, 18, 50, 42);
    ctx.strokeRect(20 + i * 58, 18, 50, 42);
  }

  ctx.strokeStyle = 'rgba(148, 163, 184, 0.25)';
  ctx.lineWidth = 1;
  for (let x = 24; x < 488; x += 24) {
    ctx.beginPath(); ctx.moveTo(x, 72); ctx.lineTo(x, 336); ctx.stroke();
  }
  for (let y = 72; y < 336; y += 24) {
    ctx.beginPath(); ctx.moveTo(24, y); ctx.lineTo(488, y); ctx.stroke();
  }

  ctx.fillStyle = '#93c5fd';
  ctx.font = 'bold 14px monospace';
  ctx.fillText('KAISI S-160  500°C HEAT RESISTANT SILICONE MAT', 26, 332);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function createMonitorScreenTexture(mode = 'setup') {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 576;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createLinearGradient(0, 0, 1024, 576);
  grad.addColorStop(0, '#090f1d');
  grad.addColorStop(0.5, '#111c32');
  grad.addColorStop(1, '#060a12');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 576);

  if (mode === 'tv') {
    const pitchGrad = ctx.createLinearGradient(0, 80, 0, 520);
    pitchGrad.addColorStop(0, '#0f172a');
    pitchGrad.addColorStop(0.35, '#14532d');
    pitchGrad.addColorStop(1, '#166534');
    ctx.fillStyle = pitchGrad;
    ctx.fillRect(28, 28, 968, 520);
    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.lineWidth = 5;
    ctx.strokeRect(90, 180, 844, 310);
    ctx.beginPath();
    ctx.arc(512, 335, 75, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
    ctx.fillRect(68, 56, 290, 52);
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 26px sans-serif';
    ctx.fillText('UCL  2 - 1  84:12', 88, 91);
  } else if (mode === 'vertical_code') {
    ctx.fillStyle = '#0b1120';
    ctx.fillRect(20, 20, 984, 536);
    const colors = ['#38bdf8', '#f59e0b', '#a855f7', '#4ade80', '#94a3b8'];
    for (let i = 0; i < 20; i++) {
      ctx.fillStyle = colors[i % colors.length];
      ctx.fillRect(50 + (i % 4) * 28, 45 + i * 24, 180 + (i % 5) * 90, 11);
    }
  } else {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(28, 28, 610, 520);
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(56, 62, 190, 14);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(56, 96, 310, 14);
    ctx.fillStyle = '#a855f7';
    ctx.fillRect(88, 130, 240, 14);
    ctx.fillStyle = '#94a3b8';
    for (let i = 0; i < 11; i++) {
      ctx.fillRect(56 + (i % 3) * 26, 170 + i * 31, 220 + (i % 4) * 65, 10);
    }
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(660, 28, 336, 520);
    ctx.strokeStyle = '#22c55e';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(828, 220, 76, 0, Math.PI * 1.7);
    ctx.stroke();
    ctx.fillStyle = '#4ade80';
    ctx.font = 'bold 28px monospace';
    ctx.fillText('ESP32 READY', 735, 385);
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 22px monospace';
    ctx.fillText('BUILD PASS ✓', 745, 435);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function box(w, h, d, mat, x = 0, y = 0, z = 0, castShadow = true) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  mesh.position.set(x, y, z);
  mesh.castShadow = castShadow;
  mesh.receiveShadow = true;
  return mesh;
}

function cyl(rt, rb, h, segs, mat, x = 0, y = 0, z = 0) {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, segs), mat);
  mesh.position.set(x, y, z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function addLogitechMxKeysMini(group, darkMetal, chromeMat) {
  const chassisMat = new THREE.MeshStandardMaterial({ color: 0x2b303a, roughness: 0.38, metalness: 0.45 });
  const keyMat = new THREE.MeshStandardMaterial({
    color: 0x17191f,
    roughness: 0.42,
    emissive: new THREE.Color(0xe2e8f0),
    emissiveIntensity: 0.18
  });

  group.add(box(0.132, 0.012, 0.296, chassisMat, 0.075, 0.010, 0.04));
  group.add(cyl(0.008, 0.008, 0.296, 14, chromeMat, 0.014, 0.015, 0.04).rotateX(Math.PI / 2));
  group.add(box(0.104, 0.005, 0.282, keyMat, 0.084, 0.017, 0.04));

  const mouseGroup = new THREE.Group();
  mouseGroup.position.set(0.075, 0.006, -0.18);
  mouseGroup.add(box(0.115, 0.036, 0.074, chassisMat, 0, 0.018, 0));
  mouseGroup.add(cyl(0.009, 0.009, 0.014, 14, chromeMat, -0.032, 0.035, 0));
  group.add(mouseGroup);

  const ulanzi = new THREE.Group();
  ulanzi.position.set(-0.045, 0.036, 0.04);
  ulanzi.add(box(0.032, 0.066, 0.195, darkMetal, 0, 0, 0));
  ulanzi.add(box(0.004, 0.050, 0.178, new THREE.MeshBasicMaterial({ color: 0x080c14 }), 0.015, 0, 0));
  ulanzi.add(box(0.005, 0.022, 0.088, new THREE.MeshBasicMaterial({ color: 0x38bdf8 }), 0.016, 0.002, 0.025));
  ulanzi.add(box(0.005, 0.018, 0.032, new THREE.MeshBasicMaterial({ color: 0x22c55e }), 0.016, 0.002, -0.052));
  group.add(ulanzi);

  const geek = new THREE.Group();
  geek.position.set(-0.04, 0.026, -0.19);
  geek.rotation.y = -0.25;
  geek.add(box(0.042, 0.048, 0.045, darkMetal, 0, 0, 0));
  geek.add(box(0.004, 0.036, 0.036, new THREE.MeshBasicMaterial({ color: 0xf59e0b }), 0.020, 0.002, 0));
  group.add(geek);
}

// Helper: Dibuja una bufanda de fútbol tejida con flecos en los extremos montada en la pared de la 2da litera
function addMountedScarf(group, yCenter, scarfLen, scarfH, tex, fringeColor, darkMetal) {
  const scarfMat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.78 });
  const fringeMat = new THREE.MeshStandardMaterial({ color: fringeColor, roughness: 0.85 });

  // Cuerpo tejido de la bufanda (orientado a lo largo del eje Z de la pared de la litera, mirando hacia -X)
  group.add(box(0.014, scarfH, scarfLen, scarfMat, 0, yCenter, 0));

  // Flecos tejidos en ambos extremos (-Z y +Z)
  [-scarfLen / 2 - 0.032, scarfLen / 2 + 0.032].forEach((fz) => {
    for (let i = 0; i < 6; i++) {
      const fy = yCenter - scarfH * 0.38 + i * (scarfH * 0.15);
      group.add(box(0.010, 0.014, 0.058, fringeMat, 0, fy, fz));
    }
  });

  // Clips discretos negros sujetando las esquinas superiores de la bufanda
  group.add(box(0.022, 0.024, 0.024, darkMetal, -0.004, yCenter + scarfH / 2, -scarfLen * 0.42));
  group.add(box(0.022, 0.024, 0.024, darkMetal, -0.004, yCenter + scarfH / 2, scarfLen * 0.42));
}

const sharedBallTex = createSoccerBallTexture();
const sharedBlackWoodTex = createWoodGrainTexture('#191c22', 'rgba(255,255,255,0.03)');
const sharedGrayWoodTex = createWoodGrainTexture('#525761', 'rgba(20,24,30,0.12)');
const sharedWalnutTex = createWoodGrainTexture('#7c5134', 'rgba(35,20,10,0.22)');
const sharedKaisiTex = createKaisiMatTexture();
const sharedSetupScrTex = createMonitorScreenTexture('setup');
const sharedVertScrTex = createMonitorScreenTexture('vertical_code');
const sharedTvScrTex = createMonitorScreenTexture('tv');
const sharedScarfCeleste = createSoccerScarfTexture('celeste');
const sharedScarfChampions = createSoccerScarfTexture('champions');
const sharedScarfRed = createSoccerScarfTexture('red');

export function buildFurnitureMesh(itemData, roomState) {
  const spec = CATALOG[itemData.type];
  if (!spec) return new THREE.Group();

  const w = itemData.w || spec.w;
  const d = itemData.d || spec.d;
  const h = itemData.h || spec.h;

  const group = new THREE.Group();
  group.userData = {
    isFurniture: true,
    id: itemData.id,
    type: itemData.type,
    name: spec.name,
    w, d, h
  };

  const bedding = BEDDING_THEMES.find(b => b.id === roomState.beddingTheme) || BEDDING_THEMES[0];
  const ledColorObj = LED_COLORS.find(l => l.id === roomState.ledColorMode) || LED_COLORS[0];
  const activeLedHex = ledColorObj.hex;

  const darkMetal = new THREE.MeshStandardMaterial({ color: 0x1c1f26, roughness: 0.30, metalness: 0.75 });
  const blackMelamine = new THREE.MeshStandardMaterial({ map: sharedBlackWoodTex, roughness: 0.46, metalness: 0.12 });
  const grayMelamine = new THREE.MeshStandardMaterial({ map: sharedGrayWoodTex, roughness: 0.48, metalness: 0.10 });
  const darkGrayMelamine = new THREE.MeshStandardMaterial({ color: 0x343842, roughness: 0.48, metalness: 0.12 });
  const walnutWood = new THREE.MeshStandardMaterial({ map: sharedWalnutTex, roughness: 0.42, metalness: 0.08 });
  const chromeMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.14, metalness: 0.92 });
  const ballMat = new THREE.MeshStandardMaterial({ map: sharedBallTex, roughness: 0.32 });

  switch (itemData.type) {
    // ========================================================================
    // MUEBLES BASE ACTUALES (CALIBRADOS SIN TRASLAPE)
    // ========================================================================
    case 'l_desk': {
      const deskH = h;
      const leftWingW = 0.48;
      const topWingD = 0.45;
      const leftX = -w / 2 + leftWingW / 2;
      group.add(box(leftWingW, 0.03, d, blackMelamine, leftX, deskH - 0.015, 0));

      const topZ = -d / 2 + topWingD / 2;
      group.add(box(w, 0.03, topWingD, blackMelamine, 0, deskH - 0.015, topZ));

      group.add(box(0.38, 0.13, 0.38, blackMelamine, -w / 2 + 0.21, deskH + 0.065, -d / 2 + 0.21));
      group.add(box(leftWingW - 0.02, deskH - 0.03, 0.03, blackMelamine, leftX, (deskH - 0.03) / 2, d / 2 - 0.02));
      group.add(box(0.03, deskH - 0.03, d - 0.04, blackMelamine, -w / 2 + 0.02, (deskH - 0.03) / 2, 0));

      const shelfW = 0.32;
      const rightX = w / 2 - shelfW / 2;
      group.add(box(shelfW, deskH - 0.03, topWingD - 0.02, blackMelamine, rightX, (deskH - 0.03) / 2, topZ));
      const bookMat = new THREE.MeshStandardMaterial({ color: 0xe5e7eb, roughness: 0.7 });
      group.add(box(shelfW - 0.05, 0.08, topWingD - 0.06, bookMat, rightX, 0.56, topZ + 0.02));
      group.add(box(shelfW - 0.05, 0.06, topWingD - 0.06, bookMat, rightX, 0.16, topZ + 0.02));
      break;
    }

    case 'tv_wall': {
      group.add(box(0.05, 0.18, 0.24, darkMetal, -w / 2 + 0.025, h / 2, 0));
      group.add(box(0.035, h, d, blackMelamine, 0.02, h / 2, 0));
      const scrMat = new THREE.MeshBasicMaterial({ map: sharedTvScrTex });
      group.add(box(0.008, h - 0.035, d - 0.035, scrMat, 0.04, h / 2, 0));
      break;
    }

    case 'gray_closet': {
      const maleteroH = 0.42;
      const bodyH = h - maleteroH;
      const leftW = w * 0.44;
      const rightW = w - leftW;

      group.add(box(w, bodyH, d - 0.03, grayMelamine, 0, bodyH / 2, -0.015));
      group.add(box(w + 0.02, maleteroH, d + 0.02, grayMelamine, 0, bodyH + maleteroH / 2, 0));
      group.add(box(0.012, maleteroH - 0.04, 0.02, darkMetal, 0, bodyH + maleteroH / 2, d / 2 + 0.01));

      const leftX = -w / 2 + leftW / 2;
      for (let i = 0; i < 3; i++) {
        const dy = 0.28 + i * 0.25;
        const isOpen = roomState.showClutter && i === 2;
        const dFront = box(leftW - 0.03, 0.22, 0.03, darkGrayMelamine, leftX, dy, d / 2 - 0.01 + (isOpen ? 0.04 : 0));
        if (isOpen) dFront.rotation.x = 0.10;
        group.add(dFront);
        group.add(box(0.14, 0.015, 0.025, chromeMat, leftX, dy, d / 2 + 0.015 + (isOpen ? 0.04 : 0)));
      }

      const nicheDark = new THREE.MeshStandardMaterial({ color: 0x202329, roughness: 0.85 });
      group.add(box(leftW - 0.05, 0.68, 0.04, nicheDark, leftX, 1.32, d / 2 - 0.015));
      group.add(box(leftW - 0.03, 0.025, 0.10, grayMelamine, leftX, 1.32, d / 2 - 0.01));
      group.add(cyl(0.05, 0.05, 0.22, 12, darkMetal, leftX + 0.12, 1.44, d / 2 - 0.01));
      group.add(box(0.20, 0.09, 0.16, new THREE.MeshStandardMaterial({ color: 0xdc2626 }), leftX - 0.10, 1.38, d / 2 - 0.01));

      const rightX = w / 2 - rightW / 2;
      group.add(box(rightW - 0.02, bodyH - 0.04, 0.03, grayMelamine, rightX, bodyH / 2, d / 2 - 0.01));
      if (roomState.showClutter) {
        group.add(box(0.025, 0.48, 0.015, new THREE.MeshStandardMaterial({ color: 0x991b1b }), rightX - rightW / 2 + 0.05, 1.48, d / 2 + 0.01));
      }
      break;
    }

    case 'bunk_bed': {
      const postR = 0.026;
      const px = w / 2 - postR;
      const pz = d / 2 - postR;

      [[-px, -pz], [px, -pz], [-px, pz], [px, pz]].forEach(([x, z]) => {
        group.add(cyl(postR, postR, h, 16, darkMetal, x, h / 2, z));
      });

      const quiltTex = createQuiltedFabricTexture(bedding.primary);
      const mattMat = new THREE.MeshStandardMaterial({ map: quiltTex, roughness: 0.78 });
      const sheetMat = new THREE.MeshStandardMaterial({ color: bedding.secondary, roughness: 0.72 });
      const pilMat = new THREE.MeshStandardMaterial({ color: bedding.pillow, roughness: 0.72 });

      const levels = [0.30, 1.32];
      levels.forEach((ly) => {
        group.add(box(0.035, 0.055, d, darkMetal, -w / 2 + 0.02, ly, 0));
        group.add(box(0.035, 0.055, d, darkMetal, w / 2 - 0.02, ly, 0));
        group.add(box(w, 0.055, 0.035, darkMetal, 0, ly, -d / 2 + 0.02));
        group.add(box(w, 0.055, 0.035, darkMetal, 0, ly, d / 2 - 0.02));

        group.add(box(w - 0.06, 0.22, d - 0.06, mattMat, 0, ly + 0.12, 0));

        if (roomState.beddingTheme !== 'black_current') {
          group.add(box(w - 0.05, 0.23, 0.44, sheetMat, 0, ly + 0.125, d / 2 - 0.28));
        }

        group.add(box(0.54, 0.11, 0.32, pilMat, 0, ly + 0.26, d / 2 - 0.24));
      });

      for (let b = 0; b < 3; b++) {
        group.add(box(w - 0.06, 0.02, 0.02, darkMetal, 0, 0.54 + b * 0.13, -d / 2 + 0.02));
        group.add(box(w - 0.06, 0.02, 0.02, darkMetal, 0, 0.54 + b * 0.13, d / 2 - 0.02));
      }
      group.add(box(0.32, 0.18, 0.42, blackMelamine, -0.10, 1.16, -d / 2 + 0.32));
      break;
    }

    case 'mirror_cabinet': {
      group.add(box(w - 0.08, h - 0.10, d, blackMelamine, -0.04, (h - 0.10) / 2, 0));
      group.add(box(w + 0.04, 0.10, d + 0.02, blackMelamine, 0.02, h - 0.05, 0));
      group.add(cyl(0.045, 0.045, 0.01, 16, new THREE.MeshBasicMaterial({ color: 0xffffff }), 0.06, h - 0.101, 0));
      const mirrorGlass = new THREE.MeshStandardMaterial({
        color: 0xe2e8f0,
        metalness: 0.96,
        roughness: 0.04
      });
      group.add(box(0.015, h - 0.14, d - 0.05, mirrorGlass, w / 2 - 0.03, (h - 0.10) / 2, 0));
      break;
    }

    case 'current_chair': {
      [[-0.18, -0.18], [0.18, -0.18], [-0.18, 0.18], [0.18, 0.18]].forEach(([x, z]) => {
        group.add(cyl(0.018, 0.015, 0.44, 10, darkMetal, x, 0.22, z));
      });
      const seatMat = new THREE.MeshStandardMaterial({ color: 0xd6cbb5, roughness: 0.8 });
      group.add(box(0.44, 0.06, 0.44, seatMat, 0, 0.45, 0));
      group.add(box(0.42, 0.42, 0.06, seatMat, 0, 0.68, -0.19));
      const towelMat = new THREE.MeshStandardMaterial({ color: 0x5c3a2e, roughness: 0.9 });
      group.add(box(0.46, 0.48, 0.10, towelMat, 0, 0.66, -0.19));
      break;
    }

    case 'closet_organizer_bin': {
      group.add(box(w, 0.22, d, grayMelamine, 0, h - 0.14, 0));
      group.add(cyl(0.012, 0.012, h - 0.22, 8, chromeMat, -w / 2 + 0.03, (h - 0.22) / 2, -d / 2 + 0.03));
      group.add(cyl(0.012, 0.012, h - 0.22, 8, chromeMat, w / 2 - 0.03, (h - 0.22) / 2, -d / 2 + 0.03));
      group.add(box(w * 0.75, 0.08, d * 0.75, blackMelamine, 0, h + 0.02, 0));
      break;
    }

    // ========================================================================
    // OBJETOS DE DESORDEN DE LAS FOTOS
    // ========================================================================
    case 'clutter_tv_blanket': {
      const blanketMat = new THREE.MeshStandardMaterial({ map: createYellowBlanketTexture(), roughness: 0.92 });
      const mainCloth = box(0.11, h, d, blanketMat, 0.02, h / 2 + 0.02, 0);
      mainCloth.rotation.x = 0.03;
      group.add(mainCloth);
      break;
    }

    case 'clutter_desk_items': {
      const deskH = 0.75;
      const leftX = -w / 2 + 0.22;
      const topZ = -d / 2 + 0.22;
      const rightX = w / 2 - 0.16;

      group.add(cyl(0.042, 0.032, 0.19, 14, new THREE.MeshStandardMaterial({ color: 0x9ca3af }), leftX + 0.06, deskH + 0.095, d / 2 - 0.22));
      group.add(box(0.05, 0.12, 0.035, blackMelamine, leftX + 0.12, deskH + 0.06, d / 2 - 0.16));
      group.add(box(0.28, 0.07, 0.24, new THREE.MeshStandardMaterial({ color: 0xf3f4f6 }), -w / 2 + 0.24, deskH + 0.165, -d / 2 + 0.24));
      group.add(box(0.20, 0.09, 0.18, blackMelamine, -w / 2 + 0.22, deskH + 0.24, -d / 2 + 0.22));

      const waterMat = new THREE.MeshStandardMaterial({ color: 0xdbeafe, transparent: true, opacity: 0.65 });
      group.add(cyl(0.042, 0.042, 0.26, 14, waterMat, 0.08, deskH + 0.13, topZ - 0.04));
      group.add(cyl(0.04, 0.03, 0.15, 14, new THREE.MeshStandardMaterial({ color: 0x1d4ed8 }), rightX - 0.12, deskH + 0.075, topZ + 0.04));
      group.add(cyl(0.038, 0.038, 0.24, 14, darkMetal, rightX + 0.02, deskH + 0.12, topZ + 0.04));

      const bagMat = new THREE.MeshStandardMaterial({ color: 0x141619, roughness: 0.3 });
      const b1 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.17, 1), bagMat);
      b1.position.set(leftX + 0.04, 0.15, 0.32);
      group.add(b1);
      const b2 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.16, 1), bagMat);
      b2.position.set(leftX + 0.08, 0.15, -0.05);
      group.add(b2);
      break;
    }

    case 'clutter_bunk_items': {
      const jacketMat = new THREE.MeshStandardMaterial({ color: 0x16181d, roughness: 0.82 });
      group.add(box(0.26, 0.88, 0.28, jacketMat, -w / 2 - 0.02, 1.15, -d / 2 + 0.08));

      const ball = new THREE.Mesh(new THREE.SphereGeometry(0.11, 18, 18), ballMat);
      ball.position.set(w / 2 - 0.24, 0.74, d / 2 - 0.08);
      group.add(ball);

      const shirtMat = new THREE.MeshStandardMaterial({ color: 0x60a5fa, roughness: 0.85 });
      const shirt = box(0.38, 0.03, 0.44, shirtMat, -0.14, 0.44, 0.25);
      shirt.rotation.y = 0.28;
      group.add(shirt);

      const can = cyl(0.038, 0.038, 0.18, 12, new THREE.MeshStandardMaterial({ color: 0xdc2626 }), 0.12, 0.45, 0.48);
      can.rotation.z = 1.25;
      group.add(can);

      group.add(box(0.22, 0.04, 0.10, blackMelamine, -w / 2 - 0.06, 0.02, -0.18));
      group.add(box(0.24, 0.07, 0.11, new THREE.MeshStandardMaterial({ color: 0xf3f4f6 }), -w / 2 - 0.04, 0.035, 0.12));
      break;
    }

    case 'clutter_mirror_top': {
      const tufMat = new THREE.MeshStandardMaterial({ map: createTufBoxTexture(), roughness: 0.75 });
      group.add(box(0.14, 0.26, 0.44, tufMat, 0.04, 0.13, -0.06));
      group.add(box(0.20, 0.18, 0.18, new THREE.MeshStandardMaterial({ color: 0x1d4ed8 }), 0.02, 0.09, 0.22));
      const plush = new THREE.Mesh(new THREE.SphereGeometry(0.095, 14, 14), blackMelamine);
      plush.position.set(0.02, 0.25, 0.20);
      group.add(plush);
      group.add(box(0.12, 0.14, 0.22, new THREE.MeshStandardMaterial({ color: 0x9a7b4f }), 0.04, 0.32, -0.10));
      break;
    }

    case 'clutter_floor_bags': {
      const bagMat = new THREE.MeshStandardMaterial({ color: 0x16181c, roughness: 0.28 });
      const b1 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.24, 1), new THREE.MeshStandardMaterial({ color: 0x2c3038 }));
      b1.scale.set(1.15, 0.65, 0.95);
      b1.position.set(0.14, 0.15, 0);
      group.add(b1);
      const b2 = new THREE.Mesh(new THREE.DodecahedronGeometry(0.25, 1), bagMat);
      b2.scale.set(1.1, 0.78, 0.95);
      b2.position.set(0.14, 0.36, 0);
      group.add(b2);
      group.add(box(0.26, 0.09, 0.22, blackMelamine, 0.14, 0.56, 0));
      const bp = box(0.26, 0.34, 0.18, new THREE.MeshStandardMaterial({ color: 0x848a94 }), -0.24, 0.17, 0.04);
      bp.rotation.y = 0.25;
      group.add(bp);
      break;
    }

    // ========================================================================
    // ZONA 1: SETUPS VIBECODING CON TECLADO LOGITECH MX KEYS MINI (CALIBRADOS)
    // ========================================================================
    case 'vibe_setup_27':
    case 'vibe_setup_dual':
    case 'vibe_setup_34': {
      const isDual = itemData.type === 'vibe_setup_dual';
      const is34 = itemData.type === 'vibe_setup_34';

      const padMat = new THREE.MeshStandardMaterial({ color: 0x252a34, roughness: 0.92 });
      group.add(box(0.30, 0.005, is34 || isDual ? 0.68 : 0.60, padMat, 0.055, 0.003, 0));

      group.add(cyl(0.024, 0.028, 0.34, 14, darkMetal, -0.14, 0.17, -0.10));
      group.add(box(0.11, 0.028, 0.16, darkMetal, -0.09, 0.28, -0.03));

      const frameMat = new THREE.MeshStandardMaterial({ color: 0x0d1017, roughness: 0.28, metalness: 0.45 });
      const scrMat = new THREE.MeshBasicMaterial({ map: sharedSetupScrTex });
      const vertScrMat = new THREE.MeshBasicMaterial({ map: sharedVertScrTex });

      if (isDual) {
        group.add(box(0.022, 0.34, 0.56, frameMat, -0.05, 0.27, -0.06));
        group.add(box(0.006, 0.32, 0.54, scrMat, -0.036, 0.27, -0.06));

        const vertMon = new THREE.Group();
        vertMon.position.set(-0.01, 0.29, 0.34);
        vertMon.rotation.y = -0.35;
        vertMon.add(box(0.02, 0.48, 0.28, frameMat, 0, 0, 0));
        vertMon.add(box(0.006, 0.46, 0.26, vertScrMat, 0.011, 0, 0));
        group.add(vertMon);
      } else if (is34) {
        const monW = 0.76;
        const monH = 0.34;
        const segW = monW / 3;
        [-1, 0, 1].forEach((idx) => {
          const segGroup = new THREE.Group();
          segGroup.position.set(-0.05 + Math.abs(idx) * 0.024, 0.28, idx * (segW - 0.004));
          segGroup.rotation.y = -idx * 0.17;
          segGroup.add(box(0.02, monH, segW, frameMat, 0, 0, 0));
          segGroup.add(box(0.005, monH - 0.022, segW - 0.01, scrMat, 0.012, 0, 0));
          group.add(segGroup);
        });
      } else {
        group.add(box(0.022, 0.35, 0.59, frameMat, -0.05, 0.27, 0));
        group.add(box(0.006, 0.325, 0.57, scrMat, -0.036, 0.27, 0));
      }

      const barZ = isDual ? -0.06 : 0;
      group.add(box(0.024, 0.016, 0.42, new THREE.MeshBasicMaterial({ color: 0xfef3c7 }), -0.02, 0.455, barZ));
      group.add(cyl(0.020, 0.020, 0.016, 16, darkMetal, 0.01, 0.010, -0.10));

      addLogitechMxKeysMini(group, darkMetal, chromeMat);
      break;
    }

    // ========================================================================
    // ZONA 2: PANEL PERFORADO YOLISPA + LABORATORIO MAKER (SIN TRASLAPES)
    // ========================================================================
    case 'yolispa_pegboard':
    case 'yolispa_pegboard_double': {
      const isDouble = itemData.type === 'yolispa_pegboard_double';
      const boardMat = new THREE.MeshStandardMaterial({ color: 0x20242c, roughness: 0.42, metalness: 0.25 });
      const accMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.35 });
      const orangeTool = new THREE.MeshStandardMaterial({ color: 0xf97316 });
      const yellowMeter = new THREE.MeshStandardMaterial({ color: 0xeab308 });

      group.add(box(0.018, h, d, boardMat, 0, h / 2, 0));
      group.add(box(0.022, 0.005, d - 0.03, darkMetal, 0, h / 2, 0));
      group.add(box(0.022, h - 0.03, 0.005, darkMetal, 0, h / 2, 0));

      group.add(box(0.065, 0.09, 0.085, accMat, 0.035, h * 0.68, -d * 0.24));
      group.add(cyl(0.007, 0.007, 0.13, 8, orangeTool, 0.035, h * 0.77, -d * 0.26));
      group.add(cyl(0.007, 0.007, 0.12, 8, new THREE.MeshStandardMaterial({ color: 0x3b82f6 }), 0.035, h * 0.76, -d * 0.21));

      group.add(box(0.085, 0.016, 0.22, accMat, 0.042, h * 0.30, -0.04));
      group.add(box(0.035, 0.105, 0.068, yellowMeter, 0.042, h * 0.37, -0.08));
      group.add(box(0.006, 0.055, 0.052, new THREE.MeshBasicMaterial({ color: 0x38bdf8 }), 0.061, h * 0.38, -0.08));

      const hp = new THREE.Mesh(new THREE.TorusGeometry(0.068, 0.014, 12, 24), blackMelamine);
      hp.rotation.y = Math.PI / 2;
      hp.position.set(0.035, h * 0.70, d * 0.22);
      group.add(hp);

      if (isDouble) {
        group.add(box(0.085, 0.016, 0.20, accMat, 0.042, h * 0.30, d * 0.22));
        group.add(box(0.055, 0.055, 0.11, new THREE.MeshStandardMaterial({ color: 0x10b981 }), 0.042, h * 0.34, d * 0.22));
      }
      break;
    }

    case 'engineer_maker_station': {
      const kaisiMat = new THREE.MeshStandardMaterial({ map: sharedKaisiTex, roughness: 0.68 });
      group.add(box(0.38, 0.006, 0.26, kaisiMat, -0.05, 0.003, 0.05));

      const drawW = 0.17;
      const drawH = 0.20;
      const drawD = 0.12;
      const drawX = 0.21;
      const drawZ = -0.09;
      group.add(box(drawW, drawH, drawD, darkMetal, drawX, drawH / 2, drawZ));
      const drawerFrontMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.82, roughness: 0.2 });
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 2; c++) {
          group.add(box(0.068, 0.048, 0.012, drawerFrontMat, drawX - 0.038 + c * 0.076, 0.045 + r * 0.060, drawZ + drawD / 2 + 0.004));
        }
      }

      group.add(box(0.062, 0.068, 0.082, darkGrayMelamine, -0.22, 0.034, -0.09));
      group.add(box(0.048, 0.054, 0.006, chromeMat, -0.22, 0.034, -0.047));

      const mdfMat = new THREE.MeshStandardMaterial({ color: 0x9a7b4f, roughness: 0.7 });
      group.add(box(0.13, 0.075, 0.11, mdfMat, -0.03, 0.042, 0.04));
      group.add(box(0.065, 0.008, 0.045, new THREE.MeshStandardMaterial({ color: 0x059669 }), 0.08, 0.010, 0.07));
      const blueArm = box(0.026, 0.14, 0.026, new THREE.MeshStandardMaterial({ color: 0x2563eb }), -0.03, 0.12, 0.04);
      blueArm.rotation.z = -0.35;
      group.add(blueArm);

      group.add(box(0.045, 0.022, 0.048, darkMetal, -0.17, 0.014, 0.06));
      const fnirsiPen = cyl(0.007, 0.005, 0.15, 12, chromeMat, -0.17, 0.052, 0.07);
      fnirsiPen.rotation.x = -0.78;
      group.add(fnirsiPen);
      break;
    }

    // ========================================================================
    // ZONA 3: 3 MODELOS DE REPISAS FLOTANTES (CALIBRADAS EN PARED SETUP)
    // ========================================================================
    case 'shelf_lack_110': {
      group.add(box(w, 0.044, d, blackMelamine, 0, 0.022, 0));
      group.add(box(0.14, 0.15, 0.038, new THREE.MeshStandardMaterial({ color: 0xe2e8f0 }), 0, 0.11, -d * 0.26));
      group.add(box(0.13, 0.13, 0.032, new THREE.MeshStandardMaterial({ color: 0x38bdf8 }), 0, 0.10, -d * 0.18));
      group.add(cyl(0.042, 0.032, 0.075, 14, new THREE.MeshStandardMaterial({ color: 0xf3f4f6 }), 0, 0.08, d * 0.25));
      group.add(new THREE.Mesh(new THREE.SphereGeometry(0.058, 14, 14), new THREE.MeshStandardMaterial({ color: 0x22c55e })).translateY(0.14).translateZ(d * 0.25));
      break;
    }

    case 'shelf_duo_stepped': {
      [-0.08, 0.08].forEach((sz, idx) => {
        const sy = idx * 0.16;
        group.add(box(w, 0.022, d * 0.82, blackMelamine, 0, sy + 0.011, sz));
        group.add(box(0.016, 0.042, d * 0.82, darkMetal, w / 2 - 0.008, sy + 0.021, sz));
      });
      group.add(cyl(0.038, 0.028, 0.068, 14, new THREE.MeshStandardMaterial({ color: 0xf8fafc }), 0, 0.21, 0.14));
      break;
    }

    case 'shelf_walnut_led': {
      [0, 0.18].forEach((sy, idx) => {
        const sz = idx === 0 ? -0.04 : 0.04;
        group.add(box(w, 0.034, d * 0.88, walnutWood, 0, sy + 0.017, sz));
        group.add(box(0.014, 0.008, d * 0.80, new THREE.MeshBasicMaterial({ color: activeLedHex }), 0.03, sy - 0.002, sz));
      });
      const pt = new THREE.PointLight(activeLedHex, 0.85, 1.5);
      pt.position.set(0.10, -0.04, 0);
      group.add(pt);
      break;
    }

    // ========================================================================
    // ZONA 5: BUFANDAS DE FÚTBOL EN PARED DE 2DA LITERA + BALONES
    // ========================================================================
    case 'soccer_scarves_2': {
      // 2 Bufandas tejidas montadas en la pared de la 2da litera (Pared Este +X, mirando hacia -X)
      addMountedScarf(group, 0.10, 1.06, 0.14, sharedScarfCeleste, 0xf8fafc, darkMetal);
      addMountedScarf(group, 0.30, 1.06, 0.14, sharedScarfChampions, 0xfbbf24, darkMetal);
      break;
    }

    case 'soccer_scarves_3': {
      // 3 Bufandas tejidas en la pared de la 2da litera + Barra LED difusa superior
      addMountedScarf(group, 0.08, 1.08, 0.13, sharedScarfCeleste, 0xf8fafc, darkMetal);
      addMountedScarf(group, 0.25, 1.08, 0.13, sharedScarfChampions, 0xfbbf24, darkMetal);
      addMountedScarf(group, 0.42, 1.08, 0.13, sharedScarfRed, 0xffffff, darkMetal);

      // Perfil LED superior iluminando las 3 bufandas de la 2da litera
      group.add(box(0.035, 0.018, 1.16, darkMetal, -0.012, 0.52, 0));
      group.add(box(0.020, 0.008, 1.12, new THREE.MeshBasicMaterial({ color: activeLedHex }), -0.018, 0.51, 0));
      const pt = new THREE.PointLight(activeLedHex, 0.9, 1.6);
      pt.position.set(-0.18, 0.35, 0);
      group.add(pt);
      break;
    }

    case 'soccer_bunk_balls_2': {
      // 2 Aros soporte de pared para balón colocados a los extremos de las bufandas en la pared de la 2da litera
      const goldBallMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.25, metalness: 0.55 });
      [
        { bz: -0.74, mat: ballMat },
        { bz: 0.74,  mat: goldBallMat }
      ].forEach(({ bz, mat }) => {
        // Placa a la pared (+X) y aro proyectándose hacia la cama/cuarto (-X)
        group.add(box(0.018, 0.11, 0.075, darkMetal, 0.09, 0.08, bz));
        const ring = new THREE.Mesh(new THREE.TorusGeometry(0.085, 0.009, 12, 24), darkMetal);
        ring.rotation.x = Math.PI / 2;
        ring.position.set(-0.03, 0.06, bz);
        group.add(ring);

        const ball = new THREE.Mesh(new THREE.SphereGeometry(0.11, 24, 24), mat);
        ball.position.set(-0.03, 0.125, bz);
        ball.castShadow = true;
        group.add(ball);
      });
      break;
    }

    case 'soccer_ball_wall_mount': {
      group.add(box(0.018, 0.11, 0.075, darkMetal, -0.09, 0.055, 0));
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.085, 0.009, 12, 24), darkMetal);
      ring.rotation.x = Math.PI / 2;
      ring.position.set(0.03, 0.04, 0);
      group.add(ring);

      const ball = new THREE.Mesh(new THREE.SphereGeometry(0.11, 24, 24), ballMat);
      ball.position.set(0.03, 0.105, 0);
      ball.castShadow = true;
      group.add(ball);
      break;
    }

    case 'soccer_display_shelf': {
      // Repisa exhibidora de balones y caja acrílica LED (orientada a lo largo del eje Z en la pared de la 2da litera, mirando hacia -X)
      group.add(box(w, 0.030, d, blackMelamine, 0, 0.016, 0));
      group.add(box(0.016, 0.010, d - 0.06, new THREE.MeshBasicMaterial({ color: activeLedHex }), -w / 2 + 0.03, 0.002, 0));

      const b1 = new THREE.Mesh(new THREE.SphereGeometry(0.10, 22, 22), ballMat);
      b1.position.set(0, 0.13, -d * 0.30);
      group.add(b1);

      const goldBallMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.25, metalness: 0.55 });
      const b2 = new THREE.Mesh(new THREE.SphereGeometry(0.10, 22, 22), goldBallMat);
      b2.position.set(0, 0.13, -0.02);
      group.add(b2);

      // Caja acrílica con LED AliExpress + Tachones mirando hacia -X
      const acrylicMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.25, roughness: 0.1 });
      group.add(box(0.18, 0.15, 0.24, acrylicMat, 0, 0.105, d * 0.28));
      const cleatMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.35 });
      group.add(box(0.14, 0.055, 0.065, cleatMat, 0, 0.06, d * 0.23));
      group.add(box(0.14, 0.055, 0.065, cleatMat, 0, 0.06, d * 0.33));
      break;
    }

    case 'soccer_rug': {
      const rugGroup = new THREE.Group();
      const baseRug = box(w, 0.010, d, new THREE.MeshStandardMaterial({ color: 0x252932, roughness: 0.92 }), 0, 0.005, 0, false);
      rugGroup.add(baseRug);
      const lineMat = new THREE.MeshBasicMaterial({ color: 0x64748b });
      rugGroup.add(box(w - 0.10, 0.012, 0.014, lineMat, 0, 0.006, 0, false));
      const circle = new THREE.Mesh(new THREE.RingGeometry(0.15, 0.165, 28), lineMat);
      circle.rotation.x = -Math.PI / 2;
      circle.position.y = 0.012;
      rugGroup.add(circle);
      group.add(rugGroup);
      break;
    }

    // ========================================================================
    // ZONA 6: BAJO CAMA Y PUERTA (CALIBRADOS)
    // ========================================================================
    case 'underbed_wheeled_drawers': {
      [-0.42, 0.42].forEach(dz => {
        group.add(box(0.76, 0.19, 0.72, blackMelamine, -0.04, 0.11, dz));
        group.add(box(0.025, 0.19, 0.74, darkGrayMelamine, -0.43, 0.11, dz));
        group.add(box(0.03, 0.02, 0.18, chromeMat, -0.445, 0.15, dz));
      });
      break;
    }

    case 'underbed_skubb_cases': {
      [-0.54, 0, 0.54].forEach(dz => {
        const skubbMat = new THREE.MeshStandardMaterial({ color: 0x1e2128, roughness: 0.85 });
        group.add(box(0.74, 0.18, 0.48, skubbMat, -0.04, 0.10, dz));
        group.add(box(0.01, 0.012, 0.46, chromeMat, -0.415, 0.17, dz));
        group.add(box(0.02, 0.03, 0.12, blackMelamine, -0.42, 0.10, dz));
      });
      break;
    }

    case 'underbed_shoe_pullout': {
      group.add(box(0.76, 0.03, 0.75, darkMetal, -0.10, 0.025, -0.38));
      const shoeColors = [0xf8fafc, 0x1e293b, 0x3b82f6, 0x10b981];
      shoeColors.forEach((col, i) => {
        const sz = -0.64 + i * 0.17;
        const sMat = new THREE.MeshStandardMaterial({ color: col, roughness: 0.6 });
        group.add(box(0.22, 0.08, 0.07, sMat, -0.28, 0.08, sz));
        group.add(box(0.22, 0.08, 0.07, sMat, -0.28, 0.08, sz + 0.075));
      });
      group.add(box(0.74, 0.19, 0.68, blackMelamine, -0.05, 0.105, 0.42));
      break;
    }

    case 'ikea_trones_pair': {
      [0.02, 0.41].forEach(dy => {
        group.add(box(w, 0.37, d, blackMelamine, 0, dy + 0.185, 0));
        const hole = cyl(0.028, 0.028, 0.02, 16, new THREE.MeshStandardMaterial({ color: 0x090b0e }), 0, dy + 0.30, -d / 2 - 0.005);
        hole.rotation.x = Math.PI / 2;
        group.add(hole);
      });
      break;
    }

    case 'ergo_chair': {
      group.add(cyl(0.025, 0.025, 0.42, 14, darkMetal, 0, 0.24, 0));
      for (let i = 0; i < 5; i++) {
        const a = (i * Math.PI * 2) / 5;
        const leg = box(0.03, 0.025, 0.26, darkMetal, Math.sin(a) * 0.13, 0.05, Math.cos(a) * 0.13);
        leg.rotation.y = a;
        group.add(leg);
      }
      const meshMat = new THREE.MeshStandardMaterial({ color: 0x1e2026, roughness: 0.65 });
      group.add(box(0.46, 0.065, 0.46, meshMat, 0, 0.45, 0));
      group.add(box(0.44, 0.50, 0.045, meshMat, 0, 0.73, -0.20));
      group.add(box(0.24, 0.11, 0.045, meshMat, 0, 1.02, -0.20));
      group.add(box(0.045, 0.18, 0.22, darkMetal, -0.24, 0.55, -0.02));
      group.add(box(0.045, 0.18, 0.22, darkMetal, 0.24, 0.55, -0.02));
      break;
    }

    case 'under_desk_drawer': {
      const alexH = 0.71;
      group.add(box(w, alexH, d, blackMelamine, 0, alexH / 2, 0));
      const frontMat = new THREE.MeshStandardMaterial({ color: 0x262930, roughness: 0.45 });
      for (let i = 0; i < 5; i++) {
        const dy = 0.08 + i * 0.132;
        group.add(box(0.02, 0.115, d - 0.03, frontMat, w / 2 + 0.005, dy, 0));
      }
      break;
    }

    case 'laptop_stand': {
      group.add(box(0.20, 0.06, 0.18, chromeMat, 0, 0.03, 0));
      const lapBase = box(0.32, 0.014, 0.22, darkMetal, 0, 0.072, 0.02);
      lapBase.rotation.x = 0.22;
      group.add(lapBase);
      const lapKeys = box(0.27, 0.004, 0.11, new THREE.MeshBasicMaterial({ color: 0x38bdf8 }), 0, 0.082, 0.01);
      lapKeys.rotation.x = 0.22;
      group.add(lapKeys);

      const lapScreen = box(0.32, 0.21, 0.010, darkMetal, 0, 0.195, -0.085);
      lapScreen.rotation.x = -0.14;
      group.add(lapScreen);
      const scr = box(0.30, 0.185, 0.004, new THREE.MeshBasicMaterial({ map: sharedSetupScrTex }), 0, 0.195, -0.078);
      scr.rotation.x = -0.14;
      group.add(scr);
      break;
    }

    case 'wood_slat_panel': {
      group.add(box(0.012, h, d, blackMelamine, -0.008, h / 2, 0));
      const numSlats = 20;
      const slatD = (d / numSlats) * 0.65;
      for (let i = 0; i < numSlats; i++) {
        const sz = -d / 2 + (i + 0.5) * (d / numSlats);
        group.add(box(0.018, h, slatD, walnutWood, 0.005, h / 2, sz));
      }
      break;
    }

    case 'trash_bin': {
      group.add(cyl(w / 2, w / 2 - 0.02, h, 20, darkMetal, 0, h / 2, 0));
      group.add(cyl(w / 2 + 0.005, w / 2 + 0.005, 0.025, 20, chromeMat, 0, h - 0.01, 0));
      break;
    }

    case 'laundry_hamper': {
      const hamperMat = new THREE.MeshStandardMaterial({ color: 0x3b3f47, roughness: 0.85 });
      group.add(box(w, h - 0.03, d, hamperMat, 0, (h - 0.03) / 2, 0));
      const bambooMat = new THREE.MeshStandardMaterial({ color: 0xa17c56, roughness: 0.6 });
      group.add(box(w + 0.01, 0.03, d + 0.01, bambooMat, 0, h - 0.015, 0));
      break;
    }

    case 'shoe_cabinet': {
      group.add(box(w, h, d, blackMelamine, 0, h / 2, 0));
      const doorMat = new THREE.MeshStandardMaterial({ color: 0x2d3139, roughness: 0.55 });
      group.add(box(w - 0.04, h * 0.44, 0.02, doorMat, 0, h * 0.26, -d / 2 - 0.005));
      group.add(box(w - 0.04, h * 0.44, 0.02, doorMat, 0, h * 0.73, -d / 2 - 0.005));
      break;
    }

    case 'wall_coat_rack': {
      group.add(box(w, 0.07, 0.025, blackMelamine, 0, 0.35, 0));
      for (let i = 0; i < 4; i++) {
        const hx = -w * 0.36 + i * (w * 0.24);
        group.add(box(0.018, 0.05, 0.05, chromeMat, hx, 0.35, -0.03));
      }
      group.add(box(0.24, 0.34, 0.12, new THREE.MeshStandardMaterial({ color: 0x6b7280 }), -0.14, 0.16, -0.06));
      group.add(box(0.22, 0.44, 0.10, blackMelamine, 0.16, 0.12, -0.05));
      break;
    }

    case 'top_storage_boxes': {
      const boxMat = new THREE.MeshStandardMaterial({ color: 0x22252b, roughness: 0.65 });
      const lidMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.5 });
      for (let i = 0; i < 2; i++) {
        const bz = (i - 0.5) * (d * 0.48);
        group.add(box(w, h - 0.02, d * 0.44, boxMat, 0, (h - 0.02) / 2, bz));
        group.add(box(w + 0.01, 0.025, d * 0.45, lidMat, 0, h - 0.01, bz));
      }
      break;
    }

    case 'led_strip_desk':
    case 'led_strip_tv':
    case 'led_strip_bunk': {
      const isBunk = itemData.type === 'led_strip_bunk';
      const ledMat = new THREE.MeshBasicMaterial({ color: activeLedHex });
      group.add(box(0.022, 0.022, d, ledMat, 0, 0.015, 0));
      const ptLight = new THREE.PointLight(activeLedHex, isBunk ? 1.45 : 1.55, 2.4, 1.4);
      ptLight.position.set(isBunk ? -0.18 : 0.15, -0.04, 0);
      group.add(ptLight);
      break;
    }

    case 'floor_lamp': {
      group.add(cyl(0.10, 0.10, 0.02, 16, darkMetal, 0, 0.01, 0));
      group.add(cyl(0.015, 0.015, h, 12, new THREE.MeshBasicMaterial({ color: activeLedHex }), 0, h / 2, 0));
      const lampLight = new THREE.PointLight(activeLedHex, 1.45, 2.5);
      lampLight.position.set(0, h * 0.65, 0);
      group.add(lampLight);
      break;
    }

    default: {
      group.add(box(w, h, d, grayMelamine, 0, h / 2, 0));
    }
  }

  return group;
}
