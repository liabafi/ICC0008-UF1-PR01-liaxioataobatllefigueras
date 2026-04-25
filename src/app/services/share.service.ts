import { Injectable } from '@angular/core';
import { Share } from '@capacitor/share';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  
  constructor(private platform: Platform) {}

  async shareCountry(countryName: string, description: string = ''): Promise<boolean> {
    try {
      const title = `Viaja a ${countryName}`;
      const text = description 
        ? `Descubre ${countryName} - ${description.substring(0, 100)}...`
        : `Descubre ${countryName}, un destino increíble para tu próxima aventura`;
      
      if (this.platform.is('hybrid')) {
        // Compartir nativo en dispositivos móviles
        await Share.share({
          title: title,
          text: text,
          url: window.location.href,
          dialogTitle: 'Compartir destino'
        });
        return true;
      } else {
        // Fallback para web
        return this.webShare(title, text);
      }
    } catch (error) {
      console.error('Error al compartir:', error);
      return false;
    }
  }

  async shareDestinationDetails(country: {
    name: string;
    capital: string;
    region: string;
    description: string;
  }): Promise<boolean> {
    try {
      const title = `Viaja a ${country.name}`;
      const text = `🌍 ${country.name}\n🏛️ Capital: ${country.capital}\n📍 Región: ${country.region}\n\n${country.description.substring(0, 150)}...`;
      
      if (this.platform.is('hybrid')) {
        await Share.share({
          title: title,
          text: text,
          url: window.location.href,
          dialogTitle: 'Compartir destino turístico'
        });
        return true;
      } else {
        return this.webShare(title, text);
      }
    } catch (error) {
      console.error('Error al compartir detalles:', error);
      return false;
    }
  }

  private async webShare(title: string, text: string): Promise<boolean> {
    try {
      if (navigator.share) {
        await navigator.share({
          title: title,
          text: text,
          url: window.location.href
        });
        return true;
      } else {
        // Fallback para navegadores que no soportan Web Share API
        const shareText = `${title}\n\n${text}\n\n${window.location.href}`;
        await navigator.clipboard.writeText(shareText);
        
        // Mostrar notificación al usuario
        this.showCopyNotification();
        return true;
      }
    } catch (error) {
      console.error('Error en web share:', error);
      return false;
    }
  }

  private showCopyNotification(): void {
    // Crear una notificación simple para el usuario
    const notification = document.createElement('div');
    notification.textContent = '¡Enlace copiado al portapapeles!';
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: #4CAF50;
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      z-index: 9999;
      font-family: Arial, sans-serif;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 3000);
  }

  async shareWithImage(countryName: string, imageUrl?: string): Promise<boolean> {
    try {
      const title = `Mi viaje a ${countryName}`;
      const text = `Estoy explorando ${countryName} 🌍`;
      
      if (this.platform.is('hybrid') && imageUrl) {
        await Share.share({
          title: title,
          text: text,
          url: imageUrl,
          dialogTitle: 'Compartir foto del viaje'
        });
      } else {
        return this.shareCountry(countryName);
      }
      return true;
    } catch (error) {
      console.error('Error al compartir con imagen:', error);
      return false;
    }
  }
}
