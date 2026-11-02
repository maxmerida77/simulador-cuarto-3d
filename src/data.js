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
    title: '1. Setup Vibecoding (Teclado Logitech + Gadgets AliExpress)',
    subtitle: 'Ala izquierda del escritorio: teclado MX Keys Mini, pantallas y gadgets de telemetría (Ulanzi TC001 / GeekMagic)',
    defaultOption: 'vibe_27_mx',
    cameraPreset: 'desk_front',
    options: [
      {
        id: 'none',
        name: 'Actual (Solo escritorio vacío)',
        price: 0,
        store: 'Estado actual',
        dims: '-',
        desc: 'Sin monitor externo ni periféricos inalámbricos.',
        links: [],
        spawnItems: []
      },
      {
        id: 'vibe_27_mx',
        name: 'Opción A: Logitech MX Keys Mini + Monitor 27" + Reloj Ulanzi TC001 (AliExpress)',
        price: 5850,
        store: 'Amazon MX + AliExpress',
        dims: 'Teclado 29.6×13 cm · Monitor 27" · Reloj Pixel Ulanzi 20×7 cm',
        desc: 'Tu teclado Logitech MX Keys Mini + Mouse MX Master 3S en tu mano derecha + Monitor 27" en brazo hidráulico + Laptop ASUS TUF sobre la base esquinera mirando hacia ti.',
        links: [
          { label: 'Teclado Logitech MX Keys Mini (Tu link Amazon)', url: 'https://www.amazon.com.mx/Logitech-Inal%C3%A1mbrico-Minimalista-Retroiluminado-Compatible/dp/B09HYVWYYJ' },
          { label: 'AliExpress: Reloj Pixel Ulanzi TC001 (~$780)', url: 'https://es.aliexpress.com/w/wholesale-Ulanzi-TC001.html' },
          { label: 'AliExpress: Mini Monitor GeekMagic SmallTV (~$360)', url: 'https://es.aliexpress.com/w/wholesale-GeekMagic-SmallTV.html' },
          { label: 'AliExpress: Deskpad Fieltro 90×40cm (~$130)', url: 'https://es.aliexpress.com/w/wholesale-desk-mat-felt-dark-grey-90x40.html' },
          { label: 'Brazo Monitor North Bayou F80 ($650)', url: 'https://www.amazon.com.mx/s?k=North+Bayou+F80+brazo+monitor' }
        ],
        spawnItems: [
          { id: 'upg_mon', type: 'vibe_setup_27', x: -0.90, z: -0.66, rotY: 0, elevation: 0.75 },
          { id: 'upg_lap', type: 'laptop_stand', x: -0.92, z: -1.26, rotY: 0.72, elevation: 0.88 }
        ]
      },
      {
        id: 'vibe_dual_vertical',
        name: 'Opción B: Doble Monitor (27" + 24" Vertical Código) + MX Keys Mini',
        price: 8400,
        store: 'Amazon MX + AliExpress',
        dims: '27" Principal + 24" Vertical en Brazo Doble NB H180',
        desc: 'El favorito para Vibecoding e Ingeniería: pantalla vertical a la izquierda para código/terminales/IA y pantalla 27" central en brazo doble + Laptop en la esquina mirando hacia ti.',
        links: [
          { label: 'Teclado Logitech MX Keys Mini (Tu link Amazon)', url: 'https://www.amazon.com.mx/Logitech-Inal%C3%A1mbrico-Minimalista-Retroiluminado-Compatible/dp/B09HYVWYYJ' },
          { label: 'AliExpress: Brazo Doble Hidráulico NB H180 (~$790)', url: 'https://es.aliexpress.com/w/wholesale-North-Bayou-H180.html' },
          { label: 'AliExpress: Stand Aluminio Laptop (~$195)', url: 'https://es.aliexpress.com/w/wholesale-vertical-laptop-stand-aluminum.html' },
          { label: 'Mouse Logitech MX Master 3S (Amazon)', url: 'https://www.amazon.com.mx/s?k=Logitech+MX+Master+3S' }
        ],
        spawnItems: [
          { id: 'upg_mon', type: 'vibe_setup_dual', x: -0.90, z: -0.66, rotY: 0, elevation: 0.75 },
          { id: 'upg_lap', type: 'laptop_stand', x: -0.92, z: -1.26, rotY: 0.72, elevation: 0.88 }
        ]
      },
      {
        id: 'vibe_34_ultra',
        name: 'Opción C: Monitor 34" Ultrawide Curvo + Ambilight Skydimo + Lambrín',
        price: 9200,
        store: 'Amazon MX + AliExpress',
        dims: 'Monitor 34" (76×34 cm) + Lambrín Nogal 78×58 cm',
        desc: 'Monitor Curvo 34" Ultrawide + Tira Ambilight USB Skydimo + Teclado Logitech MX Keys Mini + Panel acústico de nogal encajado exactamente debajo de tu TV.',
        links: [
          { label: 'Teclado Logitech MX Keys Mini (Tu link Amazon)', url: 'https://www.amazon.com.mx/Logitech-Inal%C3%A1mbrico-Minimalista-Retroiluminado-Compatible/dp/B09HYVWYYJ' },
          { label: 'AliExpress: Tira Ambilight PC Skydimo 34" (~$280)', url: 'https://es.aliexpress.com/w/wholesale-Skydimo-ambilight-PC-strip.html' },
          { label: 'Monitor Curvo 34" Ultrawide WQHD (Amazon)', url: 'https://www.amazon.com.mx/s?k=Monitor+34+pulgadas+Ultrawide+WQHD' },
          { label: 'Panel Acústico Lambrín Madera (Amazon)', url: 'https://www.amazon.com.mx/s?k=panel+acustico+listones+madera+pared' }
        ],
        spawnItems: [
          { id: 'upg_mon', type: 'vibe_setup_34', x: -0.90, z: -0.66, rotY: 0, elevation: 0.75 },
          { id: 'upg_lap', type: 'laptop_stand', x: -0.92, z: -1.26, rotY: 0.72, elevation: 0.88 },
          { id: 'upg_slat', type: 'wood_slat_panel', x: -1.12, z: -0.82, rotY: 0, elevation: 0.76 }
        ]
      }
    ]
  },

  {
    id: 'engineer_pegboard_zone',
    title: '2. Panel Perforado (Yolispa) y Laboratorio Maker (AliExpress)',
    subtitle: 'Organiza herramientas, cautín USB-C FNIRSI, tapete Kaisi y placas ESP32 en el ala bajo la ventana',
    defaultOption: 'eng_yolispa_lab',
    cameraPreset: 'desk_lab',
    options: [
      {
        id: 'none',
        name: 'Actual (Sin panel perforado ni organizador de electrónica)',
        price: 0,
        store: 'Estado actual',
        dims: '-',
        desc: 'Proyectos y cables guardados en cajas/bolsas.',
        links: [],
        spawnItems: []
      },
      {
        id: 'eng_yolispa_lab',
        name: 'Opción A: Panel Yolispa + Tapete Kaisi S-160 + Cautín FNIRSI HS-02 (AliExpress)',
        price: 1180,
        store: 'Amazon MX + AliExpress Choice',
        dims: 'Panel Yolispa 46×48 cm · Tapete Kaisi 38×26 cm · Cautín USB-C 100W',
        desc: 'Organizador perforado Yolispa entre la TV y el espejo + Tapete magnético térmico Kaisi S-160 bajo la ventana + Cautín inteligente USB-C FNIRSI HS-02 + Gavetero mirando hacia ti.',
        links: [
          { label: 'Organizador Perforado Yolispa (Tu link Amazon)', url: 'https://www.amazon.com.mx/Yolispa-Organizador-Perforado-Accesorios-Dormitorio/dp/B0G6D88WT4' },
          { label: 'AliExpress: Paneles Perforados Negros (~$185 set)', url: 'https://es.aliexpress.com/w/wholesale-panel-perforado-organizador-pared-negro.html' },
          { label: 'AliExpress: Tapete Silicón Magnético Kaisi (~$145)', url: 'https://es.aliexpress.com/w/wholesale-Kaisi-tapete-silicona-soldadura.html' },
          { label: 'AliExpress: Cautín USB-C FNIRSI HS-02 100W (~$590)', url: 'https://es.aliexpress.com/w/wholesale-FNIRSI-HS-02-soldering-iron.html' }
        ],
        spawnItems: [
          { id: 'upg_peg_1', type: 'yolispa_pegboard', x: -1.11, z: -0.28, rotY: 0, elevation: 0.88 },
          { id: 'upg_eng_1', type: 'engineer_maker_station', x: -0.34, z: -1.25, rotY: 0, elevation: 0.75 }
        ]
      },
      {
        id: 'eng_skadis_ugreen',
        name: 'Opción B: Panel Doble + Cargador Ugreen GaN 100W + Osciloscopio ZOYI (AliExpress)',
        price: 1950,
        store: 'AliExpress Oficial + Amazon',
        dims: 'Pegboard Extendido + Ugreen GaN 100W + Multímetro/Osciloscopio ZT-703S',
        desc: 'En la tienda oficial de Ugreen y ZOYI en AliExpress ahorras ~45%: Cargador GaN de escritorio 100W + Multímetro-Osciloscopio digital a color ZOYI ZT-703S colgado en el panel.',
        links: [
          { label: 'AliExpress: Cargador Ugreen GaN 100W Oficial (~$680)', url: 'https://es.aliexpress.com/w/wholesale-Ugreen-GaN-100W-charger.html' },
          { label: 'AliExpress: Osciloscopio/Multímetro ZOYI ZT-703S (~$980)', url: 'https://es.aliexpress.com/w/wholesale-ZOYI-ZT-703S.html' },
          { label: 'AliExpress: Clips Magnéticos Cables Baseus (~$75)', url: 'https://es.aliexpress.com/w/wholesale-Baseus-magnetic-cable-organizer.html' },
          { label: 'Organizador Perforado Yolispa (Tu link Amazon)', url: 'https://www.amazon.com.mx/Yolispa-Organizador-Perforado-Accesorios-Dormitorio/dp/B0G6D88WT4' }
        ],
        spawnItems: [
          { id: 'upg_peg_1', type: 'yolispa_pegboard_double', x: -1.11, z: -0.28, rotY: 0, elevation: 0.88 },
          { id: 'upg_eng_1', type: 'engineer_maker_station', x: -0.34, z: -1.25, rotY: 0, elevation: 0.75 }
        ]
      },
      {
        id: 'eng_alex_full',
        name: 'Opción C: Cajonera 5 Cajones (IKEA ALEX) + Cajas SMD AliExpress + Silla Malla',
        price: 4850,
        store: 'IKEA MX + AliExpress + Amazon',
        dims: 'Cajonera 36×44×71 cm + Cajas modulares SMD + Silla Ergonómica',
        desc: 'Cajonera de 5 cajones bajo el escritorio + Cajas modulares transparentes de AliExpress para resistencias/ESP32 + Panel Yolispa + Silla ergonómica orientada hacia el monitor.',
        replaceChair: true,
        links: [
          { label: 'Cajonera IKEA ALEX ($2,999)', url: 'https://www.ikea.com/mx/es/search/?q=ALEX+cajonera' },
          { label: 'AliExpress: Cajas Modulares SMD/ESP32 (~$95 set)', url: 'https://es.aliexpress.com/w/wholesale-SMD-component-storage-box-organizer.html' },
          { label: 'Silla Ergonómica Malla Soporte Lumbar (Amazon)', url: 'https://www.amazon.com.mx/s?k=silla+ergonomica+oficina+malla+negra' }
        ],
        spawnItems: [
          { id: 'upg_peg_1', type: 'yolispa_pegboard', x: -1.11, z: -0.28, rotY: 0, elevation: 0.88 },
          { id: 'upg_eng_1', type: 'engineer_maker_station', x: -0.34, z: -1.25, rotY: 0, elevation: 0.75 },
          { id: 'upg_ds_1', type: 'under_desk_drawer', x: -0.90, z: -0.32, rotY: 0, elevation: 0 },
          { id: 'upg_ds_2', type: 'trash_bin', x: -0.56, z: -1.26, rotY: 0, elevation: 0 },
          { id: 'upg_ds_3', type: 'ergo_chair', x: -0.42, z: -0.68, rotY: -1.75, elevation: 0 }
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
          { id: 'upg_sh_1', type: 'shelf_lack_110', x: -1.03, z: -0.28, rotY: 0, elevation: 1.50 }
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
          { id: 'upg_sh_1', type: 'shelf_duo_stepped', x: -1.04, z: -0.28, rotY: 0, elevation: 1.46 }
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
          { id: 'upg_sh_1', type: 'shelf_walnut_led', x: -1.03, z: -0.28, rotY: 0, elevation: 1.46 }
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
          { id: 'upg_led_1', type: 'led_strip_desk', x: -1.12, z: -0.78, rotY: 0, elevation: 0.76 },
          { id: 'upg_led_2', type: 'led_strip_tv', x: -1.11, z: -0.98, rotY: 0, elevation: 1.48 }
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
          { id: 'upg_led_1', type: 'led_strip_desk', x: -1.12, z: -0.78, rotY: 0, elevation: 0.76 },
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
          { id: 'upg_led_1', type: 'led_strip_desk', x: -1.12, z: -0.78, rotY: 0, elevation: 0.76 },
          { id: 'upg_led_2', type: 'led_strip_bunk', x: 1.10, z: 0.48, rotY: 0, elevation: 1.30 },
          { id: 'upg_led_3', type: 'floor_lamp', x: -0.02, z: -1.32, rotY: 0, elevation: 0 }
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
        name: 'Opción A: 2 Bufandas en Pared de 2da Litera + 2 Aros Soporte para Balones',
        price: 240,
        store: 'AliExpress Choice',
        dims: '2 Bufandas (110×15 cm) + 2 Aros metálicos de pared para balón ($68 c/u)',
        desc: 'Tus bufandas colgadas horizontalmente en la pared de la 2da litera con sujetadores discretos, flanqueadas por 2 soportes de aro para tus balones. Cero espacio desperdiciado.',
        links: [
          { label: 'AliExpress: Aro Soporte Pared para Balón (~$68 MXN)', url: 'https://es.aliexpress.com/w/wholesale-wall-mount-ball-holder-soccer.html' },
          { label: 'AliExpress: Clips Adhesivos Invisibles para Bufandas/Banderas (~$55)', url: 'https://es.aliexpress.com/w/wholesale-wall-tapestry-hanging-clips-black.html' },
          { label: 'Soporte Metálico Balón (Amazon MX)', url: 'https://www.amazon.com.mx/s?k=soporte+de+pared+para+balon+de+futbol' }
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
  { id: 'white_current', name: 'Blanco Actual', wall: '#f1f3f6', accent: '#f1f3f6', accentWall: 'none' },
  { id: 'graphite_setup', name: 'Pared Setup Grafito Oscuro', wall: '#f2f3f5', accent: '#1e232d', accentWall: 'west' },
  { id: 'navy_studio', name: 'Pared Azul Ingeniería / Champions', wall: '#eef1f6', accent: '#162035', accentWall: 'west' },
  { id: 'sage_calm', name: 'Blanco + Pared Derecha Verde Salvia', wall: '#f3f5f2', accent: '#36483f', accentWall: 'east' }
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
    engineer_pegboard_zone: { icon: '🛠️', short: 'Lab y panel' },
    shelves_zone: { icon: '📚', short: 'Repisas' },
    lighting_zone: { icon: '💡', short: 'Luces' },
    soccer_zone: { icon: '⚽', short: 'Fútbol' },
    storage_underbed_door_zone: { icon: '📦', short: 'Guardado' },
    whiteboard_zone: { icon: '📋', short: 'Pizarrón' }
  },
  options: {
    none: 'Nada (actual)',
    vibe_27_mx: 'Monitor 27"',
    vibe_dual_vertical: 'Doble monitor',
    vibe_34_ultra: 'Ultrawide 34"',
    eng_yolispa_lab: 'Panel + kit soldar',
    eng_skadis_ugreen: 'Panel doble + ZOYI',
    eng_alex_full: 'Cajonera + silla',
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
  l_desk: { type: 'l_desk', name: 'Escritorio en L Negro', w: 1.12, d: 1.32, h: 0.75 },
  tv_wall: { type: 'tv_wall', name: 'Televisor en Pared Izquierda', w: 0.10, d: 0.84, h: 0.50 },
  gray_closet: { type: 'gray_closet', name: 'Clóset Gris con Cajones', w: 1.14, d: 0.54, h: 2.18 },
  bunk_bed: { type: 'bunk_bed', name: 'Literas Tubulares Negras', w: 0.98, d: 1.94, h: 1.72 },
  single_platform_bed: { type: 'single_platform_bed', name: 'Cama Baja Moderna con Cabecera Tapizada y Cajoneras', w: 1.02, d: 1.96, h: 0.65 },
  maker_electronics_workbench: { type: 'maker_electronics_workbench', name: 'Banco de Trabajo Electrónica Dedicado con Osciloscopio y Fuente DC', w: 0.62, d: 1.10, h: 0.82 },
  mirror_cabinet: { type: 'mirror_cabinet', name: 'Mueble Negro con Espejo', w: 0.36, d: 0.64, h: 1.85 },
  dry_erase_whiteboard: { type: 'dry_erase_whiteboard', name: 'Pizarrón Blanco para Diagramas y Notas', w: 0.65, d: 0.04, h: 0.48 },
  current_chair: { type: 'current_chair', name: 'Silla Actual con Toalla', w: 0.48, d: 0.48, h: 0.88 },
  closet_organizer_bin: { type: 'closet_organizer_bin', name: 'Organizador Gris entre Clóset y Litera', w: 0.42, d: 0.34, h: 0.72 },

  clutter_floor_bags: { type: 'clutter_floor_bags', name: 'Bolsas Negras + Mochila Gris', w: 0.78, d: 0.46, h: 0.62 },
  clutter_mirror_top: { type: 'clutter_mirror_top', name: 'Caja ASUS TUF F15 + Oster sobre Espejo', w: 0.34, d: 0.62, h: 0.42 },
  clutter_tv_blanket: { type: 'clutter_tv_blanket', name: 'Cobija Amarilla sobre TV', w: 0.14, d: 0.88, h: 0.54 },
  clutter_desk_items: { type: 'clutter_desk_items', name: 'Botellas, Libretas y Bolsas Escritorio', w: 1.05, d: 1.25, h: 0.95 },
  clutter_bunk_items: { type: 'clutter_bunk_items', name: 'Chamarra, Playera Celeste y Balón en Litera', w: 1.02, d: 1.94, h: 1.70 },

  // Setups Vibecoding con Logitech MX Keys Mini + Ulanzi TC001 + GeekMagic SmallTV (calibrados)
  vibe_setup_27: { type: 'vibe_setup_27', name: 'Monitor 27" + Logitech MX Keys Mini + Ulanzi TC001 + GeekMagic', w: 0.34, d: 0.60, h: 0.46 },
  vibe_setup_dual: { type: 'vibe_setup_dual', name: 'Doble Monitor (27" + 24" Vertical) + MX Keys Mini + Ulanzi TC001', w: 0.34, d: 0.76, h: 0.52 },
  vibe_setup_34: { type: 'vibe_setup_34', name: 'Monitor 34" Ultrawide + Ambilight Skydimo + MX Keys Mini', w: 0.34, d: 0.76, h: 0.46 },
  laptop_stand: { type: 'laptop_stand', name: 'Laptop ASUS TUF F15 en Stand Aluminio (Orientada hacia ti)', w: 0.32, d: 0.28, h: 0.25 },
  wood_slat_panel: { type: 'wood_slat_panel', name: 'Panel Lambrín Acústico Nogal', w: 0.04, d: 0.78, h: 0.58 },

  // Paneles Perforados Yolispa + Estación de Ingeniería con FNIRSI HS-02 y Tapete Kaisi
  yolispa_pegboard: { type: 'yolispa_pegboard', name: 'Organizador Perforado Yolispa (4 Paneles + Herramientas)', w: 0.05, d: 0.46, h: 0.48 },
  yolispa_pegboard_double: { type: 'yolispa_pegboard_double', name: 'Doble Panel Perforado + Osciloscopio ZOYI + Herramientas', w: 0.05, d: 0.50, h: 0.52 },
  engineer_maker_station: { type: 'engineer_maker_station', name: 'Banco Ingeniería (Tapete Kaisi + Cautín FNIRSI HS-02 + Ugreen GaN + Prototipo)', w: 0.52, d: 0.38, h: 0.24 },

  // Repisas Flotantes (calibradas al espacio libre sobre el panel perforado)
  shelf_lack_110: { type: 'shelf_lack_110', name: 'Repisa Flotante IKEA LACK Negra', w: 0.20, d: 0.48, h: 0.16 },
  shelf_duo_stepped: { type: 'shelf_duo_stepped', name: 'Set 2 Repisas Flotantes con Borde Anti-Caída', w: 0.18, d: 0.48, h: 0.28 },
  shelf_walnut_led: { type: 'shelf_walnut_led', name: '2 Repisas Madera Nogal Cálido con LED', w: 0.20, d: 0.48, h: 0.26 },

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
  led_strip_desk: { type: 'led_strip_desk', name: 'Tira LED Tuya/Govee Detrás de Escritorio', w: 0.04, d: 1.10, h: 0.04 },
  led_strip_tv: { type: 'led_strip_tv', name: 'Luz Bias LED Detrás de TV', w: 0.04, d: 0.78, h: 0.04 },
  led_strip_bunk: { type: 'led_strip_bunk', name: 'Tira LED COB 3000K Bajo Litera Superior', w: 0.05, d: 1.80, h: 0.04 },
  floor_lamp: { type: 'floor_lamp', name: 'Lámpara Esquinera Minimalista RGBIC Tuya', w: 0.20, d: 0.20, h: 1.42 },
  under_desk_drawer: { type: 'under_desk_drawer', name: 'Cajonera 5 Cajones (IKEA ALEX)', w: 0.42, d: 0.34, h: 0.71 },
  trash_bin: { type: 'trash_bin', name: 'Bote de Basura Negro Mate con Pedal', w: 0.22, d: 0.22, h: 0.32 },
  ergo_chair: { type: 'ergo_chair', name: 'Silla Ergonómica de Malla Negra', w: 0.52, d: 0.52, h: 0.96 },
  laundry_hamper: { type: 'laundry_hamper', name: 'Cesto de Ropa Sucia con Tapa', w: 0.40, d: 0.32, h: 0.60 },
  wall_coat_rack: { type: 'wall_coat_rack', name: 'Perchero de Pared Aluminio Negro Plegable', w: 0.56, d: 0.12, h: 0.44 },
  top_storage_boxes: { type: 'top_storage_boxes', name: '2 Cajas Negras con Tapa IKEA TJENA', w: 0.34, d: 0.58, h: 0.25 },
  ikea_trones_pair: { type: 'ikea_trones_pair', name: '2 Zapateros de Pared IKEA TRONES (18 cm fondo)', w: 0.78, d: 0.18, h: 0.76 },
  shoe_cabinet: { type: 'shoe_cabinet', name: 'Gabinete Organizador Cerrado (Pared Inferior)', w: 0.70, d: 0.25, h: 0.86 }
};

export const BASE_ROOM_ITEMS = [
  { id: 'desk_1', type: 'l_desk', x: -0.58, z: -0.82, rotY: 0, elevation: 0 },
  { id: 'tv_1', type: 'tv_wall', x: -1.09, z: -0.98, rotY: 0, elevation: 1.39 },
  { id: 'chair_1', type: 'current_chair', x: -0.44, z: -0.72, rotY: -1.80, elevation: 0 },
  { id: 'closet_1', type: 'gray_closet', x: 0.57, z: -1.23, rotY: 0, elevation: 0 },
  { id: 'bunk_1', type: 'bunk_bed', x: 0.65, z: 0.48, rotY: 0, elevation: 0 },
  { id: 'mirror_1', type: 'mirror_cabinet', x: -0.96, z: 0.30, rotY: 0, elevation: 0 }
];

export const CLUTTER_ROOM_ITEMS = [
  { id: 'bin_1', type: 'closet_organizer_bin', x: 0.72, z: -0.74, rotY: 0, elevation: 0 },
  { id: 'clutter_tv_1', type: 'clutter_tv_blanket', x: -1.08, z: -0.98, rotY: 0, elevation: 1.39 },
  { id: 'clutter_desk_1', type: 'clutter_desk_items', x: -0.58, z: -0.82, rotY: 0, elevation: 0 },
  { id: 'clutter_mirror_1', type: 'clutter_mirror_top', x: -0.96, z: 0.30, rotY: 0, elevation: 1.85 },
  { id: 'clutter_bags_1', type: 'clutter_floor_bags', x: -0.22, z: 1.24, rotY: 0, elevation: 0 },
  { id: 'clutter_bunk_1', type: 'clutter_bunk_items', x: 0.65, z: 0.48, rotY: 0, elevation: 0 }
];

export const QUICK_COMBOS = {
  actual: {
    name: '1. Tu Cuarto Hoy (Fotos)',
    showClutter: true,
    wallPalette: 'white_current',
    beddingTheme: 'black_current',
    ledColorMode: 'warm_amber',
    zones: {
      vibecoding_zone: 'none',
      engineer_pegboard_zone: 'none',
      shelves_zone: 'none',
      lighting_zone: 'none',
      soccer_zone: 'none',
      storage_underbed_door_zone: 'none',
      whiteboard_zone: 'wb_door_back'
    }
  },
  ingeniero_esencial: {
    name: '2. Combo AliExpress + MX Keys ($10,279)',
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
// PROPUESTAS DE DISPOSICIÓN DEL ESPACIO (LAYOUTS MAESTROS 3D)
// ============================================================================
export const ROOM_LAYOUT_PROPOSALS = {
  maker_pro: {
    id: 'maker_pro',
    name: '1. Maker Pro (Setup Actual Optimizado)',
    shortName: '1. Maker Pro',
    desc: 'Tu escritorio en L en pared oeste con la TV al lado, pizarrón en pared sur, literas conservadas y domótica calibrada.',
    cameraPreset: 'orbit_3d',
    baseItems: [
      { id: 'desk_1', type: 'l_desk', x: -0.58, z: -0.82, rotY: 0, elevation: 0 },
      { id: 'tv_1', type: 'tv_wall', x: -1.09, z: -0.98, rotY: 0, elevation: 1.39 },
      { id: 'chair_1', type: 'current_chair', x: -0.44, z: -0.72, rotY: -1.80, elevation: 0 },
      { id: 'closet_1', type: 'gray_closet', x: 0.57, z: -1.23, rotY: 0, elevation: 0 },
      { id: 'bunk_1', type: 'bunk_bed', x: 0.65, z: 0.48, rotY: 0, elevation: 0 },
      { id: 'mirror_1', type: 'mirror_cabinet', x: -0.96, z: 0.30, rotY: 0, elevation: 0 }
    ],
    defaultWhiteboardZone: 'wb_south_view'
  },
  natural_light: {
    id: 'natural_light',
    name: '2. Luz Natural (Escritorio en Ventana)',
    shortName: '2. Luz Natural',
    desc: 'Escritorio orientado de cara a la ventana norte con luz solar directa tamizada por la persiana. TV trasladada a pared sur frente a la cama.',
    cameraPreset: 'natural_light_view',
    baseItems: [
      { id: 'desk_1', type: 'l_desk', x: -0.58, z: -0.82, rotY: 0, elevation: 0 },
      { id: 'tv_1', type: 'tv_wall', x: 0.05, z: 1.45, rotY: Math.PI, elevation: 1.39 },
      { id: 'chair_1', type: 'current_chair', x: -0.42, z: -0.56, rotY: 0, elevation: 0 },
      { id: 'closet_1', type: 'gray_closet', x: 0.57, z: -1.23, rotY: 0, elevation: 0 },
      { id: 'bunk_1', type: 'bunk_bed', x: 0.65, z: 0.48, rotY: 0, elevation: 0 },
      { id: 'mirror_1', type: 'mirror_cabinet', x: -0.96, z: 0.30, rotY: 0, elevation: 0 }
    ],
    defaultWhiteboardZone: 'wb_door_back'
  },
  studio_single: {
    id: 'studio_single',
    name: '3. Estudio & Taller (Despeje de Literas)',
    shortName: '3. Estudio & Taller',
    desc: 'Literas sustituidas por cama baja moderna con cajoneras, liberando 4.5 m² para un banco de electrónica dedicado 100% independiente del escritorio de código.',
    cameraPreset: 'studio_bench',
    baseItems: [
      { id: 'desk_1', type: 'l_desk', x: -0.58, z: -0.82, rotY: 0, elevation: 0 },
      { id: 'tv_1', type: 'tv_wall', x: -1.09, z: -0.98, rotY: 0, elevation: 1.39 },
      { id: 'chair_1', type: 'current_chair', x: -0.44, z: -0.72, rotY: -1.80, elevation: 0 },
      { id: 'closet_1', type: 'gray_closet', x: 0.57, z: -1.23, rotY: 0, elevation: 0 },
      { id: 'single_bed_1', type: 'single_platform_bed', x: 0.65, z: 0.48, rotY: 0, elevation: 0 },
      { id: 'maker_bench_1', type: 'maker_electronics_workbench', x: 0.65, z: -0.74, rotY: 0, elevation: 0 },
      { id: 'mirror_1', type: 'mirror_cabinet', x: -0.96, z: 0.30, rotY: 0, elevation: 0 }
    ],
    defaultWhiteboardZone: 'wb_south_view'
  }
};

// ============================================================================
// BASE DE DATOS INTERACTIVA DE INSPECCIÓN 3D (AL DAR CLIC EN CUALQUIER ARTÍCULO DENTRO DEL CUARTO)
// Incluye sub-gadgets individuales en el escritorio, panel perforado, repisas, litera y muebles base
// ============================================================================
export const SUB_GADGETS_DB = {
  mx_keys_mini: {
    id: 'mx_keys_mini',
    badge: '⌨️ Periférico Principal · Amazon MX',
    name: 'Teclado Logitech MX Keys Mini Inalámbrico',
    price: '~$1,450 MXN',
    dims: '29.6 × 13.1 × 2.1 cm (Formato 75% Minimalista)',
    desc: 'El teclado inalámbrico compacto que elegiste. Tiene teclas cóncavas PerfectStroke, retroiluminación inteligente que se enciende al acercar tus manos y botón Easy-Switch para alternar entre tu Laptop ASUS TUF y otros 2 equipos.',
    localOffset: [0.085, 0.06, 0.03],
    cameraPreset: 'desk_front',
    links: [
      { label: 'Logitech MX Keys Mini (Tu link Amazon)', url: 'https://www.amazon.com.mx/Logitech-Inal%C3%A1mbrico-Minimalista-Retroiluminado-Compatible/dp/B09HYVWYYJ' },
      { label: 'AliExpress: Estuche / Deskpad Fieltro 90×40cm (~$130)', url: 'https://es.aliexpress.com/w/wholesale-desk-mat-felt-dark-grey-90x40.html' }
    ]
  },
  mx_master_3s: {
    id: 'mx_master_3s',
    badge: '🖱️ Productividad & CAD · Amazon / AliExpress',
    name: 'Mouse Ergonómico Logitech MX Master 3S',
    price: '~$1,650 MXN',
    dims: '12.4 × 8.4 × 5.1 cm (Sensor 8000 DPI)',
    desc: 'Colocado a la derecha de tu teclado. Rueda electromagnética MagSpeed capaz de recorrer 1,000 líneas de código por segundo y rueda de pulgar ideal para desplazarte horizontalmente en planos CAD o esquemáticos.',
    localOffset: [0.085, 0.06, -0.19],
    cameraPreset: 'desk_front',
    links: [
      { label: 'Mouse Logitech MX Master 3S (Amazon)', url: 'https://www.amazon.com.mx/s?k=Logitech+MX+Master+3S' },
      { label: 'AliExpress: Patines PTFE / Accesorios MX Master (~$85)', url: 'https://es.aliexpress.com/w/wholesale-Logitech-MX-Master-3S-accessories.html' }
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
    badge: '🎙️ Domótica de Voz · Amazon Echo Pop',
    name: 'Bocina Inteligente Alexa Echo Pop (WiFi + Bluetooth)',
    price: '~$699 MXN (Amazon MX)',
    dims: '9.9 × 8.3 × 9.1 cm (Anillo LED Cian Resplandeciente)',
    desc: 'Control por voz para todo tu cuarto. Dile "Alexa, modo programar" para cambiar las luces y encender tu estación, o "Alexa, apaga el multicontacto" al terminar de soldar.',
    localOffset: [-0.06, 0.05, 0.17],
    cameraPreset: 'desk_front',
    links: [
      { label: 'Bocina Inteligente Alexa Echo Pop (Amazon MX)', url: 'https://www.amazon.com.mx/s?k=Echo+Pop+bocina+inteligente+alexa' }
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
    badge: '📱 Companion Screen · Tablet + Stylus',
    name: 'Tablet de Ingeniería / Pantalla Secundaria',
    price: '~$4,500 - $7,900 MXN',
    dims: 'Pantalla 11" 120Hz · Base magnética de aluminio ajustable · Stylus capacitivo',
    desc: 'Tu tablet colocada en base ergonómica de aluminio junto al teclado. Usada como pantalla táctil complementaria para consultar datasheets de componentes, esquemáticos de KiCad, depuración UART y control multimedia Spotify mientras programas en el monitor principal.',
    localOffset: [0.06, 0.08, 0.28],
    cameraPreset: 'desk_front',
    links: [
      { label: 'Base de aluminio articulada para Tablet (Amazon MX)', url: 'https://www.amazon.com.mx/s?k=soporte+aluminio+tablet+escritorio' },
      { label: 'AliExpress: Soporte de escritorio giratorio 360° (~$180)', url: 'https://es.aliexpress.com/w/wholesale-aluminum-tablet-stand-360-desk.html' }
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
    badge: '🖥️ Pantalla + Brazo Hidráulico',
    name: 'Monitor Principal QHD + Brazo Hidráulico North Bayou',
    price: '~$4,200 MXN (Monitor + Brazo)',
    dims: '27" (61×36 cm) / 34" Ultrawide en Brazo NB F80',
    desc: 'Montado en brazo hidráulico prensado al borde del escritorio para dejar 100% libre la madera debajo de la pantalla. Incluye barra de luz superior Baseus/Xiaomi para no cansar la vista.',
    localOffset: [-0.03, 0.34, 0],
    cameraPreset: 'desk_front',
    links: [
      { label: 'Brazo Hidráulico North Bayou F80 ($650 Amazon)', url: 'https://www.amazon.com.mx/s?k=North+Bayou+F80+brazo+monitor' },
      { label: 'AliExpress: Barra Luz Monitor Baseus i-wok (~$450)', url: 'https://es.aliexpress.com/w/wholesale-Baseus-monitor-light-bar.html' },
      { label: 'Monitor 27" IPS QHD Sin Bordes (Amazon)', url: 'https://www.amazon.com.mx/s?k=Monitor+27+pulgadas+IPS+QHD+sin+bordes' }
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
    badge: '🟠 Orden de Componentes · AliExpress / Amazon',
    name: 'Gavetero Organizador de 12 Cajones para Electrónica',
    price: '~$290 MXN',
    dims: '17 × 12 × 20 cm (Cajones transparentes)',
    desc: 'Orientado hacia tu silla para clasificar resistencias, capacitores, sensores, tornillería M2/M3, jumpers y placas ESP32/Arduino sin tener bolsas sueltas en el escritorio.',
    localOffset: [0.21, 0.18, -0.09],
    cameraPreset: 'desk_lab',
    links: [
      { label: 'AliExpress: Cajas Modulares SMD/ESP32 (~$95 set)', url: 'https://es.aliexpress.com/w/wholesale-SMD-component-storage-box-organizer.html' },
      { label: 'Gavetero Organizador Componentes Truper/Steren (Amazon)', url: 'https://www.amazon.com.mx/s?k=gavetero+organizador+componentes+electronicos' }
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
  // Setups Vibecoding
  vibe_setup_27: {
    badge: '💻 Zona 1 · Setup Vibecoding',
    price: '$5,850 MXN (Kit Completo)',
    dims: 'Monitor 27" + Teclado MX Keys Mini + Ulanzi + GeekMagic',
    desc: 'Tu estación de programación principal en el ala izquierda del escritorio. Haz clic en cualquiera de los botones de abajo (o directamente sobre cada aparato en 3D) para ver su ficha individual y link de compra.',
    cameraPreset: 'desk_front',
    subGadgets: ['mx_keys_mini', 'mx_master_3s', 'alexa_echo', 'smart_power_strip', 'baseus_clips', 'ulanzi_tc001', 'geekmagic_tv', 'monitor_main'],
    links: [
      { label: 'Teclado Logitech MX Keys Mini (Tu link Amazon)', url: 'https://www.amazon.com.mx/Logitech-Inal%C3%A1mbrico-Minimalista-Retroiluminado-Compatible/dp/B09HYVWYYJ' },
      { label: 'AliExpress: Reloj Pixel Ulanzi TC001 (~$780)', url: 'https://es.aliexpress.com/w/wholesale-Ulanzi-TC001.html' },
      { label: 'AliExpress: Mini Monitor GeekMagic SmallTV (~$360)', url: 'https://es.aliexpress.com/w/wholesale-GeekMagic-SmallTV.html' },
      { label: 'Brazo Monitor North Bayou F80 ($650)', url: 'https://www.amazon.com.mx/s?k=North+Bayou+F80+brazo+monitor' }
    ]
  },
  vibe_setup_dual: {
    badge: '💻 Zona 1 · Setup Vibecoding Dual',
    price: '$8,400 MXN (Doble Monitor + Periféricos)',
    dims: '27" Principal + 24" Vertical Código + MX Keys Mini',
    desc: 'Configuración de doble pantalla en brazo hidráulico doble: monitor 27" al frente y monitor 24" vertical a la izquierda para código, terminales e IA.',
    cameraPreset: 'desk_front',
    subGadgets: ['mx_keys_mini', 'mx_master_3s', 'alexa_echo', 'smart_power_strip', 'baseus_clips', 'monitor_vertical', 'monitor_main', 'ulanzi_tc001', 'geekmagic_tv'],
    links: [
      { label: 'Teclado Logitech MX Keys Mini (Tu link Amazon)', url: 'https://www.amazon.com.mx/Logitech-Inal%C3%A1mbrico-Minimalista-Retroiluminado-Compatible/dp/B09HYVWYYJ' },
      { label: 'AliExpress: Brazo Doble Hidráulico NB H180 (~$790)', url: 'https://es.aliexpress.com/w/wholesale-North-Bayou-H180.html' },
      { label: 'Mouse Logitech MX Master 3S (Amazon)', url: 'https://www.amazon.com.mx/s?k=Logitech+MX+Master+3S' }
    ]
  },
  vibe_setup_34: {
    badge: '💻 Zona 1 · Setup Ultrawide 34"',
    price: '$9,200 MXN (Monitor 34" Curvo + Ambilight)',
    dims: 'Monitor 34" WQHD (76×34 cm) + MX Keys Mini',
    desc: 'Monitor curvo 34" Ultrawide con tira Ambilight Skydimo sincronizada y teclado Logitech MX Keys Mini.',
    cameraPreset: 'desk_front',
    subGadgets: ['mx_keys_mini', 'mx_master_3s', 'alexa_echo', 'smart_power_strip', 'baseus_clips', 'monitor_main', 'ulanzi_tc001', 'geekmagic_tv'],
    links: [
      { label: 'Teclado Logitech MX Keys Mini (Tu link Amazon)', url: 'https://www.amazon.com.mx/Logitech-Inal%C3%A1mbrico-Minimalista-Retroiluminado-Compatible/dp/B09HYVWYYJ' },
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

  // Zona 2: Ingeniería y Panel Perforado
  yolispa_pegboard: {
    badge: '🧰 Zona 2 · Tu Link de Amazon / AliExpress',
    price: '~$450 MXN (Amazon) / ~$185 MXN (AliExpress)',
    dims: '46 cm ancho × 48 cm alto × 5 cm fondo',
    desc: 'Organizador de pared perforado Yolispa instalado entre tu TV y el mueble con espejo. Mantiene a la mano tus desarmadores, pinzas, multímetro/osciloscopio ZOYI y audífonos.',
    cameraPreset: 'desk_pegboard',
    subGadgets: ['yolispa_panel', 'zoyi_meter'],
    links: [
      { label: 'Organizador Perforado Yolispa (Tu link Amazon)', url: 'https://www.amazon.com.mx/Yolispa-Organizador-Perforado-Accesorios-Dormitorio/dp/B0G6D88WT4' },
      { label: 'AliExpress: Set 4 Paneles Perforados Negros (~$185)', url: 'https://es.aliexpress.com/w/wholesale-panel-perforado-organizador-pared-negro.html' }
    ]
  },
  yolispa_pegboard_double: {
    badge: '🧰 Zona 2 · Panel Perforado Extendido + ZOYI',
    price: '~$1,165 MXN (Panel Doble + Osciloscopio ZOYI)',
    dims: '50 cm ancho × 52 cm alto',
    desc: 'Doble panel perforado negro mate equipado con repisas para tu Osciloscopio/Multímetro digital ZOYI ZT-703S, desarmadores de precisión y contenedores de componentes.',
    cameraPreset: 'desk_pegboard',
    subGadgets: ['yolispa_panel', 'zoyi_meter'],
    links: [
      { label: 'Organizador Perforado Yolispa (Tu link Amazon)', url: 'https://www.amazon.com.mx/Yolispa-Organizador-Perforado-Accesorios-Dormitorio/dp/B0G6D88WT4' },
      { label: 'AliExpress: Osciloscopio/Multímetro ZOYI ZT-703S (~$980)', url: 'https://es.aliexpress.com/w/wholesale-ZOYI-ZT-703S.html' }
    ]
  },
  engineer_maker_station: {
    badge: '🛠️ Zona 2 · Laboratorio de Ingeniería (Bajo Ventana)',
    price: '~$1,180 MXN (Kit Maker AliExpress)',
    dims: '52 × 38 cm en el ala derecha del escritorio en L',
    desc: 'Separa tu área de hardware del teclado para que nunca caiga soldadura ni cables sobre tu laptop. Haz clic en cualquiera de los equipos de abajo (o directo en el 3D) para ver cada herramienta:',
    cameraPreset: 'desk_lab',
    subGadgets: ['kaisi_mat', 'fnirsi_iron', 'esp32_proto', 'ftdi_debugger', 'smd_cabinet', 'ugreen_gan'],
    links: [
      { label: 'AliExpress: Tapete Silicón Magnético Kaisi (~$145)', url: 'https://es.aliexpress.com/w/wholesale-Kaisi-tapete-silicona-soldadura.html' },
      { label: 'AliExpress: Cautín USB-C FNIRSI HS-02 100W (~$590)', url: 'https://es.aliexpress.com/w/wholesale-FNIRSI-HS-02-soldering-iron.html' },
      { label: 'AliExpress: Cargador Ugreen GaN 100W Oficial (~$680)', url: 'https://es.aliexpress.com/w/wholesale-Ugreen-GaN-100W-charger.html' },
      { label: 'AliExpress: Cajas Modulares SMD/ESP32 (~$95)', url: 'https://es.aliexpress.com/w/wholesale-SMD-component-storage-box-organizer.html' }
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
    badge: '🏠 Mueble Existente en tu Cuarto',
    price: 'Mueble Actual ($0)',
    dims: '112 × 132 × 75 cm (Con elevación esquinera y repisas)',
    desc: 'Tu escritorio en L negro actual. Tiene dos alas: el ala izquierda bajo la TV (ideal para tu monitor y teclado Logitech MX Keys Mini) y el ala derecha bajo la ventana (ideal para tu laboratorio de electrónica).',
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
  single_platform_bed: {
    id: 'single_platform_bed',
    badge: '🛏️ Disposición 3 · Cama Plataforma Japandi',
    name: 'Cama Plataforma Individual con Cajones + Buró Flotante',
    price: '~$3,200 MXN (Amazon / Maderería)',
    dims: '102 × 195 × 38 cm (Cabecera 75 cm + 2 cajones bajo cama)',
    desc: 'Cama baja de líneas limpias estilo escandinavo/japandi con 2 cajones de almacenamiento inferior de deslizamiento suave. Sustituye las literas verticales para liberar 4.5 m² de volumen aéreo y luz en la habitación.',
    cameraPreset: 'zoom_underbed',
    links: [
      { label: 'Amazon: Cama Plataforma Individual con Cajones', url: 'https://www.amazon.com.mx/s?k=cama+plataforma+individual+con+cajones' }
    ]
  },
  maker_electronics_workbench: {
    id: 'maker_electronics_workbench',
    badge: '⚡ Disposición 3 · Banco de Electrónica & Taller Maker',
    name: 'Banco de Electrónica & Robótica Dedicado (Pared Este)',
    price: '~$2,800 MXN (Estructura metálica + Tablón madera sólida)',
    dims: '110 × 60 × 85 cm + repisa superior para instrumentos',
    desc: 'Estación de trabajo de grado profesional 100% independiente del escritorio de cómputo. Incluye tapete antiestático ESD de silicona disipativa (500°C), repisa superior con osciloscopio digital Rigol DS1054Z, fuente de poder regulable DC 30V 10A, cautín TS101 con soporte de latón, lámpara de lupa con aro LED y regleta multicontacto dedicada.',
    cameraPreset: 'studio_bench',
    links: [
      { label: 'Amazon: Mesa de Trabajo Taller Maker 110x60', url: 'https://www.amazon.com.mx/s?k=mesa+de+trabajo+taller+madera+acero' },
      { label: 'AliExpress: Tapete Antiestático Silicona ESD Resistente Calor', url: 'https://es.aliexpress.com/w/wholesale-esd-soldering-heat-resistant-silicone-mat.html' },
      { label: 'Amazon: Lámpara de Mesa con Lupa y Aro LED', url: 'https://www.amazon.com.mx/s?k=lampara+lupa+led+taller' }
    ]
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
  if (itemType === 'vibe_setup_27' || itemType === 'vibe_setup_dual' || itemType === 'vibe_setup_34') {
    if (localPt.y < 0.085) {
      if (localPt.z > 0.12 && localPt.x < 0.02) return 'alexa_echo';
      if (localPt.z < -0.15 && localPt.x < -0.05) return 'smart_power_strip';
      if (localPt.x > 0.12 && localPt.z > 0.12) return 'baseus_clips';

      if (localPt.x > 0.015) {
        return localPt.z <= -0.12 ? 'mx_master_3s' : 'mx_keys_mini';
      } else {
        if (localPt.z > 0.02) return 'ulanzi_tc001';
        if (localPt.z < -0.09) return 'geekmagic_tv';
      }
    }
    if (itemType === 'vibe_setup_dual' && localPt.z > 0.20) {
      return 'monitor_vertical';
    }
    return 'monitor_main';
  }

  if (itemType === 'engineer_maker_station') {
    if (localPt.x > 0.04 && localPt.x < 0.14 && localPt.z < 0.00) return 'ftdi_debugger';
    if (localPt.x > 0.10) return 'smd_cabinet';
    if (localPt.x < -0.14 && localPt.z < -0.02) return 'ugreen_gan';
    if (localPt.x < -0.10 && localPt.z >= -0.02) return 'fnirsi_iron';
    if (localPt.y > 0.016 && localPt.x >= -0.10 && localPt.x <= 0.10) return 'esp32_proto';
    return 'kaisi_mat';
  }

  if (itemType === 'yolispa_pegboard' || itemType === 'yolispa_pegboard_double') {
    if (localPt.y < 0.25 && localPt.z < 0.04 && localPt.x > 0.02) {
      return 'zoyi_meter';
    }
    return 'yolispa_panel';
  }

  return null;
}
