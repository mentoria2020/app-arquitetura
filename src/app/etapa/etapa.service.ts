import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Etapa } from './etapa.model';
import {HttpClient} from '@angular/common/http';
import * as api from '../api.json';

@Injectable({
  providedIn: 'root'
})
export class EtapaService {

  constructor(private http:HttpClient) { }

  public buscarEtapas():Observable<Etapa[]>{
    return this.http.get<Etapa[]>(`${api.base_url}/etapas`);
  }

  public buscarEtapa(id:string):Observable<Etapa>{
    return this.http.get<Etapa>(`${api.base_url}/etapas/${id}`);
  }
}
