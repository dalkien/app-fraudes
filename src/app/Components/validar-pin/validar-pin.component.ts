import { Component, OnInit, Input, Output } from '@angular/core';
import { PinGenerar, PinValidar, Propiedad, Pin, datosValida } from 'src/app/Models/pin';
import { ServicePinService } from '../../services/service-pin.service';

@Component({
  selector: 'app-validar-pin',
  templateUrl: './validar-pin.component.html',
  styleUrls: ['./validar-pin.component.css']
})
export class ValidarPinComponent implements OnInit {

  @Input() generar: PinGenerar;

  @Input() valDatos: datosValida;

  titulo = 'Hemos enviado a tu correo electrónico un PIN de validación, confirma tu documento de identidad y luego el PIN:';
  @Output() respuesta: string;

  validaFlux: boolean = false;

  verificarCampos = { documento: '', pin: '', boton: false };

  verDatos = { documento: '', mensaje: '', error: false };

  tipoDoc = { select: '1', type: 'number' };

  tiposDocumento = [

    { nombre: 'C.C.', valor: '0' },
    { nombre: 'C.E.', valor: '1' },
    { nombre: 'Carnet diplomatico', valor: '2' },
    { nombre: 'Pasaporte', valor: '3' },
    { nombre: 'NIT', valor: '4' },

  ];

  constructor(private servicePin: ServicePinService) { }

  ngOnInit() {
  }

  validarVacios(event) {

    if (this.verificarCampos.documento === '' || this.verificarCampos.pin === '') {

      this.verificarCampos.boton = false;

    } else {
      if (!this.validaFlux) {
        this.verificarCampos.boton = this.generar.clienteId === this.valDatos.tipId;
      } else {
        this.verificarCampos.boton = true;
      }

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

  close(idModal: string) {
    var modal = document.getElementById(idModal);
    modal.style.display = "none";
    modal.classList.add("fade");
    document.body.style.overflow = "auto";
    modal.classList.remove("modal-open");
  }

  valAcceso() {

    if (this.generar != undefined) {
      this.validaFlux = false;
      if (this.generar.medioEnvioId === "1") {
        this.titulo = 'Hemos enviado a tu teléfono un PIN de validación, confirma tu documento de identidad y luego el PIN:';
      }
      else if (this.generar.medioEnvioId == undefined) {
        this.titulo = "Ingrese el PIN que le ha sido enviado previamente.";
        this.validaFlux = true;
      }
    }
    return true;
  }

  validatePin(modal1: string, modal2: string) {
    let validar = {} as PinValidar;
    if (this.validaFlux) {
      validar.clienteId = this.tiposDocumento[parseInt(this.tipoDoc.select)].nombre +
        this.verificarCampos.documento;
    } else {
      validar.clienteId = this.generar.clienteId;
    }
    validar.operacionId = this.generar.operacionId;
    validar.pin = this.verificarCampos.pin;
    validar.propiedes = this.generar.propiedad;
    validar.sistemaId = this.generar.sistemaId;
    validar.vchUsuario = this.generar.vchUsuario;
    this.servicePin.valPin(validar);
    this.close(modal1);
    this.openModal(modal2);

    this.getRespuesta();
  }

  openModal(idModal: string) {
    var modal = document.getElementById(idModal);
    modal.style.display = "block";
    modal.classList.remove("fade");
    document.body.style.overflow = "hidden";
    modal.classList.add("modal-open");
  }

  getRespuesta() {
    let respt = {} as Pin;
    respt = this.servicePin.getRta();
    if (respt != undefined) {
      this.respuesta = respt.menssageCode;
      return true;
    } {
      return false;
    }
  }

}
