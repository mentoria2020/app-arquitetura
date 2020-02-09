import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, from, of } from 'rxjs';
import { take, tap, map } from 'rxjs/operators';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Token } from '../utils/token.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private navCtrl: NavController, private storage:Storage) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkAuthState();
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(route, state);
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {    
    return this.checkAuthState();
  }

  private checkAuthState(): Observable<boolean> {
    
    return from(this.storage.get('token')).pipe(
      map(t =>{
        if ((!t) || (t.expireOn < new Date())){
          this.navCtrl.navigateRoot('/login');
          return false;
        }else{
          return true;
        }
      })
    );   
  }
}
