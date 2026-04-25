import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  
  constructor(private platform: Platform) {}

  async takePicture(): Promise<Photo | null> {
    try {
      if (!this.platform.is('hybrid')) {
        console.warn('La cámara solo está disponible en dispositivos móviles');
        return null;
      }

      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera
      });

      return image;
    } catch (error) {
      console.error('Error al tomar foto:', error);
      return null;
    }
  }

  async selectFromGallery(): Promise<Photo | null> {
    try {
      if (!this.platform.is('hybrid')) {
        console.warn('La galería solo está disponible en dispositivos móviles');
        return null;
      }

      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos
      });

      return image;
    } catch (error) {
      console.error('Error al seleccionar de galería:', error);
      return null;
    }
  }

  async pickImage(): Promise<Photo | null> {
    try {
      if (!this.platform.is('hybrid')) {
        console.warn('Las imágenes solo están disponibles en dispositivos móviles');
        return null;
      }

      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt
      });

      return image;
    } catch (error) {
      console.error('Error al seleccionar imagen:', error);
      return null;
    }
  }

  getPhotoUrl(photo: Photo): string {
    return photo.webPath || '';
  }

  async savePhotoToStorage(photo: Photo, countryName: string): Promise<string> {
    try {
      const timestamp = new Date().getTime();
      const fileName = `${countryName}_${timestamp}.jpg`;
      
      // En una implementación real, aquí guardaríamos la imagen en el dispositivo
      // o la subiríamos a un servicio de almacenamiento
      console.log(`Guardando foto: ${fileName}`);
      
      return fileName;
    } catch (error) {
      console.error('Error al guardar foto:', error);
      return '';
    }
  }
}
