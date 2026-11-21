// Base de datos del Configurador 3D para Ingeniero + Vibecoding + Fútbol
// Calibrada milimétricamente para evitar traslapes y con orientación realista hacia el usuario

export const DEFAULT_ROOM = {
  width: 2.30,
  depth: 3.00,
  height: 2.30,
  wallColor: '#f1f3f6',
  accentWall: 'west',
  accentColor: '#1e232d',
  floorType: 'dark_wood_tile',
  beddingTheme: 'graphite_white',
  ledColorMode: 'warm_amber',
  showClutter: false,
  wallMode: 'auto'
};

export const PRODUCT_ZONES = [
  {
    id: 'vibecoding_zone',
    title: '1. Setup Escritorio (Tu Odyssey 24" + MX Keys + Hub UGREEN)',
    subtitle: 'Ala izquierda (120×40 cm): tu monitor Samsung 24" Odyssey G300 200Hz, MX Keys Mini, Hub UGREEN 7-en-1 y cable DP 1m',
    defaultOption: 'vibe_27_mx',
    cameraPreset: 'desk_front',
    options: [
      {
        id: 'none',
        name: 'Escritorio vacío (sin equipo)',
        price: 0,
        store: 'Solo mesa',
        dims: '-',
        desc: 'Escritorio en L de 1.20 × 1.20 m (40 cm fondo) despejado.',
        links: [],
        spawnItems: []
      },
      {
        id: 'vibe_owned_base',
        name: 'Ya Comprado: Odyssey 24" (Base V) + MX Keys Mini + Hub UGREEN + DP 1m',
        price: 0,
        store: '✅ Ya lo tienes ($0 extra)',
        dims: 'Samsung 24" (54.4×33.3 cm) en base V (~21 cm fondo) · MX Keys Mini · Hub 7-en-1',
        desc: 'Lo que ya compraste puesto sobre tus 40 cm de fondo. Nota en 3D cómo la base en V del Samsung Odyssey G300 ocupa más de la mitad del fondo de la mesa (quedan solo ~18 cm frente al monitor para teclado y muñecas).',
        links: [],
        spawnItems: [
          { id: 'upg_mon', type: 'vibe_setup_owned', x: -0.95, z: -0.69, rotY: 0, elevation: 0.75 },
          { id: 'upg_lap', type: 'laptop_stand', x: -0.94, z: -1.28, rotY: 0.75, elevation: 0.88 }
        ]
      },
      {
        id: 'vibe_27_mx',
        name: 'Opción A (Recomendada): Tu Odyssey 24" en Brazo NB F80 + Deskpad 75×35 + Ulanzi + Soportes 3D',
        price: 1590,
        store: 'Amazon + AliExpress + Impresión 3D',
        dims: 'Brazo NB F80 · Deskpad 75×35 · Montura Hub 3D + Stand Laptop 3D (cama 25×25)',
        desc: 'Descontando todo lo que ya tienes (Odyssey 24", MX Keys Mini, Mouse, Hub UGREEN, BT 6.0, DP 1m, Echo Dot blanca y Tablet). Tu Hub UGREEN va montado por debajo con soporte impreso en 3D para dejar la mesa limpia.',
        links: [
          { label: 'Brazo Hidráulico North Bayou F80 ($650)', url: 'https://www.amazon.com.mx/s?k=North+Bayou+F80+brazo+monitor' },
          { label: 'AliExpress: Deskpad Fieltro 80×35cm (~$130)', url: 'https://es.aliexpress.com/w/wholesale-desk-mat-felt-dark-grey-80x35.html' },
          { label: 'AliExpress: Reloj Pixel Ulanzi TC001 (~$750)', url: 'https://es.aliexpress.com/w/wholesale-Ulanzi-TC001.html' },
          { label: 'Printables: Under-Desk Mount USB-C Hub (Gratis 3D)', url: 'https://www.printables.com/search/models?q=under+desk+usb+hub+mount' }
        ],
        spawnItems: [
          { id: 'upg_mon', type: 'vibe_setup_27', x: -0.95, z: -0.69, rotY: 0, elevation: 0.75 },
          { id: 'upg_lap', type: 'laptop_stand', x: -0.94, z: -1.28, rotY: 0.75, elevation: 0.88 }
        ]
      },
      {
        id: 'vibe_dual_vertical',
        name: 'Opción B: Tu Odyssey 24" + 2do Monitor 24" Vertical (Brazo Doble NB H180)',
        price: 4290,
        store: 'Amazon MX + AliExpress (Solo lo que falta)',
        dims: 'Tu Samsung Odyssey 24" 200Hz + 24" IPS Vertical en Brazo Doble NB H180',
        desc: 'Conservas tu Samsung Odyssey G300 al centro (por DisplayPort 1.4 200Hz) y sumas un 2do monitor 24" vertical a la izquierda conectado al puerto HDMI 4K de tu Hub UGREEN 7-en-1. Ideal para código, terminales e IA.',
        links: [
          { label: 'AliExpress: Brazo Doble Hidráulico NB H180 (~$790)', url: 'https://es.aliexpress.com/w/wholesale-North-Bayou-H180.html' },
          { label: 'Monitor 24" IPS VESA Secundario (~$2,350 Amazon)', url: 'https://www.amazon.com.mx/s?k=Monitor+24+pulgadas+IPS+VESA' },
          { label: 'AliExpress: Stand Aluminio Laptop (~$195)', url: 'https://es.aliexpress.com/w/wholesale-laptop-stand-aluminum-cooling.html' }
        ],
        spawnItems: [
          { id: 'upg_mon', type: 'vibe_setup_dual', x: -0.95, z: -0.69, rotY: 0, elevation: 0.75 },
          { id: 'upg_lap', type: 'laptop_stand', x: -0.94, z: -1.28, rotY: 0.75, elevation: 0.88 }
        ]
      },
      {
        id: 'vibe_34_ultra',
        name: 'Opción C: Upgrade 34" Curvo + Ambilight Skydimo + Lambrín Nogal',
        price: 7650,
        store: 'Amazon MX + AliExpress (Descontando periféricos comprados)',
        dims: 'Monitor 34" (76×34 cm) en brazo + Lambrín Nogal 78×58 cm',
        desc: 'Upgrade a futuro con Monitor Curvo 34" Ultrawide en brazo hidráulico + Tira Ambilight USB Skydimo + Panel acústico de nogal debajo de tu TV (usando tu MX Keys Mini, Hub UGREEN y cable DP 1.4).',
        links: [
          { label: 'AliExpress: Tira Ambilight PC Skydimo 34" (~$280)', url: 'https://es.aliexpress.com/w/wholesale-Skydimo-ambilight-PC-strip.html' },
          { label: 'Monitor Curvo 34" Ultrawide WQHD (Amazon)', url: 'https://www.amazon.com.mx/s?k=Monitor+34+pulgadas+Ultrawide+WQHD' },
          { label: 'Panel Acústico Lambrín Madera (Amazon)', url: 'https://www.amazon.com.mx/s?k=panel+acustico+listones+madera+pared' }
        ],
        spawnItems: [
          { id: 'upg_mon', type: 'vibe_setup_34', x: -0.95, z: -0.69, rotY: 0, elevation: 0.75 },
          { id: 'upg_lap', type: 'laptop_stand', x: -0.94, z: -1.28, rotY: 0.75, elevation: 0.88 },
          { id: 'upg_slat', type: 'wood_slat_panel', x: -1.13, z: -0.85, rotY: 0, elevation: 0.76 }
        ]
      }
    ]
  },

  {
    id: 'engineer_pegboard_zone',
    title: '2. Panel 3D Modular (25×25 cm) + Ala Ventana + Gridfinity',
    subtitle: 'Impreso en tu impresora 3D: Multiboard o HSW Hexagonal + Tu Echo Dot blanca y Tablet + Cajas Gridfinity debajo',
    defaultOption: 'eng_yolispa_lab',
    cameraPreset: 'desk_lab',
    options: [
      {
        id: 'none',
        name: 'Mesa despejada (sin panel 3D ni cajonera extra)',
        price: 0,
        store: 'Solo cajitas en repisas del escritorio',
        dims: '-',
        desc: 'Escritorio libre con tus componentes guardados en cajas cerradas dentro de las repisas laterales.',
        links: [],
        spawnItems: []
      },
      {
        id: 'eng_yolispa_lab',
        name: 'Opción A (Recomendada): Multiboard 3D + Ala Ventana (Echo Dot Blanca + Tablet) + Gridfinity',
        price: 180,
        store: '🖨️ Impresión 3D (Filamento PLA+ Negro Mate)',
        dims: '4 Losetas Multiboard 19×23 cm · Trípode Echo Dot + Stand Tablet + Maceta 3D + 2 Cajas Gridfinity 5×5',
        desc: 'Todo imprimible en tu cama de 25×25×25 cm por ~$180 MXN de filamento: 4 losetas Multiboard en pared + tu Echo Dot blanca en trípode 3D + tu Tablet en stand 3D + maceta acanalada Japandi + 2 Gridfinity Rugged Box debajo para tu electrónica.',
        links: [
          { label: 'Multiboard Oficial (Losetas 8×8 gratis 3D)', url: 'https://www.multiboard.io/' },
          { label: 'Printables: Gridfinity Rugged Box 5×5 (Gratis 3D)', url: 'https://www.printables.com/search/models?q=gridfinity+rugged+box+5x5' },
          { label: 'Printables: Echo Dot Tripod + Tablet Stand 3D', url: 'https://www.printables.com/search/models?q=echo+dot+stand+minimalist' },
          { label: 'Filamento PLA+ Negro Mate / Arena 1kg (Amazon MX)', url: 'https://www.amazon.com.mx/s?k=filamento+pla+negro+mate+1.75mm' }
        ],
        spawnItems: [
          { id: 'upg_peg_1', type: 'yolispa_pegboard', x: -1.12, z: -0.22, rotY: 0, elevation: 0.94 },
          { id: 'upg_eng_1', type: 'engineer_maker_station', x: -0.36, z: -1.29, rotY: 0, elevation: 0.75 }
        ]
      },
      {
        id: 'eng_skadis_ugreen',
        name: 'Opción B: HSW Hexagonal 3D (Honeycomb Wall) + Ala Ventana + Gridfinity',
        price: 240,
        store: '🖨️ Impresión 3D (PLA+ / PETG Negro Mate)',
        dims: 'Honeycomb Storage Wall 38×50 cm (cama 25×25) · Echo Dot Blanca + Tablet 3D + Gridfinity',
        desc: 'Cambia el panel por el famoso Honeycomb Storage Wall (panal hexagonal) impreso en PLA+ negro mate con inserts hexagonales para audífonos, estuche cerrado y cables, manteniendo el ala ventana limpia con tu Echo Dot blanca y Tablet.',
        links: [
          { label: 'Printables: Honeycomb Storage Wall (HSW Oficial)', url: 'https://www.printables.com/model/152592-honeycomb-storage-wall' },
          { label: 'Printables: Gridfinity Rugged Box 5×5 (Gratis 3D)', url: 'https://www.printables.com/search/models?q=gridfinity+rugged+box+5x5' },
          { label: 'Filamento PLA+ Negro Mate 1kg (Amazon MX)', url: 'https://www.amazon.com.mx/s?k=filamento+pla+negro+mate+1.75mm' }
        ],
        spawnItems: [
          { id: 'upg_peg_1', type: 'yolispa_pegboard_double', x: -1.12, z: -0.22, rotY: 0, elevation: 0.94 },
          { id: 'upg_eng_1', type: 'engineer_maker_station', x: -0.36, z: -1.29, rotY: 0, elevation: 0.75 }
        ]
      },
      {
        id: 'eng_alex_full',
        name: 'Opción C (Full Pro): Multiboard 3D + Cajonera Compacta (Gridfinity dentro) + Silla Malla',
        price: 3190,
        store: '🖨️ Impresión 3D + Amazon MX',
        dims: 'Multiboard 3D + Cajonera 36×34×71 cm (con Gridfinity dentro) + Silla Ergonómica',
        desc: 'Combina todo tu ecosistema impreso en 3D (Multiboard + soporte Echo Dot blanca + stand Tablet + Gridfinity dentro de cajones) con cajonera compacta de 36 cm de fondo y silla ergonómica de malla negra.',
        replaceChair: true,
        links: [
          { label: 'Multiboard Oficial (Gratis 3D)', url: 'https://www.multiboard.io/' },
          { label: 'Cajonera Compacta Oficina 35-38cm Fondo (Amazon)', url: 'https://www.amazon.com.mx/s?k=cajonera+escritorio+estrecha+35+cm+fondo' },
          { label: 'Silla Ergonómica Malla Soporte Lumbar (Amazon)', url: 'https://www.amazon.com.mx/s?k=silla+ergonomica+oficina+malla+negra' }
        ],
        spawnItems: [
          { id: 'upg_peg_1', type: 'yolispa_pegboard', x: -1.12, z: -0.22, rotY: 0, elevation: 0.94 },
          { id: 'upg_eng_1', type: 'engineer_maker_station', x: -0.36, z: -1.29, rotY: 0, elevation: 0.75 },
          { id: 'upg_ds_1', type: 'under_desk_drawer', x: -0.95, z: -0.47, rotY: 0, elevation: 0 },
          { id: 'upg_ds_2', type: 'trash_bin', x: -0.56, z: -1.29, rotY: 0, elevation: 0 },
          { id: 'upg_ds_3', type: 'ergo_chair', x: -0.38, z: -0.68, rotY: -1.68, elevation: 0 }
        ]
      }
    ]
  },

  {
    id: 'shelves_zone',
    title: '3. Repisas Flotantes (IKEA / Amazon / AliExpress)',
    subtitle: 'Instaladas arriba del panel perforado, libres de la TV y del mueble con espejo',
    defaultOption: 'sh_lack_black',
    cameraPreset: 'desk_pegboard',
    options: [
      {
        id: 'none',
        name: 'Actual (Sin repisas flotantes)',
        price: 0,
        store: 'Estado actual',
        dims: '-',
        desc: 'Paredes sin estantes superiores.',
        links: [],
        spawnItems: []
      },
      {
        id: 'sh_lack_black',
        name: 'Opción A: Repisa Flotante Minimalista IKEA LACK (Negra Mate)',
        price: 349,
        store: 'IKEA MX / AliExpress',
        dims: '50 cm ancho × 22 cm fondo × 4.5 cm grosor (Herraje oculto)',
        desc: 'Sin ménsulas visibles arriba de tu panel perforado: ideal para exhibir tus prototipos de ingeniería terminados, libros y una planta.',
        links: [
          { label: 'Repisa Flotante IKEA LACK ($299-$349)', url: 'https://www.ikea.com/mx/es/search/?q=LACK+estante+pared' },
          { label: 'AliExpress: Repisa Flotante Aluminio Negro (~$140)', url: 'https://es.aliexpress.com/w/wholesale-repisa-flotante-pared-negra-minimalista.html' },
          { label: 'Repisa Flotante Negra Herraje Oculto (Amazon)', url: 'https://www.amazon.com.mx/s?k=repisa+flotante+negra+minimalista+soporte+oculto' }
        ],
        spawnItems: [
          { id: 'upg_sh_1', type: 'shelf_lack_110', x: -1.04, z: -0.22, rotY: 0, elevation: 1.54 }
        ]
      },
      {
        id: 'sh_duo_ledge',
        name: 'Opción B: Set 2 Repisas con Borde Anti-Caída (Metal/Acrílico)',
        price: 380,
        store: 'AliExpress / Amazon MX',
        dims: '2 repisas escalonadas con labio frontal de seguridad',
        desc: 'Tienen un labio frontal para que no se resbalen cuadros, teclados mecánicos, balones o figuras.',
        links: [
          { label: 'AliExpress: Repisas Pared con Borde Negro (~$135)', url: 'https://es.aliexpress.com/w/wholesale-floating-wall-shelf-ledge-black.html' },
          { label: 'Set Repisas Flotantes Negras (Amazon)', url: 'https://www.amazon.com.mx/s?k=set+repisas+flotantes+negras+60+cm' }
        ],
        spawnItems: [
          { id: 'upg_sh_1', type: 'shelf_duo_stepped', x: -1.05, z: -0.22, rotY: 0, elevation: 1.50 }
        ]
      },
      {
        id: 'sh_walnut_led',
        name: 'Opción C: 2 Repisas de Madera Nogal Cálido + Perfil Difusor LED (AliExpress)',
        price: 690,
        store: 'Amazon MX + AliExpress',
        dims: '2 repisas en tono Nogal con tira LED cálida inferior',
        desc: 'Repisas de madera nogal con perfil difusor de aluminio negro de AliExpress integrado debajo para iluminar tu panel perforado.',
        links: [
          { label: 'AliExpress: Perfil Aluminio Negro Difusor LED (~$110)', url: 'https://es.aliexpress.com/w/wholesale-perfil-aluminio-negro-tira-led.html' },
          { label: 'Repisas Flotantes Madera Parota / Nogal (Amazon)', url: 'https://www.amazon.com.mx/s?k=repisas+flotantes+madera+nogal+parota' }
        ],
        spawnItems: [
          { id: 'upg_sh_1', type: 'shelf_walnut_led', x: -1.04, z: -0.22, rotY: 0, elevation: 1.50 }
        ]
      }
    ]
  },

  {
    id: 'lighting_zone',
    title: '4. Luces LED y Domótica Tuya WiFi (AliExpress / Amazon)',
    subtitle: 'En AliExpress las tiras LED COB sin puntos y barras Baseus/Xiaomi cuestan hasta 60% menos',
    defaultOption: 'light_xiaomi_govee',
    cameraPreset: 'desk_front',
    options: [
      {
        id: 'none',
        name: 'Actual (Solo foco pelón en techo)',
        price: 0,
        store: 'Estado actual',
        dims: '-',
        lightingMode: 'current_bulb',
        desc: 'Foco blanco colgante que genera sombras debajo de la litera y del escritorio.',
        links: [],
        spawnItems: []
      },
      {
        id: 'light_xiaomi_govee',
        name: 'Opción A: Barra Luz Monitor (Baseus / Xiaomi) + Tira RGBIC Tuya WiFi',
        price: 790,
        store: 'AliExpress Choice / Amazon',
        dims: 'Barra Monitor 45cm (CRI Ra95) + Tira RGBIC 5m (Tuya/Alexa)',
        lightingMode: 'warm_minimal',
        desc: 'En AliExpress consigues la barra de monitor Baseus i-wok por ~$450 MXN y la tira RGBIC Tuya Smart WiFi de 5m por ~$195 MXN.',
        links: [
          { label: 'AliExpress: Barra Monitor Baseus i-wok (~$450)', url: 'https://es.aliexpress.com/w/wholesale-Baseus-monitor-light-bar.html' },
          { label: 'AliExpress: Tira LED RGBIC Tuya WiFi 5m (~$195)', url: 'https://es.aliexpress.com/w/wholesale-Tuya-WiFi-RGBIC-LED-strip-5m.html' },
          { label: 'Xiaomi Monitor Light Bar (Amazon $990)', url: 'https://www.amazon.com.mx/s?k=Xiaomi+Mi+Computer+Monitor+Light+Bar' }
        ],
        spawnItems: [
          { id: 'upg_led_1', type: 'led_strip_desk', x: -1.13, z: -0.89, rotY: 0, elevation: 0.76 },
          { id: 'upg_led_2', type: 'led_strip_tv', x: -1.11, z: -0.95, rotY: 0, elevation: 1.48 }
        ]
      },
      {
        id: 'light_bunk_ceiling',
        name: 'Opción B: Tira LED COB 3000K Bajo Litera ($145 en AliExpress) + Plafón Techo',
        price: 950,
        store: 'AliExpress + Amazon MX',
        dims: 'Tira COB 480 LEDs/m sin puntos + Controlador Tuya WiFi + Plafón',
        lightingMode: 'warm_minimal',
        desc: 'Las tiras LED COB de 480 LEDs/m en AliExpress cuestan solo ~$145 MXN y dan una línea continua de luz cálida sin puntitos bajo tu litera.',
        links: [
          { label: 'AliExpress: Tira LED COB 3000K 5m Continua (~$145)', url: 'https://es.aliexpress.com/w/wholesale-COB-LED-strip-3000K-5m-dimmer.html' },
          { label: 'AliExpress: Controlador Tuya WiFi para Tira COB (~$95)', url: 'https://es.aliexpress.com/w/wholesale-Tuya-WiFi-LED-dimmer-controller-single-color.html' },
          { label: 'Plafón LED Techo Minimalista 24W (Amazon)', url: 'https://www.amazon.com.mx/s?k=plafon+led+techo+moderno+delgado+24w' }
        ],
        spawnItems: [
          { id: 'upg_led_1', type: 'led_strip_desk', x: -1.13, z: -0.89, rotY: 0, elevation: 0.76 },
          { id: 'upg_led_2', type: 'led_strip_bunk', x: 1.10, z: 0.48, rotY: 0, elevation: 1.30 }
        ]
      },
      {
        id: 'light_full_domotica',
        name: 'Opción C: Domótica Tuya Pro (Lámpara Esquina RGBIC + Bajo Litera + Barras)',
        price: 1490,
        store: 'AliExpress Choice / Amazon',
        dims: 'Lámpara Esquina 140 cm + Barras Ambilight Escritorio + Tira COB',
        lightingMode: 'setup_night',
        desc: 'Todo el ecosistema Tuya Smart / Home Assistant desde AliExpress: lámpara esquinera RGBIC (~$390), barras de luz para escritorio (~$260) y tira COB bajo cama.',
        links: [
          { label: 'AliExpress: Lámpara Esquina RGBIC Tuya 140cm (~$390)', url: 'https://es.aliexpress.com/w/wholesale-corner-floor-lamp-RGBIC-Tuya.html' },
          { label: 'AliExpress: Par Barras Luz RGBIC Escritorio (~$260)', url: 'https://es.aliexpress.com/w/wholesale-Tuya-RGBIC-smart-light-bars-desk.html' },
          { label: 'Lámpara de Esquina Govee (Amazon)', url: 'https://www.amazon.com.mx/s?k=lampara+de+esquina+led+govee+rgbic' }
        ],
        spawnItems: [
          { id: 'upg_led_1', type: 'led_strip_desk', x: -1.13, z: -0.89, rotY: 0, elevation: 0.76 },
          { id: 'upg_led_2', type: 'led_strip_bunk', x: 1.10, z: 0.48, rotY: 0, elevation: 1.30 },
          { id: 'upg_led_3', type: 'floor_lamp', x: -0.02, z: -1.36, rotY: 0, elevation: 0 }
        ]
      }
    ]
  },

  {
    id: 'soccer_zone',
    title: '5. Fútbol en 2da Litera (Bufandas en Pared + Balones)',
    subtitle: 'Aprovecha la pared blanca de la segunda litera para tus bufandas y aros de balones sin gastar espacio útil',
    defaultOption: 'soc_frame_ball',
    cameraPreset: 'zoom_soccer',
    options: [
      {
        id: 'none',
        name: 'Actual (Balón atorado en barrotes y sin bufandas)',
        price: 0,
        store: 'Estado actual',
        dims: '-',
        desc: 'Pared de la segunda litera vacía y balón en la cabecera.',
        links: [],
        spawnItems: []
      },
      {
        id: 'soc_frame_ball',
        name: 'Opción A (Impresión 3D): 2 Bufandas con Clips 3D + 2 Garras/Aros 3D para Balones',
        price: 90,
        store: '🖨️ Impresión 3D (PLA+/PETG + Cinta 3M VHB)',
        dims: '2 Soportes de Balón impresos en 3D (<25×25 cm) + Clips invisibles 3D para bufandas',
        desc: 'Imprime tus propios soportes tipo garra/aro en PETG o PLA+ negro mate y rieles discretos para tus bufandas sin taladrar la pared (fijados con cinta 3M VHB). Ahorras más de $250 MXN.',
        links: [
          { label: 'Printables: Wall Mount Soccer Ball Holder (Gratis 3D)', url: 'https://www.printables.com/search/models?q=soccer+ball+wall+mount' },
          { label: 'Printables: Scarf Wall Clips Minimalist (Gratis 3D)', url: 'https://www.printables.com/search/models?q=tapestry+clip+wall+mount' },
          { label: 'Cinta Doble Cara 3M VHB Uso Rudo (Amazon MX)', url: 'https://www.amazon.com.mx/s?k=cinta+3m+vhb+doble+cara' }
        ],
        spawnItems: [
          { id: 'upg_soc_1', type: 'soccer_scarves_2', x: 1.13, z: 0.48, rotY: 0, elevation: 1.62 },
          { id: 'upg_soc_2', type: 'soccer_bunk_balls_2', x: 1.04, z: 0.48, rotY: 0, elevation: 1.68 }
        ]
      },
      {
        id: 'soc_shelf_pro',
        name: 'Opción B: 2 Bufandas en 2da Litera + Repisa de Balones y Caja LED Tachones',
        price: 790,
        store: 'AliExpress + Amazon MX',
        dims: '2 Bufandas en 2da Litera + Repisa 78×22 cm con Balones y Tachones',
        desc: 'Tus 2 bufandas en la pared de la segunda litera + Repisa superior para tus balones y caja acrílica con luz LED para tus tachones.',
        links: [
          { label: 'AliExpress: Caja Acrílica con Luz LED Tenis/Tachones (~$180)', url: 'https://es.aliexpress.com/w/wholesale-acrylic-shoe-display-box-LED.html' },
          { label: 'AliExpress: Aro Soporte Pared para Balón (~$68 MXN)', url: 'https://es.aliexpress.com/w/wholesale-wall-mount-ball-holder-soccer.html' }
        ],
        spawnItems: [
          { id: 'upg_soc_1', type: 'soccer_scarves_2', x: 1.13, z: 0.48, rotY: 0, elevation: 1.56 },
          { id: 'upg_soc_2', type: 'soccer_display_shelf', x: 1.02, z: 0.48, rotY: 0, elevation: 2.02 }
        ]
      },
      {
        id: 'soc_vip',
        name: 'Opción C: 3 Bufandas Iluminadas en 2da Litera + 2 Balones + Tapete',
        price: 1150,
        store: 'AliExpress + Amazon MX',
        dims: '3 Bufandas con barra LED + 2 Soportes de Balón + Tapete 145×85 cm',
        desc: '3 bufandas escalonadas en la pared de la 2da litera con luz cálida superior + 2 balones montados a los lados + Tapete gris grafito minimalista en el pasillo.',
        links: [
          { label: 'AliExpress: Aro Soporte Pared para Balón (~$68 MXN)', url: 'https://es.aliexpress.com/w/wholesale-wall-mount-ball-holder-soccer.html' },
          { label: 'AliExpress: Tira LED COB Cálida para Iluminar Bufandas (~$145)', url: 'https://es.aliexpress.com/w/wholesale-COB-LED-strip-3000K-5m-dimmer.html' },
          { label: 'Tapete Minimalista Gris Oscuro Recámara (Amazon)', url: 'https://www.amazon.com.mx/s?k=tapete+minimalista+gris+oscuro+recamara' }
        ],
        spawnItems: [
          { id: 'upg_soc_1', type: 'soccer_scarves_3', x: 1.13, z: 0.48, rotY: 0, elevation: 1.58 },
          { id: 'upg_soc_2', type: 'soccer_bunk_balls_2', x: 1.04, z: 0.48, rotY: 0, elevation: 1.68 },
          { id: 'upg_soc_3', type: 'soccer_rug', x: -0.16, z: 0.28, rotY: 0, elevation: 0 }
        ]
      }
    ]
  },

  {
    id: 'storage_underbed_door_zone',
    title: '6. Guardar Cosas Bajo la Cama y Junto a la Puerta',
    subtitle: 'Elimina las bolsas negras del piso, zapatos sueltos y cajas sobre el espejo',
    defaultOption: 'st_vard_trones',
    cameraPreset: 'zoom_underbed',
    options: [
      {
        id: 'none',
        name: 'Actual (Sin cajones bajo cama ni zapateros)',
        price: 0,
        store: 'Estado actual',
        dims: '-',
        desc: 'Sin almacenamiento bajo la litera ni en la pared de la puerta.',
        links: [],
        spawnItems: []
      },
      {
        id: 'st_skubb_basic',
        name: 'Opción A: 3 Estuches Bajo Cama (IKEA SKUBB / AliExpress) + Cesto + Cajas',
        price: 1190,
        store: 'IKEA MX / AliExpress',
        dims: '3 Estuches (69×55×19 cm) + Cesto con tapa + Perchero + 2 Cajas',
        desc: '3 estuches con cierre bajo la cama baja para guardar ropa/cajas + Perchero de aluminio plegable de AliExpress + Cesto de ropa + 2 Cajas arriba del espejo.',
        links: [
          { label: 'AliExpress: Bolsas Organizadoras Bajo Cama (~$95 c/u)', url: 'https://es.aliexpress.com/w/wholesale-under-bed-storage-bag-organizer-grey.html' },
          { label: 'AliExpress: Perchero Pared Aluminio Plegable (~$135)', url: 'https://es.aliexpress.com/w/wholesale-foldable-wall-coat-hook-black-aluminum.html' },
          { label: 'Estuche Bajo Cama IKEA SKUBB ($199)', url: 'https://www.ikea.com/mx/es/search/?q=SKUBB+estuche' },
          { label: 'Caja con Tapa IKEA TJENA Negra ($149)', url: 'https://www.ikea.com/mx/es/search/?q=TJENA+caja+con+tapa' }
        ],
        spawnItems: [
          { id: 'upg_ub_1', type: 'underbed_skubb_cases', x: 0.56, z: 0.48, rotY: 0, elevation: 0 },
          { id: 'upg_dz_1', type: 'laundry_hamper', x: -0.22, z: 1.30, rotY: 0, elevation: 0 },
          { id: 'upg_dz_2', type: 'wall_coat_rack', x: -0.22, z: 1.44, rotY: 0, elevation: 1.48 },
          { id: 'upg_dz_3', type: 'top_storage_boxes', x: -0.96, z: 0.30, rotY: 0, elevation: 1.85 }
        ]
      },
      {
        id: 'st_vard_trones',
        name: 'Opción B: 2 Cajones con Ruedas Bajo Cama + Zapateros IKEA TRONES (18cm)',
        price: 2390,
        store: 'IKEA MX + AliExpress',
        dims: '2 Cajones con Ruedas (65×70 cm) + 2 Zapateros TRONES (52×18×39 cm)',
        desc: '2 cajones con ruedas bajo la litera + 2 zapateros ultra-delgados IKEA TRONES en la pared junto a la puerta (donde estaban las bolsas negras) + Cajas sobre el espejo.',
        links: [
          { label: 'AliExpress: Cajón Bajo Cama con Ruedas Metálico (~$290)', url: 'https://es.aliexpress.com/w/wholesale-under-bed-storage-with-wheels.html' },
          { label: 'Zapatero de Pared IKEA TRONES Negro (Pack 2 pzas $1,099)', url: 'https://www.ikea.com/mx/es/search/?q=TRONES' },
          { label: 'Cajón Bajo Cama IKEA VARDÖ / SÖMNTUTA', url: 'https://www.ikea.com/mx/es/search/?q=cajon+bajo+cama' }
        ],
        spawnItems: [
          { id: 'upg_ub_1', type: 'underbed_wheeled_drawers', x: 0.56, z: 0.48, rotY: 0, elevation: 0 },
          { id: 'upg_dz_1', type: 'ikea_trones_pair', x: -0.20, z: 1.39, rotY: 0, elevation: 0.12 },
          { id: 'upg_dz_2', type: 'laundry_hamper', x: 0.76, z: -0.74, rotY: 0, elevation: 0 },
          { id: 'upg_dz_3', type: 'top_storage_boxes', x: -0.96, z: 0.30, rotY: 0, elevation: 1.85 }
        ]
      },
      {
        id: 'st_pullout_cab',
        name: 'Opción C: Zapatera Deslizable Bajo Cama + Gabinete Cerrado en Puerta',
        price: 2550,
        store: 'Amazon MX + AliExpress',
        dims: 'Charola 8 pares bajo cama + Gabinete 72×26×86 cm',
        desc: 'Charola deslizable para tenis bajo el borde de la cama + Gabinete cerrado de 2 puertas donde hoy están las bolsas negras.',
        links: [
          { label: 'AliExpress: Organizador Zapatos Bajo Cama Ruedas (~$240)', url: 'https://es.aliexpress.com/w/wholesale-under-bed-shoe-organizer-wheels.html' },
          { label: 'Gabinete Zapatero Delgado Minimalista Negro (Amazon)', url: 'https://www.amazon.com.mx/s?k=zapatera+mueble+delgado+negro+moderno' }
        ],
        spawnItems: [
          { id: 'upg_ub_1', type: 'underbed_shoe_pullout', x: 0.54, z: 0.48, rotY: 0, elevation: 0 },
          { id: 'upg_dz_1', type: 'shoe_cabinet', x: -0.20, z: 1.35, rotY: 0, elevation: 0 },
          { id: 'upg_dz_3', type: 'top_storage_boxes', x: -0.96, z: 0.30, rotY: 0, elevation: 1.85 }
        ]
      }
    ]
  },

  {
    id: 'whiteboard_zone',
    title: '7. Pizarrón de Diagramas & Notas (ESP32 / PID / Domótica)',
    subtitle: 'Tu pizarrón tipo TV / ancho del espejo (65×48 cm): reacomódalo frente al escritorio o déjalo tras la puerta',
    defaultOption: 'wb_south_view',
    cameraPreset: 'whiteboard_view',
    options: [
      {
        id: 'none',
        name: 'Sin pizarrón en la pared',
        price: 0,
        store: 'Pared lisa',
        dims: '-',
        desc: 'Sin pizarrón montado.',
        links: [],
        spawnItems: []
      },
      {
        id: 'wb_south_view',
        name: 'Opción A (Recomendada): Frente al Escritorio (Pared Sur)',
        price: 0,
        store: 'Tu pizarrón actual reutilizado',
        dims: '65 × 48 cm (A la altura de la vista: 1.15 m)',
        desc: 'Reubicado en la pared frente a tu silla: visible mientras programas o sueldas sin que la puerta lo tape jamás. Muestra diagramas de pines ESP32 y lazos de control PID.',
        links: [
          { label: 'Marcadores Borrado en Seco Expo (Amazon MX)', url: 'https://www.amazon.com.mx/s?k=marcadores+para+pizarron+blanco+expo' },
          { label: 'AliExpress: Organizador Magnético Plumones (~$65)', url: 'https://es.aliexpress.com/w/wholesale-magnetic-whiteboard-pen-holder.html' }
        ],
        spawnItems: [
          { id: 'whiteboard_1', type: 'dry_erase_whiteboard', x: -0.38, z: 1.48, rotY: Math.PI, elevation: 1.15 }
        ]
      },
      {
        id: 'wb_door_back',
        name: 'Opción B: Detrás de la Puerta (Posición Actual en Pared Oeste)',
        price: 0,
        store: 'Posición original actual',
        dims: '65 × 48 cm (Detrás del radio de giro de la puerta)',
        desc: 'Ubicado en la pared donde abre la puerta: cuando la puerta está abierta queda tapado y no se puede consultar desde la silla del escritorio.',
        links: [
          { label: 'Marcadores Borrado en Seco Expo (Amazon MX)', url: 'https://www.amazon.com.mx/s?k=marcadores+para+pizarron+blanco+expo' }
        ],
        spawnItems: [
          { id: 'whiteboard_1', type: 'dry_erase_whiteboard', x: -1.13, z: 1.05, rotY: 0, elevation: 1.15 }
        ]
      }
    ]
  }
];

