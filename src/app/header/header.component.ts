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
  public clock: string = "";
  constructor(
    private _authService: AuthService,
    private _sidenavService: SidenavService
  ) {}

  /**
   *
   */
  ngOnInit() {
    this.showTime();
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

  public showTime = () => {
    console.log("showtime");

    let date = new Date();
    let h = date.getHours(); // 0 - 23
    let m = date.getMinutes(); // 0 - 59
    let s = date.getSeconds(); // 0 - 59
    let session = "AM";

    if (h == 0) {
      h = 12;
    }

    if (h > 12) {
      h = h - 12;
      session = "PM";
    }

    h = h < 10 ? 0 + h : h;
    m = m < 10 ? 0 + m : m;
    s = s < 10 ? 0 + s : s;

    this.clock = h + ":" + m + ":" + s + " " + session;
    setTimeout(this.showTime, 1000);
  };
}
