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
  grad.addColorStop(0, '#475569');
  grad.addColorStop(0.32, '#283548');
  grad.addColorStop(0.50, '#161e2e');
  grad.addColorStop(0.72, '#0f141e');
  grad.addColorStop(1, '#080b10');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 256);

  // Softbox cálido superior (reflejos naturales en aluminio, vidrio y melamina)
  const warmBox = ctx.createRadialGradient(140, 48, 8, 140, 48, 95);
  warmBox.addColorStop(0, 'rgba(255, 245, 228, 0.85)');
  warmBox.addColorStop(0.5, 'rgba(255, 237, 213, 0.35)');
  warmBox.addColorStop(1, 'rgba(255, 237, 213, 0)');
  ctx.fillStyle = warmBox;
  ctx.fillRect(30, 0, 220, 140);

  // Softbox de ventana norte (luz difusa fría)
  const coolBox = ctx.createRadialGradient(365, 62, 10, 365, 62, 110);
  coolBox.addColorStop(0, 'rgba(224, 242, 254, 0.65)');
  coolBox.addColorStop(0.55, 'rgba(125, 211, 252, 0.22)');
  coolBox.addColorStop(1, 'rgba(56, 189, 248, 0)');
  ctx.fillStyle = coolBox;
  ctx.fillRect(240, 0, 250, 160);

  const tex = new THREE.CanvasTexture(canvas);
  tex.mapping = THREE.EquirectangularReflectionMapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function createWallPlasterTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, 512, 512);

  // Micro-textura mate de yeso arquitectónico (sin aspecto plástico plano)
  let seed = 1337;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  for (let i = 0; i < 6500; i++) {
    const x = rand() * 512;
    const y = rand() * 512;
    const v = 114 + Math.floor(rand() * 28);
    const sz = 1 + rand() * 2.5;
    ctx.fillStyle = `rgb(${v},${v},${v})`;
    ctx.fillRect(x, y, sz, sz);
  }
  // Suaves pinceladas sutiles
  for (let i = 0; i < 120; i++) {
    const x = rand() * 512;
    const y = rand() * 512;
    const v = 122 + Math.floor(rand() * 14);
    ctx.fillStyle = `rgba(${v},${v},${v},0.22)`;
    ctx.fillRect(x, y, 24 + rand() * 50, 4 + rand() * 8);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(3, 2);
  return tex;
}

export function createFloorTexture(floorType = 'dark_wood_tile') {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  const isLight = floorType === 'light_oak';
  const isWalnut = floorType === 'walnut_dark';
  ctx.fillStyle = isLight ? '#c9b394' : isWalnut ? '#4e3929' : '#484d54';
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

      const shade = Math.round(Math.sin(r * 3.7 + c * 2.1) * 10 + Math.cos(r * 1.3 - c * 4.2) * 5);
      const baseR = (isLight ? 196 : isWalnut ? 82 : 73) + shade;
      const baseG = (isLight ? 173 : isWalnut ? 58 : 77) + shade;
      const baseB = (isLight ? 140 : isWalnut ? 42 : 84) + shade;

      // Gradiente suave a lo largo de la duela
      const pGrad = ctx.createLinearGradient(x, y, x + w, y + h);
      pGrad.addColorStop(0, `rgb(${baseR + 4},${baseG + 4},${baseB + 4})`);
      pGrad.addColorStop(0.5, `rgb(${baseR},${baseG},${baseB})`);
      pGrad.addColorStop(1, `rgb(${baseR - 5},${baseG - 5},${baseB - 5})`);
      ctx.fillStyle = pGrad;
      ctx.fillRect(x + 1, y + 1, w - 3, h - 3);

      // Vetas orgánicas onduladas
      ctx.strokeStyle = isLight
        ? 'rgba(105,76,48,0.13)'
        : isWalnut
          ? 'rgba(28,16,8,0.28)'
          : 'rgba(18,21,26,0.24)';
      ctx.lineWidth = 1.2;
      for (let i = 0; i < 14; i++) {
        const gy = y + 3 + ((i * 5.2 + (r * 7) % 9) % (h - 6));
        ctx.beginPath();
        ctx.moveTo(x + 2, gy);
        ctx.bezierCurveTo(
          x + w * 0.33, gy + Math.sin(r + i) * 2.2,
          x + w * 0.66, gy - Math.cos(c + i) * 2.2,
          x + w - 4, gy
        );
        ctx.stroke();
      }

      // Luz sutil en bisel superior de la tabla
      ctx.fillStyle = 'rgba(255,255,255,0.06)';
      ctx.fillRect(x + 2, y + 2, w - 5, 1.5);

      // Junta oscura biselada entre duelas
      ctx.strokeStyle = 'rgba(12, 15, 20, 0.65)';
      ctx.lineWidth = 2.5;
      ctx.strokeRect(x + 1, y + 1, w - 2, h - 2);
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2.4, 3.0);
  tex.anisotropy = 8;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function createFloorBumpTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#c8c8c8';
  ctx.fillRect(0, 0, 512, 512);

  const cols = 4;
  const rows = 14;
  const w = canvas.width / cols;
  const h = canvas.height / rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const offset = (r % 2) * (w * 0.5);
      const x = (c * w + offset) % canvas.width;
      const y = r * h;

      ctx.strokeStyle = '#999999';
      ctx.lineWidth = 1;
      for (let i = 0; i < 8; i++) {
        const gy = y + 3 + ((i * 4.5 + r * 3) % (h - 5));
        ctx.beginPath(); ctx.moveTo(x + 2, gy); ctx.lineTo(x + w - 3, gy); ctx.stroke();
      }
      ctx.strokeStyle = '#303030';
      ctx.lineWidth = 2.2;
      ctx.strokeRect(x, y, w, h);
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2.4, 3.0);
  return tex;
}

