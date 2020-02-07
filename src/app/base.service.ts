import { HttpClient } from '@angular/common/http';
import * as api from './api.json';
import { Observable } from 'rxjs';
import { OverlayService } from './utils/overlay.service.js';
import { LoginService } from './login/login.service.js';

export class BaseService {
   serverUrl: string;
   constructor(public http: HttpClient,
      private overlayService: OverlayService,
      private storage:Storage) {

      this.serverUrl = api.base_url;
   }

   post(recurso: string, ipData: any, options?): Observable<any> {
      options = this.getOptions(options);
      return this.http.post(this.serverUrl + recurso, ipData, options);
   }

   private getOptions(options) {
      let token = this.storage.getItem('token');
      if (!options) {
         return {
            headers: {
               Authorization: 'Bearer ' + token
            }
         }
      } else {
         return options;
      }
   }

   get(recurso: string, options?): Observable<any> {
      options = this.getOptions(options);
      return this.http.get(this.serverUrl + recurso, options);
   }
}