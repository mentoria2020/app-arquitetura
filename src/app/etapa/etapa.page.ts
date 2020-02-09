import { Component, OnInit } from '@angular/core';
import { EtapaService } from './etapa.service';
import { Observable } from 'rxjs';
import { Etapa } from './etapa.model';
import { NavController } from '@ionic/angular';
import { OverlayService } from '../utils/overlay.service';

@Component({
  selector: 'app-etapa',
  templateUrl: './etapa.page.html',
  styleUrls: ['./etapa.page.scss'],
})
export class EtapaPage implements OnInit {

  etapas: Etapa[];
  constructor(private etapaService: EtapaService,
    private navCtrl: NavController,
    private overlayService: OverlayService) {

  }

  ngOnInit() {

  }

  doRefresh(event) {
    this.buscarEtapas(event);
  }

  async ionViewWillEnter() {
    await this.buscarEtapas();
  }

  async buscarEtapas(callback?) {
    //TODO: isso aqui deve estar gerando diversas conexoes, o ideal era cancelar o subscrive anterior antes e fazer um novo
    let ob = await this.etapaService.buscarEtapas();
    let etapas = await ob.toPromise();
    this.etapas = etapas;
    if (callback) {
      callback.target.complete();
    };
  }

  adicionar() {
    this.navCtrl.navigateForward('/main/etapa');
  }

  async excluir(etapa: Etapa) {
    const loading = await this.overlayService.showModalMsg('Excluindo...');
    try {
      let ob = await this.etapaService.excluirEtapa(etapa._id);
      let etapaExcluida = await ob.toPromise();
      if (etapaExcluida) {
        this.buscarEtapas();
      } else {
        this.overlayService.toast({ message: "Etapa não foi excluida" });
      }
    } catch (e) {
      this.overlayService.toast({ message: "Erro ao excluir. Detalhes: " + e.message });
    } finally {
      loading.dismiss();
    }
  }

}
