import { Component, OnInit } from '@angular/core';
import { ServicePinService } from '../../services/service-pin.service'
import { Pin } from 'src/app/Models/pin';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-mensaje-ws',
  templateUrl: './mensaje-ws.component.html',
  styleUrls: ['./mensaje-ws.component.css']
})
export class MensajeWsComponent implements OnInit {

  mensajeServidor = 'Tu PIN se ha validado exitosamente';

  constructor(private servicePin: ServicePinService) { }

  ngOnInit() {
  }

  close(idModal: string) {
    var modal = document.getElementById(idModal);
    modal.style.display = "none";
    modal.classList.add("fade");
    document.body.style.overflow = "auto";
    modal.classList.remove("modal-open");
    location.reload();
  }

  async mensajeGet() {
    let pin = {} as Pin;

    pin = this.servicePin.getRta();

    if (pin != undefined) {
      this.mensajeServidor = pin.descripcionCode;
      return true;
    } else {
      return false;
    }

  }

}