export const WALL_PALETTES = [
  { id: 'white_current', name: 'Blanco Cálido Mate', wall: '#f4f3ef', accent: '#f4f3ef', accentWall: 'none' },
  { id: 'graphite_setup', name: 'Pared Setup Grafito Mate', wall: '#f3f2ee', accent: '#1d212a', accentWall: 'west' },
  { id: 'warm_greige', name: 'Arena Greige + Carbón', wall: '#eae6df', accent: '#272b33', accentWall: 'west' },
  { id: 'navy_studio', name: 'Pared Azul Nocturno Mate', wall: '#f1f3f6', accent: '#172236', accentWall: 'west' },
  { id: 'sage_calm', name: 'Blanco + Verde Salvia Mate', wall: '#f4f5f2', accent: '#35483e', accentWall: 'east' }
];

export const BEDDING_THEMES = [
  { id: 'black_current', name: 'Negro Actual (Fotos)', primary: '#17191d', secondary: '#22252b', pillow: '#1d1f24' },
  { id: 'graphite_white', name: 'Gris Oxford + Sábanas Blancas', primary: '#32363f', secondary: '#f3f4f6', pillow: '#e5e7eb' },
  { id: 'nordic_sand', name: 'Arena Nórdico + Blanco', primary: '#c8bfb0', secondary: '#ffffff', pillow: '#94a3b8' },
  { id: 'navy_crisp', name: 'Azul Marino + Gris Claro', primary: '#1e293b', secondary: '#f1f5f9', pillow: '#cbd5e1' }
];

