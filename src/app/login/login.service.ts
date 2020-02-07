import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OverlayService } from '../utils/overlay.service';
import * as api from '../api.json'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public token:string;

  constructor (private http:HttpClient, private overlayService:OverlayService,
    private storage:Storage){

  }

  async logar(email, senha): Promise<boolean> {
    try {
      let result = await this.http.post<any>(api.base_url+'/login', {
        email: email,
        password: senha
      }).toPromise();

      if (result.token) {
        this.token = result.token;
        this.storage.setItem('token',result.token);
        return true
      } else {
        this.overlayService.toast({ message: result.error});
      }
    } catch (error) {
      this.overlayService.toast({ message: error.error.error});
      return false;
    }
  }
}
