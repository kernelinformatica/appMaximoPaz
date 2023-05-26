import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { Login } from 'src/app/modelo/login';
import { LoginService } from 'src/app/services/login.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  showPassword: boolean = false;
  passwordToggleIcon: string = 'eye';
  loginForm: FormGroup;
  isAlertOpen = false;
  public alertButtons = ['OK'];
  testError: string | null = "";
  errorLoginMsg: string | null = "";
  errorLoginTitle: string | null = "";
  errorLoginSubTitle: string | null = "";
  
  rememberMe = false;

  constructor(private uiService: UiService,
              private formBuilder: FormBuilder,
              private loginService: LoginService,
              private navController: NavController,
              private activateRoute: ActivatedRoute,
              private loadingController: LoadingController
  ) {
    this.testError = this.activateRoute.snapshot.queryParamMap.get("refreshToken");
    this.loginForm = this.formBuilder.group({
      usuario: ["", [Validators.required]],
      clave: ["", [Validators.required]]
    });

  }

  get isValidForm() { return true; }

  showHidePassword(): void {
    this.showPassword = !this.showPassword;
    if (this.showPassword) {
      this.passwordToggleIcon = 'eye-off';
    } else {
      this.passwordToggleIcon = 'eye';
    }
  }
  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
  async loginUser() {

    if (this.loginForm.invalid) { return; }

    const login = this.buildInterfaceLogin(this.loginForm.value);

    await this.uiService.presentLoading();
    
    this.loginService.loginUser(login).then(
         async resp => {
          
          if (resp) {
            await this.loadingController.dismiss();
            this.navController.navigateRoot('/resumen', { animated: true })
          
          }else{
            await this.loadingController.dismiss();
            this.uiService.presentAlertInfo("El datos de autentificación suministrados son inválidos.");
          }
        }
        ).catch(
        async error => {
          
          this.uiService.presentAlertInfo(error);
          await this.loadingController.dismiss();
        }
      );
      
  }

  recuperarClave() {

  }

  getNovedades() {

  }

  getMercado() {

  }

  getClasificados() {

  }

  private buildInterfaceLogin(loginFrom: any): Login {
    const login: Login = {
      usuario: loginFrom.usuario,
      clave: loginFrom.clave,
    };
    return login;
  }
}

