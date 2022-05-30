import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  public API_URL: string = environment.API_URL;
  public cardList: any[] = [];

  constructor(
    private http: HttpClient
  ) {
    this.http.get(this.API_URL + 'pokemon').subscribe((data: any) =>{
      
      let favorites: number[] = JSON.parse(localStorage.getItem('favorites')!) || [];

      data.results.forEach((el: any) => {
        this.http.get(el.url).subscribe((pokeData: any) => {

          let pokeInfo = {
            id: pokeData.id,
            name : pokeData.name,
            imgUrl : {
              main : pokeData.sprites.other['official-artwork'].front_default,
              profile : pokeData.sprites.other['dream_world'].front_default,
            },
            favorite : favorites.includes(pokeData.id)

          }
          
          this.cardList.push(pokeInfo);
        });
      });

    })
  }
}
