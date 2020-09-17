export interface Pin {
  descripcionCode: string;
  menssageCode: string;
  returnCode: string;
}

export interface PinGenerar {
  clienteId: string;
  medioEnvioId: string;
  operacionId: string;
  propiedad: Propiedad[];
  sistemaId: string;
  vchDatoMedioEnvio: string;
  vchUsuario: string;
}

export interface PinValidar {
  clienteId: string;
  operacionId: string;
  pin: string;
  propiedes: Propiedad[];
  sistemaId: string;
  vchUsuario: string;
}

export interface Propiedad {
  nombre: string;
  valor: string;
}

export interface datosValida {
  numId: string;
  tipId: string;
}
