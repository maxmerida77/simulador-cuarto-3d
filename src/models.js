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
  const ulanziScreenMat = new THREE.MeshBasicMaterial({ map: createUlanziClockTexture() });
  ulanzi.add(box(0.004, 0.052, 0.180, ulanziScreenMat, 0.015, 0, 0));
  ulanzi.userData = { isSubGadget: 'ulanzi_tc001' };
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
        const scrMesh = box(0.006, 0.32, 0.54, scrMat, -0.036, 0.27, -0.06);
        scrMesh.userData = { isFurniture: true, id: itemData.id, isScreen: 'main_monitor' };
        group.add(scrMesh);

        const vertMon = new THREE.Group();
        vertMon.position.set(-0.01, 0.29, 0.34);
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
          segGroup.position.set(-0.05 + Math.abs(idx) * 0.024, 0.28, idx * (segW - 0.004));
          segGroup.rotation.y = -idx * 0.17;
          segGroup.add(box(0.02, monH, segW, frameMat, 0, 0, 0));
          const scrMesh = box(0.005, monH - 0.022, segW - 0.01, scrMat, 0.012, 0, 0);
          scrMesh.userData = { isFurniture: true, id: itemData.id, isScreen: 'main_monitor' };
          segGroup.add(scrMesh);
          group.add(segGroup);
        });
      } else {
        group.add(box(0.022, 0.35, 0.59, frameMat, -0.05, 0.27, 0));
        const scrMesh = box(0.006, 0.325, 0.57, scrMat, -0.036, 0.27, 0);
        scrMesh.userData = { isFurniture: true, id: itemData.id, isScreen: 'main_monitor' };
        group.add(scrMesh);
      }

      const barZ = isDual ? -0.06 : 0;
      const barMesh = box(0.024, 0.016, 0.42, new THREE.MeshBasicMaterial({ color: 0xfef3c7 }), -0.02, 0.455, barZ);
      barMesh.userData = { isMonitorLightBarMesh: true };
      group.add(barMesh);
      group.add(cyl(0.020, 0.020, 0.016, 16, darkMetal, 0.01, 0.010, -0.10));

      addLogitechMxKeysMini(group, darkMetal, chromeMat);

      // ======================================================================
      // DOMÓTICA & GADGETS: ALEXA ECHO POP + MULTICONTACTO TUYA + BASEUS CLIPS
      // ======================================================================

      // 1. Bocina Inteligente Alexa Echo Pop (WiFi/Bluetooth con anillo LED cian)
      const alexaGroup = new THREE.Group();
      alexaGroup.position.set(-0.06, 0.032, 0.17);
      alexaGroup.rotation.y = 0.35;
      const alexaFabric = new THREE.MeshStandardMaterial({ color: 0x1f242d, roughness: 0.85 });
      alexaGroup.add(cyl(0.046, 0.038, 0.052, 24, alexaFabric, 0, 0, 0));
      // Rejilla frontal ligeramente orientada
      const alexaFront = cyl(0.042, 0.042, 0.006, 24, new THREE.MeshStandardMaterial({ color: 0x2d3748, roughness: 0.9 }), 0.008, 0.005, 0);
      alexaFront.rotation.z = 0.25;
      alexaGroup.add(alexaFront);
      // Anillo LED cian brillante en la base
      const cyanRingMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
      const alexaRing = cyl(0.048, 0.048, 0.008, 24, cyanRingMat, 0, -0.022, 0);
      alexaRing.userData = { isAlexaRing: true };
      alexaGroup.add(alexaRing);
      // Resplandor cian tenue sobre el tapete
      const alexaGlow = new THREE.PointLight(0x00f0ff, 0.35, 0.55);
      alexaGlow.position.set(0, 0.01, 0);
      alexaGlow.userData = { isAlexaGlow: true };
      alexaGroup.add(alexaGlow);
      alexaGroup.userData = { isSubGadget: 'alexa_echo' };
      group.add(alexaGroup);

      // 2. Multicontacto Inteligente WiFi Tuya (4 Tomas AC + 4 USB + LEDs)
      const stripGroup = new THREE.Group();
      stripGroup.position.set(-0.16, 0.014, -0.22);
      const whiteAbs = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.35 });
      stripGroup.add(box(0.058, 0.024, 0.22, whiteAbs, 0, 0, 0));
      // Switch de encendido general iluminado en rojo
      stripGroup.add(box(0.018, 0.008, 0.022, new THREE.MeshBasicMaterial({ color: 0xef4444 }), 0, 0.013, -0.082));
      // 4 tomas AC con micro-led verde en cada salida
      const socketMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.6 });
      [-0.042, -0.002, 0.038, 0.078].forEach((sz, idx) => {
        stripGroup.add(box(0.034, 0.003, 0.026, socketMat, 0, 0.0125, sz));
        const outLed = cyl(0.002, 0.002, 0.004, 8, new THREE.MeshBasicMaterial({ color: 0x22c55e }), 0.021, 0.013, sz);
        outLed.userData = { isOutletLed: idx + 1 };
        stripGroup.add(outLed);
      });
      // Bloque de 4 puertos USB con micro-LED azul
      stripGroup.add(box(0.028, 0.002, 0.012, new THREE.MeshStandardMaterial({ color: 0x1e293b }), 0, 0.0125, 0.102));
      const usbLed = cyl(0.0018, 0.0018, 0.004, 8, new THREE.MeshBasicMaterial({ color: 0x38bdf8 }), 0.021, 0.013, 0.102);
      usbLed.userData = { isOutletLed: 'usb' };
      stripGroup.add(usbLed);
      // Cable de uso rudo trenzado bajando por detrás
      const cableMat = new THREE.MeshStandardMaterial({ color: 0x181a20, roughness: 0.75 });
      stripGroup.add(cyl(0.0055, 0.0055, 0.28, 8, cableMat, -0.015, -0.12, -0.11));
      stripGroup.userData = { isSubGadget: 'smart_power_strip' };
      group.add(stripGroup);

      // 3. Clips Magnéticos de Cables Baseus en el Borde Frontal
      const clipBar = box(0.014, 0.006, 0.092, darkMetal, 0.165, 0.004, 0.19);
      [[-0.028, 0xef4444], [0, 0x64748b], [0.028, 0x38bdf8]].forEach(([cz, col]) => {
        clipBar.add(cyl(0.005, 0.005, 0.008, 10, new THREE.MeshStandardMaterial({ color: col }), 0, 0.005, cz));
      });
      clipBar.userData = { isSubGadget: 'baseus_clips' };
      group.add(clipBar);

      // 4. Memoria USB Metálica Kingston
      group.add(box(0.028, 0.005, 0.012, chromeMat, 0.015, 0.013, -0.06));

      // 5. Tablet de Ingeniería en Base de Aluminio + Stylus Magnético
      const tabletGroup = new THREE.Group();
      tabletGroup.position.set(0.08, 0.004, 0.28);
      tabletGroup.rotation.y = -0.22;

      // Base y soporte de aluminio espacial
      const aluMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.85, roughness: 0.25 });
      tabletGroup.add(box(0.11, 0.005, 0.13, aluMat, 0, 0.0025, 0));
      const aluArm = box(0.02, 0.10, 0.035, aluMat, -0.01, 0.050, 0);
      aluArm.rotation.x = -0.25;
      tabletGroup.add(aluArm);
      const aluPlate = box(0.008, 0.15, 0.11, aluMat, 0.012, 0.10, 0);
      aluPlate.rotation.z = -0.35;
      tabletGroup.add(aluPlate);

      // Cuerpo de la Tablet (Gris espacial, bisel fino)
      const tabletBodyMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.3 });
      const tabletBody = box(0.007, 0.23, 0.16, tabletBodyMat, 0.020, 0.115, 0);
      tabletBody.rotation.z = -0.35;

      // Pantalla IPS de la Tablet con esquema de KiCad y Spotify
      const tabletScreenMat = new THREE.MeshBasicMaterial({ map: createTabletScreenTexture() });
      const tabletScreen = box(0.002, 0.22, 0.152, tabletScreenMat, 0.004, 0, 0);
      tabletBody.add(tabletScreen);

      // Stylus capacitivo magnético en el borde
      const stylusMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3 });
      const stylus = cyl(0.0035, 0.0035, 0.15, 12, stylusMat, 0.005, 0.118, 0);
      stylus.rotation.x = Math.PI / 2;
      tabletBody.add(stylus);

      tabletGroup.add(tabletBody);
      tabletGroup.userData = { isSubGadget: 'tablet_companion' };
      group.add(tabletGroup);
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
      const fnirsiGroup = new THREE.Group();
      fnirsiGroup.position.set(-0.17, 0.052, 0.07);
      fnirsiGroup.rotation.x = -0.78;
      // Cuerpo del cautín metálico
      fnirsiGroup.add(cyl(0.007, 0.0055, 0.11, 12, chromeMat, 0, 0.02, 0));
      // Pantalla OLED mini del cautín
      fnirsiGroup.add(box(0.008, 0.022, 0.006, new THREE.MeshBasicMaterial({ color: 0x38bdf8 }), 0, 0.025, 0.006));
      // Punta incandescente de precisión
      const fnirsiTipMat = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        emissive: new THREE.Color(0xf97316),
        emissiveIntensity: 0.95,
        roughness: 0.35
      });
      const fnirsiTip = cyl(0.003, 0.0008, 0.042, 10, fnirsiTipMat, 0, -0.055, 0);
      fnirsiTip.userData = { isFnirsiTip: true };
      fnirsiGroup.add(fnirsiTip);
      group.add(fnirsiGroup);

      // Módulo FTDI USB-UART serial con jumpers Dupont a la protoboard
      const ftdiGroup = new THREE.Group();
      ftdiGroup.position.set(0.08, 0.010, -0.04);
      const ftdiBoardMat = new THREE.MeshStandardMaterial({ color: 0xd92626, roughness: 0.4 });
      ftdiGroup.add(box(0.038, 0.005, 0.022, ftdiBoardMat, 0, 0, 0));
      // Chip FT232RL
      ftdiGroup.add(box(0.014, 0.004, 0.012, darkMetal, 0, 0.004, 0));
      // Mini conector USB
      ftdiGroup.add(box(0.010, 0.006, 0.010, chromeMat, 0.018, 0.004, 0));
      // LEDs PWR (rojo) y TX/RX (verde)
      ftdiGroup.add(cyl(0.0016, 0.0016, 0.003, 8, new THREE.MeshBasicMaterial({ color: 0xef4444 }), -0.010, 0.004, 0.005));
      ftdiGroup.add(cyl(0.0016, 0.0016, 0.003, 8, new THREE.MeshBasicMaterial({ color: 0x22c55e }), -0.010, 0.004, -0.005));
      // 4 Jumpers Dupont (amarillo, naranja, rojo, café) arqueando hacia la protoboard
      const wireColors = [0xf59e0b, 0xf97316, 0xef4444, 0x854d0e];
      wireColors.forEach((wCol, widx) => {
        const jumper = cyl(0.0016, 0.0016, 0.095, 8, new THREE.MeshStandardMaterial({ color: wCol }));
        jumper.rotation.z = 1.15;
        jumper.rotation.x = (widx - 1.5) * 0.12;
        jumper.position.set(-0.04, 0.014, (widx - 1.5) * 0.005);
        ftdiGroup.add(jumper);
      });
      ftdiGroup.userData = { isSubGadget: 'ftdi_debugger' };
      group.add(ftdiGroup);
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
