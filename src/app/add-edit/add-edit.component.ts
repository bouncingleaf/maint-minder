import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { SharedDataService } from './../services/shared-data.service';
import { LocationFinderService } from './../services/location-finder.service';

import { Event } from './../models/event';


@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  providers: [LocationFinderService]
})
export class AddEditComponent implements OnInit, OnDestroy {

  title: string;

  // Holds the data returned by the suggestions search
  locationSuggestions: any[];

  // Subject to publish search terms
  private searchTerms: Subject<string>;

  // To allow us to unsubscribe when we're done
  private sub: any;

  // Store the user's data until they decide to save or cancel
  tempEvent: Event;
  tempLocation: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private finder: LocationFinderService,
    private shared: SharedDataService) { }

  ngOnInit() {
    this.searchTerms = new Subject<string>();

    this.sub = this.searchTerms.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap(term => {
        return this.finder.getPlaceMatches(term, this.shared.getMyLat(), this.shared.getMyLong());
      })
    )
      .subscribe((result: any) => {
        this.locationSuggestions = result.suggestions;
        console.log(result);
      });

    this.decideAddOrEdit();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private decideAddOrEdit() {
    // + before getting the id turns the id into a number, fix found here:
    // https://angular.io/guide/router#route-parameters-in-the-activatedroute-service
    const id = +this.route.snapshot.params['id'];
    this.title = ((id || id === 0) ? 'Edit' : 'Add') + ' Maintenance or Repair';
    this.tempEvent = (id || id === 0) ? this.copyOfEvent(id) : new Event(this.shared.getMyVehicle().id);
    if (id || id === 0) {
      this.tempLocation = this.getLocationDisplay();
    }
  }

  getLocationDisplay() {
    const id = this.tempEvent.serviceLocationID;
    return (id || id === 0) ? this.shared.getServiceLocationDisplay(id) : this.tempLocation;
  }

  // Find the event you're copying by id in the list of events
  // Create a new event and copy the relevant info over
  // Return the new event
  copyOfEvent(id: number): Event {
    const eventToCopy = this.shared.getMyEvents().find((event) => event.id === id);
    const newEvent = new Event(eventToCopy.vehicleID);
    Object.assign(newEvent, eventToCopy);
    return newEvent;
  }

  save() {
    this.tempEvent.serviceLocationID = this.saveLocationIfNeeded();
    if (this.tempEvent.id || this.tempEvent.id === 0) {
      // Save edited existing contact
      this.shared.updateOneEvent(this.tempEvent);
    } else {
      // Save new contact
      this.shared.addNewEvent(this.tempEvent);
    }
    // Go home
    this.router.navigate(['home']);
  }

  saveLocationIfNeeded(): number {
    const existingID = this.shared.existingLocation(this.tempLocation);
    return existingID ? existingID : this.shared.newLocation(this.tempLocation);
  }

  cancel() {
    // Go home
    this.router.navigate(['']);
  }

  // When the From field changes, update its observable and the temp location
  newLocation(term: string): void {
    if (term && (term.length > 1)) {
      this.searchTerms.next(term);
    }
    this.tempLocation = term;
  }

  onNotesChange(childNotes: any): void {
    this.tempEvent.notes = childNotes.value;
  }

  onTasksChange(childTasks: any): void {
    this.tempEvent.taskIDs = childTasks.value;
  }

}
