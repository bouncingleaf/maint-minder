import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedDataService } from './../services/shared-data.service';
import { Task } from './../models/task';

@Component({
  selector: 'app-add-edit-tasks',
  templateUrl: './add-edit-tasks.component.html'
})
export class AddEditTasksComponent implements OnInit {

  // The tasks that should offer checkboxes
  favoriteTasks: Task[];

  // Other tasks that aren't favorites
  otherTasks: Task[];

  // What the user has actually chosen
  @Input() selectedTaskIDs: number[];

  // Notifies the main temp if anything changes
  @Output() tasksChange: EventEmitter<any>;

  constructor(private shared: SharedDataService) {
    this.tasksChange = new EventEmitter<any>();
  }

  ngOnInit() {
    // Set up the favorites
    this.favoriteTasks = [];
    console.log(this.selectedTaskIDs);
    if (!this.selectedTaskIDs) {
      this.selectedTaskIDs = [];
    }
    this.shared.getMyTaskFavoritesFull()
      .forEach((task) => this.favoriteTasks.push(task));

    // Set up the rest of the add button
    this.otherTasks = this.shared.getMyTasks().filter((task) => !this.isAFavorite(task));
  }

  isAFavorite(task: Task): boolean {
    return (this.favoriteTasks.find((fave) => fave.id === task.id)) ? true : false;
  }

  isSelected(task: Task): boolean {
    return (this.selectedTaskIDs.find((id) => id === task.id)) ? true : false;
  }

  checkboxChanged(id: number, checked: boolean) {
    // Add or remove it from the running list of tasks
    if (checked) {
      this.selectedTaskIDs.push(id);
    } else {
      this.selectedTaskIDs.findIndex((taskID) => taskID === id);
    }
    // Have the main temp object get an update too
    this.tasksChange.emit({ value: this.selectedTaskIDs });
  }

  private taskNameMatch(task: Task, name: string) {
    return task.name.toUpperCase() === name.toUpperCase();
  }

  // For when the user just typed in something
  addNewTask(name: string) {
    // Only do any of this if we have a name
    if (name) {
      const allTasks = this.favoriteTasks.concat(this.otherTasks);
      // Have we ever even heard of it? Does it match anything we know?
      const match = allTasks.find((task) => this.taskNameMatch(task, name));
      // If user picked something new, add it to the general list of tasks
      if (!match) {
        const newTask = this.shared.addNewTask(name);
        this.otherTasks.push(newTask);
        this.addToCheckboxes(newTask);
      } else {
        this.addToCheckboxes(match);
      }
    }
  }

  addToCheckboxes(task: Task) {
    // New or not, they just selected it, so mark it as such
    // and it's a favorite for this session anyway
    if (!this.isSelected(task)) {
    this.selectedTaskIDs.push(task.id);
    }
    if (!this.isAFavorite(task)) {
      this.favoriteTasks.push(task);
    }
  }

  getSelectedTasks(): Task[] {
    return this.shared.getMyTaskFavoritesFull().filter((task) => this.isSelected(task));
  }

  removeSelection(id: number) {
    const toRemove = this.selectedTaskIDs.findIndex((taskID) => taskID === id);
    this.selectedTaskIDs.splice(toRemove, 1);
  }

  addSelection(toAdd: number) {
    this.selectedTaskIDs.push(toAdd);
  }
}
