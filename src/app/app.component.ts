import { BreakpointObserver } from "@angular/cdk/layout";
import { Component, ViewChild } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { DisplayService } from "./services/display.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  @ViewChild('matSidenav')
  public matSidenav!: MatSidenav;
  title = "OC-mediatheque";
  showFiller = false;
  private _sidenav!: MatSidenav;

  constructor(private _observer: BreakpointObserver, private _displayService: DisplayService) {}
/**
   * OnInit life cycle hook
   */
 public ngOnInit(): void {
  // Store sidenav to service
  this._displayService
    .setSidenav(this.matSidenav);
}
  
  ngAfterViewInit() {
    this._observer.observe(["(max-width: 800px)"]).subscribe((res) => {
      if (res.matches) {
        this._sidenav.mode = "over";
        this._sidenav.close();
      } else {
        this._sidenav.mode = "side";
        this._sidenav.open();
      }
    });
  }
}
