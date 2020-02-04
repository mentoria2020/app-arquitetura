import { Component, OnInit } from '@angular/core';
import { EtapaService } from './etapa.service';
import { Observable } from 'rxjs';
import { Etapa } from './etapa.model';

@Component({
  selector: 'app-etapa',
  templateUrl: './etapa.page.html',
  styleUrls: ['./etapa.page.scss'],
})
export class EtapaPage implements OnInit {

  etapas: Observable<Etapa[]>;
  constructor(private etapaService: EtapaService) {

  }

  ngOnInit() {
    this.etapas = this.etapaService.buscarEtapas();
  }

}