export const LED_COLORS = [
  { id: 'warm_amber', name: 'Cálido 3000K (Estudio)', hex: 0xfbbf24, css: '#fbbf24' },
  { id: 'ice_blue', name: 'Azul Cian (Vibecoding)', hex: 0x38bdf8, css: '#38bdf8' },
  { id: 'pure_white', name: 'Blanco Neutro 4500K', hex: 0xf8fafc, css: '#f8fafc' },
  { id: 'pitch_green', name: 'Verde Cancha', hex: 0x22c55e, css: '#22c55e' },
  { id: 'team_blue', name: 'Azul Afición', hex: 0x2563eb, css: '#2563eb' }
];

// ============================================================================
// ETIQUETAS CORTAS PARA LA INTERFAZ MINIMALISTA
// (el texto largo solo aparece al abrir la ficha / botón ⓘ)
// ============================================================================
export const UI_LABELS = {
  zones: {
    vibecoding_zone: { icon: '💻', short: 'Setup' },
    engineer_pegboard_zone: { icon: '🖨️', short: 'Panel 3D y mesa' },
    shelves_zone: { icon: '📚', short: 'Repisas' },
    lighting_zone: { icon: '💡', short: 'Luces' },
    soccer_zone: { icon: '⚽', short: 'Fútbol' },
    storage_underbed_door_zone: { icon: '📦', short: 'Guardado' },
    whiteboard_zone: { icon: '📋', short: 'Pizarrón' }
  },
  options: {
    none: 'Vacío',
    vibe_owned_base: 'Ya comprado (Base V)',
    vibe_27_mx: 'Odyssey 24" + Brazo',
    vibe_dual_vertical: 'Odyssey + 24" Vert.',
    vibe_34_ultra: 'Upgrade 34" Curvo',
    eng_yolispa_lab: 'Multiboard 3D + Echo',
    eng_skadis_ugreen: 'HSW Hex 3D + Echo',
    eng_alex_full: 'Multiboard + Cajonera',
    sh_lack_black: 'LACK negra',
    sh_duo_ledge: '2 con borde',
    sh_walnut_led: 'Nogal + LED',
    light_xiaomi_govee: 'Barra monitor + tira',
    light_bunk_ceiling: 'LED litera + plafón',
    light_full_domotica: 'Domótica completa',
    soc_frame_ball: '2 bufandas + aros',
    soc_shelf_pro: 'Bufandas + repisa',
    soc_vip: '3 bufandas LED',
    st_skubb_basic: 'Estuches SKUBB',
    st_vard_trones: 'Cajones + TRONES',
    st_pullout_cab: 'Zapatera + gabinete',
    wb_south_view: 'Frente escritorio',
    wb_door_back: 'Tras la puerta'
  },
  combos: {
    actual: 'Hoy',
    ingeniero_esencial: 'Esencial',
    vibecoding_dual: 'Dual',
    studio_full_vip: 'Pro'
  }
};

export const WORKFLOW_MODES = [
  { id: 'claude_code', name: 'Claude Code', icon: '🤖', desc: 'Codex / Claude Code CLI con agente autónomo, diffs git y tests' },
  { id: 'pcb_kicad', name: 'KiCad PCB', icon: '⚡', desc: 'Diseño KiCad 8.0 de 4 capas: ESP32-S3, planos GND y pistas de cobre' },
  { id: 'control_firmware', name: 'Control PID', icon: '📈', desc: 'VS Code C++ PlatformIO + Osciloscopio con curva de respuesta escalón PID' }
];

// ============================================================================
// ESCENAS DE LUZ (DOMÓTICA SIMULADA) — 1 clic cambia todo el ambiente
// ============================================================================
export const LIGHT_SCENES = {
  normal: { id: 'normal', icon: '☀️', name: 'Normal', led: null },
  code: { id: 'code', icon: '💻', name: 'Programar', led: 'ice_blue' },
  match: { id: 'match', icon: '⚽', name: 'Partido', led: 'team_blue' },
  sleep: { id: 'sleep', icon: '🌙', name: 'Dormir', led: 'warm_amber' }
};

