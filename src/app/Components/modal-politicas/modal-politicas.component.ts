import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-politicas',
  templateUrl: './modal-politicas.component.html',
  styleUrls: ['./modal-politicas.component.css']
})
export class ModalPoliticasComponent implements OnInit {

  titulo = 'FORMATO DE AUTORIZACIÓN TRATAMIENTO DE DATOS Y CONSULTA EN CENTRALES DE RIESGO';

  itemUno = '1. Consulte de cualquier fuente o reporte de información y actualice a cualquier operador de información los datos sobre mi persona, nombre, apellidos y documento de identificación, mi comportamiento y crédito comercial, hábitos de pago, manejo de mi(s) cuenta(s) bancaria(s) y en general el cumplimiento de mis obligaciones comerciales y pecuniarias, con el fin de verificar sus condiciones para acceder y/o modificar productos o servicios en CLARO y para actualización de operadores de información. A estos efectos la autorización otorgada resulta irrevocable mientras subsistan obligaciones legales o contractuales. que me imponga el deber de permanecer en las bases de datos de Comcel S.A.';

  itemDos = '2. Lleve a cabo el tratamiento de mis datos personales para los siguientes propósitos: para consulta y reporte de información ante operadores de bancos de datos de contenido crediticio y financiero, para fines comerciales y publicitarios relacionados con opciones y productos ofrecidos al público llevada a cabo por CLARO, o por terceros. Así mismo autorizo de manera expresa a CLARO para que puedan comunicarse conmigo a través de WhatsApp a la línea móvil suministrada. Esta información será conservada por CLARO con la debida diligencia. En todo caso me reservo ejercer los siguientes derechos previstos en el artículo 8 de la Ley 1581 de 2012 en cualquier momento: a) Conocer, actualizar y rectificar mis datos personales b) Solicitar prueba de la autorización otorgada al Responsable del Tratamiento; c) Ser informado previa solicitud, respecto del uso que le ha dado a mis datos personales; d) Presentar ante la Superintendencia de Industria y Comercio quejas por infracciones a lo dispuesto en la Ley 1581 de 2012 y las demás normas que la modifiquen, adicionen o complementen; e) Revocar la autorización y/o solicitar la supresión del dato cuando en el tratamiento no se respeten los principios, derechos y garantías constitucionales y legales. La revocatoria y/o supresión procederá cuando la Superintendencia de Industria y Comercio haya determinado que en el tratamiento, el Responsable o Encargado han incurrido en conductas contrarias a la Ley y a la Constitución. Sin perjuicio del derecho que asiste a los titulares de la información de solicitar revocatoria o supresión de la información, con los siguientes datos: nombre y apellidos, domicilio a efectos de notificaciones, petición en que se concreta la solicitud, fecha, firma de la persona interesada, éstas medidas no procederán cuando exista una obligación legal o contractual que imponga el deber de permanecer en las bases de datos de CLARO f) Acceder en forma gratuita a mis datos personales que hayan sido objeto de tratamiento. Con la suscripción del presente documento como titular de la información manifiesto que los datos suministrados en la solicitud son ciertos y que no ha sido omitida o alterada ninguna información, quedando informado que la falsedad u omisión de algún dato supondrá la imposibilidad de prestar correctamente el servicio.';

  itemTres = 'Los responsables del tratamiento de la información son Comcel S.A. con NIT 800153993-7, dirección principal Carrera 68 A No. 24 B - 10 y teléfono 7429797 en Bogotá Le invitamos a consultar las Políticas de Tratamiento de la Información de CLARO que se encuentran publicadas en la página web ';

  urlClaro = 'www.claro.com.co';

  constructor() { }

  ngOnInit() {
  }

  close(idModal: string){
    var modal = document.getElementById(idModal);
    modal.style.display = "none" ;
    modal.classList.add("fade");
    document.body.style.overflow ="auto";
    modal.classList.remove("modal-open");
  }

}
