import { Component, OnInit, ViewEncapsulation, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as Colombia from '../../../../assets/data/colombia.json';
import * as DataTypeBusiness from '../../../../assets/data/type_business.json';
import { MenuItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
//import { BusinessService } from 'src/app/services/business.service';
import { AuthApiService } from 'src/app/infrastructure/services/auth-api/auth-api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {


  items: MenuItem[] = [];
  businessDataForm!: FormGroup;
  userDataForm!: FormGroup;

  activeIndex: number = 0;
  typesBusiness: any = (DataTypeBusiness as any).default.typeBusiness
  _idBusiness: string = '';
  userCity: any = [];
  colombia: any = (Colombia as any).default;

  show: boolean = true;
  genders: any = [
    { "name": "Masculino" },
    { "name": 'Femenino' },
    { "name": 'Otro' },
    { "name": 'Prefiero no revelar' }
  ];

  rol: any = [
    { "name": "Propetario" },
    { "name": "Administrador" },
    { "name": "Entrenador" },
  ]


  autoResize: boolean = true;
  date3!: Date;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    //private _businessService: BusinessService,
    private _authService: AuthApiService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.userCity = this.colombia.map((item: any) => item.cities)
    .flat()
    .sort()
    .map((city: string) => ({ name: city }));

    this.businessDataForm = this.formBuilder.group({
      businessName: ['', Validators.required],
      typeBusiness: ['', Validators.required],
      cityBusiness: ['', Validators.required],
      addressBusiness: ['', Validators.required]
    });

    this.userDataForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern(
          '[a-zA-Z0-9_.-]+([.][a-zA-Z0-9_.-]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}'
        ),
      ]),],
      gender: ['', Validators.required],
      birthday: ['', Validators.required],
      password: ['', Validators.required],
      city: ['', Validators.required],
      phone: ['',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^-?(0|[1-9]\d*)?$/),
          Validators.minLength(7),
          Validators.maxLength(10),
        ])],
    });

    this.items = [
      {
        label: 'Información del Negocio',
        command: (event: any) => {
          this.activeIndex = 0;
        }
      },
      {
        label: 'Cuenta',
        command: (event: any) => {
          this.activeIndex = this.activeIndex - 1;
        }
      },

    ];
  }

  nextPage(form: FormGroup) {
    form.markAllAsTouched();
    let validForm = form.valid;

    validForm != false ? (this.registerBusiness()) : (this.messageService.add({ severity: 'error', summary: 'Error', detail: "Debe ingresar todos los datos obligatorios" }));
  }

  returnPage() {
    this.activeIndex = this.activeIndex - 1;
  }

  showPassword() {
    this.show = !this.show;
  }

  validateForm(form: FormGroup) {
    form.markAllAsTouched();
    let validForm = form.valid;

    validForm != false ? (this.registerUser()) : (this.messageService.add({ severity: 'error', summary: 'Error', detail: "Debe ingresar todos los datos obligatorios" }));
    return validForm;

  }

  registerUser() {

    let dataUser = this.userDataForm.value;
    dataUser.gender = this.userDataForm.controls.gender.value.name;
    dataUser.city = this.userDataForm.controls.city.value.name;
    dataUser.fullName = this.userDataForm.controls.name.value + ' ' + this.userDataForm.controls.lastName.value;
    dataUser.rol = 'ADMIN';
    dataUser.id_business = this._idBusiness;

    if (this._idBusiness != '') {
      this._authService.registerUser(dataUser).then((value: any) => {
        console.log('register ', value);

        if (value.status == 200) {
       
          this.messageService.add({ severity: 'success', summary: 'Mensaje enviado', detail: value.msg });
          setTimeout( ()=> {
            this.router.navigate(['/active-account', value.token]);
          }, 980);
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: value.msg })
        }
      });
    }

  }

  registerBusiness() {

    let dataBusiness = this.businessDataForm.value;
    dataBusiness.typeBusiness = this.businessDataForm.controls.typeBusiness.value.name;
    dataBusiness.cityBusiness = this.businessDataForm.controls.cityBusiness.value.name;

    // this._businessService.createBusiness(dataBusiness).then((value: any) => {
    //   console.log(value);

    //   if (value.status == 200) {
    //     console.log(value);
    //     this._idBusiness = value.businnes._id;
    //     this.activeIndex = this.activeIndex + 1;
    //   }
    // });

  }
  
}