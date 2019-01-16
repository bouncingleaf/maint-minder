import {
  Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-edit-notes',
  templateUrl: './add-edit-notes.component.html'
})
export class AddEditNotesComponent implements OnInit {
  @Input() notes: string;
  @Output() notesChange: EventEmitter<any>;

  constructor() {
    this.notesChange = new EventEmitter<any>();
  }

  ngOnInit() {
  }

  onChange(value: string) {
    this.notes = value;
    this.notesChange.emit({ value: this.notes });
  }
}
