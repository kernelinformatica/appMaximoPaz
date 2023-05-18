import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { Login } from 'src/app/interfaces/login.interface';
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

  testError: string | null = "";

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
      numOperador: ["", [Validators.required]],
      claveOperador: ["", [Validators.required]]
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

  async loginUser() {

    if (this.loginForm.invalid) { return; }

    const login = this.buildInterfaceLogin(this.loginForm.value);

    await this.uiService.presentLoading();

    this.loginService.loginUser(login)
      .then(
        async resp => {
          await this.loadingController.dismiss();
          if (resp) {
            this.navController.navigateRoot('/home', { animated: true })
          }
        }
      ).catch(
        async error => {
          await this.loadingController.dismiss();
          this.uiService.presentAlertInfo(error);
        }
      );
  }

  recuperarClave(){

  }

  getNovedades(){

  }

  getMercado(){

  }

  getClasificados() {
    
  }

  private buildInterfaceLogin(loginFrom: any): Login {
    const login: Login = {
      numOperador: loginFrom.numOperador,
      claveOperador: loginFrom.claveOperador,
    };
    return login;
  }
}

