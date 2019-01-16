import { SharedDataService } from './../services/shared-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(public shared: SharedDataService) { }

  ngOnInit() {
  }

}
