import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Etapa } from './etapa.model';
import { HttpClient } from '@angular/common/http';
import * as api from '../api.json';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class EtapaService extends BaseService {

  public async buscarEtapas(): Promise<Observable<Etapa[]>> {
    return await this.get('/etapas');    
  }

  public async buscarEtapa(id: string): Promise<Observable<Etapa>> {
    return await this.get(`/etapas/${id}`);
    // return this.http.get<Etapa>(`${api.base_url}/etapas/${id}`);
  }

  public async excluirEtapa(id:string):Promise<Observable<Etapa>>{
    return await this.delete(`/etapas/${id}`);
  }

  public async salvarEtapa(etapa: Etapa): Promise<Observable<Etapa>> {    
    if (etapa._id) {
      // let json = JSON.stringify(etapa);
      return await this.put(`/etapas/${etapa._id}`, etapa)
    } else {
      return await this.post('/etapas', etapa);
    }    
  }
}
