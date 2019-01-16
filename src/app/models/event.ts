export class Event {
  public id: number;
  public date: string;
  public odometer: number;
  public serviceLocationID: number;
  public cost: number;
  public taskIDs: Array<number>;
  public notes: string;
  public attachmentIDs: Array<number>;

  constructor (public vehicleID: number) {
    this.vehicleID = vehicleID;
  }

}
