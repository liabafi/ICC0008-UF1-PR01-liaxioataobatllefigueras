import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FavoritesService, CountryDetail } from '../services/favorites.service';
import { CameraService } from '../services/camera.service';
import { ShareService } from '../services/share.service';
import { Subscription } from 'rxjs';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonIcon,
  IonButtons,
  IonBackButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonChip,
  IonSpinner
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  heartOutline, 
  heart, 
  locationOutline, 
  peopleOutline, 
  languageOutline, 
  cashOutline, 
  starOutline, 
  cameraOutline, 
  shareOutline,
  mapOutline,
  timeOutline,
  restaurantOutline,
  airplaneOutline, 
  imagesOutline,
  closeCircle, 
  alertCircle
} from 'ionicons/icons';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.page.html',
  styleUrls: ['./country-detail.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonIcon,
    IonButtons,
    IonBackButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonChip,
    IonSpinner
  ]
})
export class CountryDetailPage implements OnInit, OnDestroy {
  country: CountryDetail | null = null;
  isLoading = true;
  isFavorite = false;
  private favoritesSubscription: Subscription | null = null;
  
  // Propiedades para manejo de fotos
  userPhotos: string[] = [];
  isTakingPhoto = false;
  photoError: string | null = null;

  private countriesData: CountryDetail[] = [
    {
      id: 1,
      name: 'Francia',
      capital: 'París',
      region: 'Europa Occidental',
      flag: '🇫🇷',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&h=800&fit=crop',
      description: 'La tierra del amor, la moda y la gastronomía exquisita. Francia combina historia milenaria con una vibrante cultura contemporánea, desde las elegantes calles de París hasta los pintorescos pueblos de Provenza.',
      rating: 4.8,
      priceLevel: '€€€',
      tags: ['Cultura', 'Romántico', 'Gastronomía', 'Historia'],
      population: '67.4 millones',
      languages: ['Francés'],
      currencies: ['Euro (€)'],
      funFacts: [
        'Francia es el país más visitado del mundo con más de 89 millones de turistas anuales',
        'La Torre Eiffel fue construida originalmente como estructura temporal para la Exposición Universal de 1889',
        'Francia produce más de 400 variedades de queso',
        'El Louvre es el museo más grande del mundo con más de 35,000 obras de arte'
      ],
      mustVisitPlaces: [
        'Torre Eiffel y Champ de Mars - El símbolo icónico de París',
        'Museo del Louvre - Hogar de la Mona Lisa y miles de obras maestras',
        'Palacio de Versalles - Suntuosa residencia real francesa',
        'Mont Saint-Michel - Isla medieval impresionante en Normandía',
        'Los Champs-Élysées y Arco del Triunfo - La avenida más famosa del mundo',
        'Valle del Loira - Castillos impresionantes y viñedos'
      ],
      bestTimeToVisit: 'Abril a junio o septiembre a octubre. El clima es agradable y hay menos multitudes que en verano.',
      localCuisine: [
        'Croissants y baguettes frescas de panadería',
        'Coq au vin - Pollo estofado en vino tinto',
        'Ratatouille - Guiso tradicional de verduras',
        'Macarons - Deliciosos postres de colores',
        'Fromage - Variedad de quesos artesanales',
        'Bouillabaisse - Sopa de pescado marsellés'
      ],
      transportation: 'Excelente red de trenes de alta velocidad (TGV), metro en ciudades principales y autobuses interurbanos. Se recomienda alquilar coche para explorar zonas rurales.',
      timeZone: 'UTC+1 (CET), UTC+2 en verano',
      emergencyNumber: '112'
    },
    {
      id: 2,
      name: 'Japón',
      capital: 'Tokio',
      region: 'Asia Oriental',
      flag: '🇯🇵',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&h=800&fit=crop',
      description: 'Donde la tradición ancestral se fusiona con la tecnología del futuro. Japón ofrece una experiencia única: templos serenos al lado de rascacielos futuristas, ceremonias del té junto a neon vibrantes.',
      rating: 4.9,
      priceLevel: '¥¥¥',
      tags: ['Tecnología', 'Tradición', 'Naturaleza', 'Gastronomía'],
      population: '125.8 millones',
      languages: ['Japonés'],
      currencies: ['Yen japonés (¥)'],
      funFacts: [
        'Japón tiene más de 6,800 islas',
        'El 73% del territorio es montañoso y boscoso',
        'Japón tiene la tercera economía más grande del mundo',
        'Los trenes bala japoneses tienen un retraso promedio de menos de un minuto'
      ],
      mustVisitPlaces: [
        'Monte Fuji - El pico sagrado más alto de Japón',
        'Templo Kinkaku-ji (Pabellón Dorado) en Kioto',
        'Barrio de Shibuya en Tokio - El cruce más transitado del mundo',
        'Castillo de Himeji - Joya arquitectónica samurái',
        'Onsen (aguas termales) en Hakone',
        'Isla de Miyajima - Famosa por su torii flotante'
      ],
      bestTimeToVisit: 'Marzo a mayo (floración de cerezos) u octubre a noviembre (colores de otoño). Evita la temporada de lluvias en junio.',
      localCuisine: [
        'Sushi y sashimi - Pescado fresco crudo',
        'Ramen - Fideos en caldo rico',
        'Tempura - Mariscos y vegetales fritos ligeros',
        'Yakitori - Brochetas de pollo a la parrilla',
        'Mochi - Pasteles de arroz dulce',
        'Sake - Vino de arroz tradicional'
      ],
      transportation: 'Sistema ferroviario extremadamente eficiente incluyendo trenes bala (Shinkansen). Metro extenso en ciudades. Japan Rail Pass recomendado para turistas.',
      timeZone: 'UTC+9 (JST)',
      emergencyNumber: '110 (policía), 119 (ambulancia/bomberos)'
    },
    {
      id: 3,
      name: 'Estados Unidos',
      capital: 'Washington D.C.',
      region: 'América del Norte',
      flag: '🇺🇸',
      image: 'https://images.unsplash.com/photo-1496442226666-8d499ed49542?w=1200&h=800&fit=crop',
      description: 'Tierra de oportunidades y contrastes extremos. Desde los rascacielos de Manhattan hasta los cañones del Gran Cañón, Estados Unidos ofrece una diversidad geográfica y cultural sin igual.',
      rating: 4.7,
      priceLevel: '$$$',
      tags: ['Urbano', 'Naturaleza', 'Diversidad', 'Aventura'],
      population: '331.9 millones',
      languages: ['Inglés'],
      currencies: ['Dólar estadounidense ($)'],
      funFacts: [
        'EE.UU. tiene 59 parques nacionales',
        'Nueva York tiene más de 800 idiomas diferentes hablados',
        'El Gran Cañón es más grande que el estado de Rhode Island',
        'Alaska es el estado más grande, Texas el segundo'
      ],
      mustVisitPlaces: [
        'Estatua de la Libertad y Ellis Island - Símbolos de la libertad',
        'Gran Cañón - Maravilla natural de Arizona',
        'Golden Gate Bridge - Ícono de San Francisco',
        'Parque Nacional de Yellowstone - Primer parque nacional del mundo',
        'Times Square - El corazón de Nueva York',
        'Playa de South Beach en Miami - Art déco y vida nocturna'
      ],
      bestTimeToVisit: 'Varía por región. Primavera y otoño son ideales para la mayoría de zonas. Invierno para deportes de nieve en las montañas.',
      localCuisine: [
        'Hamburguesas - Comida rápida americana clásica',
        'Barbecue - Carne ahumada regional',
        'Mac and cheese - Comida reconfortante',
        'Panqueques con maple - Desayuno tradicional',
        'Lobster roll - Delicia marítima de Nueva Inglaterra',
        'Tex-Mex - Fusión texano-mexicana'
      ],
      transportation: 'Red de vuelos domésticos extensa. Carreteras bien mantenidas para viajes por carretera. Transporte público limitado fuera de grandes ciudades.',
      timeZone: 'Varía: UTC-5 a UTC-10',
      emergencyNumber: '911'
    },
    {
      id: 4,
      name: 'Brasil',
      capital: 'Brasilia',
      region: 'América del Sur',
      flag: '🇧🇷',
      image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=1200&h=800&fit=crop',
      description: 'País de la samba, el fútbol y la alegría de vivir. Brasil cautiva con sus playas infinitas, selva amazónica, ciudades vibrantes y una cultura que celebra la vida en cada momento.',
      rating: 4.6,
      priceLevel: 'R$',
      tags: ['Playa', 'Carnaval', 'Naturaleza', 'Fútbol'],
      population: '214.3 millones',
      languages: ['Portugués'],
      currencies: ['Real brasileño (R$)'],
      funFacts: [
        'Brasil es el país más grande de América del Sur',
        'La selva amazónica produce el 20% del oxígeno mundial',
        'Brasil ha ganado la Copa del Mundo de Fútbol 5 veces',
        'Carnaval de Río es el más grande del mundo con 2 millones de personas diarias'
      ],
      mustVisitPlaces: [
        'Cristo Redentor y Pan de Azúcar - Vistas espectaculares de Río',
        'Playas de Copacabana e Ipanema - Arena dorada y mar azul',
        'Selva Amazónica - Pulmón del mundo',
        'Iguazú Falls - Cataratas impresionantes en la frontera',
        'Pelourinho en Salvador - Centro histórico colonial',
        'Fernando de Noronha - Paraíso insular preservado'
      ],
      bestTimeToVisit: 'Mayo a septiembre (temporada seca). Diciembre a marzo para el verano y Carnaval, pero con más lluvia y multitudes.',
      localCuisine: [
        'Feijoada - Guiso tradicional de frijoles negros y carne',
        'Churrasco - Carne asada brasileña',
        'Açaí - Superfruto amazónico',
        'Pão de queijo - Panecillos de queso',
        'Caipirinha - Cóctel nacional de cachaza',
        'Moqueca - Guiso de pescado con coco'
      ],
      transportation: 'Vuelos domésticos extensos para distancias largas. Autobuses cómodos entre ciudades. Metro en Río y São Paulo. Uber disponible en ciudades principales.',
      timeZone: 'UTC-3 (BRST)',
      emergencyNumber: '190 (policía), 192 (ambulancia)'
    },
    {
      id: 5,
      name: 'Egipto',
      capital: 'El Cairo',
      region: 'África del Norte',
      flag: '🇪🇬',
      image: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a746b?w=1200&h=800&fit=crop',
      description: 'Cuna de una de las civilizaciones más antiguas del mundo. Egipto es un museo al aire libre donde cada piedra cuenta historias de faraones, dioses y misterios milenarios.',
      rating: 4.5,
      priceLevel: '£E',
      tags: ['Historia', 'Aventura', 'Misterio', 'Desierto'],
      population: '104.3 millones',
      languages: ['Árabe'],
      currencies: ['Libra egipcia (£E)'],
      funFacts: [
        'Las pirámides de Giza son la única de las Siete Maravillas del Mundo Antiguo que sigue en pie',
        'El río Nilo es el río más largo del mundo con 6,650 km',
        'Egipto tiene más de 100 pirámides descubiertas',
        'Los jeroglíficos egipcios tienen más de 3,000 años de antigüedad'
      ],
      mustVisitPlaces: [
        'Pirámides de Giza y la Esfinge - Maravillas del mundo antiguo',
        'Valle de los Reyes - Tumbas faraónicas en Luxor',
        'Templo de Karnak - Complejo religioso más grande de Egipto',
        'Abu Simbel - Templos excavados en la roca de Ramsés II',
        'Museo Egipcio del Cairo - Tesoros de Tutankamón',
        'Mar Rojo - Buceo world-class en Hurghada'
      ],
      bestTimeToVisit: 'Octubre a abril. Clima más fresco y agradable. Evita junio a agosto por el calor extremo del desierto.',
      localCuisine: [
        'Koshary - Plato nacional con arroz, pasta y lentejas',
        'Ful medames - Frijoles fava con especias',
        'Shawarma - Carne asada en vertical',
        'Baklava - Postre dulce con frutos secos',
        'Molokhia - Sopa verde tradicional',
        'Hibiscus tea - Bebida nacional refrescante'
      ],
      transportation: 'Trenes nocturnos entre El Cairo-Luxor-Asuán. Autobuses para distancias cortas. Vuelos domésticos para ahorrar tiempo. Taxis y Uber en ciudades.',
      timeZone: 'UTC+2 (EET)',
      emergencyNumber: '122'
    },
    {
      id: 6,
      name: 'Australia',
      capital: 'Canberra',
      region: 'Oceanía',
      flag: '🇦🇺',
      image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=1200&h=800&fit=crop',
      description: 'Continente-isla único con paisajes extremos y vida salvaje extraordinaria. Desde la Gran Barrera de Coral hasta el Outback árido, Australia es tierra de aventuras y contrastes naturales.',
      rating: 4.8,
      priceLevel: 'A$',
      tags: ['Arquitectura', 'Surf', 'Naturaleza', 'Aventura'],
      population: '25.7 millones',
      languages: ['Inglés'],
      currencies: ['Dólar australiano (A$)'],
      funFacts: [
        'Australia es el sexto país más grande pero solo el 55 más poblado',
        'La Gran Barrera de Coral es visible desde el espacio',
        'Australia tiene más de 10,000 playas',
        'Los canguros son más numerosos que personas en Australia'
      ],
      mustVisitPlaces: [
        'Ópera House de Sídney - Ícono arquitectónico mundial',
        'Gran Barrera de Coral - Ecosistema marino más grande del mundo',
        'Uluru (Ayers Rock) - Monolito sagrado en el Outback',
        'Great Ocean Road - Carretera costera espectacular',
        'Bondi Beach - Playa famosa para surf',
        'Tasmania - Naturaleza prístina y fauna única'
      ],
      bestTimeToVisit: 'Septiembre a noviembre (primavera) o marzo a mayo (otoño). Varía según región: norte seco en invierno, sur agradable en verano.',
      localCuisine: [
        'Vegemite - Pasta para untar australiana',
        'Meat pie - Pastel de carne tradicional',
        'Barbecue (barbie) - Tradición social australiana',
        'Pavlova - Postre de merengue con frutas',
        'Lamington - Pastelitos de coco',
        'Flat white - Café australiano famoso mundialmente'
      ],
      transportation: 'Vuelos domésticos esenciales para largas distancias. Carreteras bien señalizadas para road trips. Transporte público bueno en ciudades principales.',
      timeZone: 'Varía: UTC+8 a UTC+10.5',
      emergencyNumber: '000'
    },
    {
      id: 7,
      name: 'India',
      capital: 'Nueva Delhi',
      region: 'Asia del Sur',
      flag: '🇮🇳',
      image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=1200&h=800&fit=crop',
      description: 'Mosaico de culturas, colores y espiritualidad. India despierta todos los sentidos con sus templos ancestrales, mercados vibrantes, sabores exóticos y una historia que se remonta a milenios.',
      rating: 4.4,
      priceLevel: '₹',
      tags: ['Cultura', 'Espiritual', 'Color', 'Tradición'],
      population: '1,408 millones',
      languages: ['Hindi', 'Inglés y 21 idiomas oficiales más'],
      currencies: ['Rupia india (₹)'],
      funFacts: [
        'India es el país más poblado del mundo desde 2023',
        'Tiene 22 idiomas oficiales y más de 1,600 dialectos',
        'El Taj Mahal cambia de color durante el día',
        'India inventó el número cero y el sistema decimal'
      ],
      mustVisitPlaces: [
        'Taj Mahal en Agra - Monumento al amor eterno',
        'Ciudad Rosa de Jaipur - Arquitectura rajput impresionante',
        'Varanasi - Ciudad espiritual más antigua del mundo',
        'Kerala - Backwaters y playas serenas',
        'Goa - Playas y herencia portuguesa',
        'Rajasthan - Fortalezas y desiertos dorados'
      ],
      bestTimeToVisit: 'Octubre a marzo. Clima más agradable en la mayoría del país. Evita monzones (junio a septiembre) en la mayor parte de regiones.',
      localCuisine: [
        'Butter chicken - Pollo cremoso con especias',
        'Biryani - Arroz aromático con carne o vegetales',
        'Naan y roti - Panes tradicionales',
        'Masala chai - Té especiado',
        'Samosas - Empanadillas fritas',
        'Dhal - Guiso de lentejas'
      ],
      transportation: 'Red ferroviaria extensa y económica. Vuelos domésticos para distancias largas. Auto-rickshaws para cortas distancias. Uber y Ola disponibles en ciudades.',
      timeZone: 'UTC+5:30 (IST)',
      emergencyNumber: '112'
    },
    {
      id: 8,
      name: 'Reino Unido',
      capital: 'Londres',
      region: 'Europa',
      flag: '🇬🇧',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&h=800&fit=crop',
      description: 'Tierra de reyes, castillos y tradiciones milenarias. El Reino Unido combina historia aristocrática con modernidad urbana, desde pubs históricos hasta galerías de arte de vanguardia.',
      rating: 4.7,
      priceLevel: '£££',
      tags: ['Historia', 'Realeza', 'Literatura', 'Pub Culture'],
      population: '67.5 millones',
      languages: ['Inglés'],
      currencies: ['Libra esterlina (£)'],
      funFacts: [
        'El Big Ben oficialmente se llama Elizabeth Tower',
        'Londres tiene más de 170 museos',
        'El Reino Unido tiene 25 sitios declarados Patrimonio de la Humanidad',
        'El té es la bebida más popular con 100 millones de tazas diarias'
      ],
      mustVisitPlaces: [
        'Big Ben y Houses of Parliament - Corazón político británico',
        'Tower Bridge - Iconic bridge victoriano',
        'Stonehenge - Misterio prehistórico',
        'Edimburgo Castle - Fortaleza escocesa',
        'Bath - Ciudades romanas y georgianas',
        'Lake District - Paisajes inspiradores de Wordsworth'
      ],
      bestTimeToVisit: 'Mayo a septiembre. Clima más agradable aunque siempre posible lluvia. Diciembre para mercados navideños.',
      localCuisine: [
        'Fish and chips - Plato nacional británico',
        'Sunday roast - Tradición familiar dominical',
        'Full English breakfast - Desayuno completo',
        'Pie and mash - Comida tradicional londinense',
        'Scones with clotted cream - Té de la tarde',
        'Haggis - Especialidad escocesa'
      ],
      transportation: 'Excelente red de trenes entre ciudades. Metro (Tube) en Londres. Autobuses locales. Carreteras bien mantenidas para alquiler de coches.',
      timeZone: 'UTC+0 (GMT), UTC+1 en verano (BST)',
      emergencyNumber: '999 o 112'
    },
    {
      id: 9,
      name: 'Sudáfrica',
      capital: 'Pretoria, Ciudad del Cabo, Bloemfontein',
      region: 'África del Sur',
      flag: '🇿🇦',
      image: 'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?w=1200&h=800&fit=crop',
      description: 'Nación arcoíris que mezcla culturas, paisajes y vida salvaje. Desde safaris en Kruger hasta vinos en Stellenbosch, Sudáfrica ofrece aventuras inolvidables en un entorno espectacular.',
      rating: 4.8,
      priceLevel: 'R',
      tags: ['Naturaleza', 'Vistas', 'Safari', 'Vinos'],
      population: '60.1 millones',
      languages: ['11 idiomas oficiales including inglés, afrikáans, zulú'],
      currencies: ['Rand sudafricano (R)'],
      funFacts: [
        'Sudáfrica tiene tres capitales: Pretoria (ejecutiva), Ciudad del Cabo (legislativa) y Bloemfontein (judicial)',
        'Table Mountain tiene más de 2,200 especies de plantas',
        'El Big Five se puede ver en Kruger National Park',
        'Sudáfrica es el mayor productor mundial de platino'
      ],
      mustVisitPlaces: [
        'Table Mountain - Vistas panorámicas de Ciudad del Cabo',
        'Kruger National Park - Safari para ver el Big Five',
        'Cabo de Buena Esperanza - Punto más al sur de África',
        'Boulders Beach - Colonia de pingüinos',
        'Ruta del vino en Stellenbosch - Degustaciones world-class',
        'Robben Island - Donde Mandela estuvo prisionero'
      ],
      bestTimeToVisit: 'Mayo a septiembre (invierno seco) para safaris. Noviembre a febrero (verano) para playas y Ciudad del Cabo.',
      localCuisine: [
        'Braai - Barbacoa sudafricana tradicional',
        'Biltong - Carne curada secada al aire',
        'Bobotie - Guiso de carne con especias y fruta',
        'Samoosas - Empanadillas influenciadas por India',
        'Malva pudding - Postre dulce tradicional',
        'Rooibos tea - Té rojo sudafricano'
      ],
      transportation: 'Vuelos domésticos entre ciudades principales. Carreteras excelentes para road trips. Autobuses de larga distancia. Uber disponible en áreas urbanas.',
      timeZone: 'UTC+2 (SAST)',
      emergencyNumber: '10111'
    },
    {
      id: 10,
      name: 'Emiratos Árabes Unidos',
      capital: 'Abu Dabi',
      region: 'Oriente Medio',
      flag: '🇦🇪',
      image: 'https://images.unsplash.com/photo-1518684079-3c830dffe094?w=1200&h=800&fit=crop',
      description: 'Donde el desierto encuentra el futuro. Los EAU son un testimonio de visión y ambición, con rascacielos que desafían la gravedad, islas artificiales y lujos que redefinen la opulencia.',
      rating: 4.9,
      priceLevel: '$$$$',
      tags: ['Lujo', 'Futuro', 'Compras', 'Arquitectura'],
      population: '9.9 millones',
      languages: ['Árabe', 'Inglés'],
      currencies: ['Dirham de los EAU (AED)'],
      funFacts: [
        'Burj Khalifa es el edificio más alto del mundo con 828 metros',
        'Dubái no tiene impuestos sobre la renta',
        'Los EAU tienen la mayor concentración de rascacielos del mundo',
        'Palm Jumeirah es visible desde el espacio'
      ],
      mustVisitPlaces: [
        'Burj Khalifa - Atalaya más alta del mundo',
        'Dubai Mall - Centro comercial más grande del mundo',
        'Sheikh Zayed Grand Mosque - Joya arquitectónica islámica',
        'Palm Jumeirah - Isla artificial en forma de palmera',
        'Gold Souk - Mercado tradicional de oro',
        'Desert Safari - Aventura en dunas de arena'
      ],
      bestTimeToVisit: 'Noviembre a marzo. Clima más agradable con temperaturas moderadas. Evita junio a septiembre por calor extremo.',
      localCuisine: [
        'Shawarma - Carne asada en vertical con especias',
        'Al Harees - Plato tradicional de trigo y carne',
        'Luqaimat - Dumplings dulces con dátiles',
        'Machboos - Arroz con carne y especias',
        'Camel meat - Especialidad regional',
        'Arabic coffee con dátiles - Tradición hospitalaria'
      ],
      transportation: 'Metro moderno en Dubái. Taxis económicos y Uber disponibles. Autobuses interurbanos. Carreteras excelentes para alquiler de coches.',
      timeZone: 'UTC+4 (GST)',
      emergencyNumber: '999'
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private favoritesService: FavoritesService,
    private cameraService: CameraService,
    private shareService: ShareService
  ) {
    addIcons({shareOutline,starOutline,peopleOutline,languageOutline,cashOutline,timeOutline,locationOutline,mapOutline,restaurantOutline,airplaneOutline,cameraOutline,closeCircle,alertCircle,imagesOutline,heartOutline,heart});
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.loadCountry(id);
      this.checkFavorite(id);
    });

