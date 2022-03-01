import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { getAuth, Auth, onAuthStateChanged } from "firebase/auth";
import { SidenavService } from "../services/sidenav.service";
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  public isAuth: boolean = this._authService.getIsSignedIn();
  public firebase: Auth = getAuth();
  constructor(
    private _authService: AuthService,
    private _sidenavService: SidenavService
  ) {}

  /**
   *
   */
  ngOnInit() {
    onAuthStateChanged(this.firebase, (user) => {
      if (user) {
        this.isAuth = true;
      } else {
        this.isAuth = false;
      }
    });
  }

  /**
   *
   */
  async onSignOut(): Promise<void> {
    await this._authService.signOut();
  }

  /**
   *
   */
  public toggleSidenav = () => {
    this._sidenavService.sidenav.toggle();
  };
}
