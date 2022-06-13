import { Component, OnInit } from '@angular/core';
import { PokeapiService } from 'src/app/services/pokeapi.service';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeIn, flip } from 'ng-animate';
import { PageEvent } from '@angular/material/paginator';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fadeIn', [transition('* => *', useAnimation(fadeIn))]),
    trigger('flip', [transition('* => clicked', useAnimation(flip))])

  ],
})
export class HomeComponent implements OnInit {
  
  public list: any[] = [];

  // MatPaginator Inputs
  length = 0;
  pageSize = 100;
  pageSizeOptions: number[] = [10, 25, 100, 500];
  
  constructor(
    public api: PokeapiService
  ) {
    this.api.getPokemons();
   }
    
  async ngOnInit() {
    this.api.getObservavel().subscribe( data =>{
      this.list = data.cardList;
      this.length = data.total;
      console.log(this.list);
    });
  }
  setFavorite(item: any){
    let favorites = JSON.parse(localStorage.getItem('favorites')!) || [];
    
    item.animate = 'clicked';

    if(favorites.length > 0){
      let index = favorites.indexOf(item.id);
      if(index > -1){
        favorites.splice(index, 1);
        item.favorite = false;
      }else{
        favorites.push(item.id);
        item.favorite = true;
      }
    }else{
      favorites.push(item.id);
        item.favorite = true;
    }

    setTimeout(() => {
      item.animate = '';
    }, 1000);

    localStorage.setItem('favorites', `${JSON.stringify(favorites)}`)
  }

  paginator(event: PageEvent){
    this.list = [];
    this.pageSize = event.pageSize;
    let limit = event.pageSize.toString();
    let offset = (event.pageIndex * event.pageSize).toString();
    this.api.getPokemons(limit, offset);
  }

  

}
