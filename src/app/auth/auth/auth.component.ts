import { Component, OnDestroy, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"],
})
export class AuthComponent implements OnInit, OnDestroy {
  public choiceAuth: boolean = false;
  public isAuth: boolean = false;
  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    this.isAuth = this._authService.getIsSignedIn();
  }
  ngOnDestroy(): void {}
}
