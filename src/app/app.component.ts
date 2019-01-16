import { SharedDataService } from './services/shared-data.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'MaintMinder';

  constructor(private shared: SharedDataService) {
    shared.loadSharedData();
  }
}
