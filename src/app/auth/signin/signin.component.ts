import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SigninComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) {}
  public hide: boolean = false;
  public email: string = ``;
  public password: string = ``;
  public isSignedIn: boolean = this._authService.getIsSignedIn();
  public signInFormGroup: FormGroup = this._formBuilder.group({});

  ngOnInit(): void {
    this.signInFormGroup = this._formBuilder.group({
      emailInput: [`jose@outlook.fr`, [Validators.required, Validators.email]],
      passwordInput: [
        `prout$12451`,
        [Validators.required, Validators.pattern(/[0-9$a-zA-Z]{6,}/)],
      ],
    });
    this.hide = true;
  }

  async onSubmit(): Promise<void> {
    try {
      const email: string = this.signInFormGroup.value["emailInput"];
      const password: string = this.signInFormGroup.value["passwordInput"];
      await this._authService.signIn(email, password);
      this._router.navigate([`/books`]);
    } catch (error) {
      console.log(`error: ${error}`);
    }
  }

  async onSignOut(): Promise<void> {
    await this._authService.signOut();
    console.log(this._authService.getIsSignedIn());
  }

  onDelPassword = () => {
    this.signInFormGroup.value["passwordInput"] = "";
  };
}
