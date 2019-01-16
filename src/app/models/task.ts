export class Task {
  public active: boolean;

  constructor(public id: number, public name: string) {
    this.active = true;
  }
}
