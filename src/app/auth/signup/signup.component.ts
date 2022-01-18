import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) {}

  /*private _signUpForm: FormGroup = new FormGroup({
    email: new FormControl(`jose@outlook.fr`, [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl(`prout$12451`, [
      Validators.required,
      Validators.pattern(/[0-9a-zA-Z]{6,}/),
    ]),
  });
*/
  public signUpForm: FormGroup = this._formBuilder.group({});
  public email: string = ``;
  public password: string = ``;

  ngOnInit(): void {
    this._initForm();
  }

  private _initForm(): void {
    this.signUpForm = this._formBuilder.group({
      emailInput: new FormControl(`jose@outlook.fr`, [
        Validators.required,
        Validators.email,
      ]),
      passwordInput: new FormControl(`prout$12451`, [
        Validators.required,
        Validators.pattern(/[0-9$a-zA-Z]{6,}/),
      ]),
    });
  }

  async onSubmit(): Promise<void> {
    try {
      const email: string = this.signUpForm.value['emailInput'];
      const password: string = this.signUpForm.value['passwordInput'];
      await this._authService.createNewUser(email, password);
      this._router.navigate([`/auth/signin`]);
    } catch (error) {
      console.log(`error: ${error}`);
    }
  }
}
