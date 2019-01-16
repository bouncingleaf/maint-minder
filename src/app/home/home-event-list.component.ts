import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SharedDataService } from './../services/shared-data.service';

import { Event } from './../models/event';
import { ServiceLocation } from './../models/serviceLocation';

@Component({
  selector: 'app-home-event-list',
  templateUrl: './home-event-list.component.html'
})
export class HomeEventListComponent implements OnInit, DoCheck {

  myEvents: Array<Event>;

  constructor(private router: Router,
    private shared: SharedDataService) { }

  ngOnInit() {
  }

  ngDoCheck() {
    this.myEvents = this.shared.getMyEvents();
  }
  eventClick(event: any, selected: Event) {
    const id = event.target.id;
    if (id === 'date' || id === 'odometer' || id === 'location' || id === 'tasks' || id === 'cost') {
      this.router.navigate(['edit', selected.id]);
    }
  }

  displayLocation(event: Event): string {
    return this.shared.getServiceLocationDisplay(event.serviceLocationID);
  }

  displayTasks(event: Event): string {
    return this.shared.getTaskListDisplay(event.taskIDs);
  }

}