function createWoodGrainTexture(baseHex, lineRgba, highlightRgba = 'rgba(255,255,255,0.035)') {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = baseHex;
  ctx.fillRect(0, 0, 512, 512);

  // Variación orgánica en bandas longitudinales
  for (let b = 0; b < 18; b++) {
    const by = (b * 512) / 18;
    ctx.fillStyle = b % 2 === 0 ? highlightRgba : lineRgba;
    ctx.fillRect(0, by, 512, 16 + (b % 5) * 4);
  }

  // Fibras finas sinuosas de madera / melamina veteada
  ctx.strokeStyle = lineRgba;
  for (let i = 0; i < 160; i++) {
    const y = (i * 3.23) % 512;
    ctx.lineWidth = 0.8 + (i % 3) * 0.55;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.bezierCurveTo(
      170, y + Math.sin(i * 0.45) * 3.5,
      340, y - Math.cos(i * 0.35) * 3.5,
      512, y
    );
    ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 8;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createWoodBumpTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#888888';
  ctx.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 110; i++) {
    const y = (i * 2.35) % 256;
    ctx.strokeStyle = i % 2 === 0 ? '#6e6e6e' : '#9c9c9c';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.bezierCurveTo(85, y + Math.sin(i * 0.6) * 2, 170, y - Math.cos(i * 0.4) * 2, 256, y);
    ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

function createFeltDeskpadTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Fieltro oscuro grafito / lana tejida
  ctx.fillStyle = '#232730';
  ctx.fillRect(0, 0, 512, 512);

  let seed = 4242;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  for (let i = 0; i < 9500; i++) {
    const x = rand() * 512;
    const y = rand() * 512;
    const bright = rand() > 0.5;
    ctx.fillStyle = bright ? 'rgba(255,255,255,0.055)' : 'rgba(0,0,0,0.16)';
    ctx.fillRect(x, y, 1.6, 1.6);
  }
  // Costura sutil en el borde perimetral
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.24)';
  ctx.lineWidth = 2;
  ctx.setLineDash([7, 5]);
  ctx.strokeRect(12, 12, 488, 488);
  ctx.setLineDash([]);

  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 8;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createMxKeysMiniTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // Base grafito aluminio del Logitech MX Keys Mini
  ctx.fillStyle = '#252a33';
  ctx.fillRect(0, 0, 512, 256);

  const rows = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.4],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.8],
    [1.4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.4],
    [1.7, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2.1],
    [2.1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2.7],
    [1.2, 1.2, 1.2, 1.2, 5.4, 1.1, 1.1, 1, 1, 1]
  ];

  const padX = 14;
  const padY = 16;
  const rowH = (256 - padY * 2) / rows.length;

  rows.forEach((row, rIdx) => {
    const totalUnits = row.reduce((a, b) => a + b, 0);
    const unitW = (512 - padX * 2) / totalUnits;
    let curX = padX;
    const y = padY + rIdx * rowH;

    row.forEach((u, cIdx) => {
      const kw = u * unitW - 4;
      const kh = rowH - 5;
      // Tecla cóncava grafito oscuro
      ctx.fillStyle = '#15181e';
      ctx.fillRect(curX + 2, y + 2, kw, kh);

      // Concavidad esférica característica PerfectStroke
      const grad = ctx.createRadialGradient(
        curX + 2 + kw * 0.5, y + 2 + kh * 0.5, 2,
        curX + 2 + kw * 0.5, y + 2 + kh * 0.5, kw * 0.65
      );
      grad.addColorStop(0, 'rgba(255,255,255,0.06)');
      grad.addColorStop(1, 'rgba(0,0,0,0.22)');
      ctx.fillStyle = grad;
      ctx.fillRect(curX + 2, y + 2, kw, kh);

      // Borde iluminado tenue blanco (retroiluminación inteligente MX Keys)
      ctx.strokeStyle = 'rgba(226, 232, 240, 0.24)';
      ctx.lineWidth = 1;
      ctx.strokeRect(curX + 2.5, y + 2.5, kw - 1, kh - 1);

      // Leyenda minimalista en blanco suave (y LEDs Easy-Switch en F1/F2/F3)
      if (rIdx === 0 && (cIdx === 1 || cIdx === 2 || cIdx === 3)) {
        ctx.fillStyle = cIdx === 1 ? '#38bdf8' : 'rgba(241,245,249,0.75)';
        ctx.fillRect(curX + kw * 0.38, y + kh * 0.45, kw * 0.28, 3);
      } else if (u < 4) {
        ctx.fillStyle = 'rgba(241, 245, 249, 0.48)';
        ctx.fillRect(curX + 6, y + 7, Math.min(kw - 12, 8), 2.5);
      }
      curX += u * unitW;
    });
  });

  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 8;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createMultiboardTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Multiboard modular impreso en 3D (PLA+ Negro Mate · 4 losetas de ~19×23 cm para cama 25×25)
  ctx.fillStyle = '#1b1f27';
  ctx.fillRect(0, 0, 512, 512);

  // División sutil de las 4 losetas modulares impresas en 3D
  ctx.strokeStyle = '#0e1116';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(256, 0); ctx.lineTo(256, 512);
  ctx.moveTo(0, 256); ctx.lineTo(512, 256);
  ctx.stroke();

  const step = 32;
  const drawOctagon = (cx, cy, r) => {
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      const a = (i * Math.PI) / 4 + Math.PI / 8;
      const px = cx + Math.cos(a) * r;
      const py = cy + Math.sin(a) * r;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
  };

  for (let r = 0; r < 16; r++) {
    for (let c = 0; c < 16; c++) {
      const x = 16 + c * step;
      const y = 16 + r * step;
      // Agujero octogonal principal roscado de Multiboard
      drawOctagon(x, y, 8.5);
      ctx.fillStyle = '#090b0f';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.09)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Agujero pequeño intermedio (característico del doble patrón de Multiboard)
      if (c < 15 && r < 15 && Math.abs(x + step / 2 - 256) > 4 && Math.abs(y + step / 2 - 256) > 4) {
        ctx.beginPath();
        ctx.arc(x + step / 2, y + step / 2, 3.6, 0, Math.PI * 2);
        ctx.fillStyle = '#0c0f14';
        ctx.fill();
      }
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 8;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createHswHexTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Honeycomb Storage Wall (HSW) impreso en 3D en PLA+ Negro Mate
  ctx.fillStyle = '#1f242e';
  ctx.fillRect(0, 0, 512, 512);

  const r = 20;
  const dx = r * 1.5;
  const dy = r * Math.sqrt(3);

  const drawHex = (cx, cy, rad) => {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = (i * Math.PI) / 3;
      const px = cx + Math.cos(a) * rad;
      const py = cy + Math.sin(a) * rad;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
  };

  for (let col = -1; col < 20; col++) {
    for (let row = -1; row < 18; row++) {
      const cx = col * dx + 12;
      const cy = row * dy + (col % 2 !== 0 ? dy / 2 : 0) + 12;
      // Cavidad hexagonal profunda
      drawHex(cx, cy, r - 3.2);
      ctx.fillStyle = '#080a0e';
      ctx.fill();
      // Bisel superior de la pared del panal 3D
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.11)';
      ctx.lineWidth = 1.4;
      ctx.stroke();
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 8;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createQuiltedFabricTexture(baseHex) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = baseHex;
  ctx.fillRect(0, 0, 512, 512);

  // Trama suave de tela algodón/lino
  ctx.fillStyle = 'rgba(255,255,255,0.03)';
  for (let i = 0; i < 512; i += 4) {
    ctx.fillRect(0, i, 512, 1);
    ctx.fillRect(i, 0, 1, 512);
  }
  ctx.fillStyle = 'rgba(0,0,0,0.04)';
  for (let i = 2; i < 512; i += 4) {
    ctx.fillRect(0, i, 512, 1);
  }

  // Costuras acolchadas suaves (canales acolchados elegantes)
  const step = 128;
  for (let x = 0; x <= 512; x += step) {
    const g = ctx.createLinearGradient(x - 10, 0, x + 10, 0);
    g.addColorStop(0, 'rgba(0,0,0,0)');
    g.addColorStop(0.5, 'rgba(0,0,0,0.22)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(x - 10, 0, 20, 512);
  }
  for (let y = 0; y <= 512; y += step) {
    const g = ctx.createLinearGradient(0, y - 10, 0, y + 10);
    g.addColorStop(0, 'rgba(0,0,0,0)');
    g.addColorStop(0.5, 'rgba(0,0,0,0.20)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, y - 10, 512, 20);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 4);
  tex.anisotropy = 8;
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

function drawArrow(ctx, fromX, fromY, toX, toY, headLength = 10) {
  const dx = toX - fromX;
  const dy = toY - fromY;
  const angle = Math.atan2(dy, dx);
  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(toX, toY);
  ctx.lineTo(toX - headLength * Math.cos(angle - Math.PI / 6), toY - headLength * Math.sin(angle - Math.PI / 6));
  ctx.lineTo(toX - headLength * Math.cos(angle + Math.PI / 6), toY - headLength * Math.sin(angle + Math.PI / 6));
  ctx.closePath();
  ctx.fill();
}

export function createWhiteboardTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 768;
  const ctx = canvas.getContext('2d');

  // Fondo blanco esmaltado de pizarrón
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, 0, 1024, 768);

  // Retícula tenue de puntos para dibujo de precisión
  ctx.fillStyle = 'rgba(148, 163, 184, 0.22)';
  for (let x = 30; x < 1000; x += 32) {
    for (let y = 30; y < 740; y += 32) {
      ctx.fillRect(x, y, 2, 2);
    }
  }

  // Título superior tipo marcador rojo seco
  ctx.fillStyle = '#dc2626';
  ctx.font = 'bold 26px "Courier New", monospace';
  ctx.fillText('// SPRINT 3: FIRMWARE + DOMÓTICA IoT (ESP32-S3)', 40, 52);

  ctx.strokeStyle = '#dc2626';
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(40, 64); ctx.lineTo(760, 64); ctx.stroke();

  ctx.fillStyle = '#475569';
  ctx.font = 'italic 16px sans-serif';
  ctx.fillText('¡Reubicado al frente del escritorio! (100% visible sin estorbo de puerta)', 40, 88);

  // ==========================================
  // DIAGRAMA 1 (Izquierda): Lazo de Control PID
  // ==========================================
  ctx.fillStyle = '#1e40af';
  ctx.font = 'bold 19px sans-serif';
  ctx.fillText('1. LAZO DE CONTROL PID EN TIEMPO REAL (100 Hz)', 40, 130);

  // Punto de suma (círculo)
  const sumX = 80;
  const sumY = 210;
  ctx.strokeStyle = '#1e3a8a';
  ctx.lineWidth = 3;
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(sumX, sumY, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#1e3a8a';
  ctx.font = 'bold 18px sans-serif';
  ctx.fillText('+', sumX - 14, sumY - 4);
  ctx.fillText('-', sumX - 4, sumY + 14);

  // Entrada Setpoint R(s)
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 15px monospace';
  ctx.fillText('R(s) [Ref]', 20, 180);
  ctx.strokeStyle = '#0f172a';
  ctx.fillStyle = '#0f172a';
  drawArrow(ctx, 20, 210, sumX - 18, 210, 10);

  // Flecha de error e(t)
  drawArrow(ctx, sumX + 18, 210, 150, 210, 10);
  ctx.fillText('e(t)', 114, 202);

  // Bloque Controlador PID
  ctx.strokeStyle = '#2563eb';
  ctx.lineWidth = 3;
  ctx.fillStyle = '#eff6ff';
  ctx.fillRect(150, 175, 140, 70);
  ctx.strokeRect(150, 175, 140, 70);
  ctx.fillStyle = '#1e40af';
  ctx.font = 'bold 15px sans-serif';
  ctx.fillText('CONTROLADOR', 160, 202);
  ctx.fillText('PID + Anti-Windup', 158, 224);

  // Flecha señal de control u(t)
  ctx.strokeStyle = '#0f172a';
  ctx.fillStyle = '#0f172a';
  drawArrow(ctx, 290, 210, 360, 210, 10);
  ctx.fillText('u(t) [PWM]', 294, 202);

  // Bloque Planta / Motor DC
  ctx.strokeStyle = '#059669';
  ctx.lineWidth = 3;
  ctx.fillStyle = '#ecfdf5';
  ctx.fillRect(360, 175, 130, 70);
  ctx.strokeRect(360, 175, 130, 70);
  ctx.fillStyle = '#065f46';
  ctx.font = 'bold 15px sans-serif';
  ctx.fillText('MOTOR DC /', 376, 202);
  ctx.fillText('BRAZO ROBOT', 370, 224);

  // Flecha de salida Y(s)
  ctx.strokeStyle = '#0f172a';
  ctx.fillStyle = '#0f172a';
  drawArrow(ctx, 490, 210, 560, 210, 10);
  ctx.fillText('Y(s) [Posición]', 498, 202);

  // Lazo de retroalimentación
  ctx.strokeStyle = '#dc2626';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(525, 210);
  ctx.lineTo(525, 280);
  ctx.lineTo(sumX, 280);
  ctx.stroke();
  ctx.fillStyle = '#dc2626';
  drawArrow(ctx, sumX, 280, sumX, sumY + 18, 10);
  ctx.fillText('Sensor Encoder (Feedback)', 220, 272);

  // Ecuación y parámetros sintonizados
  ctx.fillStyle = '#1e293b';
  ctx.font = '15px monospace';
  ctx.fillText('u(t) = Kp·e(t) + Ki·∫e(τ)dτ + Kd·(de/dt)', 40, 320);
  ctx.fillStyle = '#2563eb';
  ctx.font = 'bold 15px monospace';
  ctx.fillText('Sintonía: Kp = 2.40  |  Ki = 0.18  |  Kd = 0.05', 40, 345);

  // Mini gráfica de respuesta escalón
  ctx.strokeStyle = '#94a3b8';
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(40, 440); ctx.lineTo(240, 440); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(40, 440); ctx.lineTo(40, 370); ctx.stroke();
  ctx.strokeStyle = '#f59e0b';
  ctx.setLineDash([4, 4]);
  ctx.beginPath(); ctx.moveTo(40, 395); ctx.lineTo(240, 395); ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = '#d97706';
  ctx.font = '11px sans-serif';
  ctx.fillText('Target (1.0)', 180, 390);
  ctx.strokeStyle = '#0284c7';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(40, 440);
  ctx.bezierCurveTo(70, 435, 85, 380, 110, 388);
  ctx.bezierCurveTo(130, 396, 150, 394, 240, 395);
  ctx.stroke();
  ctx.fillStyle = '#0284c7';
  ctx.fillText('Respuesta (Overshoot 8%, Ts=360ms)', 52, 424);

  // ==========================================
  // DIAGRAMA 2 (Derecha Arriba): Arquitectura ESP32
  // ==========================================
  ctx.fillStyle = '#1e40af';
  ctx.font = 'bold 19px sans-serif';
  ctx.fillText('2. ARQUITECTURA HARDWARE ESP32-S3', 600, 130);

  // Chip central ESP32
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 3;
  ctx.fillStyle = '#f1f5f9';
  ctx.fillRect(660, 160, 240, 160);
  ctx.strokeRect(660, 160, 240, 160);

  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 16px monospace';
  ctx.fillText('ESP32-S3-WROOM-1', 690, 190);
  ctx.font = '12px sans-serif';
  ctx.fillStyle = '#64748b';
  ctx.fillText('Dual Core 240MHz · WiFi + BLE', 685, 210);

  // Pines rotulados
  ctx.font = '13px monospace';
  ctx.fillStyle = '#dc2626';
  ctx.fillText('• 3V3 / GND  (Alimentación Ugreen 100W)', 675, 238);
  ctx.fillStyle = '#2563eb';
  ctx.fillText('• GPIO 21/22 (I2C -> OLED + Sensores)', 675, 260);
  ctx.fillStyle = '#059669';
  ctx.fillText('• GPIO 16/17 (UART -> FTDI Debugger)', 675, 282);
  ctx.fillStyle = '#d97706';
  ctx.fillText('• GPIO 4     (PWM -> Driver DRV8833)', 675, 304);

  // ==========================================
  // DIAGRAMA 3 (Abajo Izquierda): Domótica & Conectividad
  // ==========================================
  ctx.strokeStyle = '#059669';
  ctx.lineWidth = 2;
  ctx.fillStyle = '#f0fdf4';
  ctx.fillRect(40, 480, 450, 250);
  ctx.strokeRect(40, 480, 450, 250);

  ctx.fillStyle = '#065f46';
  ctx.font = 'bold 18px sans-serif';
  ctx.fillText('🏠 DOMÓTICA DEL CUARTO (TUYA + ALEXA)', 60, 514);

  ctx.font = '14px sans-serif';
  ctx.fillStyle = '#1e293b';
  const domoLines = [
    '• Alexa Echo Pop: Rutina "Modo Programar" enciende LEDs y PC.',
    '• Multicontacto Inteligente Tuya WiFi: 4 tomas AC + 4 USB.',
    '• Seguridad Cautín: Apagado automático a los 30 min sin uso.',
    '• Monitoreo de Energía: Medición de kWh consumidos en tiempo real.',
    '• Telemetría MQTT: Logs del ESP32 directos al dashboard local.',
    '• Conectividad Escritorio: Clips magnéticos Baseus para USB-C.'
  ];
  domoLines.forEach((l, idx) => {
    ctx.fillText(l, 60, 548 + idx * 28);
  });

  // ==========================================
  // DIAGRAMA 4 (Abajo Derecha): Checklist de Tareas
  // ==========================================
  ctx.strokeStyle = '#3b82f6';
  ctx.lineWidth = 2;
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(520, 360, 460, 370);
  ctx.strokeRect(520, 360, 460, 370);

  ctx.fillStyle = '#1e40af';
  ctx.font = 'bold 18px sans-serif';
  ctx.fillText('📋 CHECKLIST INGENIERO / PROYECTOS:', 545, 396);

  ctx.font = '15px monospace';
  const checks = [
    { done: true, text: 'Claude Code Opus: Tarea FreeRTOS generada' },
    { done: true, text: 'KiCad 8.0: PCB 4 capas ruteado con USB-C' },
    { done: true, text: 'ESP32: Anti-windup clamping implementado' },
    { done: true, text: 'FTDI USB-UART: Conexión serial 115200' },
    { done: true, text: 'Pizarrón reubicado frente al escritorio' },
    { done: true, text: 'Multicontacto Tuya integrado con Alexa' },
    { done: false, text: 'Pruebas osciloscopio ZOYI canal 2 (PWM)' },
    { done: false, text: 'Soldar componentes SMD en tapete Kaisi' }
  ];

  checks.forEach((item, idx) => {
    ctx.fillStyle = item.done ? '#16a34a' : '#d97706';
    ctx.fillText(item.done ? '[✓]' : '[ ]', 545, 436 + idx * 34);
    ctx.fillStyle = item.done ? '#0f172a' : '#475569';
    ctx.fillText(item.text, 582, 436 + idx * 34);
  });

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function createUlanziClockTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 96;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#040711';
  ctx.fillRect(0, 0, 256, 96);

  ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
  ctx.lineWidth = 1;
  ctx.strokeRect(4, 4, 248, 88);

  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const timeStr = `${hours}:${minutes}`;

  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 44px "Courier New", monospace';
  ctx.fillText(timeStr, 24, 62);

  // Batería pixel
  ctx.fillStyle = '#22c55e';
  ctx.fillRect(174, 28, 38, 14);
  ctx.fillRect(212, 32, 4, 6);
  ctx.fillStyle = '#040711';
  ctx.font = 'bold 9px monospace';
  ctx.fillText('88%', 180, 39);

  // WiFi icon
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(190, 68, 10, -Math.PI * 0.8, -Math.PI * 0.2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(190, 68, 6, -Math.PI * 0.8, -Math.PI * 0.2);
  ctx.stroke();
  ctx.fillStyle = '#38bdf8';
  ctx.beginPath();
  ctx.arc(190, 68, 2, 0, Math.PI * 2);
  ctx.fill();

  // Temperatura / Sol
  ctx.fillStyle = '#f59e0b';
  ctx.font = 'bold 13px sans-serif';
  ctx.fillText('24°C ☀️', 160, 20);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function createWorkflowScreenTexture(workflow = 'claude_code', target = 'main_monitor') {
  const canvas = document.createElement('canvas');
  if (target === 'laptop') {
    canvas.width = 512;
    canvas.height = 320;
  } else if (target === 'vertical_monitor') {
    canvas.width = 576;
    canvas.height = 1024;
  } else {
    canvas.width = 1024;
    canvas.height = 576;
  }
  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;

  if (target === 'laptop') {
    if (workflow === 'pcb_kicad') {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(10, 10, W - 20, 26);
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 12px monospace';
      ctx.fillText('KiCad 8.0 · 3D Raytraced Raytracing Viewer [PCB]', 20, 27);

      ctx.fillStyle = '#0e3a20';
      ctx.fillRect(50, 60, W - 100, H - 100);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(55, 65, W - 110, H - 110);

      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(W * 0.35, 90, 140, 90);
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 12px monospace';
      ctx.fillText('ESPRESSIF ESP32', W * 0.35 + 10, 140);

      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(W * 0.42, H - 55, 65, 20);

      ctx.fillStyle = '#f59e0b';
      for (let i = 0; i < 12; i++) {
        ctx.fillRect(68 + i * 28, 72, 8, 10);
        ctx.fillRect(68 + i * 28, H - 52, 8, 10);
      }
    } else if (workflow === 'control_firmware') {
      ctx.fillStyle = '#0b0f19';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, 0, W, 24);
      ctx.fillStyle = '#4ade80';
      ctx.font = 'bold 12px monospace';
      ctx.fillText('SERIAL TELEMETRY PLOTTER · COM4 (115200 bps)', 12, 17);

      ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
      for (let y = 35; y < H - 10; y += 25) {
        ctx.beginPath(); ctx.moveTo(10, y); ctx.lineTo(W - 10, y); ctx.stroke();
      }
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(10, H * 0.65);
      for (let x = 10; x < W - 10; x += 15) {
        const ny = H * 0.65 + Math.sin(x * 0.08) * 18 * Math.exp(-x * 0.003);
        ctx.lineTo(x, ny);
      }
      ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.font = '11px monospace';
      ctx.fillText('> duty_pwm: 55.7% | i_load: 0.38A | temp_mcu: 34.2C | status: LOCKED', 14, H - 16);
    } else {
      ctx.fillStyle = '#0d1117';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#161b22';
      ctx.fillRect(0, 0, W, 24);
      ctx.fillStyle = '#e6edf3';
      ctx.font = '11px sans-serif';
      ctx.fillText('VS Code · pid_controller.cpp · Git: main*', 12, 17);

      ctx.fillStyle = '#38bdf8';
      ctx.font = '11px monospace';
      ctx.fillText('1 #include <Arduino.h>', 14, 46);
      ctx.fillStyle = '#f59e0b';
      ctx.fillText('2 #include "freertos/FreeRTOS.h"', 14, 64);
      ctx.fillStyle = '#a855f7';
      ctx.fillText('3 void vMotorTask(void *pvParams) {', 14, 82);
      ctx.fillStyle = '#e6edf3';
      ctx.fillText('4   TickType_t xLast = xTaskGetTickCount();', 14, 100);
      ctx.fillText('5   for(;;) { pid.compute(); vTaskDelay(10); }', 14, 118);
      ctx.fillStyle = '#a855f7';
      ctx.fillText('6 }', 14, 136);

      ctx.fillStyle = '#010409';
      ctx.fillRect(8, 150, W - 16, H - 158);
      ctx.fillStyle = '#4ade80';
      ctx.fillText('✔ 18 tests passed (0 errors) [Build 1.2s]', 16, 180);
      ctx.fillStyle = '#94a3b8';
      ctx.fillText('tuf-f15:~/robotics$ git status: clean', 16, 202);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }

  if (workflow === 'pcb_kicad') {
    ctx.fillStyle = '#12161f';
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = '#1f2430';
    ctx.fillRect(0, 0, W, 36);
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 15px sans-serif';
    ctx.fillText('KiCad 8.0.2 - PCB Editor [robot_controller_4layer.kicad_pcb]', 16, 24);

    ctx.fillStyle = '#ef4444'; ctx.fillRect(660, 8, 65, 20);
    ctx.fillStyle = '#ffffff'; ctx.font = 'bold 11px monospace'; ctx.fillText('F.Cu (1)', 670, 22);
    ctx.fillStyle = '#22c55e'; ctx.fillRect(735, 8, 65, 20);
    ctx.fillStyle = '#ffffff'; ctx.fillText('In1.Cu (G)', 740, 22);
    ctx.fillStyle = '#38bdf8'; ctx.fillRect(810, 8, 65, 20);
    ctx.fillStyle = '#ffffff'; ctx.fillText('In2.Cu (V)', 815, 22);
    ctx.fillStyle = '#f59e0b'; ctx.fillRect(885, 8, 65, 20);
    ctx.fillStyle = '#0f172a'; ctx.fillText('B.Cu (4)', 895, 22);

    ctx.fillStyle = 'rgba(148, 163, 184, 0.15)';
    for (let x = 20; x < W; x += 22) {
      for (let y = 45; y < H - 35; y += 22) {
        ctx.fillRect(x, y, 1.5, 1.5);
      }
    }

    const boardX = 80;
    const boardY = 60;
    const boardW = W - 160;
    const boardH = H - 110;

    ctx.fillStyle = '#0c381e';
    ctx.fillRect(boardX, boardY, boardW, boardH);

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(boardX + 10, boardY + 10, boardW - 20, boardH - 20);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px monospace';
    ctx.fillText('MAX ROBOTICS · ESP32-S3 CORE v3.2', boardX + 30, boardY + 38);

    const espX = boardX + 50;
    const espY = boardY + 70;
    const espW = 220;
    const espH = 260;

    ctx.fillStyle = '#082514';
    ctx.fillRect(espX, espY, espW, 55);
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(espX + 25, espY + 40);
    for (let k = 0; k < 6; k++) {
      ctx.lineTo(espX + 35 + k * 28, espY + 15);
      ctx.lineTo(espX + 45 + k * 28, espY + 40);
    }
    ctx.stroke();

    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(espX, espY + 58, espW, espH - 58);
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 16px sans-serif';
    ctx.fillText('ESPRESSIF', espX + 55, espY + 120);
    ctx.font = 'bold 14px monospace';
    ctx.fillText('ESP32-S3-WROOM-1', espX + 35, espY + 148);
    ctx.font = '11px monospace';
    ctx.fillText('FCC ID: 2AC7Z-ESPS3', espX + 42, espY + 172);

    ctx.fillStyle = '#f59e0b';
    for (let i = 0; i < 14; i++) {
      ctx.fillRect(espX - 12, espY + 68 + i * 13, 10, 8);
      ctx.fillRect(espX + espW + 2, espY + 68 + i * 13, 10, 8);
    }
    for (let i = 0; i < 9; i++) {
      ctx.fillRect(espX + 25 + i * 18, espY + espH + 2, 10, 10);
    }

    const usbX = boardX + boardW - 55;
    const usbY = boardY + boardH * 0.5 - 35;
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(usbX, usbY, 45, 70);
    ctx.fillStyle = '#f59e0b';
    for (let i = 0; i < 8; i++) {
      ctx.fillRect(usbX - 14, usbY + 8 + i * 7, 10, 4);
    }

    const drvX = boardX + 340;
    const drvY = boardY + 90;
    ctx.fillStyle = '#1e2028';
    ctx.fillRect(drvX, drvY, 80, 110);
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 12px monospace';
    ctx.fillText('DRV8833', drvX + 10, drvY + 55);
    ctx.fillText('H-BRIDGE', drvX + 8, drvY + 75);
    ctx.fillStyle = '#cbd5e1';
    for (let i = 0; i < 8; i++) {
      ctx.fillRect(drvX - 8, drvY + 10 + i * 12, 6, 6);
      ctx.fillRect(drvX + 82, drvY + 10 + i * 12, 6, 6);
    }

    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    const tracesF = [
      [[espX + espW + 12, espY + 110], [drvX - 10, espY + 110]],
      [[espX + espW + 12, espY + 130], [drvX - 25, espY + 130], [drvX - 10, drvY + 45]],
      [[espX + espW + 12, espY + 160], [boardX + 500, espY + 160], [boardX + 550, espY + 210], [usbX - 16, espY + 210]],
      [[drvX + 90, drvY + 30], [boardX + 560, drvY + 30], [boardX + 620, drvY + 90]],
      [[drvX + 90, drvY + 60], [boardX + 580, drvY + 60], [boardX + 620, drvY + 120]]
    ];
    tracesF.forEach(pts => {
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
      ctx.stroke();
    });

    ctx.strokeStyle = '#f43f5e';
    ctx.lineWidth = 3.5;
    const tracesB = [
      [[usbX - 16, usbY + 25], [boardX + 460, usbY + 25], [boardX + 400, boardY + boardH - 60]],
      [[boardX + 400, boardY + boardH - 60], [espX + 160, boardY + boardH - 60], [espX + 160, espY + espH + 12]]
    ];
    tracesB.forEach(pts => {
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
      ctx.stroke();
    });

    const vias = [
      [boardX + 310, espY + 110], [boardX + 500, espY + 160],
      [boardX + 460, usbY + 25], [drvX + 90, drvY + 30],
      [boardX + 400, boardY + boardH - 60], [espX + 160, boardY + boardH - 60]
    ];
    vias.forEach(([vx, vy]) => {
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath(); ctx.arc(vx, vy, 6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#0c381e';
      ctx.beginPath(); ctx.arc(vx, vy, 2.5, 0, Math.PI * 2); ctx.fill();
    });

    ctx.fillStyle = '#78350f';
    for (let i = 0; i < 6; i++) {
      const rx = boardX + 480 + (i % 3) * 35;
      const ry = boardY + 260 + ((i / 3) | 0) * 45;
      ctx.fillRect(rx, ry, 16, 8);
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(rx - 3, ry, 3, 8);
      ctx.fillRect(rx + 16, ry, 3, 8);
      ctx.fillStyle = '#78350f';
    }

    ctx.fillStyle = '#1e2430';
    ctx.fillRect(0, H - 32, W, 32);
    ctx.fillStyle = '#22c55e';
    ctx.font = 'bold 13px monospace';
    ctx.fillText('DRC: 0 Errors, 0 Unconnected Nets ✓', 20, H - 11);
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('Layer: F.Cu  |  Grid: 0.127 mm (5.0 mil)  |  Tracks: 42  |  Vias: 18  |  Zoom: 240%', 320, H - 11);

  } else if (workflow === 'control_firmware') {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, W, H);

    const splitX = W * 0.48;
    ctx.fillStyle = '#1e1e1e';
    ctx.fillRect(16, 16, splitX - 24, H - 32);

    ctx.fillStyle = '#2d2d2d';
    ctx.fillRect(16, 16, splitX - 24, 34);
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 13px monospace';
    ctx.fillText('pid_controller.cpp - PlatformIO [ESP32-S3]', 32, 38);

    const codeLines = [
      { text: '#include <Arduino.h>', color: '#38bdf8' },
      { text: '#include "esp_timer.h"', color: '#38bdf8' },
      { text: '', color: '#fff' },
      { text: '// Parámetros sintonizados en banco:', color: '#6a9955' },
      { text: 'const float Kp = 2.40f;', color: '#4ec9b0' },
      { text: 'const float Ki = 0.18f;', color: '#4ec9b0' },
      { text: 'const float Kd = 0.05f;', color: '#4ec9b0' },
      { text: '', color: '#fff' },
      { text: 'float PID::compute(float setpoint, float current) {', color: '#dcdcaa' },
      { text: '  float error = setpoint - current;', color: '#9cdcfe' },
      { text: '  integral += error * DT;', color: '#9cdcfe' },
      { text: '  integral = clamp(integral, -120.0f, 120.0f); // Anti-windup', color: '#6a9955' },
      { text: '  float derivative = (error - prev_error) / DT;', color: '#9cdcfe' },
      { text: '  prev_error = error;', color: '#9cdcfe' },
      { text: '  float out = Kp*error + Ki*integral + Kd*derivative;', color: '#ce9178' },
      { text: '  return clamp(out, 0.0f, 255.0f);', color: '#c586c0' },
      { text: '}', color: '#dcdcaa' }
    ];

    ctx.font = '13px "Courier New", monospace';
    codeLines.forEach((cl, idx) => {
      ctx.fillStyle = '#569cd6';
      ctx.fillText(String(idx + 1).padStart(2, ' '), 24, 76 + idx * 24);
      ctx.fillStyle = cl.color;
      ctx.fillText(cl.text, 56, 76 + idx * 24);
    });

    const scopeX = splitX + 8;
    const scopeW = W - scopeX - 16;
    ctx.fillStyle = '#060a14';
    ctx.fillRect(scopeX, 16, scopeW, H - 32);

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(scopeX, 16, scopeW, 36);
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 14px monospace';
    ctx.fillText('DIGITAL OSCILLOSCOPE · STEP RESPONSE (CLOSED LOOP)', scopeX + 16, 40);

    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    for (let x = scopeX + 20; x < scopeX + scopeW - 10; x += 45) {
      ctx.beginPath(); ctx.moveTo(x, 60); ctx.lineTo(x, 340); ctx.stroke();
    }
    for (let y = 60; y < 350; y += 35) {
      ctx.beginPath(); ctx.moveTo(scopeX + 10, y); ctx.lineTo(scopeX + scopeW - 10, y); ctx.stroke();
    }

    const targetY = 175;
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(scopeX + 30, targetY);
    ctx.lineTo(scopeX + scopeW - 30, targetY);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 12px monospace';
    ctx.fillText('SETPOINT: 1.000 rad', scopeX + 40, targetY - 8);

    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(scopeX + 30, 310);
    ctx.bezierCurveTo(scopeX + 90, 310, scopeX + 120, targetY - 32, scopeX + 160, targetY - 26);
    ctx.bezierCurveTo(scopeX + 195, targetY - 20, scopeX + 230, targetY + 8, scopeX + 270, targetY);
    ctx.lineTo(scopeX + scopeW - 30, targetY);
    ctx.stroke();

    ctx.fillStyle = '#22c55e';
    ctx.font = 'bold 12px monospace';
    ctx.fillText('Rise Time (Tr): 120 ms', scopeX + 30, 375);
    ctx.fillText('Overshoot (Mp): 8.0%', scopeX + 220, 375);
    ctx.fillText('Settling Time: 360 ms', scopeX + 30, 400);
    ctx.fillText('Steady Error (Ess): 0.00%', scopeX + 220, 400);

    ctx.fillStyle = '#020617';
    ctx.fillRect(scopeX + 10, 420, scopeW - 20, H - 446);
    ctx.fillStyle = '#4ade80';
    ctx.font = '12px monospace';
    ctx.fillText('[COM4 @ 115200] ESP32-S3 TELEMETRY STREAM:', scopeX + 20, 442);
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('[12:44:02.108] pos: 0.9998 rad | pwm: 142 | load: 0.38A | loop: 100Hz [LOCKED]', scopeX + 20, 466);
    ctx.fillText('[12:44:02.118] pos: 1.0001 rad | pwm: 141 | load: 0.38A | loop: 100Hz [LOCKED]', scopeX + 20, 488);
    ctx.fillText('[12:44:02.128] pos: 1.0000 rad | pwm: 142 | load: 0.38A | loop: 100Hz [LOCKED]', scopeX + 20, 510);

  } else {
    ctx.fillStyle = '#0d1117';
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = '#161b22';
    ctx.fillRect(0, 0, W, 36);
    ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.arc(22, 18, 6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#f59e0b'; ctx.beginPath(); ctx.arc(38, 18, 6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#22c55e'; ctx.beginPath(); ctx.arc(54, 18, 6, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 14px monospace';
    ctx.fillText('claude-code v1.2.0 · Opus 5.5 · antigravity-agent · [branch: main*]', 80, 23);

    ctx.fillStyle = '#8b949e';
    ctx.font = '14px monospace';
    ctx.fillText('engineer@tuf-f15:~/robotics_control$ claude', 30, 68);

    ctx.fillStyle = '#58a6ff';
    ctx.font = 'bold 15px monospace';
    ctx.fillText('> Optimiza el lazo PID y crea tarea FreeRTOS para control de motor en ESP32', 30, 96);

    ctx.fillStyle = '#161b22';
    ctx.fillRect(30, 114, W - 60, 115);
    ctx.strokeStyle = '#1f6feb';
    ctx.lineWidth = 2;
    ctx.strokeRect(30, 114, W - 60, 115);

    ctx.fillStyle = '#79c0ff';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('🧠 Thinking Process (Claude Code Opus 5.5):', 45, 138);

    ctx.font = '13px monospace';
    ctx.fillStyle = '#c9d1d9';
    ctx.fillText('1. Analizando dinámica del motor: Ts = 10ms (frecuencia = 100 Hz).', 45, 162);
    ctx.fillText('2. Implementando anti-windup clamping para evitar saturación del actuador en PWM 255.', 45, 184);
    ctx.fillText('3. Encapsulando en FreeRTOS Task con afinidad al Core 1 y prioridad configMAX_PRIORITIES - 2.', 45, 206);

    ctx.fillStyle = '#0d1117';
    ctx.fillRect(30, 240, W - 60, 210);
    ctx.strokeStyle = '#30363d';
    ctx.strokeRect(30, 240, W - 60, 210);

    ctx.fillStyle = '#8b949e';
    ctx.font = 'bold 12px monospace';
    ctx.fillText('diff --git a/firmware/motor_task.cpp b/firmware/motor_task.cpp', 45, 262);

    ctx.fillStyle = '#f85149';
    ctx.fillText('- void loop() { float pwm = Kp * error; analogWrite(PWM_PIN, pwm); }', 45, 290);

    ctx.fillStyle = '#3fb950';
    ctx.fillText('+ void vMotorControlTask(void *pvParameters) {', 45, 318);
    ctx.fillText('+   TickType_t xLastWakeTime = xTaskGetTickCount();', 45, 340);
    ctx.fillText('+   for(;;) {', 45, 362);
    ctx.fillText('+     float u = pid.compute(target_setpoint, current_feedback);', 45, 384);
    ctx.fillText('+     ledcWrite(PWM_CHANNEL, clamp_u8(u));', 45, 406);
    ctx.fillText('+     vTaskDelayUntil(&xLastWakeTime, pdMS_TO_TICKS(10));', 45, 428);
    ctx.fillText('+   }', 45, 450);

    ctx.fillStyle = '#14532d';
    ctx.fillRect(30, 465, W - 60, 44);
    ctx.fillStyle = '#4ade80';
    ctx.font = 'bold 15px monospace';
    ctx.fillText('✔ PASS: 14/14 tests passing (42ms) · 0 memory leaks · FreeRTOS Core 1 Task RUNNING', 45, 493);

    ctx.fillStyle = '#161b22';
    ctx.fillRect(0, H - 32, W, 32);
    ctx.fillStyle = '#8b949e';
    ctx.font = '12px monospace';
    ctx.fillText('Model: Opus 5.5  |  Tokens: 4,820 prompt / 680 completion  |  Latency: 1.1s  |  Cost: $0.024', 24, H - 11);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function createMonitorScreenTexture(mode = 'setup') {
  if (mode === 'tv') {
    return createTVScreenTexture('lofi');
  }
  if (mode === 'vertical_code') {
    return createWorkflowScreenTexture('claude_code', 'vertical_monitor');
  }
  const wf = (mode === 'claude_code' || mode === 'pcb_kicad' || mode === 'control_firmware') ? mode : 'claude_code';
  return createWorkflowScreenTexture(wf, 'main_monitor');
}

export function createTVScreenTexture(mode = 'lofi') {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 576;
  const ctx = canvas.getContext('2d');

  if (mode === 'off') {
    ctx.fillStyle = '#06070a';
    ctx.fillRect(0, 0, 1024, 576);
    const rGrad = ctx.createLinearGradient(0, 0, 1024, 576);
    rGrad.addColorStop(0, 'rgba(255,255,255,0.02)');
    rGrad.addColorStop(0.5, 'rgba(255,255,255,0.05)');
    rGrad.addColorStop(1, 'rgba(255,255,255,0.01)');
    ctx.fillStyle = rGrad;
    ctx.fillRect(0, 0, 1024, 576);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }

  if (mode === 'match') {
    const grad = ctx.createLinearGradient(0, 0, 1024, 576);
    grad.addColorStop(0, '#090f1d');
    grad.addColorStop(0.5, '#111c32');
    grad.addColorStop(1, '#060a12');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 576);

    const pitchGrad = ctx.createLinearGradient(0, 60, 0, 520);
    pitchGrad.addColorStop(0, '#0f172a');
    pitchGrad.addColorStop(0.30, '#15803d');
    pitchGrad.addColorStop(0.70, '#166534');
    pitchGrad.addColorStop(1, '#14532d');
    ctx.fillStyle = pitchGrad;
    ctx.fillRect(28, 28, 968, 520);
    ctx.strokeStyle = 'rgba(255,255,255,0.7)';
    ctx.lineWidth = 4;
    ctx.strokeRect(80, 140, 864, 370);
    ctx.beginPath();
    ctx.arc(512, 325, 80, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
    ctx.fillRect(60, 50, 420, 58);
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText('⚽ LIGA MX / UCL EN VIVO', 80, 86);
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 24px monospace';
    ctx.fillText('AME 2 - 1 GDL  78:40', 270, 87);
  } else if (mode === 'tech') {
    ctx.fillStyle = '#0a0d14';
    ctx.fillRect(0, 0, 1024, 576);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(20, 20, 984, 536);

    ctx.fillStyle = '#090d16';
    ctx.fillRect(36, 36, 680, 440);
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let x = 40; x < 710; x += 6) {
      const y = 250 + Math.sin(x * 0.04) * 60 + Math.cos(x * 0.09) * 25;
      if (x === 40) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();

    ctx.fillStyle = '#22c55e';
    ctx.font = 'bold 18px monospace';
    ctx.fillText('CH1: 24.5 kHz PWM  |  Vpp: 3.32V  |  Duty: 64%', 54, 70);

    ctx.fillStyle = '#334155';
    for (let i = 0; i < 4; i++) {
      ctx.fillRect(734, 46 + i * 110, 254, 96);
    }
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('▶ YouTube: Ben Eater 6502 & KiCad 8.0 Layout', 46, 516);
  } else if (mode === 'ambient') {
    ctx.fillStyle = '#1c1917';
    ctx.fillRect(0, 0, 1024, 576);
    ctx.fillStyle = '#f5f5f4';
    ctx.fillRect(40, 40, 944, 496);
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(60, 60, 904, 456);

    ctx.fillStyle = '#ea580c';
    ctx.beginPath(); ctx.arc(420, 288, 140, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#0284c7';
    ctx.beginPath(); ctx.arc(600, 288, 110, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath(); ctx.arc(512, 220, 65, 0, Math.PI * 2); ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = '300 48px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('10:42 AM', 512, 450);
    ctx.font = '16px sans-serif';
    ctx.fillText('CDMX · 22°C Despejado · The Frame Art Mode', 512, 480);
    ctx.textAlign = 'left';
  } else {
    // Modo lofi (Default para programar)
    const bgGrad = ctx.createLinearGradient(0, 0, 1024, 576);
    bgGrad.addColorStop(0, '#110e24');
    bgGrad.addColorStop(0.5, '#1e1b4b');
    bgGrad.addColorStop(1, '#0b0d17');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1024, 576);

    const sunGrad = ctx.createLinearGradient(512, 100, 512, 380);
    sunGrad.addColorStop(0, '#f43f5e');
    sunGrad.addColorStop(0.5, '#fb923c');
    sunGrad.addColorStop(1, '#fbbf24');
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(512, 240, 120, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#c084fc';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (let x = 60; x <= 964; x += 60) {
      ctx.moveTo(512, 240);
      ctx.lineTo(x, 576);
    }
    for (let y = 300; y <= 576; y += 32) {
      ctx.moveTo(0, y);
      ctx.lineTo(1024, y);
    }
    ctx.stroke();

    ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
    ctx.fillRect(40, 40, 520, 80);
    ctx.fillStyle = '#f43f5e';
    ctx.beginPath(); ctx.arc(75, 80, 14, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('YouTube Music · Lo-Fi Synthwave Coding Stream', 105, 75);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '15px monospace';
    ctx.fillText('🎵 "Midnight City" - Chill beats to program / study', 105, 102);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function createTabletScreenTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 768;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, 512, 768);

  ctx.fillStyle = '#1e293b';
  ctx.fillRect(0, 0, 512, 44);
  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 15px sans-serif';
  ctx.fillText('9:41', 24, 28);
  ctx.textAlign = 'right';
  ctx.fillText('🔋 96%  |  Wi-Fi 6', 488, 28);
  ctx.textAlign = 'left';

  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 19px sans-serif';
  ctx.fillText('⚡ ESP32-S3 Hardware Pinout', 24, 82);
  ctx.fillStyle = '#94a3b8';
  ctx.font = '13px monospace';
  ctx.fillText('KiCad 8.0 Companion · Schematics Viewer', 24, 104);

  ctx.fillStyle = '#1e293b';
  ctx.fillRect(20, 124, 472, 380);
  ctx.strokeStyle = '#334155';
  ctx.strokeRect(20, 124, 472, 380);

  ctx.fillStyle = '#0f172a';
  ctx.fillRect(160, 160, 192, 280);
  ctx.fillStyle = '#e2e8f0';
  ctx.font = 'bold 16px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('ESP32-S3', 256, 280);
  ctx.font = '12px monospace';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('Xtensa Dual 240MHz', 256, 305);
  ctx.textAlign = 'left';

  const pins = ['3V3', 'GND', 'IO1 (TX)', 'IO2 (RX)', 'IO10 (SDA)', 'IO11 (SCL)', 'IO14 (PWM)'];
  pins.forEach((p, i) => {
    ctx.fillStyle = p.includes('3V3') ? '#ef4444' : p.includes('GND') ? '#64748b' : '#22c55e';
    ctx.fillRect(36, 170 + i * 36, 95, 24);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 11px monospace';
    ctx.fillText(p, 42, 186 + i * 36);

    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(380, 170 + i * 36, 95, 24);
    ctx.fillStyle = '#ffffff';
    ctx.fillText('ADC_' + (i + 1), 395, 186 + i * 36);
  });

  ctx.fillStyle = '#1e293b';
  ctx.fillRect(20, 524, 472, 210);
  ctx.fillStyle = '#22c55e';
  ctx.font = 'bold 16px sans-serif';
  ctx.fillText('🎧 Spotify Companion', 40, 558);
  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 18px sans-serif';
  ctx.fillText('Resonance (Synthwave)', 40, 595);
  ctx.fillStyle = '#94a3b8';
  ctx.font = '14px sans-serif';
  ctx.fillText('HOME · Odyssey Album', 40, 622);

  ctx.fillStyle = '#334155';
  ctx.fillRect(40, 650, 432, 6);
  ctx.fillStyle = '#22c55e';
  ctx.fillRect(40, 650, 270, 6);

  ctx.fillStyle = '#f8fafc';
  ctx.font = '24px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('⏮   ⏸   ⏭', 256, 705);
  ctx.textAlign = 'left';

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

function addLogitechMxKeysMini(group, darkMetal, chromeMat, { showGadgets = true } = {}) {
  const chassisMat = new THREE.MeshStandardMaterial({ color: 0x262b34, roughness: 0.32, metalness: 0.55 });
  const keyCapMat = new THREE.MeshStandardMaterial({
    map: sharedMxKeysTex,
    roughness: 0.45,
    metalness: 0.12,
    emissive: new THREE.Color(0xcbd5e1),
    emissiveMap: sharedMxKeysTex,
    emissiveIntensity: 0.22
  });

  // Teclado Logitech MX Keys Mini (29.6 × 13.2 cm) con textura real de teclas orientadas correctamente
  group.add(box(0.132, 0.011, 0.296, chassisMat, 0.095, 0.009, 0.04));
  group.add(cyl(0.007, 0.007, 0.296, 14, chromeMat, 0.034, 0.014, 0.04).rotateX(Math.PI / 2));
  const keyBed = new THREE.Mesh(new THREE.PlaneGeometry(0.284, 0.118), keyCapMat);
  keyBed.rotation.order = 'YXZ';
  keyBed.rotation.x = -Math.PI / 2;
  keyBed.rotation.y = Math.PI / 2;
  keyBed.position.set(0.100, 0.0156, 0.04);
  keyBed.receiveShadow = true;
  group.add(keyBed);

  // Mouse ergonómico grafito a la derecha del teclado
  const mouseGroup = new THREE.Group();
  mouseGroup.position.set(0.095, 0.006, -0.185);
  const mouseMat = new THREE.MeshStandardMaterial({ color: 0x1e222b, roughness: 0.36, metalness: 0.22 });
  mouseGroup.add(box(0.112, 0.034, 0.070, mouseMat, 0, 0.017, 0));
  mouseGroup.add(cyl(0.0085, 0.0085, 0.014, 14, chromeMat, -0.030, 0.034, 0));
  group.add(mouseGroup);

  // UGREEN HUB USB-C 7-en-1 montado en soporte impreso en 3D bajo el borde del escritorio (mesa 100% limpia)
  const hubGroup = new THREE.Group();
  hubGroup.position.set(0.162, -0.040, -0.245);
  const plaBlackMat = new THREE.MeshStandardMaterial({ color: 0x181b22, roughness: 0.48, metalness: 0.14 });
  const ugreenAluMat = new THREE.MeshStandardMaterial({ color: 0x6b7280, roughness: 0.24, metalness: 0.88 });
  // Bracket impreso en 3D (PLA+ negro mate) atornillado/pegado bajo la tabla de 3 cm
  hubGroup.add(box(0.044, 0.006, 0.134, plaBlackMat, 0, 0.011, 0));
  hubGroup.add(box(0.044, 0.018, 0.008, plaBlackMat, 0, 0.002, -0.064));
  hubGroup.add(box(0.044, 0.018, 0.008, plaBlackMat, 0, 0.002, 0.064));
  // Cuerpo de aluminio del Hub UGREEN 7-en-1 deslizado dentro del soporte 3D
  hubGroup.add(box(0.034, 0.012, 0.122, ugreenAluMat, 0, 0.002, 0));
  // Puertos USB-A / SD / TF accesibles mirando al frente hacia ti
  hubGroup.add(box(0.004, 0.006, 0.014, darkMetal, 0.017, 0.002, -0.032));
  hubGroup.add(box(0.004, 0.006, 0.014, darkMetal, 0.017, 0.002, -0.008));
  hubGroup.add(box(0.004, 0.004, 0.022, darkMetal, 0.017, 0.002, 0.025));
  hubGroup.add(cyl(0.0018, 0.0018, 0.004, 8, new THREE.MeshBasicMaterial({ color: 0x38bdf8 }), 0.017, 0.002, 0.046).rotateZ(Math.PI / 2));
  // Adaptador UGREEN Bluetooth 6.0 USB conectado discretamente al Hub
  hubGroup.add(box(0.020, 0.008, 0.014, darkMetal, 0.026, 0.002, -0.032));
  hubGroup.userData = { isSubGadget: 'ugreen_hub_7in1' };
  group.add(hubGroup);

  if (showGadgets) {
    const ulanzi = new THREE.Group();
    ulanzi.position.set(-0.088, 0.034, 0.04);
    ulanzi.add(box(0.030, 0.064, 0.192, darkMetal, 0, 0, 0));
    const ulanziScreenMat = new THREE.MeshBasicMaterial({ map: createUlanziClockTexture() });
    ulanzi.add(box(0.004, 0.050, 0.178, ulanziScreenMat, 0.014, 0, 0));
    ulanzi.userData = { isSubGadget: 'ulanzi_tc001' };
    group.add(ulanzi);

    const geek = new THREE.Group();
    geek.position.set(-0.088, 0.025, -0.14);
    geek.rotation.y = -0.25;
    geek.add(box(0.040, 0.046, 0.044, darkMetal, 0, 0, 0));
    geek.add(box(0.004, 0.034, 0.034, new THREE.MeshBasicMaterial({ color: 0xf59e0b }), 0.019, 0.002, 0));
    group.add(geek);
  }
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
const sharedWoodBumpTex = createWoodBumpTexture();
const sharedBlackWoodTex = createWoodGrainTexture('#1a1d24', 'rgba(0,0,0,0.22)', 'rgba(255,255,255,0.032)');
const sharedGrayWoodTex = createWoodGrainTexture('#505660', 'rgba(18,22,28,0.18)', 'rgba(255,255,255,0.04)');
const sharedWalnutTex = createWoodGrainTexture('#784c30', 'rgba(35,18,8,0.28)', 'rgba(255,215,175,0.05)');
const sharedFeltPadTex = createFeltDeskpadTexture();
const sharedMxKeysTex = createMxKeysMiniTexture();
const sharedMultiboardTex = createMultiboardTexture();
const sharedHswHexTex = createHswHexTexture();
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

  const darkMetal = new THREE.MeshStandardMaterial({ color: 0x1a1d24, roughness: 0.28, metalness: 0.78 });
  const blackMelamine = new THREE.MeshStandardMaterial({
    map: sharedBlackWoodTex,
    bumpMap: sharedWoodBumpTex,
    bumpScale: 0.0035,
    roughness: 0.42,
    metalness: 0.08
  });
  const grayMelamine = new THREE.MeshStandardMaterial({
    map: sharedGrayWoodTex,
    bumpMap: sharedWoodBumpTex,
    bumpScale: 0.0035,
    roughness: 0.46,
    metalness: 0.08
  });
  const darkGrayMelamine = new THREE.MeshStandardMaterial({
    color: 0x2f343e,
    bumpMap: sharedWoodBumpTex,
    bumpScale: 0.0025,
    roughness: 0.45,
    metalness: 0.10
  });
  const walnutWood = new THREE.MeshStandardMaterial({
    map: sharedWalnutTex,
    bumpMap: sharedWoodBumpTex,
    bumpScale: 0.0045,
    roughness: 0.38,
    metalness: 0.06
  });
  const chromeMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.14, metalness: 0.92 });
  const ballMat = new THREE.MeshStandardMaterial({ map: sharedBallTex, roughness: 0.32 });

  switch (itemData.type) {
    // ========================================================================
    // MUEBLES BASE ACTUALES (CALIBRADOS SIN TRASLAPE · ACABADOS PREMIUM)
    // ========================================================================
    case 'l_desk': {
      // Medidas reales exactas: 1.20 m × 1.20 m exterior · 0.40 m fondo de tabla · 0.80 m × 0.80 m interior de la L
      const deskH = h;
      const leftWingW = 0.40;
      const topWingD = 0.40;
      const leftX = -w / 2 + leftWingW / 2;
      group.add(box(leftWingW, 0.03, d, blackMelamine, leftX, deskH - 0.015, 0));

      const topZ = -d / 2 + topWingD / 2;
      group.add(box(w, 0.03, topWingD, blackMelamine, 0, deskH - 0.015, topZ));

      // Elevación esquinera (ajustada al cuadrado de 40 × 40 cm de la esquina)
      group.add(box(0.36, 0.13, 0.36, blackMelamine, -w / 2 + 0.19, deskH + 0.065, -d / 2 + 0.19));
      group.add(box(leftWingW - 0.02, deskH - 0.03, 0.03, blackMelamine, leftX, (deskH - 0.03) / 2, d / 2 - 0.02));
      group.add(box(0.03, deskH - 0.03, d - 0.04, blackMelamine, -w / 2 + 0.02, (deskH - 0.03) / 2, 0));

      // Canaleta metálica ocultacables discreta debajo del ala principal
      group.add(box(0.10, 0.055, 0.62, darkMetal, -w / 2 + 0.11, deskH - 0.058, 0.10));

      // Módulo lateral derecho abierto con 2 entrepaños + cajitas cerradas negras de componentes guardados
      const shelfW = 0.28;
      const rightX = w / 2 - shelfW / 2;
      // Laterales y entrepaños del librerito lateral
      group.add(box(0.02, deskH - 0.03, topWingD - 0.02, blackMelamine, rightX - shelfW / 2 + 0.01, (deskH - 0.03) / 2, topZ));
      group.add(box(0.02, deskH - 0.03, topWingD - 0.02, blackMelamine, rightX + shelfW / 2 - 0.01, (deskH - 0.03) / 2, topZ));
      group.add(box(shelfW, deskH - 0.03, 0.018, blackMelamine, rightX, (deskH - 0.03) / 2, topZ - topWingD / 2 + 0.02));
      [0.08, 0.38].forEach((sy) => {
        group.add(box(shelfW - 0.02, 0.02, topWingD - 0.03, blackMelamine, rightX, sy, topZ));
      });

      // Cajas organizadoras negro mate + acrílico ahumado guardando componentes electrónicos fuera de la mesa
      const compBoxMat = new THREE.MeshStandardMaterial({ color: 0x1e222a, roughness: 0.48, metalness: 0.15 });
      const compLidMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.35, metalness: 0.25 });
      const compLabelMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.6 });
      // Caja superior (ESP32, sensores y cables)
      group.add(box(shelfW - 0.06, 0.11, topWingD - 0.09, compBoxMat, rightX, 0.455, topZ + 0.01));
      group.add(box(shelfW - 0.052, 0.016, topWingD - 0.082, compLidMat, rightX, 0.515, topZ + 0.01));
      group.add(box(0.065, 0.022, 0.004, compLabelMat, rightX, 0.46, topZ + (topWingD - 0.09) / 2 + 0.012));
      // Caja inferior (cautín, multímetro y herramientas guardadas)
      group.add(box(shelfW - 0.06, 0.15, topWingD - 0.09, compBoxMat, rightX, 0.175, topZ + 0.01));
      group.add(box(shelfW - 0.052, 0.016, topWingD - 0.082, compLidMat, rightX, 0.255, topZ + 0.01));
      group.add(box(0.065, 0.022, 0.004, compLabelMat, rightX, 0.18, topZ + (topWingD - 0.09) / 2 + 0.012));
      break;
    }

    case 'tv_wall': {
      group.add(box(0.05, 0.18, 0.24, darkMetal, -w / 2 + 0.025, h / 2, 0));
      group.add(box(0.035, h, d, blackMelamine, 0.02, h / 2, 0));
      const tvMat = new THREE.MeshBasicMaterial({ map: createTVScreenTexture('lofi') });
      const tvMesh = box(0.008, h - 0.035, d - 0.035, tvMat, 0.04, h / 2, 0);
      tvMesh.userData = { isFurniture: true, id: itemData.id, isScreen: 'tv' };
      group.add(tvMesh);
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
      const leftX = -w / 2 + 0.20;
      const topZ = -d / 2 + 0.20;
      const rightX = w / 2 - 0.14;

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
    // ZONA 1: SETUPS CALIBRADOS PARA ESCRITORIO 1.20×1.20 m (40 cm DE FONDO)
    // ========================================================================
    case 'vibe_setup_owned': {
      // Lo que ya compraste puesto sobre la mesa de 40 cm con la base V de fábrica del Samsung Odyssey G300
      const frameMat = new THREE.MeshStandardMaterial({ color: 0x0d1017, roughness: 0.28, metalness: 0.45 });
      const scrMat = new THREE.MeshBasicMaterial({ map: sharedSetupScrTex });

      // Base en V real del Samsung 24" Odyssey G300 (~20 cm de fondo ocupados sobre la tabla de 40 cm)
      group.add(box(0.036, 0.17, 0.048, darkMetal, -0.115, 0.085, 0));
      const legL = box(0.20, 0.012, 0.024, darkMetal, -0.055, 0.008, 0.11);
      legL.rotation.y = -0.52;
      group.add(legL);
      const legR = box(0.20, 0.012, 0.024, darkMetal, -0.055, 0.008, -0.11);
      legR.rotation.y = 0.52;
      group.add(legR);

      // Panel Samsung 24" Odyssey G300 FHD 200Hz (54.4 × 33.3 cm)
      group.add(box(0.022, 0.333, 0.544, frameMat, -0.085, 0.245, 0));
      const scrMesh = box(0.006, 0.312, 0.526, scrMat, -0.071, 0.245, 0);
      scrMesh.userData = { isFurniture: true, id: itemData.id, isScreen: 'main_monitor' };
      group.add(scrMesh);

      // MX Keys Mini + Mouse + Hub UGREEN 7-en-1 + BT 6.0 + Cable DP 1.4
      addLogitechMxKeysMini(group, darkMetal, chromeMat, { showGadgets: false });
      break;
    }

    case 'vibe_setup_27':
    case 'vibe_setup_dual':
    case 'vibe_setup_34': {
      const isDual = itemData.type === 'vibe_setup_dual';
      const is34 = itemData.type === 'vibe_setup_34';

      // Deskpad de fieltro tejido grafito calibrado al fondo de 40 cm (34 cm fondo × 74 cm largo)
      const padMat = new THREE.MeshStandardMaterial({
        map: sharedFeltPadTex,
        bumpMap: sharedFeltPadTex,
        bumpScale: 0.002,
        roughness: 0.94,
        metalness: 0.02
      });
      group.add(box(0.34, 0.004, is34 || isDual ? 0.76 : 0.72, padMat, 0.02, 0.002, 0));

      // Prensa de brazo hidráulico NB F80 / H180 al borde trasero de la mesa (x = -0.178)
      group.add(cyl(0.022, 0.026, 0.35, 14, darkMetal, -0.178, 0.175, -0.08));
      group.add(box(0.09, 0.026, 0.14, darkMetal, -0.145, 0.28, -0.03));

      const frameMat = new THREE.MeshStandardMaterial({ color: 0x0d1017, roughness: 0.28, metalness: 0.45 });
      const scrMat = new THREE.MeshBasicMaterial({ map: sharedSetupScrTex });
      const vertScrMat = new THREE.MeshBasicMaterial({ map: sharedVertScrTex });

      if (isDual) {
        // Samsung 24" Odyssey G300 principal + 24" Vertical en brazo doble
        group.add(box(0.022, 0.333, 0.544, frameMat, -0.115, 0.28, -0.09));
        const scrMesh = box(0.006, 0.312, 0.526, scrMat, -0.101, 0.28, -0.09);
        scrMesh.userData = { isFurniture: true, id: itemData.id, isScreen: 'main_monitor' };
        group.add(scrMesh);

        const vertMon = new THREE.Group();
        vertMon.position.set(-0.075, 0.295, 0.31);
        vertMon.rotation.y = -0.35;
        vertMon.add(box(0.02, 0.48, 0.28, frameMat, 0, 0, 0));
        const vertScrMesh = box(0.006, 0.46, 0.26, vertScrMat, 0.011, 0, 0);
        vertScrMesh.userData = { isFurniture: true, id: itemData.id, isScreen: 'vertical_monitor' };
        vertMon.add(vertScrMesh);
        group.add(vertMon);
      } else if (is34) {
        const monW = 0.76;
        const monH = 0.34;
        const segW = monW / 3;
        [-1, 0, 1].forEach((idx) => {
          const segGroup = new THREE.Group();
          segGroup.position.set(-0.115 + Math.abs(idx) * 0.024, 0.28, idx * (segW - 0.004));
          segGroup.rotation.y = -idx * 0.17;
          segGroup.add(box(0.02, monH, segW, frameMat, 0, 0, 0));
          const scrMesh = box(0.005, monH - 0.022, segW - 0.01, scrMat, 0.012, 0, 0);
          scrMesh.userData = { isFurniture: true, id: itemData.id, isScreen: 'main_monitor' };
          segGroup.add(scrMesh);
          group.add(segGroup);
        });
      } else {
        // Tu Monitor Samsung 24" Odyssey G300 FHD 200Hz (54.4 × 33.3 cm) flotando en brazo NB F80
        group.add(box(0.022, 0.333, 0.544, frameMat, -0.115, 0.28, 0));
        const scrMesh = box(0.006, 0.312, 0.526, scrMat, -0.101, 0.28, 0);
        scrMesh.userData = { isFurniture: true, id: itemData.id, isScreen: 'main_monitor' };
        group.add(scrMesh);
      }

      const barZ = isDual ? -0.09 : 0;
      const barMesh = box(0.024, 0.016, 0.40, new THREE.MeshBasicMaterial({ color: 0xfef3c7 }), -0.085, 0.455, barZ);
      barMesh.userData = { isMonitorLightBarMesh: true };
      group.add(barMesh);
      group.add(cyl(0.018, 0.018, 0.016, 16, darkMetal, 0.015, 0.010, -0.08));

      addLogitechMxKeysMini(group, darkMetal, chromeMat, { showGadgets: true });

      // ======================================================================
      // ALA PRINCIPAL ULTRA-LIMPIA (SOLO MULTICONTACTO OCULTO + CLIPS 3D)
      // (Tu Alexa Echo Dot blanca y tu Tablet pasan al ala bajo la ventana)
      // ======================================================================

      // 1. Multicontacto Inteligente WiFi Tuya Negro Mate (oculto al borde trasero x = -0.168)
      const stripGroup = new THREE.Group();
      stripGroup.position.set(-0.168, 0.012, -0.25);
      const matteStripMat = new THREE.MeshStandardMaterial({ color: 0x161920, roughness: 0.38, metalness: 0.35 });
      stripGroup.add(box(0.050, 0.022, 0.21, matteStripMat, 0, 0, 0));
      stripGroup.add(box(0.016, 0.006, 0.020, new THREE.MeshBasicMaterial({ color: 0xef4444 }), 0, 0.012, -0.080));
      const socketMat = new THREE.MeshStandardMaterial({ color: 0x272d38, roughness: 0.55 });
      [-0.042, -0.002, 0.038, 0.078].forEach((sz, idx) => {
        stripGroup.add(box(0.030, 0.003, 0.024, socketMat, 0, 0.0115, sz));
        const outLed = cyl(0.0018, 0.0018, 0.004, 8, new THREE.MeshBasicMaterial({ color: 0x22c55e }), 0.019, 0.012, sz);
        outLed.userData = { isOutletLed: idx + 1 };
        stripGroup.add(outLed);
      });
      stripGroup.add(box(0.024, 0.002, 0.012, new THREE.MeshStandardMaterial({ color: 0x0f172a }), 0, 0.0115, 0.098));
      const usbLed = cyl(0.0016, 0.0016, 0.004, 8, new THREE.MeshBasicMaterial({ color: 0x38bdf8 }), 0.019, 0.012, 0.098);
      usbLed.userData = { isOutletLed: 'usb' };
      stripGroup.add(usbLed);
      const cableMat = new THREE.MeshStandardMaterial({ color: 0x111318, roughness: 0.78 });
      stripGroup.add(cyl(0.005, 0.005, 0.28, 8, cableMat, -0.015, -0.12, -0.10));
      stripGroup.userData = { isSubGadget: 'smart_power_strip' };
      group.add(stripGroup);

      // 2. Peine / Clips Magnéticos Impresos en 3D en el Borde Frontal (+0.178)
      const clipBar = box(0.014, 0.006, 0.090, darkMetal, 0.178, 0.004, 0.23);
      [[-0.026, 0x64748b], [0, 0x334155], [0.026, 0x38bdf8]].forEach(([cz, col]) => {
        clipBar.add(cyl(0.0045, 0.0045, 0.007, 10, new THREE.MeshStandardMaterial({ color: col }), 0, 0.005, cz));
      });
      clipBar.userData = { isSubGadget: 'baseus_clips' };
      group.add(clipBar);
      break;
    }

    // ========================================================================
    // ZONA 2: ORGANIZADOR DE PARED MODULAR IMPRESO EN 3D (MULTIBOARD / HSW)
    //         + ALA VENTANA (ECHO DOT BLANCA + TABLET 3D + GRIDFINITY)
    // ========================================================================
    case 'yolispa_pegboard':
    case 'yolispa_pegboard_double': {
      const isHsw = itemData.type === 'yolispa_pegboard_double';
      const panelTex = isHsw ? sharedHswHexTex : sharedMultiboardTex;
      const boardMat = new THREE.MeshStandardMaterial({
        map: panelTex,
        bumpMap: panelTex,
        bumpScale: isHsw ? 0.006 : 0.005,
        roughness: 0.48,
        metalness: 0.18
      });
      const plaMatteMat = new THREE.MeshStandardMaterial({ color: 0x252a34, roughness: 0.50, metalness: 0.14 });
      const plaSandMat = new THREE.MeshStandardMaterial({ color: 0xe2dbd0, roughness: 0.62 });
      const sageMat = new THREE.MeshStandardMaterial({ color: 0x4d7c5b, roughness: 0.72 });

      // 4 Módulos impresos en 3D (19×23 cm c/u para cama de 25×25 cm) en PLA+ Negro Mate
      group.add(box(0.015, h, d, boardMat, 0, h / 2, 0));

      // Contenedor modular Multibin / HSW impreso en 3D (arriba izquierda) + estuche de precisión
      group.add(box(0.058, 0.082, 0.084, plaMatteMat, 0.034, h * 0.72, -d * 0.24));
      group.add(box(0.020, 0.110, 0.050, darkMetal, 0.030, h * 0.77, -d * 0.24));

      // Repisita impresa en 3D con mini maceta acanalada PLA arena + cable USB-C enrollado en gancho 3D
      group.add(box(0.076, 0.013, 0.18, plaMatteMat, 0.042, h * 0.30, -0.04));
      group.add(cyl(0.026, 0.022, 0.044, 14, plaSandMat, 0.042, h * 0.33, -0.09));
      group.add(new THREE.Mesh(new THREE.SphereGeometry(0.030, 14, 14), sageMat).translateX(0.042).translateY(h * 0.37).translateZ(-0.09));
      const coiledCable = new THREE.Mesh(new THREE.TorusGeometry(0.026, 0.0042, 10, 20), darkMetal);
      coiledCable.rotation.y = Math.PI / 2;
      coiledCable.position.set(0.032, h * 0.35, 0.02);
      group.add(coiledCable);

      // Gancho impreso en 3D + Audífonos over-ear negro mate colgados a la derecha
      group.add(box(0.056, 0.012, 0.024, plaMatteMat, 0.032, h * 0.77, d * 0.22));
      const hp = new THREE.Mesh(new THREE.TorusGeometry(0.064, 0.011, 14, 28), darkMetal);
      hp.rotation.y = Math.PI / 2;
      hp.position.set(0.035, h * 0.70, d * 0.22);
      group.add(hp);
      group.add(cyl(0.027, 0.027, 0.022, 16, plaMatteMat, 0.035, h * 0.63, d * 0.168).rotateX(Math.PI / 2));
      group.add(cyl(0.027, 0.027, 0.022, 16, plaMatteMat, 0.035, h * 0.63, d * 0.272).rotateX(Math.PI / 2));

      if (isHsw) {
        // Módulo HSW adicional inferior derecho: bandeja hexagonal + estuche compacto negro mate
        group.add(box(0.072, 0.013, 0.14, plaMatteMat, 0.040, h * 0.30, d * 0.24));
        group.add(box(0.048, 0.042, 0.095, darkMetal, 0.040, h * 0.33, d * 0.24));
      }
      break;
    }

    case 'engineer_maker_station': {
      // ALA VENTANA LIMPIA (80 × 40 cm): Tu Echo Dot Blanca + Tu Tablet en base 3D + Maceta 3D + Gridfinity debajo
      const plaBlackMat = new THREE.MeshStandardMaterial({ color: 0x1c2028, roughness: 0.48, metalness: 0.16 });
      const plaSandMat = new THREE.MeshStandardMaterial({ color: 0xe6dfd5, roughness: 0.62 });
      const sageMat = new THREE.MeshStandardMaterial({ color: 0x4d7c5b, roughness: 0.72 });
      const matteSlate = new THREE.MeshStandardMaterial({ color: 0x252a34, roughness: 0.42, metalness: 0.25 });

      // 1. TU ALEXA ECHO DOT BLANCA (Esfera 4ta/5ta Gen) sobre trípode minimalista impreso en 3D
      const alexaGroup = new THREE.Group();
      alexaGroup.position.set(-0.22, 0.0, -0.07);
      // Trípode minimalista de 3 patas impreso en 3D (eleva 2.2 cm y destaca el anillo LED cian)
      [0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].forEach((ang) => {
        const leg = cyl(0.0045, 0.0035, 0.032, 10, walnutWood, Math.cos(ang) * 0.028, 0.014, Math.sin(ang) * 0.028);
        leg.rotation.z = Math.cos(ang) * 0.26;
        leg.rotation.x = -Math.sin(ang) * 0.26;
        alexaGroup.add(leg);
      });
      alexaGroup.add(cyl(0.032, 0.034, 0.006, 20, plaBlackMat, 0, 0.025, 0));
      // Anillo LED cian característico en la base de la Echo Dot blanca
      const echoRing = new THREE.Mesh(
        new THREE.TorusGeometry(0.036, 0.0042, 12, 32),
        new THREE.MeshBasicMaterial({ color: 0x00f0ff })
      );
      echoRing.rotation.x = Math.PI / 2;
      echoRing.position.set(0, 0.031, 0);
      echoRing.userData = { isAlexaRing: true };
      alexaGroup.add(echoRing);
      // Base blanca mate inferior
      const whiteBaseMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.35, metalness: 0.05 });
      alexaGroup.add(cyl(0.044, 0.036, 0.018, 24, whiteBaseMat, 0, 0.038, 0));
      // Esfera acústica de tela blanca glacial (Echo Dot blanca)
      const whiteFabricMat = new THREE.MeshStandardMaterial({ color: 0xf1f3f6, roughness: 0.88, metalness: 0.02 });
      const echoSphere = new THREE.Mesh(new THREE.SphereGeometry(0.048, 26, 20), whiteFabricMat);
      echoSphere.scale.set(1, 0.90, 1);
      echoSphere.position.set(0, 0.068, 0);
      echoSphere.castShadow = true;
      alexaGroup.add(echoSphere);
      // Botones sutiles en la corona superior
      [[-0.012, 0], [0.012, 0], [0, -0.012], [0, 0.012]].forEach(([bx, bz]) => {
        alexaGroup.add(cyl(0.0025, 0.0025, 0.002, 8, new THREE.MeshStandardMaterial({ color: 0xcbd5e1 }), bx, 0.111, bz));
      });
      // Resplandor cian suave sobre la madera negra del escritorio
      const alexaGlow = new THREE.PointLight(0x00f0ff, 0.45, 0.65);
      alexaGlow.position.set(0, 0.022, 0.01);
      alexaGlow.userData = { isAlexaGlow: true };
      alexaGroup.add(alexaGlow);
      alexaGroup.userData = { isSubGadget: 'alexa_echo' };
      group.add(alexaGroup);

      // 2. TU TABLET EN BASE ERGONÓMICA IMPRESA EN 3D (orientada hacia tu silla, ángulo 60°)
      const tabletGroup = new THREE.Group();
      tabletGroup.position.set(-0.02, 0.0, -0.06);
      tabletGroup.rotation.y = -0.26;
      // Soporte impreso en 3D (PLA+ negro mate, minimalista en forma de A)
      tabletGroup.add(box(0.11, 0.006, 0.115, plaBlackMat, 0, 0.003, 0));
      const standBack = box(0.095, 0.125, 0.010, plaBlackMat, 0, 0.062, -0.028);
      standBack.rotation.x = -0.32;
      tabletGroup.add(standBack);
      tabletGroup.add(box(0.11, 0.016, 0.014, plaBlackMat, 0, 0.011, 0.044));
      // Cuerpo de la Tablet (vertical hacia el usuario, con pantalla Spotify + Pinout)
      const tabletBodyMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.82, roughness: 0.28 });
      const tabletBody = box(0.154, 0.218, 0.007, tabletBodyMat, 0, 0.112, 0.002);
      tabletBody.rotation.x = -0.32;
      const tabletScreenMat = new THREE.MeshBasicMaterial({ map: createTabletScreenTexture() });
      const tabletScreen = box(0.144, 0.208, 0.002, tabletScreenMat, 0, 0, 0.0045);
      tabletBody.add(tabletScreen);
      // Stylus magnético en el borde superior
      const stylus = cyl(0.0032, 0.0032, 0.142, 12, new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3 }), 0, 0.112, 0);
      stylus.rotation.z = Math.PI / 2;
      tabletBody.add(stylus);
      tabletGroup.add(tabletBody);
      tabletGroup.userData = { isSubGadget: 'tablet_companion' };
      group.add(tabletGroup);

      // 3. MACETA ACANALADA JAPANDI IMPRESA EN 3D (PLA Arena Mate con 12 estrías) + Suculenta
      const planterGroup = new THREE.Group();
      planterGroup.position.set(0.21, 0.0, -0.09);
      planterGroup.add(cyl(0.042, 0.036, 0.082, 20, plaSandMat, 0, 0.041, 0));
      for (let i = 0; i < 12; i++) {
        const ang = (i * Math.PI * 2) / 12;
        planterGroup.add(cyl(0.0055, 0.0048, 0.080, 8, plaSandMat, Math.cos(ang) * 0.039, 0.041, Math.sin(ang) * 0.039));
      }
      const soil = cyl(0.036, 0.036, 0.006, 16, new THREE.MeshStandardMaterial({ color: 0x3b2f26, roughness: 0.95 }), 0, 0.078, 0);
      planterGroup.add(soil);
      // Follaje en capas verde salvia
      [[0, 0.102, 0, 0.036], [-0.020, 0.096, 0.014, 0.024], [0.020, 0.098, -0.012, 0.026], [0.006, 0.118, 0.008, 0.022]].forEach(([lx, ly, lz, lr]) => {
        const lf = new THREE.Mesh(new THREE.SphereGeometry(lr, 14, 14), sageMat);
        lf.scale.set(1.05, 0.78, 1.05);
        lf.position.set(lx, ly, lz);
        planterGroup.add(lf);
      });
      group.add(planterGroup);

      // 4. ZONA LIBRE DE ESCRITURA + PORTAVASOS HEXAGONAL 3D + LIBRETA CERRADA
      // Portavasos hexagonal impreso en 3D (PLA negro mate)
      group.add(cyl(0.046, 0.046, 0.006, 6, plaBlackMat, -0.18, 0.003, 0.09));
      // Libreta negra mate cerrada + pluma metálica en el frente derecho
      group.add(box(0.145, 0.012, 0.195, matteSlate, 0.14, 0.006, 0.065));
      const pen = cyl(0.0038, 0.0038, 0.135, 10, chromeMat, 0.228, 0.010, 0.065);
      pen.rotation.x = Math.PI / 2;
      group.add(pen);

      // 5. CAJAS MODULARES GRIDFINITY RUGGED BOX (5×5 = 21×21 cm) IMPRESAS EN 3D GUARDADAS DEBAJO
      const gfBodyMat = new THREE.MeshStandardMaterial({ color: 0x191d25, roughness: 0.48, metalness: 0.14 });
      const gfLidMat = new THREE.MeshStandardMaterial({ color: 0x2c3340, roughness: 0.38, metalness: 0.22 });
      const gfLatchMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.40, metalness: 0.45 });
      const gfTagMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.55 });
      [0.080, 0.230].forEach((by) => {
        const yFloor = -0.75 + by;
        // Caja Gridfinity 5×5 (22 × 14 × 22 cm) apilable bajo el ala norte
        group.add(box(0.24, 0.132, 0.22, gfBodyMat, -0.02, yFloor, -0.04));
        group.add(box(0.248, 0.018, 0.228, gfLidMat, -0.02, yFloor + 0.072, -0.04));
        // Costillas verticales características de Gridfinity Rugged Box
        [-0.09, 0.09].forEach((rx) => {
          group.add(box(0.014, 0.136, 0.226, gfLidMat, -0.02 + rx, yFloor, -0.04));
        });
        // Broches frontales impresos en 3D + etiqueta limpia
        [-0.065, 0.065].forEach((lx) => {
          group.add(box(0.018, 0.036, 0.010, gfLatchMat, -0.02 + lx, yFloor + 0.048, 0.074));
        });
        group.add(box(0.075, 0.020, 0.004, gfTagMat, -0.02, yFloor - 0.008, 0.072));
      });
      break;
    }

    // ========================================================================
    // ZONA 3: 3 MODELOS DE REPISAS FLOTANTES (CALIBRADAS EN PARED SETUP)
    // ========================================================================
    case 'shelf_lack_110': {
      group.add(box(w, 0.044, d, blackMelamine, 0, 0.022, 0));
      group.add(box(0.14, 0.15, 0.036, new THREE.MeshStandardMaterial({ color: 0xe5e0d8, roughness: 0.72 }), 0, 0.11, -d * 0.26));
      group.add(box(0.13, 0.13, 0.030, new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.68 }), 0, 0.10, -d * 0.18));
      group.add(cyl(0.040, 0.032, 0.072, 18, new THREE.MeshStandardMaterial({ color: 0xe5e0d8, roughness: 0.62 }), 0, 0.078, d * 0.24));
      group.add(new THREE.Mesh(new THREE.SphereGeometry(0.052, 16, 16), new THREE.MeshStandardMaterial({ color: 0x4d7c5b, roughness: 0.72 })).translateY(0.135).translateZ(d * 0.24));
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
      const frontMat = new THREE.MeshStandardMaterial({
        map: sharedBlackWoodTex,
        bumpMap: sharedWoodBumpTex,
        bumpScale: 0.0025,
        color: 0xd4d8e0,
        roughness: 0.42,
        metalness: 0.10
      });
      for (let i = 0; i < 5; i++) {
        const dy = 0.08 + i * 0.132;
        group.add(box(0.02, 0.116, d - 0.026, frontMat, w / 2 + 0.004, dy, 0));
        // Tirador minimalista empotrado tipo ALEX
        group.add(box(0.006, 0.014, 0.095, darkMetal, w / 2 + 0.014, dy + 0.036, 0));
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
      const scr = box(0.30, 0.185, 0.004, new THREE.MeshBasicMaterial({ map: createWorkflowScreenTexture('claude_code', 'laptop') }), 0, 0.195, -0.078);
      scr.rotation.x = -0.14;
      scr.userData = { isFurniture: true, id: itemData.id, isScreen: 'laptop' };
      group.add(scr);
      break;
    }

    case 'dry_erase_whiteboard': {
      // Pizarrón blanco esmaltado con diagramas de ingeniería
      const alumMat = new THREE.MeshStandardMaterial({ color: 0xc8d1dc, metalness: 0.85, roughness: 0.25 });
      const cornerMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.5 });
      const whiteMat = new THREE.MeshStandardMaterial({
        map: createWhiteboardTexture(),
        roughness: 0.18,
        metalness: 0.05
      });

      // Tablero con diagramas de control PID y pinouts ESP32
      group.add(box(w, h, 0.016, whiteMat, 0, h / 2, 0));

      // Marco de aluminio perimetral
      const frameT = 0.018;
      group.add(box(w + frameT * 2, frameT, 0.024, alumMat, 0, h + frameT / 2, 0));
      group.add(box(w + frameT * 2, frameT, 0.024, alumMat, 0, -frameT / 2, 0));
      group.add(box(frameT, h, 0.024, alumMat, -w / 2 - frameT / 2, h / 2, 0));
      group.add(box(frameT, h, 0.024, alumMat, w / 2 + frameT / 2, h / 2, 0));

      // 4 esquineros plásticos oscuros
      [[-1, -1], [-1, 1], [1, -1], [1, 1]].forEach(([sx, sy]) => {
        const cx = sx * (w / 2 + frameT / 2);
        const cy = sy > 0 ? h + frameT / 2 : -frameT / 2;
        group.add(box(frameT * 1.3, frameT * 1.3, 0.026, cornerMat, cx, cy, 0));
      });

      // Charola inferior porta-plumones
      const trayW = w * 0.65;
      const trayD = 0.045;
      group.add(box(trayW, 0.008, trayD, alumMat, 0, -0.014, trayD / 2));
      group.add(box(trayW, 0.016, 0.006, alumMat, 0, -0.006, trayD));

      // Plumón Expo Negro en la charola
      const markerBlack = cyl(0.006, 0.006, 0.12, 10, new THREE.MeshStandardMaterial({ color: 0x111827 }), -0.10, -0.004, 0.02);
      markerBlack.rotation.z = Math.PI / 2;
      group.add(markerBlack);

      // Plumón Expo Rojo en la charola
      const markerRed = cyl(0.006, 0.006, 0.12, 10, new THREE.MeshStandardMaterial({ color: 0xdc2626 }), 0.04, -0.004, 0.02);
      markerRed.rotation.z = Math.PI / 2;
      group.add(markerRed);

      // Borrador magnético azul de fieltro
      const eraserMat = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.6 });
      group.add(box(0.075, 0.026, 0.035, eraserMat, 0.16, -0.002, 0.02));
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
