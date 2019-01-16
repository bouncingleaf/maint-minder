import { Injectable } from '@angular/core';

import { StorageService } from './storage.service';

import { Event } from './../models/event';
import { UserLocation } from './../models/userLocation';
import { Vehicle } from './../models/vehicle';
import { ServiceLocation } from './../models/serviceLocation';
import { Task } from './../models/task';

@Injectable()
export class SharedDataService {
  private myEvents: Event[];
  private myUserLocation: UserLocation;
  private myVehicle: Vehicle;
  private myServiceLocations: ServiceLocation[];
  private myTasks: Task[];
  private myTaskFavorites: number[];

  constructor(private storage: StorageService) { }

  public loadSharedData() {
    this.loadMyEvents();
    this.loadMyUserLocation();
    this.loadMyVehicle();
    this.loadMyServiceLocations();
    this.loadMyTasks();
    this.loadMyTaskFavorites();
  }

  // Events ---------------------------------------------------------------

  getMyEvents(): Event[] { return this.myEvents; }
  setMyEvents(events: Event[]) { this.myEvents = events; }
  saveMyEvents() { this.storage.putIntoStorage('events', this.myEvents); }

  private loadMyEvents(): void {
    const load = this.storage.getFromStorage('events');
    this.myEvents = load ? load : [];
  }

  updateOneEvent(newEvent: Event) {
    const index = this.myEvents.findIndex((event) => event.id === newEvent.id);
    Object.assign(this.myEvents[index], newEvent);
    this.saveMyEvents();
  }

  addNewEvent(newEvent: Event) {
    const lastEvent = this.myEvents.length - 1;
    newEvent.id = (lastEvent < 0) ? 0 : this.myEvents[lastEvent].id + 1;
    this.myEvents.push(newEvent);
    this.saveMyEvents();
  }

  // Location -------------------------------------------------------------
  getMyUserLocation(): UserLocation { return this.myUserLocation; }
  setMyUserLocation(location: UserLocation) { this.myUserLocation = location; }
  saveMyUserLocation() { this.storage.putIntoStorage('userLocations', [this.myUserLocation]); }

  private loadMyUserLocation(): void {
    const load = this.storage.getFromStorage('userLocations');
    this.myUserLocation = load ? load[0] : null;
  }

  public getMyLat(): string {
    if (!this.myUserLocation) {
      return null;
    } else {
      return this.myUserLocation.latitude;
    }
  }

  public getMyLong(): string {
    if (!this.myUserLocation) {
      return null;
    } else {
      return this.myUserLocation.longitude;
    }
  }

  public displayLocation(): string {
    if (this.myUserLocation && this.myUserLocation.name) {
      return this.myUserLocation.name;
    } else {
      return 'no location set';
    }
  }

  // Vehicle -------------------------------------------------------------
  getMyVehicle(): Vehicle { return this.myVehicle; }
  setMyVehicle(vehicle: Vehicle) { this.myVehicle = vehicle; }
  saveMyVehicle() { this.storage.putIntoStorage('vehicles', [this.myVehicle]); }

  private loadMyVehicle() {
    const load = this.storage.getFromStorage('vehicles');
    this.myVehicle = load ? load[0] : this.newVehicle();
  }

  newVehicle(): Vehicle {
    const vehicle = new Vehicle(0, 'My Car');
    this.storage.putIntoStorage('vehicles', [vehicle]);
    return vehicle;
  }

  public displayVehicle(): string {
    if (!this.myVehicle) {
      return 'no vehicle selected';
    } else {
      return this.myVehicle.name;
    }
  }

  public displayVehicleExtended(): string {
    if (!this.myVehicle) {
      return 'no vehicle selected';
    } else {
      let text = this.myVehicle.name;
      if (this.myVehicle.make) {
        text += (' (' + this.myVehicle.make.name);
        text += (this.myVehicle.model ? (' ' + this.myVehicle.model + ')') : ')');
      }
      return text;
    }
  }