export const CATALOG = {
  l_desk: { type: 'l_desk', name: 'Escritorio en L Negro (1.20×1.20 m · 40 cm fondo)', w: 1.20, d: 1.20, h: 0.75 },
  tv_wall: { type: 'tv_wall', name: 'Televisor en Pared Izquierda', w: 0.10, d: 0.84, h: 0.50 },
  gray_closet: { type: 'gray_closet', name: 'Clóset Gris con Cajones', w: 1.08, d: 0.54, h: 2.18 },
  bunk_bed: { type: 'bunk_bed', name: 'Literas Tubulares Negras', w: 0.98, d: 1.94, h: 1.72 },
  mirror_cabinet: { type: 'mirror_cabinet', name: 'Mueble Negro con Espejo', w: 0.36, d: 0.64, h: 1.85 },
  dry_erase_whiteboard: { type: 'dry_erase_whiteboard', name: 'Pizarrón Blanco para Diagramas y Notas', w: 0.65, d: 0.04, h: 0.48 },
  current_chair: { type: 'current_chair', name: 'Silla Actual con Toalla', w: 0.48, d: 0.48, h: 0.88 },
  closet_organizer_bin: { type: 'closet_organizer_bin', name: 'Organizador Gris entre Clóset y Litera', w: 0.42, d: 0.34, h: 0.72 },

  clutter_floor_bags: { type: 'clutter_floor_bags', name: 'Bolsas Negras + Mochila Gris', w: 0.78, d: 0.46, h: 0.62 },
  clutter_mirror_top: { type: 'clutter_mirror_top', name: 'Caja ASUS TUF F15 + Oster sobre Espejo', w: 0.34, d: 0.62, h: 0.42 },
  clutter_tv_blanket: { type: 'clutter_tv_blanket', name: 'Cobija Amarilla sobre TV', w: 0.14, d: 0.88, h: 0.54 },
  clutter_desk_items: { type: 'clutter_desk_items', name: 'Botellas, Libretas y Bolsas Escritorio', w: 1.16, d: 1.16, h: 0.95 },
  clutter_bunk_items: { type: 'clutter_bunk_items', name: 'Chamarra, Playera Celeste y Balón en Litera', w: 1.02, d: 1.94, h: 1.70 },

  // Setups reales calibrados para mesa de 40 cm de fondo (1.20×1.20 m)
  vibe_setup_owned: { type: 'vibe_setup_owned', name: 'Tu Setup Comprado: Odyssey 24" (Base V) + MX Keys Mini + Hub UGREEN', w: 0.38, d: 0.74, h: 0.44 },
  vibe_setup_27: { type: 'vibe_setup_27', name: 'Tu Samsung Odyssey 24" en Brazo NB F80 + MX Keys Mini + Hub UGREEN + Ulanzi', w: 0.38, d: 0.74, h: 0.46 },
  vibe_setup_dual: { type: 'vibe_setup_dual', name: 'Tu Odyssey 24" + 24" Vertical en Brazo Doble + MX Keys + Hub UGREEN', w: 0.38, d: 0.78, h: 0.52 },
  vibe_setup_34: { type: 'vibe_setup_34', name: 'Monitor 34" Ultrawide + Ambilight Skydimo + MX Keys + Hub UGREEN', w: 0.38, d: 0.78, h: 0.46 },
  laptop_stand: { type: 'laptop_stand', name: 'Laptop ASUS TUF F15 en Stand Aluminio (Orientada hacia ti)', w: 0.32, d: 0.28, h: 0.25 },
  wood_slat_panel: { type: 'wood_slat_panel', name: 'Panel Lambrín Acústico Nogal', w: 0.04, d: 0.78, h: 0.58 },

  // Paneles Modulares Impresos en 3D (Multiboard / HSW para cama 25×25) + Ala Ventana + Gridfinity
  yolispa_pegboard: { type: 'yolispa_pegboard', name: 'Multiboard Modular 3D (4 losetas 19×23 cm · PLA+ Negro Mate)', w: 0.05, d: 0.36, h: 0.46 },
  yolispa_pegboard_double: { type: 'yolispa_pegboard_double', name: 'HSW Hexagonal 3D (Honeycomb Storage Wall · PLA+ Negro Mate)', w: 0.05, d: 0.38, h: 0.50 },
  engineer_maker_station: { type: 'engineer_maker_station', name: 'Ala Ventana (Echo Dot Blanca + Tablet 3D + Maceta 3D) + Gridfinity Bajo Mesa', w: 0.56, d: 0.36, h: 0.24 },

  // Repisas Flotantes (calibradas al espacio libre sobre el panel perforado)
  shelf_lack_110: { type: 'shelf_lack_110', name: 'Repisa Flotante IKEA LACK Negra', w: 0.20, d: 0.38, h: 0.16 },
  shelf_duo_stepped: { type: 'shelf_duo_stepped', name: 'Set 2 Repisas Flotantes con Borde Anti-Caída', w: 0.18, d: 0.38, h: 0.28 },
  shelf_walnut_led: { type: 'shelf_walnut_led', name: '2 Repisas Madera Nogal Cálido con LED', w: 0.20, d: 0.38, h: 0.26 },

  // Fútbol en Pared de 2da Litera (Bufandas y Balones)
  soccer_scarves_2: { type: 'soccer_scarves_2', name: '2 Bufandas de Fútbol en Pared de 2da Litera', w: 0.04, d: 1.18, h: 0.42 },
  soccer_scarves_3: { type: 'soccer_scarves_3', name: '3 Bufandas de Fútbol con Luz LED en 2da Litera', w: 0.05, d: 1.20, h: 0.56 },
  soccer_bunk_balls_2: { type: 'soccer_bunk_balls_2', name: '2 Soportes de Pared con Balones Oficiales (2da Litera)', w: 0.24, d: 1.68, h: 0.26 },
  soccer_ball_wall_mount: { type: 'soccer_ball_wall_mount', name: 'Soporte de Pared con Balón Oficial', w: 0.24, d: 0.24, h: 0.24 },
  soccer_display_shelf: { type: 'soccer_display_shelf', name: 'Repisa Exhibidora Fútbol (Balones + Cajas LED Tachones)', w: 0.22, d: 0.82, h: 0.28 },
  soccer_rug: { type: 'soccer_rug', name: 'Tapete Minimalista Gris/Cancha', w: 0.85, d: 1.45, h: 0.015 },

  // Bajo Cama y Puerta
  underbed_wheeled_drawers: { type: 'underbed_wheeled_drawers', name: '2 Cajones con Ruedas Bajo Cama', w: 0.82, d: 1.55, h: 0.20 },
  underbed_skubb_cases: { type: 'underbed_skubb_cases', name: '3 Estuches con Cierre Bajo Cama', w: 0.80, d: 1.68, h: 0.19 },
  underbed_shoe_pullout: { type: 'underbed_shoe_pullout', name: 'Zapatera Deslizable Bajo Cama + Cajas', w: 0.84, d: 1.60, h: 0.18 },
  led_strip_desk: { type: 'led_strip_desk', name: 'Tira LED Tuya/Govee Detrás de Escritorio', w: 0.04, d: 1.14, h: 0.04 },
  led_strip_tv: { type: 'led_strip_tv', name: 'Luz Bias LED Detrás de TV', w: 0.04, d: 0.78, h: 0.04 },
  led_strip_bunk: { type: 'led_strip_bunk', name: 'Tira LED COB 3000K Bajo Litera Superior', w: 0.05, d: 1.80, h: 0.04 },
  floor_lamp: { type: 'floor_lamp', name: 'Lámpara Esquinera Minimalista RGBIC Tuya', w: 0.20, d: 0.20, h: 1.42 },
  under_desk_drawer: { type: 'under_desk_drawer', name: 'Cajonera Compacta 5 Cajones (36 cm fondo)', w: 0.36, d: 0.34, h: 0.71 },
  trash_bin: { type: 'trash_bin', name: 'Bote de Basura Negro Mate con Pedal', w: 0.22, d: 0.22, h: 0.32 },
  ergo_chair: { type: 'ergo_chair', name: 'Silla Ergonómica de Malla Negra', w: 0.52, d: 0.52, h: 0.96 },
  laundry_hamper: { type: 'laundry_hamper', name: 'Cesto de Ropa Sucia con Tapa', w: 0.40, d: 0.32, h: 0.60 },
  wall_coat_rack: { type: 'wall_coat_rack', name: 'Perchero de Pared Aluminio Negro Plegable', w: 0.56, d: 0.12, h: 0.44 },
  top_storage_boxes: { type: 'top_storage_boxes', name: '2 Cajas Negras con Tapa IKEA TJENA', w: 0.34, d: 0.58, h: 0.25 },
  ikea_trones_pair: { type: 'ikea_trones_pair', name: '2 Zapateros de Pared IKEA TRONES (18 cm fondo)', w: 0.78, d: 0.18, h: 0.76 },
  shoe_cabinet: { type: 'shoe_cabinet', name: 'Gabinete Organizador Cerrado (Pared Inferior)', w: 0.70, d: 0.25, h: 0.86 }
};

export const BASE_ROOM_ITEMS = [
  { id: 'desk_1', type: 'l_desk', x: -0.55, z: -0.89, rotY: 0, elevation: 0 },
  { id: 'tv_1', type: 'tv_wall', x: -1.09, z: -0.95, rotY: 0, elevation: 1.39 },
  { id: 'chair_1', type: 'current_chair', x: -0.38, z: -0.68, rotY: -1.68, elevation: 0 },
  { id: 'closet_1', type: 'gray_closet', x: 0.60, z: -1.23, rotY: 0, elevation: 0 },
  { id: 'bunk_1', type: 'bunk_bed', x: 0.65, z: 0.48, rotY: 0, elevation: 0 },
  { id: 'mirror_1', type: 'mirror_cabinet', x: -0.96, z: 0.30, rotY: 0, elevation: 0 }
];

export const CLUTTER_ROOM_ITEMS = [
  { id: 'bin_1', type: 'closet_organizer_bin', x: 0.72, z: -0.74, rotY: 0, elevation: 0 },
  { id: 'clutter_tv_1', type: 'clutter_tv_blanket', x: -1.08, z: -0.95, rotY: 0, elevation: 1.39 },
  { id: 'clutter_desk_1', type: 'clutter_desk_items', x: -0.55, z: -0.89, rotY: 0, elevation: 0 },
  { id: 'clutter_mirror_1', type: 'clutter_mirror_top', x: -0.96, z: 0.30, rotY: 0, elevation: 1.85 },
  { id: 'clutter_bags_1', type: 'clutter_floor_bags', x: -0.22, z: 1.24, rotY: 0, elevation: 0 },
  { id: 'clutter_bunk_1', type: 'clutter_bunk_items', x: 0.65, z: 0.48, rotY: 0, elevation: 0 }
];

// ============================================================================
// 4 DISPOSICIONES DEL CUARTO (ACOMODO COMPLETO Y CALIBRADO DE MUEBLES + ZONAS)
// ============================================================================
export const ROOM_LAYOUTS = {
  actual: {
    id: 'actual',
    short: '1. Actual',
    name: '1. Disposición Actual (Escritorio 1.2×1.2 Noroeste · Literas Este)',
    desc: 'Tu acomodo actual: escritorio en L (1.20×1.20 m · 40 cm fondo) bajo la ventana noroeste, clóset al noreste, literas en pared este y espejo al oeste.',
    desk: { x: -0.55, z: -0.89, rotY: 0 },
    bunk: { x: 0.65, z: 0.48, rotY: 0 },
    closet: { x: 0.60, z: -1.23, rotY: 0 },
    hamper: { x: 0.72, z: -0.74, rotY: 0 },
    mirror: { x: -0.96, z: 0.30, rotY: 0 },
    extras: {}
  },
  cama_sur: {
    id: 'cama_sur',
    short: '2. Cama al Sur',
    name: '2. Opción A: Literas al Fondo Sur + Centro Despejado',
    desc: 'Gira las literas 90° pegadas a la pared sur y coloca el clóset en la pared este. Libera un amplio espacio central de 1.45×1.35 m manteniendo tu escritorio de 1.20×1.20 m junto a la ventana.',
    desk: { x: -0.55, z: -0.89, rotY: 0 },
    bunk: { x: 0.16, z: 0.99, rotY: -Math.PI / 2 },
    closet: { x: 0.86, z: -0.58, rotY: -Math.PI / 2 },
    hamper: { x: 0.88, z: 0.20, rotY: -Math.PI / 2 },
    mirror: { x: -0.96, z: 0.22, rotY: 0 },
    extras: {
      whiteboard_1: { x: 1.12, z: 0.22, rotY: -Math.PI / 2 },
      upg_dz_1: { x: 0.62, z: -1.36, rotY: Math.PI },
      upg_led_3: { x: 0.14, z: -1.32, rotY: 0 },
      upg_soc_3: { x: -0.05, z: 0.02, rotY: 0 }
    }
  },
  cama_norte: {
    id: 'cama_norte',
    short: '3. Estudio al Sur',
    name: '3. Opción B: Descanso en Ventana Norte · Estudio al Sureste',
    desc: 'Coloca las literas al fondo norte junto a la ventana y traslada todo tu estudio en L (1.20×1.20 m) + monitores + TV a la esquina sureste (sin reflejos de sol en las pantallas).',
    desk: { x: 0.55, z: 0.89, rotY: Math.PI },
    bunk: { x: -0.16, z: -0.99, rotY: Math.PI / 2 },
    closet: { x: -0.86, z: 0.05, rotY: Math.PI / 2 },
    hamper: { x: 0.90, z: -1.15, rotY: -Math.PI / 2 },
    mirror: { x: 0.96, z: -0.22, rotY: Math.PI },
    extras: {
      whiteboard_1: { x: -0.24, z: 1.47, rotY: Math.PI },
      upg_dz_1: { x: -0.24, z: 1.35, rotY: 0 },
      upg_led_3: { x: 0.98, z: -1.32, rotY: 0 },
      upg_soc_3: { x: 0.02, z: 0.05, rotY: 0 }
    }
  },
  invertido_este: {
    id: 'invertido_este',
    short: '4. Literas Oeste',
    name: '4. Opción C: Literas al Oeste · Estudio Completo al Sureste',
    desc: 'Mantiene el clóset fijo en su esquina actual, pasa las literas a la pared oeste y dedica toda la esquina sureste a tu escritorio en L de 1.20×1.20 m, panel perforado y TV.',
    desk: { x: 0.55, z: 0.89, rotY: Math.PI },
    bunk: { x: -0.65, z: -0.46, rotY: Math.PI },
    closet: { x: 0.60, z: -1.23, rotY: 0 },
    hamper: { x: -0.85, z: 0.58, rotY: Math.PI / 2 },
    mirror: { x: 0.96, z: -0.38, rotY: Math.PI },
    extras: {
      whiteboard_1: { x: -0.22, z: 1.47, rotY: Math.PI },
      upg_dz_1: { x: -0.22, z: 1.35, rotY: 0 },
      upg_led_3: { x: -0.10, z: -1.32, rotY: 0 },
      upg_soc_3: { x: -0.02, z: 0.12, rotY: 0 }
    }
  }
};

