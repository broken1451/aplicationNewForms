import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CountryService } from '../services/country.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrl: './template.component.scss'
})
export class TemplateComponent implements OnInit {

  // pristine - es la data original que no ha sido modificada
  public usuario = {
    nombre: 'Adrian',
    apellido: 'Bravo',
    correo: 'adrianbravo145@mail.com'.toLowerCase(),
    pais: '',
    genero: 'M'
  }

  public paises: any[] = [];
  public paisSeleccionado: string = '';
  public genero: string = '';
  public generos: any[] = [
    { id: 'M', descripcion: 'Masculino', selected: true },
    { id: 'F', descripcion: 'Femenino', selected: false },
    { id: 'O', descripcion: 'Otro', selected: false },
  ];


  constructor(private countryService: CountryService) { }
  ngOnInit(): void {
    this.obtenerPaises();
  }

  /**
   * Guarda los datos del formulario.
   * El código utiliza el método Object.values() para obtener un array de los valores de las propiedades de un objeto form.controls. Luego, 
   * se itera sobre cada elemento del array utilizando el método forEach(). Dentro de la función de iteración, se muestra en la consola el valor de cada elemento utilizando console.log(control). 
   * Además, se llama al método markAsTouched() en cada elemento del array.
   * @param form El formulario a guardar.
   */
  guardar(form: NgForm) {
    if (form.invalid) {
      // todos los campos fueron tocados
      Object.keys(form.controls).forEach((key) => {
        // console.log(key);
        form.controls[key].markAsTouched();
      });
      Object.values(form.controls).forEach(control => {
        // console.log(control);
        control.markAsTouched();
      });
      return;
    }
    console.log(form.value);
  }

  /**
   * Obtiene la lista de países.
   */
  obtenerPaises() {
    this.countryService.getCountries().subscribe({
      next: (resp) => {
        // console.log(resp);
        this.paises = resp;
        // Agrega un país al inicio de la lista de países.
        // this.paises.unshift({
        //   code: "",
        //   name: {
        //     common: "Seleccione un país."
        //   }
        // });
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  change($event: any) {
    this.paisSeleccionado = $event.target.value;
  }

}
