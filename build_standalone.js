// Build del simulador 3D con esbuild
// Genera:
//   1. dist/                      -> carpeta lista para deploy (GitHub Pages / Netlify / Vercel)
//   2. simulador_standalone.html  -> un solo archivo HTML que funciona con doble clic (sin servidor)
//   3. Copias en la carpeta de artifacts para verlo dentro del chat
const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

const ROOT = __dirname;
const DIST = path.join(ROOT, 'dist');
const ARTIFACT_DIR = 'C:\\Users\\rmaxm\\.gemini\\antigravity\\brain\\a7f1fbea-e453-4ae9-9ec9-6552889b8bc4';

// 1) Empaquetar src/app.js + three.js + OrbitControls en un solo bundle ES module
const result = esbuild.buildSync({
  entryPoints: [path.join(ROOT, 'src/app.js')],
  bundle: true,
  format: 'esm',
  minify: true,
  target: ['es2020'],
  write: false,
  legalComments: 'none'
});
const bundleJs = result.outputFiles[0].text;

const css = fs.readFileSync(path.join(ROOT, 'styles.css'), 'utf8');
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8')
  .replace(/<script type="importmap">[\s\S]*?<\/script>\s*/, '');

const DEV_CSS_TAG = '<link rel="stylesheet" href="./styles.css" />';
const DEV_JS_TAG = '<script type="module" src="./src/app.js"></script>';

if (!html.includes(DEV_CSS_TAG) || !html.includes(DEV_JS_TAG)) {
  throw new Error('index.html no contiene las etiquetas esperadas de styles.css / src/app.js');
}

// Evitar que un "</script" dentro del bundle cierre la etiqueta inline
const safeInlineJs = bundleJs.replace(/<\/script/gi, '<\\/script');

// 2) Carpeta dist/ para deploy (archivos separados -> carga más rápida y cacheable)
fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });
fs.writeFileSync(path.join(DIST, 'app.js'), bundleJs, 'utf8');
fs.writeFileSync(path.join(DIST, 'styles.css'), css, 'utf8');
fs.writeFileSync(
  path.join(DIST, 'index.html'),
  html.replace(DEV_JS_TAG, '<script type="module" src="./app.js"></script>'),
  'utf8'
);
fs.writeFileSync(path.join(DIST, '.nojekyll'), '', 'utf8');

// 3) Standalone de un solo archivo (CSS + JS inline)
const standalone = html
  .replace(DEV_CSS_TAG, () => `<style>\n${css}\n</style>`)
  .replace(DEV_JS_TAG, () => `<script type="module">\n${safeInlineJs}\n</script>`);
fs.writeFileSync(path.join(ROOT, 'simulador_standalone.html'), standalone, 'utf8');

// 4) Versiones para el chat (artifacts)
if (fs.existsSync(ARTIFACT_DIR)) {
  fs.writeFileSync(path.join(ARTIFACT_DIR, 'simulador_3d_cad_vr.html'), standalone, 'utf8');

  const inlineCss = css
    .replace('height: 100vh;', 'height: 520px;')
    .replace('width: 100vw;', 'width: 100%; border-radius: 12px; border: 1px solid #2a3346;')
    + `
  body.theater-fullscreen { height: 100vh !important; border: none !important; border-radius: 0 !important; }
  .config-sidebar { width: 285px; }
  .topbar { height: 46px; padding: 0 10px; }
  .combo-pill { padding: 4px 8px; font-size: 11px; }
  `;
  const inlineHtml = html
    .replace(DEV_CSS_TAG, () => `<style>\n${inlineCss}\n</style>`)
    .replace(DEV_JS_TAG, () => `<script type="module">\n${safeInlineJs}\n</script>`);
  fs.writeFileSync(path.join(ARTIFACT_DIR, 'render_3d_inline.html'), inlineHtml, 'utf8');
}

console.log(`Build OK -> dist/ (${(bundleJs.length / 1024).toFixed(0)} KB JS) + simulador_standalone.html`);
