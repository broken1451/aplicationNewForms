import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private httpClient: HttpClient) { }


  getCountries() {
    return this.httpClient.get(`${environment.baseUrl}`).pipe(
      map((res: any) => {
        return res.map((country: any) => {
          return { name: country.name, capital: country.capital, population: country.population, flag: country.flag, code: country.cca3 };
        });
      })
    );
  }
}
