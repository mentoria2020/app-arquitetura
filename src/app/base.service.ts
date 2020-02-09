import { HttpClient } from '@angular/common/http';
import * as api from './api.json';
import { Observable } from 'rxjs';
import { OverlayService } from './utils/overlay.service.js';
import { Storage } from '@ionic/storage';
import { Token } from './utils/token.model.js';

export class BaseService {
   serverUrl: string;
   constructor(private http: HttpClient,
      public overlayService: OverlayService,
      public storage:Storage) {

      this.serverUrl = api.base_url;
   }

   private async getOptions(options) {
      let token:Token = await this.storage.get('token');
      if ((token) && (!options)) {
         return {
            headers: {
               Authorization: 'Bearer ' + token.token
            }
         }
      } else {
         return options;
      }
   }

   async post(recurso: string, ipData: any, options?): Promise<Observable<any>> {
      options = await this.getOptions(options);
      return this.http.post(this.serverUrl + recurso, ipData, options);
   }

   async put(recurso: string, ipData: any, options?): Promise<Observable<any>> {
      options = await this.getOptions(options);
      return this.http.put(this.serverUrl + recurso, ipData, options);
   }

   async delete(recurso: string, options?): Promise<Observable<any>> {
      options = await this.getOptions(options);
      return this.http.delete(this.serverUrl + recurso, options);
   }

   async get(recurso: string, options?): Promise<Observable<any>> {
      options = await this.getOptions(options);
      return this.http.get(this.serverUrl + recurso, options);
   }
}