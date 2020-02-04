import { Component, OnInit } from '@angular/core';
import { Etapa } from '../etapa/etapa.model';
import { EtapaService } from '../etapa/etapa.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-etapa-edit',
  templateUrl: './etapa-edit.page.html',
  styleUrls: ['./etapa-edit.page.scss'],
})
export class EtapaEditPage implements OnInit {

  etapa: Observable<Etapa>;
  etapaForm: FormGroup;
  titulo: FormControl;

  constructor(private etapaService: EtapaService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.titulo = this.fb.control('', Validators.required);
    this.etapaForm = this.fb.group({
      titulo: this.titulo,
      // password: ['', [Validators.required, Validators.minLength(6)]]
    });


    this.route.paramMap.subscribe(params => {
      let vaId = params.get('id');
      if (vaId) {
        this.etapa = this.etapaService.buscarEtapa(vaId);
      } else {
        this.navCtrl.navigateBack('/etapas');
      }
    });
  }

  salvar() {

  }

}