export const QUICK_COMBOS = {
  actual: {
    name: '1. Tu Cuarto Hoy (Con lo ya comprado)',
    showClutter: false,
    wallPalette: 'white_current',
    beddingTheme: 'black_current',
    ledColorMode: 'warm_amber',
    zones: {
      vibecoding_zone: 'vibe_owned_base',
      engineer_pegboard_zone: 'none',
      shelves_zone: 'none',
      lighting_zone: 'none',
      soccer_zone: 'none',
      storage_underbed_door_zone: 'none',
      whiteboard_zone: 'wb_door_back'
    }
  },
  ingeniero_esencial: {
    name: '2. Esencial Escritorio (Tu Odyssey 24" + Brazo + Lab)',
    showClutter: false,
    wallPalette: 'graphite_setup',
    beddingTheme: 'graphite_white',
    ledColorMode: 'warm_amber',
    zones: {
      vibecoding_zone: 'vibe_27_mx',
      engineer_pegboard_zone: 'eng_yolispa_lab',
      shelves_zone: 'sh_lack_black',
      lighting_zone: 'light_xiaomi_govee',
      soccer_zone: 'soc_frame_ball',
      storage_underbed_door_zone: 'st_skubb_basic',
      whiteboard_zone: 'wb_south_view'
    }
  },
  vibecoding_dual: {
    name: '3. Vibecoding Dual + Lab Ugreen/ZOYI',
    showClutter: false,
    wallPalette: 'navy_studio',
    beddingTheme: 'graphite_white',
    ledColorMode: 'ice_blue',
    zones: {
      vibecoding_zone: 'vibe_dual_vertical',
      engineer_pegboard_zone: 'eng_skadis_ugreen',
      shelves_zone: 'sh_walnut_led',
      lighting_zone: 'light_bunk_ceiling',
      soccer_zone: 'soc_frame_ball',
      storage_underbed_door_zone: 'st_vard_trones',
      whiteboard_zone: 'wb_south_view'
    }
  },
  studio_full_vip: {
    name: '4. Studio Pro 34" + ALEX + Fútbol VIP',
    showClutter: false,
    wallPalette: 'navy_studio',
    beddingTheme: 'navy_crisp',
    ledColorMode: 'ice_blue',
    zones: {
      vibecoding_zone: 'vibe_34_ultra',
      engineer_pegboard_zone: 'eng_alex_full',
      shelves_zone: 'sh_walnut_led',
      lighting_zone: 'light_full_domotica',
      soccer_zone: 'soc_vip',
      storage_underbed_door_zone: 'st_vard_trones',
      whiteboard_zone: 'wb_south_view'
    }
  }
};

// ============================================================================
// BASE DE DATOS INTERACTIVA DE INSPECCIÓN 3D (AL DAR CLIC EN CUALQUIER ARTÍCULO DENTRO DEL CUARTO)
// Incluye sub-gadgets individuales en el escritorio, panel perforado, repisas, litera y muebles base
// ============================================================================
export const SUB_GADGETS_DB = {
  mx_keys_mini: {
    id: 'mx_keys_mini',
    badge: '✅ Ya Comprado · Amazon MX',
    name: 'Teclado Logitech MX Keys Mini Inalámbrico',
    price: 'Ya comprado ($0)',
    dims: '29.6 × 13.1 × 2.1 cm (Cabe holgado en 40 cm de fondo)',
    desc: 'Tu teclado inalámbrico compacto recién comprado. Teclas cóncavas PerfectStroke, retroiluminación inteligente y Easy-Switch para alternar entre tu Laptop ASUS TUF, tablet y celular.',
    localOffset: [0.095, 0.05, 0.04],
    cameraPreset: 'desk_front',
    links: [
      { label: 'AliExpress: Deskpad Fieltro 80×35cm (~$130)', url: 'https://es.aliexpress.com/w/wholesale-desk-mat-felt-dark-grey-80x35.html' }
    ]
  },
  ugreen_hub_7in1: {
    id: 'ugreen_hub_7in1',
    badge: '✅ Ya Comprado · Montura Bajo-Mesa 3D',
    name: 'UGREEN Hub USB-C 7-en-1 + Cable DP 1.4 (1 m) + BT 6.0 en Soporte 3D',
    price: 'Ya comprado ($0 · Bracket PLA+ 3D)',
    dims: 'Montado debajo del borde (12.2×3.4×1.2 cm) · Cero cables arriba de la mesa',
    desc: 'Tu hub de aluminio UGREEN 7-en-1 + adaptador Bluetooth 6.0 encajados en un soporte impreso en 3D justo debajo del borde derecho del escritorio: puertos USB-A y SD/TF a la mano sin estorbar la tabla.',
    localOffset: [0.162, -0.04, -0.245],
    cameraPreset: 'desk_front',
    links: [
      { label: 'Printables: Under-Desk USB-C Hub Mount (Gratis 3D)', url: 'https://www.printables.com/search/models?q=under+desk+usb+hub+mount' }
    ]
  },
  mx_master_3s: {
    id: 'mx_master_3s',
    badge: '✅ Mouse en Setup / Upgrade Opcional',
    name: 'Tu Mouse Inalámbrico (o Upgrade MX Master 3S)',
    price: 'Ya tienes mouse ($0)',
    dims: '12.4 × 8.4 × 5.1 cm',
    desc: 'Colocado a la derecha de tu MX Keys Mini sobre el deskpad de 35 cm de fondo. Si en un futuro quieres dar el salto a rueda horizontal para KiCad/CAD, puedes actualizar al MX Master 3S.',
    localOffset: [0.095, 0.05, -0.19],
    cameraPreset: 'desk_front',
    links: [
      { label: 'Mouse Logitech MX Master 3S (Upgrade Opcional)', url: 'https://www.amazon.com.mx/s?k=Logitech+MX+Master+3S' }
    ]
  },
  ulanzi_tc001: {
    id: 'ulanzi_tc001',
    badge: '🟠 Gadget Estrella · AliExpress Choice',
    name: 'Reloj Inteligente Pixel Ulanzi TC001 (AWTRIX)',
    price: '~$780 MXN',
    dims: '20.1 × 7.0 × 3.2 cm (Matriz LED RGB 32×8)',
    desc: 'Reloj de matriz de píxeles WiFi con procesador ESP32 interno. Puedes flashearle el firmware abierto AWTRIX 3 para mostrar la hora, notificaciones de GitHub, clima o telemetría MQTT de tus proyectos.',
    localOffset: [-0.04, 0.09, 0.14],
    cameraPreset: 'desk_front',
    links: [
      { label: 'AliExpress: Reloj Pixel Ulanzi TC001 (~$780)', url: 'https://es.aliexpress.com/w/wholesale-Ulanzi-TC001.html' }
    ]
  },
  alexa_echo: {
    id: 'alexa_echo',
    badge: '✅ Ya la Tienes · Alexa Echo Dot Blanca',
    name: 'Bocina Inteligente Alexa Echo Dot Blanca + Trípode 3D',
    price: 'Ya la tienes ($0 · Trípode 3D gratis)',
    dims: 'Esfera 10 × 8.9 cm · Trípode minimalista impreso en 3D',
    desc: 'Tu Alexa Echo Dot blanca colocada en el ala bajo la ventana sobre un mini trípode impreso en 3D: su acabado blanco contrasta limpio sobre la madera negra y su anillo cian refleja sobre la tabla.',
    localOffset: [-0.22, 0.10, -0.07],
    cameraPreset: 'desk_lab',
    links: [
      { label: 'Printables: Echo Dot 4/5 Minimalist Tripod Stand (Gratis 3D)', url: 'https://www.printables.com/search/models?q=echo+dot+tripod+stand' }
    ]
  },
  smart_power_strip: {
    id: 'smart_power_strip',
    badge: '⚡ Domótica & Energía · Tuya / Smart Life',
    name: 'Multicontacto Inteligente WiFi Tuya (4 Tomas AC + 4 USB)',
    price: '~$380 MXN (AliExpress / Amazon)',
    dims: '24 × 6.5 × 2.8 cm (Monitoreo de Consumo kWh)',
    desc: 'Control individual de cada toma AC y USB desde tu celular o con Alexa. Incluye temporizador de seguridad para corte automático de cautín y cargadores.',
    localOffset: [-0.16, 0.04, -0.22],
    cameraPreset: 'desk_front',
    links: [
      { label: 'AliExpress: Multicontacto Inteligente Tuya WiFi (~$380)', url: 'https://es.aliexpress.com/w/wholesale-Tuya-smart-power-strip-WiFi.html' },
      { label: 'Multicontacto Inteligente WiFi 4 Tomas + USB (Amazon)', url: 'https://www.amazon.com.mx/s?k=multicontacto+inteligente+wifi+alexa' }
    ]
  },
  baseus_clips: {
    id: 'baseus_clips',
    badge: '🧲 Gestión de Cables · AliExpress',
    name: 'Clips Magnéticos Organizadores de Cables Baseus',
    price: '~$75 MXN (AliExpress)',
    dims: 'Regleta imantada con 3 broches para USB-C y Micro-USB',
    desc: 'Mantiene las puntas de tus cables de carga y depuración listas en el borde del escritorio sin que caigan al piso.',
    localOffset: [0.165, 0.02, 0.19],
    cameraPreset: 'desk_front',
    links: [
      { label: 'AliExpress: Clips Magnéticos Cables Baseus (~$75)', url: 'https://es.aliexpress.com/w/wholesale-Baseus-magnetic-cable-organizer.html' }
    ]
  },
  ftdi_debugger: {
    id: 'ftdi_debugger',
    badge: '🔌 Hardware & Firmware · Depuración Serial',
    name: 'Depurador Serial FTDI FT232RL USB-UART + Jumpers Dupont',
    price: '~$45 MXN (AliExpress)',
    dims: 'Placa roja con LEDs TX/RX + 4 jumpers conectados al ESP32',
    desc: 'Conexión directa entre tu PC y la protoboard para flashear firmware PlatformIO, recibir telemetría serie a 115200 baudios y calibrar lazos de control PID.',
    localOffset: [0.08, 0.03, -0.04],
    cameraPreset: 'desk_lab',
    links: [
      { label: 'AliExpress: Módulo FTDI FT232RL USB a Serial TTL (~$45)', url: 'https://es.aliexpress.com/w/wholesale-FTDI-FT232RL-USB-TTL.html' }
    ]
  },
  geekmagic_tv: {
    id: 'geekmagic_tv',
    badge: '🟠 Telemetría WiFi · AliExpress Choice',
    name: 'Mini Monitor GeekMagic SmallTV Ultra',
    price: '~$360 MXN',
    dims: '4.5 × 4.8 × 4.2 cm (Pantalla IPS 1.54")',
    desc: 'Cubo con pantalla IPS conectada por WiFi/USB-C que muestra gráficas en vivo de uso de CPU/RAM, temperatura, precios cripto o estado de tus servidores mientras programas.',
    localOffset: [-0.04, 0.08, -0.19],
    cameraPreset: 'desk_front',
    links: [
      { label: 'AliExpress: Mini Monitor GeekMagic SmallTV (~$360)', url: 'https://es.aliexpress.com/w/wholesale-GeekMagic-SmallTV.html' }
    ]
  },
  tablet_companion: {
    id: 'tablet_companion',
    badge: '✅ Ya la Tienes · Tablet + Stand Impreso en 3D',
    name: 'Tu Tablet en Base Ergonómica Impresa en 3D (60°)',
    price: 'Ya la tienes ($0 · Stand PLA+ 3D)',
    dims: 'Stand impreso en 3D (11×12 cm) · Orientada hacia tu silla',
    desc: 'Tu tablet colocada en el ala bajo la ventana sobre un soporte minimalista impreso en tu impresora 3D (PLA+ negro mate). Perfecta como pantalla de Spotify, calendario, reloj o notas sin saturar el lado del monitor.',
    localOffset: [-0.02, 0.14, -0.06],
    cameraPreset: 'desk_lab',
    links: [
      { label: 'Printables: Minimalist Tablet Desk Stand (Gratis 3D)', url: 'https://www.printables.com/search/models?q=minimalist+tablet+stand' }
    ]
  },
  mmwave_presence_sensor: {
    id: 'mmwave_presence_sensor',
    badge: '📡 Domótica Avanzada · Radar mmWave 24GHz',
    name: 'Sensor de Presencia Humana Tuya Zigbee 3.0',
    price: '~$320 MXN (AliExpress)',
    dims: '6.5 × 6.5 × 2.2 cm · Detección por micromovimiento y respiración',
    desc: 'A diferencia de los PIR comunes, este radar Doppler de microondas detecta presencia incluso si estás completamente quieto programando o soldando. Automatiza el encendido y apagado de luces y pantallas cuando entras o sales.',
    localOffset: [0, 2.15, 0],
    cameraPreset: 'orbit_3d',
    links: [
      { label: 'AliExpress: Sensor Presencia Humana mmWave Zigbee (~$320)', url: 'https://es.aliexpress.com/w/wholesale-Tuya-Zigbee-mmWave-human-presence-sensor.html' }
    ]
  },
  door_contact_sensor: {
    id: 'door_contact_sensor',
    badge: '🚪 Seguridad & Automatización · Sensor Magnético',
    name: 'Sensor Magnético de Puerta Zigbee Tuya / Aqara',
    price: '~$140 MXN (AliExpress)',
    dims: '4.1 × 2.2 × 1.1 cm con contacto reed switch',
    desc: 'Registra el estado de la puerta (abierta / cerrada). Envía alertas instantáneas a tu celular y dispara rutinas: por ejemplo, encender la luz de bienvenida al llegar a casa de noche.',
    localOffset: [-1.15, 1.95, 1.05],
    cameraPreset: 'orbit_3d',
    links: [
      { label: 'AliExpress: Sensor Puerta Ventana Tuya Zigbee (~$140)', url: 'https://es.aliexpress.com/w/wholesale-Tuya-door-sensor-Zigbee.html' }
    ]
  },
  monitor_main: {
    id: 'monitor_main',
    badge: '✅ Monitor Ya Comprado · Samsung Odyssey G300',
    name: 'Monitor Samsung 24" Odyssey G300 FHD 200Hz (+ Brazo NB F80)',
    price: 'Monitor Ya Comprado · Brazo ~$650',
    dims: '24" (54.4 × 33.3 cm) · VESA 100×100 · Conectado por UGREEN DP 1.4 (200Hz)',
    desc: 'Tu monitor Samsung 24" Odyssey G300 200Hz recién comprado. Como tu mesa tiene 40 cm de fondo, montarlo en un brazo hidráulico North Bayou F80 elimina la base en V (~21 cm) y te regala ~16 cm extra libres para escribir cómodo.',
    localOffset: [-0.09, 0.30, 0],
    cameraPreset: 'desk_front',
    links: [
      { label: 'Brazo Hidráulico North Bayou F80 ($650 Amazon)', url: 'https://www.amazon.com.mx/s?k=North+Bayou+F80+brazo+monitor' },
      { label: 'AliExpress: Barra Luz Monitor Baseus i-wok (~$450)', url: 'https://es.aliexpress.com/w/wholesale-Baseus-monitor-light-bar.html' }
    ]
  },
  monitor_vertical: {
    id: 'monitor_vertical',
    badge: '💻 Vibecoding Dual · Código & Terminal',
    name: 'Monitor 24" Vertical IPS en Brazo Doble NB H180',
    price: '~$2,550 MXN',
    dims: '24" Rotado 90° (32 × 54 cm verticales)',
    desc: 'Pantalla secundaria rotada verticalmente a tu izquierda: te permite leer hasta 120 líneas de código seguidas, dejar abiertos logs de terminal, documentación o chats de IA.',
    localOffset: [-0.01, 0.38, 0.34],
    cameraPreset: 'desk_front',
    links: [
      { label: 'AliExpress: Brazo Doble Hidráulico NB H180 (~$790)', url: 'https://es.aliexpress.com/w/wholesale-North-Bayou-H180.html' },
      { label: 'Monitor 24" IPS VESA (Amazon)', url: 'https://www.amazon.com.mx/s?k=Monitor+24+pulgadas+IPS+VESA' }
    ]
  },
  kaisi_mat: {
    id: 'kaisi_mat',
    badge: '🟠 Laboratorio Electrónica · AliExpress',
    name: 'Tapete de Silicón Térmico y Magnético Kaisi S-160',
    price: '~$145 MXN',
    dims: '38 × 26 cm (Resiste 500 °C)',
    desc: 'Protege la madera negra de tu escritorio cuando sueldas o desarmas equipos. Tiene casilleros numerados e imantados para que no se pierdan tornillos pequeños ni componentes SMD.',
    localOffset: [-0.05, 0.03, 0.05],
    cameraPreset: 'desk_lab',
    links: [
      { label: 'AliExpress: Tapete Silicón Magnético Kaisi (~$145)', url: 'https://es.aliexpress.com/w/wholesale-Kaisi-tapete-silicona-soldadura.html' }
    ]
  },
  fnirsi_iron: {
    id: 'fnirsi_iron',
    badge: '🟠 Herramienta Ingeniero · AliExpress',
    name: 'Cautín Inteligente USB-C FNIRSI HS-02 (100W PD)',
    price: '~$590 MXN',
    dims: '18 cm largo · Pantalla OLED · 100-450 °C en 2 seg',
    desc: 'Cautín de precisión del tamaño de una pluma con pantalla OLED que se alimenta directamente por cable USB-C desde el cargador Ugreen GaN, sin ocupar espacio con estaciones de soldadura viejas.',
    localOffset: [-0.17, 0.08, 0.07],
    cameraPreset: 'desk_lab',
    links: [
      { label: 'AliExpress: Cautín USB-C FNIRSI HS-02 100W (~$590)', url: 'https://es.aliexpress.com/w/wholesale-FNIRSI-HS-02-soldering-iron.html' }
    ]
  },
  esp32_proto: {
    id: 'esp32_proto',
    badge: '🤖 Proyecto Activo · Mecatrónica / IoT',
    name: 'Prototipo de Brazo Robótico + Placa ESP32 en Protoboard',
    price: 'Tu Proyecto de Ingeniería',
    dims: 'Base 13×11 cm + Protoboard con ESP32',
    desc: 'Tu área limpia bajo la ventana para armar y probar el brazo robótico que antes estaba guardado arriba del mueble con espejo, conectado directo a tu placa de desarrollo.',
    localOffset: [0.01, 0.14, 0.05],
    cameraPreset: 'desk_lab',
    links: [
      { label: 'AliExpress: Kits ESP32-S3 / Sensores / Servos (~$85)', url: 'https://es.aliexpress.com/w/wholesale-ESP32-S3-development-board.html' }
    ]
  },
  smd_cabinet: {
    id: 'smd_cabinet',
    badge: '🖨️ Impresión 3D · Gridfinity Rugged Box (5×5)',
    name: 'Cajas Apilables Gridfinity 5×5 (21×21 cm · Electrónica Guardada)',
    price: '~$95 MXN en Filamento PLA+ / PETG',
    dims: '22 × 22 × 14 cm (Cabe exacto en impresora 25×25×25 cm)',
    desc: 'Cajas modulares Gridfinity Rugged Box impresas en 3D y guardadas debajo del escritorio: clasifican tus placas ESP32, resistencias SMD, sensores, jumpers y cautín fuera de la vista para mantener la mesa impecable.',
    localOffset: [-0.02, -0.52, -0.04],
    cameraPreset: 'desk_lab',
    links: [
      { label: 'Printables: Gridfinity Rugged Box 5×5 (Gratis 3D)', url: 'https://www.printables.com/search/models?q=gridfinity+rugged+box+5x5' },
      { label: 'Gridfinity Generator (Cajas a medida 42 mm)', url: 'https://gridfinity.perplexinglabs.com/' }
    ]
  },
  ugreen_gan: {
    id: 'ugreen_gan',
    badge: '🟠 Energía 100W · Tienda Oficial AliExpress',
    name: 'Estación de Carga Ugreen Nexode GaN 100W (4 Puertos)',
    price: '~$680 MXN',
    dims: '6.2 × 8.2 × 6.8 cm (3× USB-C + 1× USB-A)',
    desc: 'Sustituye múltiples eliminadores y regletas: alimenta al mismo tiempo tu laptop, el cautín USB-C FNIRSI de 100W, el reloj Ulanzi y tu celular con un solo bloque sobre la mesa.',
    localOffset: [-0.22, 0.08, -0.09],
    cameraPreset: 'desk_lab',
    links: [
      { label: 'AliExpress: Cargador Ugreen GaN 100W Oficial (~$680)', url: 'https://es.aliexpress.com/w/wholesale-Ugreen-GaN-100W-charger.html' },
      { label: 'AliExpress: Clips Magnéticos Cables Baseus (~$75)', url: 'https://es.aliexpress.com/w/wholesale-Baseus-magnetic-cable-organizer.html' }
    ]
  },
  yolispa_panel: {
    id: 'yolispa_panel',
    badge: '🧰 Tu Selección · Amazon MX / AliExpress',
    name: 'Organizador de Pared Perforado Yolispa Negro Mate',
    price: '~$450 MXN (Amazon) / ~$185 MXN (AliExpress)',
    dims: '46 × 48 cm (4 Paneles modulares + ganchos y repisas)',
    desc: 'Instalado en el tramo libre de pared entre tu TV y el mueble con espejo (z = -0.28 m). Despeja el escritorio subiendo a la pared tus desarmadores, pinzas, cables USB-C y audífonos.',
    localOffset: [0.04, 0.34, 0],
    cameraPreset: 'desk_pegboard',
    links: [
      { label: 'Organizador Perforado Yolispa (Tu link Amazon)', url: 'https://www.amazon.com.mx/Yolispa-Organizador-Perforado-Accesorios-Dormitorio/dp/B0G6D88WT4' },
      { label: 'AliExpress: Set 4 Paneles Perforados Negros (~$185)', url: 'https://es.aliexpress.com/w/wholesale-panel-perforado-organizador-pared-negro.html' }
    ]
  },
  zoyi_meter: {
    id: 'zoyi_meter',
    badge: '🟠 Instrumentación 2-en-1 · AliExpress',
    name: 'Osciloscopio + Multímetro Digital ZOYI ZT-703S',
    price: '~$980 MXN',
    dims: '10.5 × 6.8 × 3.5 cm (Doble Canal 50MHz · Pantalla IPS)',
    desc: 'Colgado en la repisa de tu panel perforado Yolispa: funciona como multímetro True-RMS y osciloscopio portátil de doble canal para depurar señales PWM, I2C y fuentes en tus proyectos.',
    localOffset: [0.05, 0.22, -0.08],
    cameraPreset: 'desk_pegboard',
    links: [
      { label: 'AliExpress: Osciloscopio/Multímetro ZOYI ZT-703S (~$980)', url: 'https://es.aliexpress.com/w/wholesale-ZOYI-ZT-703S.html' }
    ]
  }
};

