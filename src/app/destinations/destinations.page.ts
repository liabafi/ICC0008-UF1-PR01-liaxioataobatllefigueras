import { Component, OnInit } from '@angular/core';
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
  IonLabel,
  IonSpinner
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { shareOutline, cameraOutline, star, searchOutline, locationOutline, search, alertCircle } from 'ionicons/icons';
import { CountriesService, Destination } from '../services/countries.service';
import { Observable } from 'rxjs';


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
    IonLabel,
    IonSpinner
  ]
})
export class DestinationsPage implements OnInit {
  destinations$: Observable<Destination[]> = new Observable<Destination[]>();
  destinations: Destination[] = [];
  filteredDestinations: Destination[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(
    private router: Router,
    private countriesService: CountriesService
  ) {
    addIcons({alertCircle,cameraOutline,shareOutline,locationOutline,search,star,searchOutline});
  }

  ngOnInit() {
    this.loadDestinations();
  }

  public loadDestinations() {
    this.isLoading = true;
    this.error = null;
    
    this.destinations$ = this.countriesService.getCountries();
    this.destinations$.subscribe({
      next: (data) => {
        this.destinations = data;
        this.filteredDestinations = [...data];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading countries:', err);
        this.error = 'No se pudieron cargar los destinos. Por favor, intenta de nuevo.';
        this.isLoading = false;
      }
    });
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
