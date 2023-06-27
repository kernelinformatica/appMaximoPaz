import { Configuraciones } from 'src/configuraciones/configuraciones';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, MenuController } from '@ionic/angular';
import { Login } from 'src/app/modelo/login';
import { LoginService } from 'src/app/services/login.service';
import { UiService } from 'src/app/services/ui.service';

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
  testError: string | null = "";
  errorLoginMsg: string | null = "";
  errorLoginTitle: string | null = "";
  errorLoginSubTitle: string | null = "";
  gestAgroVersion : String | null = "";
  gestAgroUrl : String | null = "";
  passwordTypeInput  =  'password';
  iconpassword  =  'eye-off';
  iconcuenta = 'person';
  public registerCredentials = { usuario: '', clave: '' };  // Usado para el inicio de sesion
  
  @ViewChild('passwordEyeRegister') passwordEye: any;
  constructor(private uiService: UiService,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private navController: NavController,
    private activateRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private menuCtrl: MenuController

  ) {
    this.testError = this.activateRoute.snapshot.queryParamMap.get("refreshToken");
    this.loginForm = this.formBuilder.group({
      usuario: ["", [Validators.required]],
      clave: ["", [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.menuCtrl.enable(false)
    this.doLoadLogin();
    this.gestAgroVersion = Configuraciones.version;
    this.gestAgroUrl = Configuraciones.urlBase;
    
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
    this.loginService.loginUser(login, this.rememberMe).then(
      
      async resp => {
        
        if (resp == 1) 
        {
          await this.loadingController.dismiss();
          this.navController.navigateRoot('/resumen', { animated: true });
        } else if (resp == 0) {
          await this.loadingController.dismiss();
          this.uiService.presentAlertInfo("Los datos de autentificación suministrados son inválidos.");
        } else if (resp == 2) {
          await this.loadingController.dismiss();
          this.uiService.presentAlertInfo("Cliente no autorizado, póngase en contacto con su Cooperativa.");
        }
      }
    ).catch(
      async error => {
        this.uiService.presentAlertInfo(error);
        await this.loadingController.dismiss();
      }
    );

  }

  async doLoadLogin() {
    await this.uiService.presentLoading();
      this.loginService.trySavedLogin().then(
        async returnValue => {
          //Si hay login guardado.
          await this.loadingController.dismiss();
          if (returnValue) {
           //Redirijo al resumen
            this.navController.navigateRoot('/resumen', { animated: true });
          } else {
           
            this.navController.navigateRoot('/login', { animated: true });
          }
          
          console.log(returnValue);
        },
        (error: any) => {
           this.loadingController.dismiss();
          console.log(error);
          this.navController.navigateRoot('/login', { animated: true });
        }
      )
    
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

