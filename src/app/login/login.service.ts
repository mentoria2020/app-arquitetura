import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OverlayService } from '../utils/overlay.service';
import * as api from '../api.json'
import { BaseService } from '../base.service';
import { Token } from '../utils/token.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService {

  async logar(email, senha): Promise<boolean> {
    try {
      let ob = await this.post('/login', {
        email: email,
        password: senha
      });
      
      let result = await ob.toPromise();

      if (result.token) {
        //o token vale por 7 dias
        let expire: Date = new Date(new Date().getTime() + (1000 * 60 * 60 * 24) * 7);
        let vaToken: Token = {
          token: result.token,
          expireOn: expire
        }
        
        this.storage.set('token', vaToken);
        return true
      } else {
        this.overlayService.toast({ message: result.error });
      }
    } catch (error) {
      this.overlayService.toast({ message: error.error.error });
      return false;
    }
  }
}
