import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Etapa } from './etapa.model';
import { HttpClient } from '@angular/common/http';
import * as api from '../api.json';

@Injectable({
  providedIn: 'root'
})
export class EtapaService {

  constructor(private http: HttpClient) { }

  public buscarEtapas(): Observable<Etapa[]> {
    return this.http.get<Etapa[]>(`${api.base_url}/etapas`);
  }

  public buscarEtapa(id: string): Observable<Etapa> {
    return this.http.get<Etapa>(`${api.base_url}/etapas/${id}`);
  }

  public excluirEtapa(id:string):Observable<Etapa>{
    return this.http.delete<Etapa>(`${api.base_url}/etapas/${id}`);
  }

  public salvarEtapa(etapa: Etapa): Observable<Etapa> {
    if (etapa._id) {
      return this.http.put<any>(`${api.base_url}/etapas/${etapa._id}`, etapa).pipe(map(result => {
        let {ok} = result;
        if (ok){
          return etapa;
        }else{
          return null;
        }
      }));
    } else {
      return this.http.post<Etapa>(`${api.base_url}/etapas`, etapa);
    }
  }
}
