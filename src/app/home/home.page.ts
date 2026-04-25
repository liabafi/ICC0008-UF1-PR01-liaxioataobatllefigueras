import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonCard, 
  IonCardContent, 
  IonButton, 
  IonIcon,
  IonButtons,
  IonMenuButton,
  IonImg,
  IonChip,
  IonSpinner
} from '@ionic/angular/standalone';
import { FavoritesService, CountryDetail } from '../services/favorites.service';
import { Subscription } from 'rxjs';
import { addIcons } from 'ionicons';
import { heartOutline, locationOutline, starOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    CommonModule,
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonCard, 
    IonCardContent, 
    IonButton, 
    IonIcon,
    IonButtons,
    IonMenuButton,
    IonChip,
    IonSpinner
  ],
})
export class HomePage implements OnInit, OnDestroy {
  userEmail: string = '';
  userName: string = '';
  favoriteCountries: CountryDetail[] = [];
  isLoadingFavorites = true;
  private favoritesSubscription: Subscription | null = null;

  // Sample countries data (same as in country-detail page)
  private countriesData: CountryDetail[] = [
    {
      id: 1,
      name: 'Francia',
      capital: 'París',
      region: 'Europa Occidental',
      flag: '🇫🇷',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop',
      description: 'La tierra del amor, la moda y la gastronomía exquisita.',
      rating: 4.8,
      priceLevel: '€€€',
      tags: ['Cultura', 'Romántico', 'Gastronomía', 'Historia'],
      population: '67.4 millones',
      languages: ['Francés'],
      currencies: ['Euro (€)'],
      funFacts: ['Francia es el país más visitado del mundo'],
      mustVisitPlaces: ['Torre Eiffel', 'Museo del Louvre'],
      bestTimeToVisit: 'Abril a junio o septiembre a octubre',
      localCuisine: ['Croissants', 'Coq au vin'],
      transportation: 'Excelente red de trenes',
      timeZone: 'UTC+1 (CET)',
      emergencyNumber: '112'
    },
    {
      id: 2,
      name: 'Japón',
      capital: 'Tokio',
      region: 'Asia Oriental',
      flag: '🇯🇵',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
      description: 'Donde la tradición ancestral se fusiona con la tecnología del futuro.',
      rating: 4.9,
      priceLevel: '¥¥¥',
      tags: ['Tecnología', 'Tradición', 'Naturaleza', 'Gastronomía'],
      population: '125.8 millones',
      languages: ['Japonés'],
      currencies: ['Yen japonés (¥)'],
      funFacts: ['Japón tiene más de 6,800 islas'],
      mustVisitPlaces: ['Monte Fuji', 'Templo Kinkaku-ji'],
      bestTimeToVisit: 'Marzo a mayo u octubre a noviembre',
      localCuisine: ['Sushi', 'Ramen'],
      transportation: 'Sistema ferroviario extremadamente eficiente',
      timeZone: 'UTC+9 (JST)',
      emergencyNumber: '110'
    },
    {
      id: 3,
      name: 'Estados Unidos',
      capital: 'Washington D.C.',
      region: 'América del Norte',
      flag: '🇺🇸',
      image: 'https://images.unsplash.com/photo-1496442226666-8d499ed49542?w=800&h=600&fit=crop',
      description: 'Tierra de oportunidades y contrastes extremos.',
      rating: 4.7,
      priceLevel: '$$$',
      tags: ['Urbano', 'Naturaleza', 'Diversidad', 'Aventura'],
      population: '331.9 millones',
      languages: ['Inglés'],
      currencies: ['Dólar estadounidense ($)'],
      funFacts: ['EE.UU. tiene 59 parques nacionales'],
      mustVisitPlaces: ['Estatua de la Libertad', 'Gran Cañón'],
      bestTimeToVisit: 'Varía por región',
      localCuisine: ['Hamburguesas', 'Barbecue'],
      transportation: 'Red de vuelos domésticos extensa',
      timeZone: 'Varía: UTC-5 a UTC-10',
      emergencyNumber: '911'
    },
    {
      id: 4,
      name: 'Brasil',
      capital: 'Brasilia',
      region: 'América del Sur',
      flag: '🇧🇷',
      image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&h=600&fit=crop',
      description: 'País de la samba, el fútbol y la alegría de vivir.',
      rating: 4.6,
      priceLevel: 'R$',
      tags: ['Playa', 'Carnaval', 'Naturaleza', 'Fútbol'],
      population: '214.3 millones',
      languages: ['Portugués'],
      currencies: ['Real brasileiro (R$)'],
      funFacts: ['Brasil es el país más grande de América del Sur'],
      mustVisitPlaces: ['Cristo Redentor', 'Playas de Copacabana'],
      bestTimeToVisit: 'Mayo a septiembre',
      localCuisine: ['Feijoada', 'Churrasco'],
      transportation: 'Vuelos domésticos extensos',
      timeZone: 'UTC-3 (BRST)',
      emergencyNumber: '190'
    },
    {
      id: 5,
      name: 'Egipto',
      capital: 'El Cairo',
      region: 'África del Norte',
      flag: '🇪🇬',
      image: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a746b?w=800&h=600&fit=crop',
      description: 'Cuna de una de las civilizaciones más antiguas del mundo.',
      rating: 4.5,
      priceLevel: '£E',
      tags: ['Historia', 'Aventura', 'Misterio', 'Desierto'],
      population: '104.3 millones',
      languages: ['Árabe'],
      currencies: ['Libra egipcia (£E)'],
      funFacts: ['Las pirámides de Giza son la única de las Siete Maravillas'],
      mustVisitPlaces: ['Pirámides de Giza', 'Valle de los Reyes'],
      bestTimeToVisit: 'Octubre a abril',
      localCuisine: ['Koshary', 'Ful medames'],
      transportation: 'Trenes nocturnos entre ciudades',
      timeZone: 'UTC+2 (EET)',
      emergencyNumber: '122'
    },
    {
      id: 6,
      name: 'Australia',
      capital: 'Canberra',
      region: 'Oceanía',
      flag: '🇦🇺',
      image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&h=600&fit=crop',
      description: 'Continente-isla único con paisajes extremos y vida salvaje extraordinaria.',
      rating: 4.8,
      priceLevel: 'A$',
      tags: ['Arquitectura', 'Surf', 'Naturaleza', 'Aventura'],
      population: '25.7 millones',
      languages: ['Inglés'],
      currencies: ['Dólar australiano (A$)'],
      funFacts: ['Australia es el sexto país más grande'],
      mustVisitPlaces: ['Ópera House de Sídney', 'Gran Barrera de Coral'],
      bestTimeToVisit: 'Septiembre a noviembre o marzo a mayo',
      localCuisine: ['Vegemite', 'Meat pie'],
      transportation: 'Vuelos domésticos esenciales',
      timeZone: 'Varía: UTC+8 a UTC+10.5',
      emergencyNumber: '000'
    },
    {
      id: 7,
      name: 'India',
      capital: 'Nueva Delhi',
      region: 'Asia del Sur',
      flag: '🇮🇳',
      image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=800&h=600&fit=crop',
      description: 'Mosaico de culturas, colores y espiritualidad.',
      rating: 4.4,
      priceLevel: '₹',
      tags: ['Cultura', 'Espiritual', 'Color', 'Tradición'],
      population: '1,408 millones',
      languages: ['Hindi', 'Inglés y 21 idiomas oficiales más'],
      currencies: ['Rupia india (₹)'],
      funFacts: ['India es el país más poblado del mundo'],
      mustVisitPlaces: ['Taj Mahal', 'Ciudad Rosa de Jaipur'],
      bestTimeToVisit: 'Octubre a marzo',
      localCuisine: ['Butter chicken', 'Biryani'],
      transportation: 'Red ferroviaria extensa y económica',
      timeZone: 'UTC+5:30 (IST)',
      emergencyNumber: '112'
    },
    {
      id: 8,
      name: 'Reino Unido',
      capital: 'Londres',
      region: 'Europa',
      flag: '🇬🇧',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop',
      description: 'Tierra de reyes, castillos y tradiciones milenarias.',
      rating: 4.7,
      priceLevel: '£££',
      tags: ['Historia', 'Realeza', 'Literatura', 'Pub Culture'],
      population: '67.5 millones',
      languages: ['Inglés'],
      currencies: ['Libra esterlina (£)'],
      funFacts: ['El Big Ben oficialmente se llama Elizabeth Tower'],
      mustVisitPlaces: ['Big Ben', 'Tower Bridge'],
      bestTimeToVisit: 'Mayo a septiembre',
      localCuisine: ['Fish and chips', 'Sunday roast'],
      transportation: 'Excelente red de trenes',
      timeZone: 'UTC+0 (GMT)',
      emergencyNumber: '999'
    },
    {
      id: 9,
      name: 'Sudáfrica',
      capital: 'Pretoria, Ciudad del Cabo, Bloemfontein',
      region: 'África del Sur',
      flag: '🇿🇦',
      image: 'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?w=800&h=600&fit=crop',
      description: 'Nación arcoíris que mezcla culturas, paisajes y vida salvaje.',
      rating: 4.8,
      priceLevel: 'R',
      tags: ['Naturaleza', 'Vistas', 'Safari', 'Vinos'],
      population: '60.1 millones',
      languages: ['11 idiomas oficiales'],
      currencies: ['Rand sudafricano (R)'],
      funFacts: ['Sudáfrica tiene tres capitales'],
      mustVisitPlaces: ['Table Mountain', 'Kruger National Park'],
      bestTimeToVisit: 'Mayo a septiembre',
      localCuisine: ['Braai', 'Biltong'],
      transportation: 'Vuelos domésticos entre ciudades',
      timeZone: 'UTC+2 (SAST)',
      emergencyNumber: '10111'
    },
    {
      id: 10,
      name: 'Emiratos Árabes Unidos',
      capital: 'Abu Dabi',
      region: 'Oriente Medio',
      flag: '🇦🇪',
      image: 'https://images.unsplash.com/photo-1518684079-3c830dffe094?w=800&h=600&fit=crop',
      description: 'Donde el desierto encuentra el futuro.',
      rating: 4.9,
      priceLevel: '$$$$',
      tags: ['Lujo', 'Futuro', 'Compras', 'Arquitectura'],
      population: '9.9 millones',
      languages: ['Árabe', 'Inglés'],
      currencies: ['Dirham de los EAU (AED)'],
      funFacts: ['Burj Khalifa es el edificio más alto del mundo'],
      mustVisitPlaces: ['Burj Khalifa', 'Dubai Mall'],
      bestTimeToVisit: 'Noviembre a marzo',
      localCuisine: ['Shawarma', 'Luqaimat'],
      transportation: 'Metro moderno en Dubái',
      timeZone: 'UTC+4 (GST)',
      emergencyNumber: '999'
    }
  ];

