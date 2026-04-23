import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  IonMenuButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonCard, 
    IonCardContent, 
    IonButton, 
    IonIcon,
    IonButtons,
    IonMenuButton
  ],
})
export class HomePage {
  userEmail: string = '';
  userName: string = '';

  constructor(private router: Router) {
    this.userEmail = localStorage.getItem('userEmail') || '';
    this.userName = this.userEmail.split('@')[0] || 'User';
  }

  goToDestinations() {
    this.router.navigate(['/destinations']);
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    this.router.navigate(['/login']);
  }
}
