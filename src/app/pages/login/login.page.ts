import { Component, OnInit, ViewChild } from '@angular/core';
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
export class LoginPage implements OnInit {

  showPassword: boolean = false;
  passwordToggleIcon: string = 'eye';
  loginForm: FormGroup;
  isAlertOpen = false;
  public alertButtons = ['OK'];
  testError: string | null = "";
  errorLoginMsg: string | null = "";
  errorLoginTitle: string | null = "";
  errorLoginSubTitle: string | null = "";
  passwordTypeInput  =  'password';
  iconpassword  =  'eye-off';
  iconcuenta = 'person';
  rememberMe = false;
  @ViewChild('passwordEyeRegister') passwordEye: any;
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

  ngOnInit(): void {
    localStorage.removeItem('control');
    localStorage.removeItem('usuarioActual');
  }
  togglePasswordMode() {
    this.passwordTypeInput  =  this.passwordTypeInput  ===  'text'  ?  'password'  :  'text';
    this.iconpassword  =  this.iconpassword  ===  'eye-off'  ?  'eye'  :  'eye-off';
    this.passwordEye.el.setFocus();
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

  /**
   * Login de usuario
   */
  async loginUser() {

    const login = this.buildInterfaceLogin(this.loginForm.value);
    if (login.usuario == '') {
      this.uiService.presentAlertInfo('Por favor ingrese Cuenta Corriente y Clave de Acceso para acceder al sistema');
      return;
    }

    await this.uiService.presentLoading();

    this.loginService.loginUser(login).then(
      async resp => {

        if (resp) {
          await this.loadingController.dismiss();
          this.navController.navigateRoot('/resumen', { animated: true });
        } else {
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

  /**
  * Este metodo se usa para la recuperacion de contraseñas
  */
  async recuperarClave() {

    const login = this.buildInterfaceLogin(this.loginForm.value);
    if (login.usuario == '') {
      this.uiService.presentAlertInfo('Por favor ingrese su usuario para la recuperación de clave');
      return;
    }

    await this.uiService.presentLoading();
    this.loginService.recuperarClave(login)
      .then(
        async (resp: any) => {
          await this.loadingController.dismiss();
          if (resp) {
            console.log(resp.email);
            this.uiService.presentAlertInfo(`Recuperación realizada con éxito. Un email fue enviado a: ${ resp.email }`);
          }
        }
      ).catch(
        async error => {
          await this.loadingController.dismiss();
          this.uiService.presentAlertInfo(error);
        }
      );
  }

  private buildInterfaceLogin(loginFrom: any): Login {
    const login: Login = {
      usuario: loginFrom.usuario,
      clave: loginFrom.clave,
    };
    return login;
  }
}

