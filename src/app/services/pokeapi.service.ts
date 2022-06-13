import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  public API_URL: string = environment.API_URL;
  public observavel: Subject<any> = new Subject();

  constructor(
    private http: HttpClient
  ) {
  }

  getPokemons(limit:string = '100', offset: string = '0'){
    let cardList: any[] = [];
    this.http.get(this.API_URL + 'pokemon/' + `?limit=${limit}&offset=${offset}`).subscribe(async (data: any) =>{
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
              favorite : favorites.includes(pokeData.id),
              animate : '',
            }
            cardList.push(pokeInfo);
            cardList.sort((a, b) => a.id - b.id);
            this.setObservavel({cardList, total : data.count});
          });
        
      });
    });
  }

  setObservavel(newValue: any): void{
    this.observavel.next(newValue);
  }

  getObservavel(): Observable<any>{
    return this.observavel.asObservable();
  }
}
