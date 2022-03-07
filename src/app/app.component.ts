import { BreakpointObserver } from "@angular/cdk/layout";
import { Component, ViewChild } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { SidenavService } from "./services/sidenav.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  @ViewChild("matSidenav") private _matSidenav!: MatSidenav;
  title = "OC-mediatheque";
  showFiller = false;
  public clock: string = "";
  constructor(
    private _observer: BreakpointObserver,
    private _sidenavService: SidenavService
  ) {}

  /**
   * OnInit life cycle hook
   */
  public ngOnInit(): void {}

  /**
   *
   */
  ngAfterViewInit() {
    this._sidenavService.sidenav = this._matSidenav;
    this._observer.observe(["(max-width: 800px)"]).subscribe((res) => {
      if (res.matches) {
        this._matSidenav.mode = "over";
      } else {
        this._matSidenav.mode = "side";
        this._matSidenav.open();
      }
    });
  }
}
