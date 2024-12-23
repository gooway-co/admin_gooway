import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'src/app/domain/models/auth/aut.model';
import { AuthApiService } from 'src/app/infrastructure/services/auth-api/auth-api.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  loginDataForm!: FormGroup;
  showPassword: boolean = true;
  auth!: Auth;
  massageFail: string = "";
  errorLogin: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private _authService : AuthApiService,
    private router: Router,
    private _messageService : MessageService,
  ) { }

  checkRemember: boolean = true;

  ngOnInit(): void {
    this.loginDataForm = this.formBuilder.group({
      email: ['',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            '[a-zA-Z0-9_.-]+([.][a-zA-Z0-9_.-]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}'
          ),
        ]),
      ],
      password: ['', Validators.required],
    });
  }

  viewPassword(){
    this.showPassword =! this.showPassword
  }

  async validateForm(form: FormGroup) {
    form.markAllAsTouched();
    let validForm = form.valid;

    validForm ? this.login(form) : null
  }


  login(form: any){
    let auth  = this.loginDataForm.value;
    this.errorLogin =  false;
   
      this._authService.login(auth).then((value: any) => {
        
        if(value.status == 200){
          this._messageService.add({
            severity: 'success',
            summary: 'Actualizado',
            detail: "Bienvenido a Techni"
          });
          this.router.navigate(['/admin/dashboard']);
        }else{
          this.massageFail = value.menssage;
          this.errorLogin =  true;
        }
      })
    
    
  }
}
