import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { PinGenerar, Pin, PinValidar } from '../Models/pin';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class ServicePinService {

  private respuesta: Pin;

  private error: any;
  constructor(private clientePin: HttpClient) {
  }

  genPin(cuerpo: PinGenerar) {
    this.clientePin.post("http://100.126.19.74:7001/WsVoiceTraffic-web/webresources/VoiceTraffic/generaPin"
      , cuerpo, httpOptions).subscribe();
  }

  valPin(cuerpo: PinValidar) {
    this.clientePin.post("http://100.126.19.74:7001/WsVoiceTraffic-web/webresources/VoiceTraffic/validaPin"
      , cuerpo, httpOptions).subscribe(data => {
        this.respuesta = data as Pin;
      }, error => { ; { console.log(error) }; });
  }

  getRta() {
    return this.respuesta;
  }

}