    // Subscribe to favorites changes
    this.favoritesSubscription = this.favoritesService.favorites$.subscribe(() => {
      if (this.country) {
        this.isFavorite = this.favoritesService.isFavorite(this.country.id);
      }
    });
  }

  ngOnDestroy() {
    if (this.favoritesSubscription) {
      this.favoritesSubscription.unsubscribe();
    }
  }

  loadCountry(id: number) {
    this.isLoading = true;
    
    // Simulate API call delay
    setTimeout(() => {
      this.country = this.countriesData.find(c => c.id === id) || null;
      this.isLoading = false;
      
      if (!this.country) {
        this.router.navigate(['/destinations']);
      }
    }, 500);
  }

  async toggleFavorite() {
    if (!this.country) return;
    
    try {
      this.isFavorite = await this.favoritesService.toggleFavorite(this.country.id);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  }

  checkFavorite(countryId: number) {
    this.isFavorite = this.favoritesService.isFavorite(countryId);
  }

  async shareCountry() {
    if (!this.country) return;
    
    try {
      await this.shareService.shareDestinationDetails({
        name: this.country.name,
        capital: this.country.capital,
        region: this.country.region,
        description: this.country.description
      });
    } catch (error) {
      console.error('Error al compartir país:', error);
    }
  }

  async openCamera() {
    if (!this.country) return;
    
    this.isTakingPhoto = true;
    this.photoError = null;
    
    try {
      const photo = await this.cameraService.pickImage();
      
      if (photo) {
        const photoUrl = this.cameraService.getPhotoUrl(photo);
        this.userPhotos.push(photoUrl);
        
        // Guardar la foto con el nombre del país
        await this.cameraService.savePhotoToStorage(photo, this.country.name);
        
        console.log(`Foto tomada para ${this.country.name}:`, photoUrl);
      }
    } catch (error) {
      this.photoError = 'No se pudo tomar la foto. Inténtalo de nuevo.';
      console.error('Error en cámara:', error);
    } finally {
      this.isTakingPhoto = false;
    }
  }

  async takePhoto() {
    if (!this.country) return;
    
    this.isTakingPhoto = true;
    this.photoError = null;
    
    try {
      const photo = await this.cameraService.takePicture();
      
      if (photo) {
        const photoUrl = this.cameraService.getPhotoUrl(photo);
        this.userPhotos.push(photoUrl);
        await this.cameraService.savePhotoToStorage(photo, this.country.name);
        console.log(`Foto tomada con cámara para ${this.country.name}:`, photoUrl);
      }
    } catch (error) {
      this.photoError = 'No se pudo tomar la foto. Inténtalo de nuevo.';
      console.error('Error al tomar foto:', error);
    } finally {
      this.isTakingPhoto = false;
    }
  }

  async selectFromGallery() {
    if (!this.country) return;
    
    this.isTakingPhoto = true;
    this.photoError = null;
    
    try {
      const photo = await this.cameraService.selectFromGallery();
      
      if (photo) {
        const photoUrl = this.cameraService.getPhotoUrl(photo);
        this.userPhotos.push(photoUrl);
        await this.cameraService.savePhotoToStorage(photo, this.country.name);
        console.log(`Foto seleccionada de galería para ${this.country.name}:`, photoUrl);
      }
    } catch (error) {
      this.photoError = 'No se pudo seleccionar la foto. Inténtalo de nuevo.';
      console.error('Error al seleccionar de galería:', error);
    } finally {
      this.isTakingPhoto = false;
    }
  }

  removePhoto(index: number) {
    this.userPhotos.splice(index, 1);
  }

  goBack() {
    this.router.navigate(['/destinations']);
  }
}
