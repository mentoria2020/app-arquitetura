
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage'
import { NavController } from '@ionic/angular';

@Component({
  selector: 'track-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage {

  public appPages = [
    {
      title: 'Etapas',
      url: '/main/etapas',
      icon: 'home'
    },
    {
      title: 'Logoff',
      url: '',
      icon: 'log-out'
    },
  ];

  constructor(private storage: Storage,
    private navCtrl: NavController) {

  }

  pageClick(p) {
    if (p.title == 'Logoff') {
      this.storage.remove('token');
      this.navCtrl.navigateRoot('/login');
    }
  }


}

