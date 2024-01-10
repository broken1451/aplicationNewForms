import { Component, OnInit } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadoresService } from '../services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrl: './reactive.component.scss'
})
export class ReactiveComponent implements OnInit {

  public form!: FormGroup;
  public formOptions: AbstractControlOptions = {
     validators: [this.validadoresService.passIguaes('pass1', 'pass2')],
    asyncValidators: []
  }


  constructor(private fb: FormBuilder, private validadoresService: ValidadoresService) {
    this.createForm();
    this.cargarData();
    this.crearlisteners();
  }

  ngOnInit(): void {
  }

  get nombreNoValido() {
    return this.form.get('nombre')?.invalid && this.form.get('nombre')?.touched;
  }

  get apellidoNoValido() {
    return this.form.get('apellido')?.invalid && this.form.get('apellido')?.touched;
  }

  get correoNoValido() {
    return this.form.get('correo')?.invalid && this.form.get('correo')?.touched;
  }

  get distritoNoValido() {
    return this.form.get('direccion.distrito')?.invalid && this.form.get('direccion.distrito')?.touched;
  }

  get ciudadNoValido() {
    return this.form.get('direccion.ciudad')?.invalid && this.form.get('direccion.ciudad')?.touched;
  }

  get pass1NoValido() {
    return this.form.get('pass1')?.invalid && this.form.get('pass1')?.touched;
  }

  get usuarioNoValido() {
    return this.form.get('usuario')?.invalid && this.form.get('usuario')?.touched;
  }

  get pass2NoValido() { 
    const pass1 = this.form.get('pass1')?.value;
    const pass2 = this.form.get('pass2')?.value;
    return (pass1 === pass2) ? false : true;
  }
  
  public get pasatiempos(): any{
    return this.form.get('pasatiempos') as FormArray;
  }
  

  /**
   * Crea el formulario reactivo.
   *  apellido: ['', [Validators.required, Validators.minLength(5), this.validadoresService.noHerrera]], 
   *  aca como parametro a esta funcion se le pasa el apellido y se valida si es herrera, funcion que se va a ejecutar para validar el campo
   */
  createForm() {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['', [Validators.required, Validators.minLength(5), this.validadoresService.noHerrera]], // aca como parametro a esta funcion se le pasa el apellido y se valida si es herrera, funcion que se va a ejecutar para validar el campo
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      usuario: ['', [], [this.validadoresService.existeUsuario]], // validacion asincrona, y el parametro que se le pasa a la funcion es el control de usuario el valor que se esta escribiendo en el input y se valida si existe o no
      pass1: ['', [Validators.required]],
      pass2: ['', [Validators.required]],
      direccion: this.fb.group({
        distrito: ['', [Validators.required]],
        ciudad: ['', [Validators.required]],
      }),
      pasatiempos: this.fb.array([])
    },
      this.formOptions // una manera de pasar validadores a un formGroup
    // {
    //   validators: [this.validadoresService.passIguaes('pass1', 'pass2')] // se le pasa los campos que se quieren validar
    //   } as AbstractControlOptions // otra manera de pasar validadores a un formGroup, validacion a nivel de formulario
    );
  }

  crearlisteners() {
    // captura de cambios en el formulario
    this.form.valueChanges.subscribe(valor => {
      // console.log(valor);
    });

    // captura el estado del formulario
    this.form.statusChanges.subscribe(status => {
      // console.log(status);
    });

    // captura de cambios en un campo especifico del formulario
    this.form.get('nombre')?.valueChanges.subscribe((valor: string) => {
      if (valor.length == 0) {
        return;
      }
      console.log(valor);
    });
  }

  cargarData() {
    // this.form.setValue({ // debe ir siempre con las propiedades del objeto
    // this.form.patchValue({
    // this.form.reset({
    //   nombre: 'Adrian',
    //   apellido: 'Bravo',
    //   correo: 'adrianbravo145@gmail.com',
      // direccion: {
      //   distrito: 'Nunoa',
      //   ciudad: 'Santiago'
      // }
    // })
    this.form.reset({
      nombre: 'Adrian',
      apellido: 'Bravo',
      correo: 'adrianbravo145@gmail.com',
      pass1: '123',
      pass2: '123',
      direccion: {
        distrito: 'Nunoa',
        ciudad: 'Santiago'
      },
      // pasatiempos: ['Comer', 'Dormir'].forEach(valor => this.pasatiempos.push(this.fb.control(valor)))
    });

    // ejemplo de seteo de valores a formArray
    // ['Comer', 'Dormir'].forEach(valor => this.pasatiempos.push(this.fb.control(valor)));
  }

  submit() {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(control => {
        // console.log(control);
        // si esto es una instacia de FormGroup
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => {
            // console.log(control);
            control.markAsTouched();
          });
        }
        // console.log(control);
        control.markAsTouched();
      });
      return;
    }
    console.log(this.form.value);
    // posteo de información
    this.form.reset({
      // nombre: 'Sin nombre'
    });
    this.pasatiempos.clear();
  }


  agregarPasatiempo() {
    this.pasatiempos.push(this.fb.control('Nuevo', Validators.required));
  }

  borrarPasatiempo(idx: number) {
    this.pasatiempos.removeAt(idx);
  }
}
