import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.scss"],
})
export class SidenavComponent implements OnInit {
  constructor() {}
  public hidden = false;
  public nbAlerts = 5;
  ngOnInit(): void {}

  public toggleBadgeVisibility = () => {
    this.hidden = !this.hidden;
  };
}
