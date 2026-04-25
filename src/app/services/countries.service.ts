import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface RestCountry {
  name: {
    common: string;
    official: string;
  };
  capital: string[];
  region: string;
  subregion?: string;
  flags: {
    png: string;
    svg: string;
  };
 cca2: string;
  cca3: string;
}

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

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private readonly API_URL = 'https://restcountries.com/v3.1/all';
  
  constructor(private http: HttpClient) {}

  getCountries(): Observable<Destination[]> {
    return this.http.get<RestCountry[]>(this.API_URL).pipe(
      map(countries => this.transformCountriesToDestinations(countries))
    );
  }

  private transformCountriesToDestinations(countries: RestCountry[]): Destination[] {
    const regionDescriptions: { [key: string]: string } = {
      'Europe': 'Destinos con rica historia, arquitectura impresionante y cultura diversa.',
      'Asia': 'Metrópolis modernas, templos antiguos y culturas milenarias.',
      'Americas': 'Desde ciudades vibrantes hasta maravillas naturales impresionantes.',
      'Africa': 'Safaris increíbles, paisajes espectaculares y culturas ancestrales.',
      'Oceania': 'Playas paradisíacas, arrecifes de coral y naturaleza única.',
      'Antarctic': 'El último continente salvaje, hielo eterno y vida marina única.'
    };

    const regionTags: { [key: string]: string[] } = {
      'Europe': ['Cultura', 'Historia'],
      'Asia': ['Tradición', 'Tecnología'],
      'Americas': ['Aventura', 'Naturaleza'],
      'Africa': ['Safari', 'Cultura'],
      'Oceania': ['Playa', 'Naturaleza'],
      'Antarctic': ['Aventura', 'Exploración']
    };

    const priceLevels = ['$', '$$', '$$$', '$$$$'];
    const flagEmojis: { [key: string]: string } = {
      'AF': '🇦🇫', 'AL': '🇦🇱', 'DZ': '🇩🇿', 'AD': '🇦🇩', 'AO': '🇦🇴', 'AG': '🇦🇬', 'AR': '🇦🇷', 'AM': '🇦🇲', 'AU': '🇦🇺', 'AT': '🇦🇹',
      'AZ': '🇦🇿', 'BS': '🇧🇸', 'BH': '🇧🇭', 'BD': '🇧🇩', 'BB': '🇧🇧', 'BY': '🇧🇾', 'BE': '🇧🇪', 'BZ': '🇧🇿', 'BJ': '🇧🇯', 'BT': '🇧🇹',
      'BO': '🇧🇴', 'BA': '🇧🇦', 'BW': '🇧🇼', 'BR': '🇧🇷', 'BN': '🇧🇳', 'BG': '🇧🇬', 'BF': '🇧🇫', 'BI': '🇧🇮', 'CV': '🇨🇻', 'KH': '🇰🇭',
      'CM': '🇨🇲', 'CA': '🇨🇦', 'CF': '🇨🇫', 'TD': '🇹🇩', 'CL': '🇨🇱', 'CN': '🇨🇳', 'CO': '🇨🇴', 'KM': '🇰🇲', 'CG': '🇨🇬', 'CD': '🇨🇩',
      'CR': '🇨🇷', 'HR': '🇭🇷', 'CU': '🇨🇺', 'CY': '🇨🇾', 'CZ': '🇨🇿', 'DK': '🇩🇰', 'DJ': '🇩🇯', 'DM': '🇩🇲', 'DO': '🇩🇴', 'EC': '🇪🇨',
      'EG': '🇪🇬', 'SV': '🇸🇻', 'GQ': '🇬🇶', 'ER': '🇪🇷', 'EE': '🇪🇪', 'SZ': '🇸🇿', 'ET': '🇪🇹', 'FJ': '🇫🇯', 'FI': '🇫🇮', 'FR': '🇫🇷',
      'GA': '🇬🇦', 'GM': '🇬🇲', 'GE': '🇬🇪', 'DE': '🇩🇪', 'GH': '🇬🇭', 'GR': '🇬🇷', 'GD': '🇬🇩', 'GT': '🇬🇹', 'GN': '🇬🇳', 'GW': '🇬🇼',
      'GY': '🇬🇾', 'HT': '🇭🇹', 'HN': '🇭🇳', 'HU': '🇭🇺', 'IS': '🇮🇸', 'IN': '🇮🇳', 'ID': '🇮🇩', 'IR': '🇮🇷', 'IQ': '🇮🇶', 'IE': '🇮🇪',
      'IL': '🇮🇱', 'IT': '🇮🇹', 'JM': '🇯🇲', 'JP': '🇯🇵', 'JO': '🇯🇴', 'KZ': '🇰🇿', 'KE': '🇰🇪', 'KI': '🇰🇮', 'KP': '🇰🇵', 'KR': '🇰🇷',
      'KW': '🇰🇼', 'KG': '🇰🇬', 'LA': '🇱🇦', 'LV': '🇱🇻', 'LB': '🇱🇧', 'LS': '🇱🇸', 'LR': '🇱🇷', 'LY': '🇱🇾', 'LI': '🇱🇮', 'LT': '🇱🇹',
      'LU': '🇱🇺', 'MG': '🇲🇬', 'MW': '🇲🇼', 'MY': '🇲🇾', 'MV': '🇲🇻', 'ML': '🇲🇱', 'MT': '🇲🇹', 'MH': '🇲🇭', 'MR': '🇲🇷', 'MU': '🇲🇺',
      'MX': '🇲🇽', 'FM': '🇫🇲', 'MD': '🇲🇩', 'MC': '🇲🇨', 'MN': '🇲🇳', 'ME': '🇲🇪', 'MA': '🇲🇦', 'MZ': '🇲🇿', 'MM': '🇲🇲', 'NA': '🇳🇦',
      'NR': '🇳🇷', 'NP': '🇳🇵', 'NL': '🇳🇱', 'NZ': '🇳🇿', 'NI': '🇳🇮', 'NE': '🇳🇪', 'NG': '🇳🇬', 'MK': '🇲🇰', 'NO': '🇳🇴', 'OM': '🇴🇲',
      'PK': '🇵🇰', 'PW': '🇵🇼', 'PA': '🇵🇦', 'PG': '🇵🇬', 'PY': '🇵🇾', 'PE': '🇵🇪', 'PH': '🇵🇭', 'PL': '🇵🇱', 'PT': '🇵🇹', 'QA': '🇶🇦',
      'RO': '🇷🇴', 'RU': '🇷🇺', 'RW': '🇷🇼', 'KN': '🇰🇳', 'LC': '🇱🇨', 'VC': '🇻🇨', 'WS': '🇼🇸', 'SM': '🇸🇲', 'ST': '🇸🇹', 'SA': '🇸🇦',
      'SN': '🇸🇳', 'RS': '🇷🇸', 'SC': '🇸🇨', 'SL': '🇸🇱', 'SG': '🇸🇬', 'SK': '🇸🇰', 'SI': '🇸🇮', 'SB': '🇸🇧', 'SO': '🇸🇴', 'ZA': '🇿🇦',
      'SS': '🇸🇸', 'ES': '🇪🇸', 'LK': '🇱🇰', 'SD': '🇸🇩', 'SR': '🇸🇷', 'SE': '🇸🇪', 'CH': '🇨🇭', 'SY': '🇸🇾', 'TW': '🇹🇼', 'TJ': '🇹🇯',
      'TZ': '🇹🇿', 'TH': '🇹🇭', 'TL': '🇹🇱', 'TG': '🇹🇬', 'TO': '🇹🇴', 'TT': '🇹🇹', 'TN': '🇹🇳', 'TR': '🇹🇷', 'TM': '🇹🇲', 'TV': '🇹🇻',
      'UG': '🇺🇬', 'UA': '🇺🇦', 'AE': '🇦🇪', 'GB': '🇬🇧', 'US': '🇺🇸', 'UY': '🇺🇾', 'UZ': '🇺🇿', 'VU': '🇻🇺', 'VA': '🇻🇦', 'VE': '🇻🇪',
      'VN': '🇻🇳', 'YE': '🇾🇪', 'ZM': '🇿🇲', 'ZW': '🇿🇼'
    };

    return countries
      .filter(country => country.capital && country.capital.length > 0)
      .map((country, index) => {
        const region = country.region || 'Unknown';
        const capital = country.capital[0];
        const flagEmoji = flagEmojis[country.cca2] || '🏳️';
        
        return {
          id: index + 1,
          name: country.name.common,
          capital: capital,
          region: region,
          flag: flagEmoji,
          image: country.flags.png || `https://picsum.photos/seed/${country.name.common}/800/600.jpg`,
          description: regionDescriptions[region] || `Descubre ${country.name.common}, un destino único en ${region}.`,
          rating: Math.round((Math.random() * 1.5 + 3.5) * 10) / 10,
          priceLevel: priceLevels[Math.floor(Math.random() * priceLevels.length)],
          tags: regionTags[region] || ['Viaje', 'Cultura']
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }
}
