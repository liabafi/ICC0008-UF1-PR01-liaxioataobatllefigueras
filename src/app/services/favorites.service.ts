import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Firestore, collection, doc, getDoc, setDoc, deleteDoc, onSnapshot, arrayUnion, arrayRemove } from '@angular/fire/firestore';

export interface CountryDetail {
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
  population: string;
  languages: string[];
  currencies: string[];
  funFacts: string[];
  mustVisitPlaces: string[];
  bestTimeToVisit: string;
  localCuisine: string[];
  transportation: string;
  timeZone: string;
  emergencyNumber: string;
}

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favoritesSubject = new BehaviorSubject<number[]>([]);
  private userId: string = 'default_user'; // In a real app, this would come from authentication
  
  // Observable that components can subscribe to
  favorites$ = this.favoritesSubject.asObservable();

  constructor(private firestore: Firestore) {
    this.loadFavorites();
  }

  private async loadFavorites(): Promise<void> {
    try {
      const userFavoritesDoc = doc(this.firestore, 'favorites', this.userId);
      const docSnapshot = await getDoc(userFavoritesDoc);
      
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        const favorites = data?.['favorites'] || [];
        this.favoritesSubject.next(favorites);
      } else {
        // Initialize with empty favorites if document doesn't exist
        await setDoc(userFavoritesDoc, { favorites: [] });
        this.favoritesSubject.next([]);
      }
    } catch (error) {
      console.error('Error loading favorites from Firebase:', error);
      this.favoritesSubject.next([]);
    }
  }

  private async saveFavorites(favorites: number[]): Promise<void> {
    try {
      const userFavoritesDoc = doc(this.firestore, 'favorites', this.userId);
      await setDoc(userFavoritesDoc, { favorites });
      this.favoritesSubject.next(favorites);
    } catch (error) {
      console.error('Error saving favorites to Firebase:', error);
    }
  }

  getFavorites(): number[] {
    return this.favoritesSubject.value;
  }

  isFavorite(countryId: number): boolean {
    return this.favoritesSubject.value.includes(countryId);
  }

  async toggleFavorite(countryId: number): Promise<boolean> {
    const currentFavorites = [...this.favoritesSubject.value];
    const index = currentFavorites.indexOf(countryId);
    
    try {
      if (index > -1) {
        currentFavorites.splice(index, 1);
        await this.saveFavorites(currentFavorites);
        return false; // Removed from favorites
      } else {
        currentFavorites.push(countryId);
        await this.saveFavorites(currentFavorites);
        return true; // Added to favorites
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      return false;
    }
  }

  async addToFavorites(countryId: number): Promise<void> {
    if (!this.isFavorite(countryId)) {
      const currentFavorites = [...this.favoritesSubject.value];
      currentFavorites.push(countryId);
      await this.saveFavorites(currentFavorites);
    }
  }

  async removeFromFavorites(countryId: number): Promise<void> {
    const currentFavorites = [...this.favoritesSubject.value];
    const index = currentFavorites.indexOf(countryId);
    if (index > -1) {
      currentFavorites.splice(index, 1);
      await this.saveFavorites(currentFavorites);
    }
  }

  async clearFavorites(): Promise<void> {
    await this.saveFavorites([]);
  }

  getFavoritesCount(): number {
    return this.favoritesSubject.value.length;
  }

  // Helper method to get full country data for favorites
  // This would typically come from an API, but for now we'll use the static data
  getFavoriteCountries(allCountries: CountryDetail[]): CountryDetail[] {
    const favoriteIds = this.getFavorites();
    return allCountries.filter(country => favoriteIds.includes(country.id));
  }
}
