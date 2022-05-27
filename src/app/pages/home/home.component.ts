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

}
