import { Make } from './make';

export class Vehicle {
  // a little about the vehicle
  public make: Make;
  public model: string;
  public year: number;
  public color: string;

  constructor( public id: number, public name: string) {}

}
