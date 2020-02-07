import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Etapa, DetalheItem } from '../etapa/etapa.model';
import { EtapaService } from '../etapa/etapa.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { OverlayService } from '../utils/overlay.service';

@Component({
  selector: 'app-etapa-edit',
  templateUrl: './etapa-edit.page.html',
  styleUrls: ['./etapa-edit.page.scss'],
})
export class EtapaEditPage implements OnInit {

  @ViewChild('edtDetalhe', { static: false }) edtDetalhe: ElementRef;
  etapa: Etapa;
  etapaForm: FormGroup;
  titulo: FormControl;
  descricao: FormControl;

  constructor(private etapaService: EtapaService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private fb: FormBuilder,
    private overlayService: OverlayService) {



  }

  ngOnInit() {
    // this.titulo = new FormControl('', Validators.required);
    this.titulo = new FormControl('', Validators.required);
    this.descricao = this.fb.control('', Validators.required);
    this.etapaForm = this.fb.group({
      titulo: this.titulo,
      descricao: this.descricao
    });


    this.route.paramMap.subscribe(params => {
      let vaId = params.get('id');
      if (vaId) {
        this.etapaService.buscarEtapa(vaId).subscribe(e => {
          this.etapa = e;
          this.titulo.setValue(e.titulo);
          this.descricao.setValue(e.descricao);
        });
      } else {
        this.etapa = {} as any;
      }
    });
  }

  marcarConcluido(event, detalhe:DetalheItem){
    let vaDetalhe = this.etapa.detalhes.find(
      d => (d._id === detalhe._id) || 
           ((!d._id) && (d.item === detalhe.item)));
    if (vaDetalhe) {
      vaDetalhe.checked = event.detail.checked;
    }
  }

  async salvar() {    
    const loading = await this.overlayService.showModalMsg('Salvando...');
    try {
      //o ideal aqui é o que o etapaForm já contivesse todo o objeto
      let vaEtapa = this.etapaForm.value;
      this.etapa.titulo = vaEtapa.titulo;
      this.etapa.descricao = vaEtapa.descricao;

      let etapaSalva = await this.etapaService.salvarEtapa(this.etapa).toPromise();
      if (etapaSalva) {
        this.navCtrl.navigateBack('/main/etapas');
      } else {
        this.overlayService.toast({ message: "Etapa não foi salva" });
      }
    } catch (e) {
      this.overlayService.toast({ message: "Erro ao salvar. Detalhes: " + e.message });
    } finally {
      loading.dismiss();
    }


  }

  adicionarDetalhe() {
    let descricao = this.edtDetalhe.nativeElement.value;
    if (!this.etapa.detalhes) {
      this.etapa.detalhes = [];
    }

    let vaDetalhe:DetalheItem = {
      _id:undefined,
      item:descricao,
      checked:false
    }
    this.etapa.detalhes.push(vaDetalhe);
  }

  removerDetalhe(ipDetalhe: DetalheItem) {
    let vaIndex = this.etapa.detalhes.findIndex(
      d => (d._id === ipDetalhe._id) || 
           ((!d._id) && (d.item === ipDetalhe.item)));
    if (vaIndex >= 0) {
      this.etapa.detalhes.splice(vaIndex, 1);
    }

  }

}
