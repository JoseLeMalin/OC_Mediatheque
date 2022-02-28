import { Injectable } from "@angular/core";
import { MatDrawerToggleResult, MatSidenav, MatSidenavModule } from "@angular/material/sidenav";
import { BreakpointObserver } from "@angular/cdk/layout";
import { MatSelectionList } from "@angular/material/list";
@Injectable({
  providedIn: "root",
})
export class DisplayService {
  private _sidenav!: MatSidenav;
  constructor() {}

  toggleSidenav = () => {
    this._sidenav?.toggle();
  };

  // https://github.com/angular/components/issues/2936
  /**
   * Setter for sidenav.
   *
   * @param {MdSidenav} sidenav
   */
  public setSidenav(sidenav: MatSidenav) {
    this._sidenav = sidenav;
  }
  /**
   * Toggle this sidenav. This is equivalent to calling open() when it's already opened, or close() when it's closed.
   *
   * @param {boolean} isOpen  Whether the sidenav should be open.
   *
   * @returns {Promise<MdSidenavToggleResult>}
   */
   public toggle(isOpen?: boolean): Promise<MatDrawerToggleResult> {
    return this._sidenav.toggle(isOpen);
  }

}
