import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'track-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
    private navCtrl: NavController,
    private loginService: LoginService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

  }

  get email(): FormControl {
    return <FormControl>this.loginForm.get('email');
  }

  get password(): FormControl {
    return <FormControl>this.loginForm.get('password');
  }

  ngOnInit() {

  }

  async logar() {
    let logou = await this.loginService.logar(this.email.value, this.password.value);
    if (logou) {
      this.navCtrl.navigateRoot('/main', {
        animated: true,
        animationDirection: 'forward'
      });
    }
  }

  signup() {
    this.navCtrl.navigateForward('/signup');
  }

}
