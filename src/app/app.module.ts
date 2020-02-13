import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalPoliticasComponent } from './Components/modal-politicas/modal-politicas.component';
import { FormComponent } from './Components/form/form.component';
import { FooterComponent } from './Components/footer/footer.component';
import { ValidarPinComponent } from './Components/validar-pin/validar-pin.component';
import { MensajeWsComponent } from './Components/mensaje-ws/mensaje-ws.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ModalPoliticasComponent,
    FormComponent,
    FooterComponent,
    ValidarPinComponent,
    MensajeWsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule, 
    HttpClientModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
