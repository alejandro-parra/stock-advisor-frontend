import { Component, OnInit } from '@angular/core';
import validations from '../../data/validations.json';
import { LoginState } from 'src/app/interfaces/LoginState';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user-service';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginState = LoginState
  currentView: LoginState = LoginState.Login
  loading = false;

  //Form Data Variables
  questionnaire: FormGroup;
  questionnaireStep1: FormGroup;
  questionnaireStep2: FormGroup;
  tokenRecovery = '';
  userEmailRecovery = '';

  //steps login variables
  items = []
  currentStep = 0

  //UI Variables
  currentIcon = "";
  signInText = "INICIAR SESIÓN";
  registerButtonText = "FINALIZAR REGISTRO";
  recoveryButtonText = "ENVIAR CORREO DE RECUPERACIÓN";
  updatePasswordButtonText = "REESTABLECER CONTRASEÑA";

  //Validators
  validations = validations;

  //custom validators
  passwordMatch(c: AbstractControl): { passwordMismatch: boolean } {
    if (c.get('password').value !== c.get('repeatPassword').value) {
        return {passwordMismatch: true};
    }
  }

  constructor(private readonly fb: FormBuilder, private userService: UserService, private activatedRoute: ActivatedRoute, public dialogService: DialogService, private router: Router) { 
    this.setupQuestionnaire(LoginState.Login);
  }

  ngOnInit(): void {
    // if(this.userService.isAuthenticated()){
    //   this.router.navigate(['search'])
    // }
    this.setupUI()
    this.activatedRoute.queryParams.subscribe(params => {
      let token = params['recoveryToken'];
      let email = params['email'];
      if(token && email){
        this.tokenRecovery = token;
        this.userEmailRecovery = email
        this.changeCurrentView(this.loginState.UpdatePassword)
      }
    });
  }

  setupQuestionnaire(newState: LoginState) {
    switch(newState) {
      case LoginState.Login: {
        this.questionnaire = this.fb.group({
          email: ["", [Validators.required, Validators.email]],
          password: ["", [Validators.required]]
        });
        break;  
      }
      case LoginState.ForgotPassword: {
        this.questionnaire = this.fb.group({
          email: ["", [Validators.required, Validators.email]]
        });
        break;  
      }
      case LoginState.Register: {
        this.questionnaire = this.fb.group({});
        this.questionnaireStep1 = this.fb.group({
          name: ["", Validators.required],
          lastName: ["", [Validators.required]],
          email: ["",[Validators.required, Validators.email]],
        });
        this.questionnaireStep2 = this.fb.group({
          password: ["", Validators.required],
          repeatPassword: ["", Validators.required]
        }, {validators: this.passwordMatch});
        this.questionnaire = this.fb.group({
        });
        break;  
      }
      case LoginState.UpdatePassword: {
        this.questionnaire = this.fb.group({
          password: ["", Validators.required],
          repeatPassword: ["", [Validators.required]]
        }, {validators: this.passwordMatch});
        break;  
      }
    }
  }

  setupUI() {
    this.items = [
      {
        label: 'General',
        command: (event: any) => {
          this.currentStep = 0;
        }
      },
      {
        label: 'Contraseña',
        command: (event: any) => {
          this.currentStep = 1;
        }
      }
    ];
  }

  changeCurrentView(newState: LoginState){
    this.setupQuestionnaire(newState);
    this.currentView = newState;
  }

  onSubmit() {
    this.currentIcon = "pi pi-spin pi-spinner";
    
    console.log(this.questionnaire.value);
    this.loading = true;
    let data = this.questionnaire.value;
    switch(this.currentView){
      case LoginState.Login: {
        this.signInText = "";
        this.userService.login(data).then((response) => {
          this.loading = false;
          console.log(response);
          this.currentIcon = "";
          this.signInText = "INICIAR SESIÓN";
        }); 
        break;
      }
      case LoginState.Register: {
        this.registerButtonText = "";
        data = {...this.questionnaireStep1.value, ...this.questionnaireStep2.value};
        console.log(data);
        this.userService.register(data).then((response) => {
          this.loading = false;
          this.currentIcon = "";
          this.registerButtonText = "FINALIZAR REGISTRO";
          console.log(response);
        });   
        break; 
      }
      case LoginState.ForgotPassword: {
        this.recoveryButtonText = "";
        console.log(data);
        this.userService.sendPasswordRecovery(data).then((response) => {
          this.loading = false;
          this.currentIcon = "";
          this.recoveryButtonText = "ENVIAR CORREO DE RECUPERACIÓN";
          if(response === 'exito'){
            this.changeCurrentView(LoginState.Login);
          }
        });
        break; 
      }
      case LoginState.UpdatePassword: {
        console.log(data);
        data.token = this.tokenRecovery
        data.email = this.userEmailRecovery
        this.updatePasswordButtonText = "";
        this.userService.updatePassword(data).then((response) => {
          this.loading = false;
          this.currentIcon = "";
          this.updatePasswordButtonText = "REESTABLECER CONSTRASEÑA";
          console.log(response);
          this.changeCurrentView(LoginState.Login);
        });
        break; 
      }
    }
  }

  nextStep(step){
    this.currentStep = step
  }

}
