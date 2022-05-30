import { Component, OnInit } from '@angular/core';
import { PokeapiService } from 'src/app/services/pokeapi.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public list: any[] = [];
  
  constructor(
    public api: PokeapiService
  ) { }
    
  ngOnInit(): void {

    console.log(this.api.cardList);
    this.list = this.api.cardList;
  }

  setFavorite(item: any){
    let favorites = JSON.parse(localStorage.getItem('favorites')!) || [];
    
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
    localStorage.setItem('favorites', `${JSON.stringify(favorites)}`)
  }

}