export const ITEM_INSPECTOR_DB = {
  // Setups Vibecoding (calibrados a 40 cm de fondo)
  vibe_setup_owned: {
    badge: '✅ Ya Comprado · Setup Base (Base V)',
    price: '$0 MXN (Ya lo tienes)',
    dims: 'Samsung Odyssey 24" (Base V ~21 cm) + MX Keys Mini + Hub UGREEN 7-en-1',
    desc: 'Todo lo que ya compraste puesto directamente sobre tus 40 cm de fondo. Puedes comparar esta vista contra la Opción A (Brazo NB F80) para ver cuánto espacio libre ganas al quitar la base en V.',
    cameraPreset: 'desk_front',
    subGadgets: ['monitor_main', 'mx_keys_mini', 'ugreen_hub_7in1', 'mx_master_3s'],
    links: [
      { label: 'Prioridad #1: Brazo Hidráulico North Bayou F80 ($650)', url: 'https://www.amazon.com.mx/s?k=North+Bayou+F80+brazo+monitor' },
      { label: 'AliExpress: Deskpad Fieltro 80×35cm (~$130)', url: 'https://es.aliexpress.com/w/wholesale-desk-mat-felt-dark-grey-80x35.html' }
    ]
  },
  vibe_setup_27: {
    badge: '💻 Zona 1 · Tu Odyssey 24" en Brazo NB F80 (Mesa Limpia)',
    price: '$1,590 MXN (Solo accesorios faltantes)',
    dims: 'Samsung Odyssey 24" en Brazo NB F80 + MX Keys Mini + Hub UGREEN bajo mesa 3D + Ulanzi',
    desc: 'Ala principal 100% despejada para programar: tu Odyssey 24" en brazo hidráulico, MX Keys Mini, mouse, reloj Ulanzi y tu Hub UGREEN en soporte impreso en 3D debajo del borde.',
    cameraPreset: 'desk_front',
    subGadgets: ['monitor_main', 'mx_keys_mini', 'ugreen_hub_7in1', 'mx_master_3s', 'smart_power_strip', 'baseus_clips', 'ulanzi_tc001', 'geekmagic_tv'],
    links: [
      { label: 'Brazo Monitor North Bayou F80 ($650)', url: 'https://www.amazon.com.mx/s?k=North+Bayou+F80+brazo+monitor' },
      { label: 'AliExpress: Deskpad Fieltro 80×35cm (~$130)', url: 'https://es.aliexpress.com/w/wholesale-desk-mat-felt-dark-grey-80x35.html' },
      { label: 'AliExpress: Reloj Pixel Ulanzi TC001 (~$750)', url: 'https://es.aliexpress.com/w/wholesale-Ulanzi-TC001.html' }
    ]
  },
  vibe_setup_dual: {
    badge: '💻 Zona 1 · Odyssey 24" + 24" Vertical',
    price: '$4,290 MXN (Brazo Doble + 2do Monitor)',
    dims: 'Tu Odyssey 24" (DP 200Hz) + 24" Vertical (HDMI Hub UGREEN) + MX Keys Mini',
    desc: 'Configuración de doble pantalla en brazo hidráulico doble: tu Samsung Odyssey 24" al frente por DisplayPort 1.4 y un 24" vertical a la izquierda conectado al puerto HDMI 4K de tu Hub UGREEN 7-en-1.',
    cameraPreset: 'desk_front',
    subGadgets: ['monitor_main', 'monitor_vertical', 'mx_keys_mini', 'ugreen_hub_7in1', 'mx_master_3s', 'smart_power_strip', 'baseus_clips', 'ulanzi_tc001', 'geekmagic_tv'],
    links: [
      { label: 'AliExpress: Brazo Doble Hidráulico NB H180 (~$790)', url: 'https://es.aliexpress.com/w/wholesale-North+Bayou+H180.html' },
      { label: 'Monitor 24" IPS VESA Secundario (Amazon)', url: 'https://www.amazon.com.mx/s?k=Monitor+24+pulgadas+IPS+VESA' }
    ]
  },
  vibe_setup_34: {
    badge: '💻 Zona 1 · Upgrade Ultrawide 34"',
    price: '$7,650 MXN (Monitor 34" Curvo + Ambilight)',
    dims: 'Monitor 34" WQHD (76×34 cm) + Tu MX Keys Mini + Hub UGREEN bajo mesa 3D',
    desc: 'Upgrade futuro a monitor curvo 34" Ultrawide en brazo hidráulico con tira Ambilight Skydimo, aprovechando tu teclado Logitech MX Keys Mini, Hub UGREEN y cable DisplayPort 1.4.',
    cameraPreset: 'desk_front',
    subGadgets: ['mx_keys_mini', 'ugreen_hub_7in1', 'mx_master_3s', 'smart_power_strip', 'baseus_clips', 'monitor_main', 'ulanzi_tc001', 'geekmagic_tv'],
    links: [
      { label: 'AliExpress: Tira Ambilight PC Skydimo 34" (~$280)', url: 'https://es.aliexpress.com/w/wholesale-Skydimo-ambilight-PC-strip.html' },
      { label: 'Monitor Curvo 34" Ultrawide WQHD (Amazon)', url: 'https://www.amazon.com.mx/s?k=Monitor+34+pulgadas+Ultrawide+WQHD' }
    ]
  },
  laptop_stand: {
    badge: '💻 Esquina del Escritorio · Vibecoding',
    price: '~$195 MXN (Stand Aluminio AliExpress)',
    dims: '32 × 28 × 25 cm (Sobre la elevación esquinera)',
    desc: 'Tu Laptop ASUS TUF Gaming F15 colocada sobre la elevación esquinera del escritorio en un soporte ventilado de aluminio, orientada en diagonal (41°) directamente hacia tu silla como segunda pantalla.',
    cameraPreset: 'desk_corner',
    links: [
      { label: 'AliExpress: Stand Aluminio Ventilado Laptop (~$195)', url: 'https://es.aliexpress.com/w/wholesale-laptop-stand-aluminum-cooling.html' },
      { label: 'Base Elevadora Aluminio Laptop (Amazon)', url: 'https://www.amazon.com.mx/s?k=soporte+aluminio+laptop+escritorio' }
    ]
  },
  wood_slat_panel: {
    badge: '🪵 Acabado Setup · Pared Izquierda',
    price: '~$950 MXN',
    dims: '78 cm ancho × 58 cm alto (Debajo de tu TV)',
    desc: 'Panel acústico de listones de madera nogal con fondo de fieltro negro encajado exactamente debajo de tu televisor para darle textura de estudio profesional y ocultar los cables del monitor.',
    cameraPreset: 'desk_front',
    links: [
      { label: 'Panel Acústico Lambrín Madera (Amazon)', url: 'https://www.amazon.com.mx/s?k=panel+acustico+listones+madera+pared' }
    ]
  },

  // Zona 2: Paneles Modulares 3D (Multiboard / HSW) + Ala Ventana + Gridfinity
  yolispa_pegboard: {
    badge: '🖨️ Zona 2 · Multiboard Modular 3D (25×25 cm)',
    price: '~$180 MXN en Filamento PLA+ Negro Mate',
    dims: '36 × 46 cm (4 Losetas de 18×23 cm imprimibles en tu impresora)',
    desc: 'Organizador de pared modular Multiboard impreso en 3D en PLA+ negro mate. Usa roscas firmes, ganchos para audífonos, contenedores Multibin y repisitas sin gastar en paneles comerciales.',
    cameraPreset: 'desk_pegboard',
    subGadgets: ['yolispa_panel'],
    links: [
      { label: 'Multiboard Oficial (STLs gratis 8×8)', url: 'https://www.multiboard.io/' },
      { label: 'Filamento PLA+ Negro Mate 1kg (Amazon MX)', url: 'https://www.amazon.com.mx/s?k=filamento+pla+negro+mate+1.75mm' }
    ]
  },
  yolispa_pegboard_double: {
    badge: '🖨️ Zona 2 · HSW Hexagonal 3D (Honeycomb Wall)',
    price: '~$240 MXN en Filamento PLA+ / PETG Negro Mate',
    dims: '38 × 50 cm (Panal hexagonal modular imprimible en 25×25 cm)',
    desc: 'Honeycomb Storage Wall (HSW) impreso en 3D en negro mate con inserts hexagonales para audífonos, estuche cerrado de precisión y cables enrollados.',
    cameraPreset: 'desk_pegboard',
    subGadgets: ['yolispa_panel'],
    links: [
      { label: 'Printables: Honeycomb Storage Wall Oficial (Gratis)', url: 'https://www.printables.com/model/152592-honeycomb-storage-wall' },
      { label: 'Filamento PLA+ Negro Mate 1kg (Amazon MX)', url: 'https://www.amazon.com.mx/s?k=filamento+pla+negro+mate+1.75mm' }
    ]
  },
  engineer_maker_station: {
    badge: '✨ Zona 2 · Ala Ventana (Echo Dot Blanca + Tablet + 3D)',
    price: 'Echo Dot + Tablet Ya Comprados ($0 · Accesorios 3D)',
    dims: 'Ala 80 × 40 cm · Trípode Echo Dot + Stand Tablet + Maceta Acanalada + Gridfinity 5×5',
    desc: 'Equilibra el otro lado de tu mesa sin perder la estética limpia: tu Alexa Echo Dot blanca en trípode 3D, tu Tablet en stand 3D, maceta acanalada Japandi impresa en PLA arena, libreta/portavasos hexagonal y tus 2 cajas Gridfinity Rugged Box guardadas debajo.',
    cameraPreset: 'desk_lab',
    subGadgets: ['alexa_echo', 'tablet_companion', 'smd_cabinet'],
    links: [
      { label: 'Printables: Gridfinity Rugged Box 5×5 (Gratis 3D)', url: 'https://www.printables.com/search/models?q=gridfinity+rugged+box+5x5' },
      { label: 'Printables: Maceta Acanalada Fluted Pot (Gratis 3D)', url: 'https://www.printables.com/search/models?q=fluted+minimalist+planter' }
    ]
  },

  // Zona 3: Repisas Flotantes
  shelf_lack_110: {
    badge: '📚 Zona 3 · Repisa Flotante Minimalista',
    price: '$349 MXN (IKEA MX) / ~$140 MXN (AliExpress)',
    dims: '48 cm ancho × 20 cm fondo × 4.5 cm grosor',
    desc: 'Repisa flotante negra mate con herraje oculto instalada justo arriba de tu panel perforado Yolispa (sin chocar con la TV ni con el mueble espejo). Ideal para colocar libros de ingeniería y prototipos terminados.',
    cameraPreset: 'desk_pegboard',
    links: [
      { label: 'Repisa Flotante IKEA LACK ($349)', url: 'https://www.ikea.com/mx/es/search/?q=LACK+estante+pared' },
      { label: 'AliExpress: Repisa Flotante Aluminio Negro (~$140)', url: 'https://es.aliexpress.com/w/wholesale-repisa-flotante-pared-negra-minimalista.html' }
    ]
  },
  shelf_duo_stepped: {
    badge: '📚 Zona 3 · Set 2 Repisas con Borde Anti-Caída',
    price: '$380 MXN',
    dims: '2 repisas de 48 × 18 cm escalonadas',
    desc: 'Doble repisa flotante con labio frontal de seguridad para exhibir teclados mecánicos, cajas de placas o coleccionables sin riesgo de que resbalen.',
    cameraPreset: 'desk_pegboard',
    links: [
      { label: 'AliExpress: Repisas Pared con Borde Negro (~$135)', url: 'https://es.aliexpress.com/w/wholesale-floating-wall-shelf-ledge-black.html' },
      { label: 'Set Repisas Flotantes Negras (Amazon)', url: 'https://www.amazon.com.mx/s?k=set+repisas+flotantes+negras+60+cm' }
    ]
  },
  shelf_walnut_led: {
    badge: '📚 Zona 3 · Repisas Nogal con Difusor LED',
    price: '$690 MXN',
    dims: '2 repisas de 48 × 20 cm con tira LED cálida inferior',
    desc: 'Par de repisas en madera tono nogal con perfil difusor de aluminio negro de AliExpress integrado por debajo, bañando de luz cálida tu panel perforado Yolispa.',
    cameraPreset: 'desk_pegboard',
    links: [
      { label: 'AliExpress: Perfil Aluminio Negro Difusor LED (~$110)', url: 'https://es.aliexpress.com/w/wholesale-perfil-aluminio-negro-tira-led.html' },
      { label: 'Repisas Flotantes Madera Parota / Nogal (Amazon)', url: 'https://www.amazon.com.mx/s?k=repisas+flotantes+madera+nogal+parota' }
    ]
  },

  // Zona 4: Iluminación y Domótica
  led_strip_desk: {
    badge: '💡 Zona 4 · Iluminación Indirecta Tuya WiFi',
    price: '~$195 MXN (AliExpress Choice)',
    dims: 'Tira LED RGBIC / Cálida detrás del borde del escritorio (110 cm)',
    desc: 'Baña la pared de tu setup con luz indirecta regulable por WiFi (Tuya Smart / Home Assistant / Alexa) para eliminar el contraste duro de las pantallas de noche.',
    cameraPreset: 'desk_front',
    links: [
      { label: 'AliExpress: Tira LED RGBIC Tuya WiFi 5m (~$195)', url: 'https://es.aliexpress.com/w/wholesale-Tuya-WiFi-RGBIC-LED-strip-5m.html' }
    ]
  },
  led_strip_tv: {
    badge: '💡 Zona 4 · Bias Lighting TV',
    price: 'Incluida en Kit LED (~$145 MXN)',
    dims: '78 cm detrás del televisor',
    desc: 'Luz ambiental suave detrás de tu TV en la pared izquierda.',
    cameraPreset: 'desk_front',
    links: [
      { label: 'AliExpress: Tira LED USB TV Backlight (~$95)', url: 'https://es.aliexpress.com/w/wholesale-TV-LED-backlight-USB-warm-white.html' }
    ]
  },
  led_strip_bunk: {
    badge: '💡 Zona 4 · Luz de Lectura Bajo Litera Superior',
    price: '~$145 MXN (Tira COB 480 LEDs/m AliExpress)',
    dims: '180 cm a lo largo del larguero inferior de la 2da litera',
    desc: 'Elimina la sombra que el colchón superior proyecta sobre tu cama de abajo. Al ser tecnología COB de 480 LEDs/m, se ve una línea continua elegante sin puntitos.',
    cameraPreset: 'zoom_underbed',
    links: [
      { label: 'AliExpress: Tira LED COB 3000K 5m Continua (~$145)', url: 'https://es.aliexpress.com/w/wholesale-COB-LED-strip-3000K-5m-dimmer.html' },
      { label: 'AliExpress: Controlador Tuya WiFi Dimmer (~$95)', url: 'https://es.aliexpress.com/w/wholesale-Tuya-WiFi-LED-dimmer-controller-single-color.html' }
    ]
  },
  floor_lamp: {
    badge: '💡 Zona 4 · Lámpara Esquinera Minimalista',
    price: '~$390 MXN (AliExpress) / $990 MXN (Amazon)',
    dims: '142 cm altura × 20 cm base en esquina',
    desc: 'Lámpara vertical RGBIC/Cálida de aluminio negro colocada en la esquina entre el escritorio y el clóset.',
    cameraPreset: 'orbit_3d',
    links: [
      { label: 'AliExpress: Lámpara Esquina RGBIC Tuya 140cm (~$390)', url: 'https://es.aliexpress.com/w/wholesale-corner-floor-lamp-RGBIC-Tuya.html' },
      { label: 'Lámpara de Esquina LED Govee (Amazon)', url: 'https://www.amazon.com.mx/s?k=lampara+de+esquina+led+govee+rgbic' }
    ]
  },

  // Zona 5: Fútbol en 2da Litera (Bufandas y Balones)
  soccer_scarves_2: {
    badge: '⚽ Zona 5 · Pared de la 2da Litera',
    price: '~$85 MXN (Soportes adhesivos para tus bufandas)',
    dims: '118 cm largo × 42 cm alto sobre la cama superior',
    desc: 'Tus 2 bufandas de fútbol exhibidas horizontalmente en la pared blanca de la segunda litera usando clips invisibles sin perforar y sin gastar espacio útil del cuarto.',
    cameraPreset: 'zoom_soccer',
    links: [
      { label: 'AliExpress: Clips Adhesivos Invisibles para Bufandas/Textil (~$65)', url: 'https://es.aliexpress.com/w/wholesale-tapestry-wall-hanger-clips-black.html' }
    ]
  },
  soccer_scarves_3: {
    badge: '⚽ Zona 5 · Mural de 3 Bufandas Iluminadas (2da Litera)',
    price: '~$260 MXN (Clips + Perfil LED superior)',
    dims: '120 cm largo × 56 cm alto en la pared de la 2da litera',
    desc: '3 bufandas de tu colección montadas en paralelo sobre la pared de la segunda litera con una barra difusora LED superior que resalta los colores del tejido.',
    cameraPreset: 'zoom_soccer',
    links: [
      { label: 'AliExpress: Clips Adhesivos Invisibles para Bufandas (~$65)', url: 'https://es.aliexpress.com/w/wholesale-tapestry-wall-hanger-clips-black.html' },
      { label: 'AliExpress: Barra LED Magnética Recargable (~$140)', url: 'https://es.aliexpress.com/w/wholesale-magnetic-LED-wall-light-bar.html' }
    ]
  },
  soccer_bunk_balls_2: {
    badge: '⚽ Zona 5 · Soportes de Pared para Balones (2da Litera)',
    price: '~$130 MXN par en AliExpress / $290 MXN en Amazon',
    dims: '2 Aros de acero negro de 24 cm flanqueando tus bufandas',
    desc: 'Quita los balones sueltos del colchón y los convierte en parte de tu exhibición junto a las bufandas en la segunda litera.',
    cameraPreset: 'zoom_soccer',
    links: [
      { label: 'AliExpress: Par Soportes Pared Balón Metálicos (~$130)', url: 'https://es.aliexpress.com/w/wholesale-wall-mount-ball-holder-claw-metal.html' },
      { label: 'Set 2 Soportes Metálicos Pared Balón (Amazon)', url: 'https://www.amazon.com.mx/s?k=soporte+pared+balon+futbol+metal+negro' }
    ]
  },
  soccer_display_shelf: {
    badge: '⚽ Zona 5 · Repisa Exhibidora Balones + Tachones LED',
    price: '~$450 MXN',
    dims: '82 cm largo × 22 cm fondo en 2da litera',
    desc: 'Repisa flotante con vitrina acrílica iluminada de AliExpress para exhibir tus balones oficiales y un par de tachones en la pared de la segunda litera.',
    cameraPreset: 'zoom_soccer',
    links: [
      { label: 'AliExpress: Caja Acrílica con Luz LED para Tachones (~$240)', url: 'https://es.aliexpress.com/w/wholesale-LED-acrylic-shoe-display-box.html' },
      { label: 'AliExpress: Soporte Pared Balón (~$65)', url: 'https://es.aliexpress.com/w/wholesale-wall-mount-ball-holder-claw.html' }
    ]
  },
  soccer_rug: {
    badge: '⚽ Zona 5 · Tapete Central Minimalista',
    price: '~$520 MXN',
    dims: '145 × 85 cm en el pasillo central',
    desc: 'Tapete tejido en gris grafito con sutiles líneas geométricas de cancha que aporta calidez acústica y visual al piso.',
    cameraPreset: 'orbit_3d',
    links: [
      { label: 'Tapete Minimalista Gris Geométrico (Amazon)', url: 'https://www.amazon.com.mx/s?k=tapete+recamara+minimalista+gris+oscuro+150x80' }
    ]
  },

  // Zona 6: Almacenamiento Bajo Cama y Puerta
  underbed_skubb_cases: {
    badge: '📦 Zona 6 · Almacenamiento Bajo Cama (Prioridad #1)',
    price: '~$597 MXN (3 Estuches IKEA SKUBB) / ~$390 MXN (AliExpress)',
    dims: '3 estuches de 55 × 69 × 19 cm con cierre anti-polvo',
    desc: 'Aprovechan los 30 cm libres debajo de tu litera inferior para guardar toda la ropa de temporada, cobijas y el contenido de las bolsas negras junto a la puerta.',
    cameraPreset: 'zoom_underbed',
    links: [
      { label: 'Estuche Bajo Cama IKEA SKUBB Negro ($199 c/u)', url: 'https://www.ikea.com/mx/es/search/?q=SKUBB+estuche' },
      { label: 'AliExpress: Pack 3 Bolsas Organizadoras Bajo Cama (~$260)', url: 'https://es.aliexpress.com/w/wholesale-under-bed-storage-containers-black.html' }
    ]
  },
  underbed_wheeled_drawers: {
    badge: '📦 Zona 6 · Cajones con Ruedas Bajo Cama',
    price: '~$580 MXN par (AliExpress) / $1,298 MXN (IKEA VARDÖ)',
    dims: '2 cajones de 75 × 72 × 19 cm con ruedas suaves',
    desc: 'Dos cajones rígidos con ruedas bajo la primera litera: ideales para sacar y meter con una sola mano ropa, calzado o cajas de proyectos de ingeniería.',
    cameraPreset: 'zoom_underbed',
    links: [
      { label: 'AliExpress: Cajón Bajo Cama con Ruedas Metálico (~$290)', url: 'https://es.aliexpress.com/w/wholesale-under-bed-storage-with-wheels.html' },
      { label: 'Cajón Bajo Cama IKEA VARDÖ / SÖMNTUTA', url: 'https://www.ikea.com/mx/es/search/?q=cajon+bajo+cama' }
    ]
  },
  underbed_shoe_pullout: {
    badge: '📦 Zona 6 · Zapatera Deslizable Bajo Cama',
    price: '~$240 MXN (AliExpress)',
    dims: 'Charola con ruedas para 8 pares + Caja cerrada',
    desc: 'Guarda tus sandalias y tenis diarios justo debajo del borde de la litera inferior para que el pasillo luzca siempre despejado.',
    cameraPreset: 'zoom_underbed',
    links: [
      { label: 'AliExpress: Organizador Zapatos Bajo Cama Ruedas (~$240)', url: 'https://es.aliexpress.com/w/wholesale-under-bed-shoe-organizer-wheels.html' }
    ]
  },
  ikea_trones_pair: {
    badge: '🚪 Zona 6 · Pared junto a la Puerta (18 cm fondo)',
    price: '$1,099 MXN (Pack de 2 módulos IKEA TRONES)',
    dims: '78 cm ancho × 18 cm fondo × 76 cm alto',
    desc: 'Reemplaza el montón de bolsas negras junto a la puerta con 2 gabinetes abatibles ultra-delgados de solo 18 cm de grosor que no estorban el paso ni el giro de la puerta.',
    cameraPreset: 'orbit_3d',
    links: [
      { label: 'Zapatero / Gabinete de Pared IKEA TRONES Negro ($1,099)', url: 'https://www.ikea.com/mx/es/search/?q=TRONES' }
    ]
  },
  shoe_cabinet: {
    badge: '🚪 Zona 6 · Gabinete Cerrado junto a la Puerta',
    price: '~$1,450 MXN',
    dims: '70 × 25 × 86 cm',
    desc: 'Gabinete minimalista negro con 2 puertas abatibles para guardar mochilas, calzado y objetos en la pared sur junto a la entrada.',
    cameraPreset: 'orbit_3d',
    links: [
      { label: 'Gabinete Zapatero Delgado Minimalista Negro (Amazon)', url: 'https://www.amazon.com.mx/s?k=zapatera+mueble+delgado+negro+moderno' }
    ]
  },
  wall_coat_rack: {
    badge: '🚪 Zona 6 · Perchero de Pared Plegable',
    price: '~$220 MXN (AliExpress / Amazon)',
    dims: '56 × 12 cm',
    desc: 'Perchero de aluminio negro para colgar tu mochila gris y la chamarra negra que antes colgaba del poste de la litera.',
    cameraPreset: 'orbit_3d',
    links: [
      { label: 'AliExpress: Perchero Pared Aluminio Ganchos Ocultos (~$160)', url: 'https://es.aliexpress.com/w/wholesale-retractable-wall-coat-rack-black.html' },
      { label: 'Perchero de Pared Minimalista Negro (Amazon)', url: 'https://www.amazon.com.mx/s?k=perchero+pared+minimalista+negro+mochilas' }
    ]
  },
  top_storage_boxes: {
    badge: '📦 Zona 6 · Orden sobre el Mueble Espejo',
    price: '$198 MXN (2 Cajas IKEA TJENA con tapa)',
    dims: '2 cajas de 34 × 28 × 25 cm',
    desc: 'Sustituyen las cajas sueltas de cartón (ASUS TUF y Oster) sobre el mueble con espejo por 2 cajas negras uniformes con tapa para guardar accesorios y cables.',
    cameraPreset: 'orbit_3d',
    links: [
      { label: 'Caja con Tapa IKEA TJENA Negra ($99 c/u)', url: 'https://www.ikea.com/mx/es/search/?q=TJENA+caja+con+tapa+negro' }
    ]
  },
  under_desk_drawer: {
    badge: '🗄️ Zona 2 · Cajonera Bajo Escritorio',
    price: '$2,999 MXN (IKEA ALEX)',
    dims: '36 × 44 × 71 cm (5 cajones)',
    desc: 'Cajonera negra/gris oscuro de 5 cajones debajo del ala izquierda del escritorio para guardar multímetros, cautines, cuadernos, cables y herramientas pesadas.',
    cameraPreset: 'desk_front',
    links: [
      { label: 'Cajonera 5 Cajones IKEA ALEX ($2,999)', url: 'https://www.ikea.com/mx/es/search/?q=ALEX+cajonera' }
    ]
  },
  ergo_chair: {
    badge: '🪑 Zona 2 · Ergonomía Vibecoding',
    price: '~$2,450 MXN',
    dims: '52 × 52 × 96 cm (Respaldo de malla + soporte lumbar)',
    desc: 'Silla ergonómica de malla negra transpirable con cabecera y soporte lumbar, orientada hacia tu monitor principal.',
    cameraPreset: 'orbit_3d',
    links: [
      { label: 'Silla Ergonómica Malla Soporte Lumbar (Amazon)', url: 'https://www.amazon.com.mx/s?k=silla+ergonomica+oficina+malla+negra' }
    ]
  },
  trash_bin: {
    badge: '🗑️ Orden Bajo Escritorio',
    price: '~$290 MXN',
    dims: '22 × 22 × 32 cm',
    desc: 'Bote de basura cilíndrico negro mate oculto bajo el escritorio para recortes de cables, estaño y papel.',
    cameraPreset: 'desk_lab',
    links: [
      { label: 'Bote de Basura Negro Mate Oficina (Amazon)', url: 'https://www.amazon.com.mx/s?k=bote+basura+oficina+negro+minimalista' }
    ]
  },
  laundry_hamper: {
    badge: '🧺 Orden entre Clóset y Litera',
    price: '~$380 MXN',
    dims: '40 × 32 × 60 cm con tapa de bambú',
    desc: 'Cesto de ropa sucia cerrado con tapa que reemplaza la charola abierta entre el clóset y la litera.',
    cameraPreset: 'orbit_3d',
    links: [
      { label: 'Cesto Ropa Sucia con Tapa Negro (Amazon)', url: 'https://www.amazon.com.mx/s?k=cesto+ropa+sucia+con+tapa+negro+bambu' }
    ]
  },

  // Muebles Base Actuales del Cuarto
  l_desk: {
    badge: '🏠 Mueble Existente (Medidas Reales Calibradas)',
    price: 'Mueble Actual ($0)',
    dims: '120 × 120 × 75 cm · Fondo de tabla: 40 cm · L interior: 80 × 80 cm',
    desc: 'Tu escritorio en L negro calibrado a sus medidas reales exactas (1.20×1.20 m exteriores, 0.80×0.80 m en el interior de la L y 40 cm de fondo de mesa). Al tener 40 cm de fondo, usar brazo VESA para tu Odyssey 24" marca una diferencia enorme.',
    cameraPreset: 'desk_front',
    links: []
  },
  tv_wall: {
    badge: '🏠 Equipo Existente en tu Cuarto',
    price: 'Equipo Actual ($0)',
    dims: '84 × 50 cm (Montada a 1.39 m de altura)',
    desc: 'Tu pantalla de TV montada en la esquina superior izquierda sobre el escritorio.',
    cameraPreset: 'desk_front',
    links: []
  },
  gray_closet: {
    badge: '🏠 Mueble Existente en tu Cuarto',
    price: 'Mueble Actual ($0)',
    dims: '114 × 54 × 218 cm (3 cajones + nicho + maletero)',
    desc: 'Tu clóset gris veteado en la esquina superior derecha junto a la ventana.',
    cameraPreset: 'orbit_3d',
    links: []
  },
  bunk_bed: {
    badge: '🏠 Mueble Existente en tu Cuarto',
    price: 'Mueble Actual ($0)',
    dims: '98 × 194 × 172 cm (30 cm libres debajo)',
    desc: 'Tus literas tubulares negras. Puedes cambiar el color de los edredones desde la sección de Acabados y aprovechar tanto los 30 cm bajo la cama inferior como la pared de la 2da litera.',
    cameraPreset: 'zoom_soccer',
    links: []
  },
  mirror_cabinet: {
    badge: '🏠 Mueble Existente en tu Cuarto',
    price: 'Mueble Actual ($0)',
    dims: '36 × 64 × 185 cm (Con foco empotrado y espejo)',
    desc: 'Tu mueble negro con espejo de cuerpo completo ubicado entre el escritorio y la puerta de entrada.',
    cameraPreset: 'orbit_3d',
    links: []
  },
  current_chair: {
    badge: '🏠 Mueble Existente en tu Cuarto',
    price: 'Mueble Actual ($0)',
    dims: '48 × 48 × 88 cm',
    desc: 'Tu silla actual frente al escritorio (se oculta automáticamente al acercar la cámara al escritorio para no tapar tu vista).',
    cameraPreset: 'desk_front',
    links: []
  },
  closet_organizer_bin: {
    badge: '🧹 Estado Actual (Fotos)',
    price: 'Organizador Actual',
    dims: '42 × 34 × 72 cm',
    desc: 'Cajón organizador abierto entre el clóset y la cabecera de la litera.',
    cameraPreset: 'orbit_3d',
    links: []
  },
  clutter_floor_bags: {
    badge: '🧹 Punto Crítico a Organizar (Fotos)',
    price: 'Se resuelve con Zona 6 (Bajo Cama + TRONES)',
    dims: '78 × 46 × 62 cm junto a la puerta',
    desc: 'Bolsas negras y mochila gris en el piso junto a la puerta. Al activar los estuches bajo cama (IKEA SKUBB) y los zapateros de pared (TRONES), todo esto queda guardado sin ocupar piso.',
    cameraPreset: 'zoom_underbed',
    links: [
      { label: 'Estuche Bajo Cama IKEA SKUBB ($199)', url: 'https://www.ikea.com/mx/es/search/?q=SKUBB+estuche' },
      { label: 'Zapatero Pared IKEA TRONES ($1,099)', url: 'https://www.ikea.com/mx/es/search/?q=TRONES' }
    ]
  },
  clutter_mirror_top: {
    badge: '🧹 Punto a Organizar (Fotos)',
    price: 'Se resuelve con Cajas IKEA TJENA + Banco Lab',
    dims: '34 × 62 × 42 cm sobre el mueble espejo',
    desc: 'Caja de laptop ASUS TUF F15, caja Oster y prototipo de brazo robótico arriba del espejo. En los combos organizados el brazo robótico pasa a tu laboratorio y las cajas se guardan en organizadores negros con tapa.',
    cameraPreset: 'orbit_3d',
    links: [
      { label: 'Caja con Tapa IKEA TJENA Negra ($99)', url: 'https://www.ikea.com/mx/es/search/?q=TJENA+caja+con+tapa+negro' }
    ]
  },
  clutter_tv_blanket: {
    badge: '🧹 Estado Actual (Fotos)',
    price: 'Cobija sobre TV',
    dims: '88 × 54 cm',
    desc: 'Cobija amarilla colgada sobre la televisión en las fotos originales.',
    cameraPreset: 'desk_front',
    links: []
  },
  clutter_desk_items: {
    badge: '🧹 Punto a Organizar (Fotos)',
    price: 'Se resuelve con Panel Yolispa + Gavetero',
    dims: 'Objetos sueltos sobre y bajo el escritorio',
    desc: 'Vasos, botellas, libretas apiladas en la esquina y bolsas bajo el escritorio.',
    cameraPreset: 'desk_front',
    links: []
  },
  clutter_bunk_items: {
    badge: '🧹 Punto a Organizar (Fotos)',
    price: 'Se resuelve con Soportes de Balón + Perchero',
    dims: 'Chamarra, playera celeste y balón suelto en litera',
    desc: 'Al agregar el perchero de pared y los soportes metálicos de balón en la 2da litera, las camas quedan limpias.',
    cameraPreset: 'zoom_soccer',
    links: []
  },
  dry_erase_whiteboard: {
    badge: '📋 Pizarrón de Diagramas & Notas · Tu Cuarto',
    price: 'Equipo Existente ($0)',
    dims: '65 × 48 cm (Marco de aluminio + charola para plumones)',
    desc: 'Tu pizarrón blanco con diagramas de pines ESP32, lazo de control PID y notas de tareas. Recomendamos montarlo en la Pared Sur frente al escritorio para que la puerta nunca lo tape.',
    cameraPreset: 'whiteboard_view',
    links: [
      { label: 'Marcadores Borrado en Seco Expo (Amazon MX)', url: 'https://www.amazon.com.mx/s?k=marcadores+para+pizarron+blanco+expo' },
      { label: 'AliExpress: Organizador Magnético Plumones (~$65)', url: 'https://es.aliexpress.com/w/wholesale-magnetic-whiteboard-pen-holder.html' }
    ]
  }
};

