import { Injectable } from "@angular/core";
import { MatDrawerToggleResult, MatSidenav } from "@angular/material/sidenav";

@Injectable({
  providedIn: "root",
})
export class SidenavService {
  public sidenav!: MatSidenav;
  constructor() {}

  // https://github.com/angular/components/issues/2936
  public open = () => {
    return this.sidenav.open();
  };

  public close = () => {
    return this.sidenav.close();
  };
}
