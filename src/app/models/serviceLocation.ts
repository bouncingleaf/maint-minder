export class ServiceLocation {
  public placeID?: string;
  // display name, whether or not we have a place ID
  public active: boolean;

  constructor (public id: number, public name: string) {
    this.active = true;
  }
}
