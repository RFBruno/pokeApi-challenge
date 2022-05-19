import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  public API_URL: string = environment.API_URL;

  constructor(
    private http: HttpClient
  ) { }
}