  public clearMyVehicle(): void {
    if (this.myVehicle) {
      this.myVehicle.make = this.myVehicle.model = this.myVehicle.color = this.myVehicle.year = null;
    }
  }

  // Service Locations ----------------------------------------------------
  getMyServiceLocations(): ServiceLocation[] { return this.myServiceLocations; }
  setMyServiceLocations(serviceLocations: ServiceLocation[]) { this.myServiceLocations = serviceLocations; }
  saveMyServiceLocations() { this.storage.putIntoStorage('serviceLocations', this.myServiceLocations); }

  private loadMyServiceLocations(): void {
    const load = this.storage.getFromStorage('serviceLocations');
    this.myServiceLocations = load ? load : [];
  }

  // Given a serviceLocation ID, returns a display string
  // Users should never see the "Location N" fallback but it's nice for
  // testing with dummy data
  getServiceLocationDisplay(id: number): string {
    const location = this.myServiceLocations.find((loc) => loc.id === id);
    return location ? location.name : ('Location ' + id);
  }

  // Given a string, returns a matching ServiceLocation ID if it can find one
  // if it can't find one, returns null
  existingLocation(location: string): number {
    const match = this.myServiceLocations.find((loc) => loc.name.toUpperCase() === location.toUpperCase())
    return match ? match.id : null;
  }

  newLocation(location: string): number {
    let nextID: number;
    if (this.myServiceLocations.length > 0) {
      nextID = this.myServiceLocations[(this.myServiceLocations.length - 1)].id + 1;
    } else {
      nextID = 0;
    }
    this.myServiceLocations.push(new ServiceLocation(nextID, location));
    this.saveMyServiceLocations();
    return nextID;
  }

  // Tasks ----------------------------------------------------------------
  getMyTasks(): Task[] { return this.myTasks; }
  setMyTasks(tasks: Task[]) { this.myTasks = tasks; }
  saveMyTasks() { this.storage.putIntoStorage('tasks', this.myTasks); }

  addNewTask(name: string): Task {
    const lastTask = this.myTasks.length - 1;
    const nextID = (lastTask < 0) ? 0 : this.myTasks[lastTask].id + 1;
    const newTask = new Task(nextID, name);
    this.myTasks.push(newTask);
    this.saveMyTasks();
    return newTask;
  }

  // Given a list of task IDs, returns a string to display their names
  getTaskListDisplay(ids: number[]): string {
    if (!ids || ids.length < 1) {
      return '(unknown)';
    } else {
      return ids.map((eachID) => this.getTaskName(eachID)).join(', ');
    }
  }

  // Given a task ID, returns the display name
  // Users should never see the "Task N" fallback but it's nice for
  // testing with dummy data
  private getTaskName(id: number): string {
    const matchingTask = this.myTasks.find((task) => task.id === id);
    return matchingTask ? matchingTask.name : ('Task ' + id);
  }

  private loadMyTasks(): void {
    const load = this.storage.getFromStorage('tasks');
    this.myTasks = load ? load : this.defaultTasks();
  }

  private defaultTasks(): Task[] {
    return ['Change oil',
      'Replace brake pads',
      'Replace air filter',
      'Rotate tires',
      'Check fluids and top off',
      'Replace windshield wipers',
      'Replace cabin air filter']
      .map((each, index) => new Task(index, each));
  }

  //
  getMyTaskFavorites(): number[] { return this.myTaskFavorites; }
  setMyTaskFavorites(favorites: number[]) { this.myTaskFavorites = favorites; }
  saveMyTaskFavorites() { this.storage.putIntoStorage('favorites', this.myTaskFavorites); }

  private loadMyTaskFavorites(): void {
    const load = this.storage.getFromStorage('favorites');
    this.myTaskFavorites = load ? load : [0, 1, 2, 3, 4];
  }

  getMyTaskFavoritesFull(): Task[] {
    return this.myTasks.filter((task) => this.taskIsFavorite(task));
  }

  taskIsFavorite(task: Task): boolean {
    const match = this.myTaskFavorites.find((fave) => fave === task.id);
    return match !== undefined;
  }
}