  constructor(
    private router: Router,
    private favoritesService: FavoritesService
  ) {
    this.userEmail = localStorage.getItem('userEmail') || '';
    this.userName = this.userEmail.split('@')[0] || 'User';
    addIcons({ heartOutline, locationOutline, starOutline });
  }

  ngOnInit() {
    this.loadFavoriteCountries();
    
    // Subscribe to favorites changes
    this.favoritesSubscription = this.favoritesService.favorites$.subscribe(() => {
      this.loadFavoriteCountries();
    });
  }

  ngOnDestroy() {
    if (this.favoritesSubscription) {
      this.favoritesSubscription.unsubscribe();
    }
  }

  loadFavoriteCountries() {
    this.isLoadingFavorites = true;
    
    // Simulate loading delay
    setTimeout(() => {
      this.favoriteCountries = this.favoritesService.getFavoriteCountries(this.countriesData);
      this.isLoadingFavorites = false;
    }, 300);
  }

  goToDestinations() {
    this.router.navigate(['/destinations']);
  }

  scrollToSavedPlaces() {
    const savedPlacesElement = document.getElementById('saved-places-section');
    if (savedPlacesElement) {
      savedPlacesElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  viewCountryDetail(countryId: number) {
    this.router.navigate(['/country', countryId]);
  }

  async removeFromFavorites(countryId: number) {
    try {
      await this.favoritesService.removeFromFavorites(countryId);
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    this.router.navigate(['/login']);
  }
}
