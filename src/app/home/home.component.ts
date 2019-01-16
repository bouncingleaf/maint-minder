import { SharedDataService } from './../services/shared-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(private shared: SharedDataService) { }

  ngOnInit() {
  }

  anyEvents(): boolean {
    return this.shared.getMyEvents().length > 0;
  }
}
