import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.scss"],
})
export class SidenavComponent implements OnInit {
  constructor(private _router: Router) {}
  public hidden = false;
  public nbAlerts = 5;
  ngOnInit(): void {}

  public toggleBadgeVisibility = () => {
    this.hidden = !this.hidden;
  };

  onRouterHome = () => {
    this._router.navigate(["auth"]);
  };
}
