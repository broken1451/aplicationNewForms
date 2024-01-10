import { Injectable } from '@angular/core';
import { AbstractControlOptions, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ErrorValidate } from '../interfaces/error.validate.interface';

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }
  
  /**
   * Valida si el valor de un control no es igual a 'herrera'.
   * @param control El control a validar.
   * @returns Un objeto con la propiedad 'noHerrera' establecida en true si el valor es igual a 'herrera', de lo contrario retorna null.
   */
  noHerrera(control: FormControl): ErrorValidate | null {
    const valor = control.value?.trim().toLowerCase();
    if (valor === 'herrera') {
      return {
        noHerrera: true
      };
    }
    return null;
  }


  /**
   * Comprueba si dos campos de contraseña son iguales y establece errores en el segundo campo si no lo son.
   * @param pass1Name - Nombre del primer campo de contraseña.
   * @param pass2Name - Nombre del segundo campo de contraseña.
   * @returns Una función que puede ser utilizada como validador en un FormGroup.
   */
  passIguaes(pass1Name: string, pass2Name: string): any{
    // retorna una funcion, que es la que se va a ejecutar cuando se llame a este validador y recibe como parametro el formulario de tipo FormGroup en el que se esta ejecutando o corriendo esta validacion
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.controls[pass1Name];
      const pass2Control = formGroup.controls[pass2Name];
      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noEsIgual: true });
      }
    };
  }


  /**
   * Comprueba si el usuario existe.
   * @param control El control del formulario que contiene el valor del usuario.
   * @returns Una promesa que se resuelve con un objeto ErrorValidate si el usuario existe, o se resuelve con null si no existe.
   */
  existeUsuario(control: FormControl): Promise<ErrorValidate> | Observable<ErrorValidate> | Promise<any>  {

    if (!control.value) {
      return Promise.resolve(null);
    }

    return new Promise((resolve, reject) => { 
      setTimeout(() => {
          const usuario = control.value?.trim().toLowerCase();
          if (usuario === 'strider') {
            resolve({ existe: true });
          }
          resolve(null);
      }, 3500);
    });

  }
}
