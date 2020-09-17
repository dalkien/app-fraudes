import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ServicePinService } from '../../services/service-pin.service';
import { Pin, PinGenerar, PinValidar, Propiedad, datosValida } from '../../Models/pin';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  generar: PinGenerar;
  valDatos : datosValida;
  titulo = 'Selecciona la opción de validación y completa tus datos';

  tipoEnvio = '1';

  tipoDoc = { select: '1', type: 'number' };

  habilitarEnvio = { tipoEnvio: false, documentoId: false, politicas: false, datos: false, boton: false };

  veriCorreo = { correo: '', correoConfimar: '', color: '', mensaje: '' };

  veriNumDoc = { numero: '', color: '', mensaje: '' };

  veriSms = { sms: null, smsConfirmar: null, color: '', mensaje: '' };

  opcionesTipoEnvio = [

    { nombre: 'SMS', valor: '1' },
    { nombre: 'Correo electrónico', valor: '2' }

  ];

  tiposDocumento = [

    { nombre: 'C.C.', valor: '1' },
    { nombre: 'C.E.', valor: '2' },
    { nombre: 'Carnet diplomatico', valor: '3' },
    { nombre: 'Pasaporte', valor: '4' },
    { nombre: 'NIT', valor: '5' },

  ];
  constructor(private servicePin: ServicePinService) {
  }

  ngOnInit() { }

  changePoliticas(event) {

    if (event.target.checked) {

      this.habilitarEnvio.politicas = true;

    } else {

      this.habilitarEnvio.politicas = false;

    }

    this.validarEnvio();

  }

  changeDatos(event) {

    if (event.target.checked) {

      this.habilitarEnvio.datos = true;

    } else {

      this.habilitarEnvio.datos = false;

    }

    this.validarEnvio();

  }

  async sendPin(event) {
    var genera = {} as PinGenerar;
    var prop1 = {} as Propiedad;
    var prop2 = {} as Propiedad;
    var propL = [] as Array<Propiedad>;

    prop1.nombre = "profileId";
    prop1.valor = "FRAUDECGW";
    prop2.nombre = "communicationOrigin";
    prop2.valor = "TCRM";

    this.valDatos.numId = this.veriNumDoc.numero;
    this.valDatos.tipId = this.tiposDocumento[parseInt(this.tipoDoc.select) - 1].nombre; 
    genera.clienteId = this.tiposDocumento[parseInt(this.tipoDoc.select) - 1].nombre + this.veriNumDoc.numero;
    genera.medioEnvioId = this.tipoEnvio;
    genera.operacionId = "341";

    propL.push(prop1, prop2);
    genera.propiedad = propL;
    genera.sistemaId = "525";
    genera.vchDatoMedioEnvio = this.tipoEnvio == "1" ? this.veriSms.sms : this.veriCorreo.correo;
    genera.vchUsuario = "userTest";

    this.generar = genera;

    this.servicePin.genPin(genera);
  }

  openModal(idModal: string) {

    var modal = document.getElementById(idModal);
    modal.style.display = "block";
    modal.classList.remove("fade");
    document.body.style.overflow = "hidden";
    modal.classList.add("modal-open");
  }
  
  valPin(event){
    var genera = {} as PinGenerar;
    var prop1 = {} as Propiedad;
    var prop2 = {} as Propiedad;
    var propL = [] as Array<Propiedad>;

    prop1.nombre = "profileId";
    prop1.valor = "FRAUDECGW";
    prop2.nombre = "communicationOrigin";
    prop2.valor = "TCRM";

    //genera.clienteId = this.tiposDocumento[parseInt(this.tipoDoc.select) - 1].nombre + this.veriNumDoc.numero;
    //genera.medioEnvioId = this.tipoEnvio;
    genera.operacionId = "341";

    propL.push(prop1, prop2);
    genera.propiedad = propL;
    genera.sistemaId = "525";
    //genera.vchDatoMedioEnvio = this.tipoEnvio == "1" ? this.veriSms.sms : this.veriCorreo.correo;
    genera.vchUsuario = "userTest";

    this.generar = genera;
  }

  valiCorreo(event) {

    if (this.veriCorreo.correo === this.veriCorreo.correoConfimar) {

      this.veriCorreo.mensaje = 'Los campos son idénticos';
      this.veriCorreo.color = 'success';
      this.habilitarEnvio.tipoEnvio = true;

    } else {

      this.veriCorreo.mensaje = 'Los campos no son idénticos';
      this.veriCorreo.color = 'danger';
      this.habilitarEnvio.tipoEnvio = false;

    }

    if (this.veriCorreo.correo === '' || this.veriCorreo.correoConfimar === '') {

      this.veriCorreo.mensaje = 'Nigún campo debe estar vacío';
      this.veriCorreo.color = 'danger';
      this.habilitarEnvio.tipoEnvio = false;

    }

    this.validarCorreoCorrecto(event);

    this.validarEnvio();

  }

  valSms(event) {

    if (this.veriSms.sms === null || this.veriSms.smsConfirmar === null) {

      this.veriSms.mensaje = 'Nigún campo debe estar vacío';
      this.veriSms.color = 'danger';
      this.habilitarEnvio.tipoEnvio = false;

    } else if (this.veriSms.sms === this.veriSms.smsConfirmar) {


      if (String(this.veriSms.sms).length === 10 && String(this.veriSms.smsConfirmar).length === 10) {

        this.veriSms.mensaje = 'Los campos son idénticos';
        this.veriSms.color = 'success';
        this.habilitarEnvio.tipoEnvio = true;

      } else {

        this.veriSms.mensaje = 'El número de teléfono debe ser de diez dígitos';
        this.veriSms.color = 'danger';
        this.habilitarEnvio.tipoEnvio = false;

      }

    } else {

      this.veriSms.mensaje = 'Los campos no son idénticos';
      this.veriSms.color = 'danger';
      this.habilitarEnvio.tipoEnvio = false;

    }

    this.validarEnvio();

  }

  valNumDocumento(event) {

    if (this.tipoDoc.select === '1' || this.tipoDoc.select === '2' || this.tipoDoc.select === '3') {

      if (String(this.veriNumDoc.numero).length > 10) {

        this.veriNumDoc.color = 'danger';
        this.veriNumDoc.mensaje = 'Solo deben ser diez dígitos';
        this.habilitarEnvio.documentoId = false;

      } else if (String(this.veriNumDoc.numero).length <= 10
        && String(this.veriNumDoc.numero).length > 0) {

        this.veriNumDoc.color = 'success';
        this.veriNumDoc.mensaje = 'Número de documento adecuado';
        this.habilitarEnvio.documentoId = true;

      } else {

        this.veriNumDoc.color = 'danger';
        this.veriNumDoc.mensaje = 'Documento no válido';
        this.habilitarEnvio.documentoId = false;

      }

    } else if (this.tipoDoc.select === '4') {

      if (String(this.veriNumDoc.numero).length <= 20
        && String(this.veriNumDoc.numero).length > 0) {
        if (String(this.veriNumDoc.numero).length >= 8) {
          this.veriNumDoc.color = 'success';
          this.veriNumDoc.mensaje = 'Número de documento adecuado';
          this.habilitarEnvio.documentoId = true;
        } else {
          this.veriNumDoc.color = 'danger';
          this.veriNumDoc.mensaje = 'La longitud debe ser de ocho a veinte dígitos';
          this.habilitarEnvio.documentoId = false;
        }
      } else {
        this.veriNumDoc.color = '';
        this.veriNumDoc.mensaje = '';
        this.habilitarEnvio.documentoId = false;

      }

    } else if (this.tipoDoc.select === '5') {

      if (String(this.veriNumDoc.numero).length > 0) {
        this.veriNumDoc.color = 'success';
        this.veriNumDoc.mensaje = 'Número de documento adecuado';
        this.habilitarEnvio.documentoId = true;

      } else {

        this.veriNumDoc.color = '';
        this.veriNumDoc.mensaje = '';
        this.habilitarEnvio.documentoId = false;

      }

    }

    if (this.tipoDoc.select === '1' || this.tipoDoc.select === '5') {
      if (String(this.veriNumDoc.numero).match('[a-zA-Z]')) {
        this.veriNumDoc.color = 'danger';
        this.veriNumDoc.mensaje = 'La longitud debe ser de ocho a veinte dígitos';
        this.habilitarEnvio.documentoId = false;
      }
    }

    if (this.veriNumDoc.numero === '') {

      this.veriNumDoc.color = 'danger';
      this.veriNumDoc.mensaje = 'No debe estar vacío.';
      this.habilitarEnvio.documentoId = false;

    }

    this.validarEnvio();

  }

  // VALIDAR EL BOTÓN DE ENVÍO SIEMPRE QUE TODO ESTÉ VALIDADO -----------------------------------------------
  validarEnvio() {

    if (this.habilitarEnvio.tipoEnvio && this.habilitarEnvio.datos && this.habilitarEnvio.documentoId && this.habilitarEnvio.politicas) {

      this.habilitarEnvio.boton = true;

    } else {

      this.habilitarEnvio.boton = false;

    }

  }

  validarSoloNumSms(event) {

    if (event.charCode >= 48 && event.charCode <= 57) {

      return true;

    } else {

      this.habilitarEnvio.documentoId = false;

      return false;

    }

    this.validarEnvio();

  }

  valNumerico(event) {

    if (this.tipoDoc.select === '1' || this.tipoDoc.select === '2' || this.tipoDoc.select === '3' || this.tipoDoc.select === '5') {

      if (event.charCode >= 48 && event.charCode <= 57) {

        return true;

      } else {

        this.habilitarEnvio.documentoId = false;

        return false;

      }

    } else if (this.tipoDoc.select === '4') {


      if (
        (event.charCode >= 48 && event.charCode <= 57) ||
        (event.charCode > 64 && event.charCode < 91) ||
        (event.charCode > 96 && event.charCode < 123)
      ) {

        return true;

      } else {

        this.habilitarEnvio.documentoId = false;

        return false;

      }

    }

  }

  cambioSelectTipoEnvio(event) {

    this.veriCorreo.correo = '';
    this.veriCorreo.correoConfimar = '';
    this.veriSms.sms = '';
    this.veriSms.smsConfirmar = '';

    this.habilitarEnvio.tipoEnvio = false;

    this.validarEnvio();

  }

  cambioSelectTipoDoc(event) {

    this.veriNumDoc.numero = null;

    this.habilitarEnvio.documentoId = false;

    this.validarEnvio();
    this.tipoDoc.type = this.tipoDoc.select == '2' ||
      this.tipoDoc.select == '3' ||
      this.tipoDoc.select == '4' ? "text" : "number";
    this.veriNumDoc.color = "";
    this.veriNumDoc.mensaje = "";
    this.veriNumDoc.numero = "";

  }

  validarEmail(event) {

    if (
      (event.charCode >= 48 && event.charCode <= 57) ||
      (event.charCode >= 64 && event.charCode < 91) ||
      (event.charCode > 96 && event.charCode < 123) ||
      (event.charCode === 95) ||
      (event.charCode === 45) ||
      (event.charCode === 46)
    ) {

      return true;

    } else {

      return false;

    }

  }

  validarCorreoCorrecto(event) {

    const regexpEmail = RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$');

    if (!regexpEmail.test(this.veriCorreo.correo)) {

      this.veriCorreo.mensaje = 'Correo electrónico no válido';
      this.veriCorreo.color = 'danger';
      this.habilitarEnvio.tipoEnvio = false;

    }

    this.validarEnvio();

  }

}
