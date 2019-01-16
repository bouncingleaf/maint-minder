import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  // e.g., getFromStorage('vehicles')
  getFromStorage(item: string): any[] {
    const storedItem = window.localStorage.getItem(item);
    if (storedItem) {
      return JSON.parse(storedItem);
    } else {
      return null;
    }
  }

  // e.g. putArrayIntoStorage('events',eventArray)
  putIntoStorage(item: string, contents: any[]) {
    window.localStorage.setItem(item, JSON.stringify(contents));
  }

  constructor() { }
}
