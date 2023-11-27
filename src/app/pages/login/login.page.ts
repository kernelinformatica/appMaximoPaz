import { catchError } from 'rxjs/operators';

import { Configuraciones } from 'src/configuraciones/configuraciones';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Route } from '@angular/router';

import {
  LoadingController,
  NavController,
  MenuController,
} from '@ionic/angular';
import { Login } from 'src/app/modelo/login';
import { LoginService } from 'src/app/services/login.service';
import { UiService } from 'src/app/services/ui.service';
import { InterceptorService } from './../../services/interceptor.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public rememberMe = false;
  showPassword: boolean = false;
  passwordToggleIcon: string = 'eye';
  loginForm: FormGroup;
  isAlertOpen = false;
  public alertButtons = ['OK'];
  testError: string | null = '';
  errorLoginMsg: string | null = '';
  errorLoginTitle: string | null = '';
  errorLoginSubTitle: string | null = '';
  appVersion: String | null = '';
  gestAgroUrl: String | null = '';
  passwordTypeInput = 'password';
  iconpassword = 'eye-off';
  iconcuenta = 'person';
  razonSocialNombreCorto  : String | null = '';
  public urlLogo = Configuraciones.urlBaseImgs;
  public registerCredentials = { usuario: '', clave: '' }; // Usado para el inicio de sesion

  @ViewChild('passwordEyeRegister') passwordEye: any;
  constructor(
    private uiService: UiService,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private navController: NavController,
    private activateRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private menuCtrl: MenuController,

    private interceptorService: InterceptorService

  ) {
    this.testError =
      this.activateRoute.snapshot.queryParamMap.get('refreshToken');
    this.loginForm = this.formBuilder.group({
      usuario: ['', [Validators.required]],
      clave: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.menuCtrl.enable(false);

    this.appVersion = Configuraciones.version;
    this.gestAgroUrl = Configuraciones.urlBase;
    this.razonSocialNombreCorto = Configuraciones.razonSocialNombreCorto;
    this.loginService.validarServicioSiEstaDisponible();
    this.doLoadLogin();
  }
  togglePasswordMode() {
    this.passwordTypeInput =
      this.passwordTypeInput === 'text' ? 'password' : 'text';
    this.iconpassword = this.iconpassword === 'eye-off' ? 'eye' : 'eye-off';
    this.passwordEye.el.setFocus();
  }
  get isValidForm() {
    return true;
  }

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

  validoCliente(usuario: string) {
    let validaCliente = usuario.slice(0, 2);
    if (Configuraciones.codigoCliente == validaCliente) {
      return true;
    } else {
      return false;
    }
  }
  async loginUser() {
    const login = this.buildInterfaceLogin(this.loginForm.value);
    if (login.usuario == '') {
      this.uiService.presentAlertInfo(
        'Por favor ingrese Cuenta Corriente y Clave de Acceso para acceder al sistema'
      );
      return;
    }
    let permisoCliente = this.validoCliente(login.usuario);
    if (permisoCliente == true) {
      await this.uiService.presentLoading('Validando sus datos...');
      this.loginService
        .loginUser(login, this.rememberMe)
        .then(async (resp) => {
          if (resp == 1) {
            await this.loadingController.dismiss();
            this.navController.navigateRoot('/resumen', { animated: true });
          } else if (resp == 0) {
            await this.loadingController.dismiss();
            this.uiService.presentAlertInfo(
              'Los datos de autentificación suministrados son inválidos.'
            );
          } else if (resp == 2) {
            await this.loadingController.dismiss();
            this.uiService.presentAlertInfo(
              'Cliente no autorizado, póngase en contacto con su Cooperativa.'
            );
          }
        })
        .catch(async (error) => {
          this.uiService.presentAlertInfo(error);
          await this.loadingController.dismiss();
        });
    } else {
      this.uiService.presentAlertInfo(
        'El el usuario es incorrecto, ingrese un usuario válido'
      );
    }
  }



  async doLoadLogin() {
    let count = 0;
    // Si tiro algún que ingreso al catch, hago un intervalo de 12 segundos,
    // para reiniciar lapantalla del login y que se puedan loguear
    const intervalId = setInterval(() => {
      count++;
      if (count == 12){
        clearInterval(intervalId)
        this.uiService.dissmisLoading();
       }
       console.log("Esperando respuesta: "+count);
    }, 1000);


    await this.uiService.presentLoading('Ingresando...');

    this.loginService.trySavedLogin()
      .then(
      async (returnValue) => {
           //Si hay login guardado.


        if (returnValue) {
          //Redirijo al resumen
          this.navController.navigateRoot('/resumen', { animated: true });
        } else {

          this.navController.navigateRoot('/login', { animated: true });
        }
        clearInterval(intervalId)
        this.uiService.dissmisLoading();

        console.log(returnValue);
      })
      .catch(error => {
        this.loadingController.dismiss();
        console.log(error);
        this.navController.navigateRoot('/login', { animated: true });
      });
  }

  /**
   * Este metodo se usa para la recuperacion de contraseñas
   */

  async recuperarClave() {
    const login = this.buildInterfaceLogin(this.loginForm.value);
    if (login.usuario == '') {
      this.uiService.presentAlertInfo(
        'Por favor ingrese su usuario para la recuperación de clave'
      );
      return;
    }

    await this.uiService.presentLoading('Cargando...');
    this.loginService
      .recuperarClave(login)
      .then(async (resp: any) => {
        await this.loadingController.dismiss();
        if (resp) {
          console.log(resp.email);
          this.uiService.presentAlertInfo(
            `Recuperación realizada con éxito. Un email fue enviado a: ${resp.email}`
          );
        }
      })
      .catch(async (error) => {
        await this.loadingController.dismiss();
        this.uiService.presentAlertInfo(error);
      });
  }

  private buildInterfaceLogin(loginFrom: any): Login {
    const login: Login = {
      usuario: loginFrom.usuario,
      clave: loginFrom.clave,
    };
    return login;
  }

  filtradoejemplo (){
    const personas = [
      { nombre: 'Juan', edad: 25 },
      { nombre: 'María', edad: 17 },
      { nombre: 'Pedro', edad: 30 },
    ];
    const personasFiltradas = personas.filter(persona => persona.edad >= 18);
    console.log(personasFiltradas); // [{ nombre: 'Juan', edad: 25 }, { nombre: 'Pedro', edad: 30 }]
  }

  onClickTest(){
  window.open("http://www.google.com", "_blank")

  }
}