// Detecta qué sub-gadget específico tocó el usuario dentro de un grupo compuesto (según coordenadas locales 3D)
export function detectSubGadgetFromHit(itemType, localPt) {
  if (!localPt) return null;
  if (
    itemType === 'vibe_setup_owned' ||
    itemType === 'vibe_setup_27' ||
    itemType === 'vibe_setup_dual' ||
    itemType === 'vibe_setup_34'
  ) {
    if (localPt.y < 0.0) {
      return 'ugreen_hub_7in1';
    }
    if (localPt.y < 0.085) {
      if (localPt.z < -0.18 && localPt.x < -0.11) return 'smart_power_strip';
      if (localPt.x > 0.13 && localPt.z > 0.14) return 'baseus_clips';

      if (localPt.x > 0.02) {
        return localPt.z <= -0.11 ? 'mx_master_3s' : 'mx_keys_mini';
      } else {
        if (localPt.z > -0.05) return 'ulanzi_tc001';
        if (localPt.z < -0.08) return 'geekmagic_tv';
      }
    }
    if (itemType === 'vibe_setup_dual' && localPt.z > 0.19) {
      return 'monitor_vertical';
    }
    return 'monitor_main';
  }

  if (itemType === 'engineer_maker_station') {
    if (localPt.y < -0.20) return 'smd_cabinet';
    if (localPt.x < -0.13 && localPt.z < 0.03) return 'alexa_echo';
    if (localPt.x >= -0.13 && localPt.x <= 0.11 && localPt.z < 0.05) return 'tablet_companion';
    return null;
  }

  if (itemType === 'yolispa_pegboard' || itemType === 'yolispa_pegboard_double') {
    return 'yolispa_panel';
  }

  return null;
}
