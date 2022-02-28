import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { getAuth, Auth, onAuthStateChanged } from 'firebase/auth';
import { DisplayService } from '../services/display.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isAuth: boolean = this._authService.getIsSignedIn();
  public firebase: Auth = getAuth();
  constructor(private _authService: AuthService, private _displayService: DisplayService) {}

  ngOnInit() {
    onAuthStateChanged(this.firebase, (user) => {
      if (user) {
        this.isAuth = true;
      } else {
        this.isAuth = false;
      }
    });
  }

  async onSignOut(): Promise<void> {
    await this._authService.signOut();
  }
  
  toggleSidenav = () => {
    this._displayService
    .toggle()
    .then(() => { });
  }

  
}
