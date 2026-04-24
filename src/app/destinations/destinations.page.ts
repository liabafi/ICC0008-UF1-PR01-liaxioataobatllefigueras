import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonImg,
  IonButtons,
  IonBackButton,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonLabel
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { shareOutline, cameraOutline, star, searchOutline, locationOutline } from 'ionicons/icons';

export interface Destination {
  id: number;
  name: string;
  capital: string;
  region: string;
  flag: string;
  image: string;
  description: string;
  rating: number;
  priceLevel: string;
  tags: string[];
}

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.page.html',
  styleUrls: ['./destinations.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    IonIcon,
    IonButtons,
    IonBackButton,
    IonSearchbar,
    IonSegment,
    IonSegmentButton,
    IonLabel
  ]
})
export class DestinationsPage {
  destinations: Destination[] = [
    {
      id: 1,
      name: 'París',
      capital: 'Francia',
      region: 'Europa Occidental',
      flag: '🇫🇷',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop',
      description: 'La ciudad del amor y la luz, con la icónica Torre Eiffel y museos de clase mundial.',
      rating: 4.8,
      priceLevel: '€€€',
      tags: ['Cultura', 'Romántico']
    },
    {
      id: 2,
      name: 'Tokio',
      capital: 'Japón',
      region: 'Asia Oriental',
      flag: '🇯🇵',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
      description: 'Metrópolis moderna donde la tradición se encuentra con la tecnología futurista.',
      rating: 4.9,
      priceLevel: '¥¥¥',
      tags: ['Tecnología', 'Tradición']
    },
    {
      id: 3,
      name: 'Nueva York',
      capital: 'Estados Unidos',
      region: 'América del Norte',
      flag: '🇺🇸',
      image: 'https://images.unsplash.com/photo-1496442226666-8d499ed49542?w=800&h=600&fit=crop',
      description: 'La ciudad que nunca duerme, con rascacielos icónicos y una energía inigualable.',
      rating: 4.7,
      priceLevel: '$$$',
      tags: ['Urbano', 'Ocio']
    },
    {
      id: 4,
      name: 'Río de Janeiro',
      capital: 'Brasil',
      region: 'América del Sur',
      flag: '🇧🇷',
      image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&h=600&fit=crop',
      description: 'Ciudad maravillosa famosa por sus playas, el Cristo Redentor y el carnaval.',
      rating: 4.6,
      priceLevel: 'R$',
      tags: ['Playa', 'Carnaval']
    },
    {
      id: 5,
      name: 'El Cairo',
      capital: 'Egipto',
      region: 'África del Norte',
      flag: '🇪🇬',
      image: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a746b?w=800&h=600&fit=crop',
      description: 'Antigua capital llena de historia, pirámides y tesoros faraónicos.',
      rating: 4.5,
      priceLevel: '£E',
      tags: ['Historia', 'Aventura']
    },
    {
      id: 6,
      name: 'Sídney',
      capital: 'Australia',
      region: 'Oceanía',
      flag: '🇦🇺',
      image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&h=600&fit=crop',
      description: 'Puerto vibrante con la icónica Ópera House y playas espectaculares.',
      rating: 4.8,
      priceLevel: 'A$',
      tags: ['Arquitectura', 'Surf']
    },
    {
      id: 7,
      name: 'Mumbai',
      capital: 'India',
      region: 'Asia del Sur',
      flag: '🇮🇳',
      image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=800&h=600&fit=crop',
      description: 'Centro financiero y de Bollywood, con una energía desbordante y cultura vibrante.',
      rating: 4.4,
      priceLevel: '₹',
      tags: ['Cultura', 'Espiritual']
    },
    {
      id: 8,
      name: 'Londres',
      capital: 'Reino Unido',
      region: 'Europa',
      flag: '🇬🇧',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop',
      description: 'Histórica capital con el Big Ben, Tower Bridge y una rica herencia cultural.',
      rating: 4.7,
      priceLevel: '£££',
      tags: ['Historia', 'Realeza']
    },
    {
      id: 9,
      name: 'Ciudad del Cabo',
      capital: 'Sudáfrica',
      region: 'África del Sur',
      flag: '🇿🇦',
      image: 'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?w=800&h=600&fit=crop',
      description: 'Ciudad impresionante con el Table Mountain y playas de clase mundial.',
      rating: 4.8,
      priceLevel: 'R',
      tags: ['Naturaleza', 'Vistas']
    },
    {
      id: 10,
      name: 'Dubái',
      capital: 'Emiratos Árabes',
      region: 'Oriente Medio',
      flag: '🇦🇪',
      image: 'https://images.unsplash.com/photo-1518684079-3c830dffe094?w=800&h=600&fit=crop',
      description: 'Ciudad futurista con el Burj Khalifa y lujos deslumbrantes.',
      rating: 4.9,
      priceLevel: '$$$$',
      tags: ['Lujo', 'Futuro']
    }
  ];

  filteredDestinations = [...this.destinations];

  constructor(private router: Router) {
    addIcons({cameraOutline,shareOutline,locationOutline,star,searchOutline});
  }

  filterDestinations(event: any) {
    const query = event.detail.value.toLowerCase();
    this.filteredDestinations = this.destinations.filter(d =>
      d.name.toLowerCase().includes(query) || d.region.toLowerCase().includes(query)
    );
  }

  shareDestination(destination: Destination) {
    // Implementar funcionalidad de compartir
    if (navigator.share) {
      navigator.share({
        title: `Viaja a ${destination.name}`,
        text: `Descubre ${destination.name}, ${destination.capital} - ${destination.region}`,
        url: window.location.href
      });
    } else {
      // Fallback para navegadores que no soportan Web Share API
      const text = `Descubre ${destination.name}, ${destination.capital} - ${destination.region}`;
      navigator.clipboard.writeText(text);
    }
  }

  openCamera(destination: Destination) {
    // Implementar funcionalidad de cámara
    console.log('Abriendo cámara para:', destination.name);
    // Aquí se implementaría la lógica de la cámara
  }

  onSegmentChange(event: any) {
    const selectedSegment = event.detail.value;
    if (selectedSegment === 'all') {
      this.filteredDestinations = [...this.destinations];
    } else {
      this.filteredDestinations = this.destinations.filter(destination =>
        destination.region.toLowerCase().includes(selectedSegment.toLowerCase())
      );
    }
  }

  viewCountryDetail(destination: Destination) {
    this.router.navigate(['/country', destination.id]);
  }
}
