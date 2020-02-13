import { Component, OnInit, Input, Output } from '@angular/core';
import { PinGenerar, PinValidar, Propiedad, Pin } from 'src/app/Models/pin';
import { ServicePinService } from '../../services/service-pin.service';

@Component({
  selector: 'app-validar-pin',
  templateUrl: './validar-pin.component.html',
  styleUrls: ['./validar-pin.component.css']
})
export class ValidarPinComponent implements OnInit {

  @Input() generar : PinGenerar;

  titulo = 'Hemos enviado a tu correo electrónico un PIN de validación, confirma tu documento de identidad y luego el PIN:';
  @Output() respuesta : string ;

  verificarCampos = { documento: '', pin: '', boton: false };

  constructor(private servicePin: ServicePinService ) { }

  ngOnInit() {
  }


  validarVacios(event) {

    if (this.verificarCampos.documento === '' || this.verificarCampos.pin === '') {

      this.verificarCampos.boton = false;


    } else {

      this.verificarCampos.boton = true;

    }

  }

  valNumerico(event) {
    // (keypress)="valNumerico($event)" Para el input
    if (event.charCode >= 48 && event.charCode <= 57) {

      return true;
    } else {

      this.verificarCampos.boton = false;
      return false;
    }
  }
  
  close(idModal: string){
    var modal = document.getElementById(idModal);
    modal.style.display = "none" ;
    modal.classList.add("fade");
    document.body.style.overflow ="auto";
    modal.classList.remove("modal-open");
  }

  validatePin(modal1: string, modal2: string){
    let validar = {} as PinValidar ;
    validar.clienteId = this.generar.clienteId ; 
    validar.operacionId = this.generar.operacionId ;
    validar.pin = this.verificarCampos.pin ; 
    validar.propiedes = this.generar.propiedad ;  
    validar.sistemaId =  this.generar.sistemaId ; 
    validar.vchUsuario = this.generar.vchUsuario;  
    this.servicePin.valPin(validar);
    this.close(modal1);
    this.openModal(modal2);
  
    this.getRespuesta();
  }

  openModal (idModal: string){

    var modal = document.getElementById(idModal);
    modal.style.display = "block" ;
    modal.classList.remove("fade");
    document.body.style.overflow ="hidden";
    modal.classList.add("modal-open");
  }

  getRespuesta(){
    let respt = {} as Pin ; 
    respt = this.servicePin.getRta();
    if(respt != undefined ){
      this.respuesta = respt.menssageCode; 
      return true;
    }{
      return false;
    }
  }

}
