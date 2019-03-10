import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Make } from './../models/make';

@Injectable()
export class VehicleFinderService {
  private url = 'https://www.carqueryapi.com/api/0.3/';
  private maxYear: number = new Date().getFullYear() + 1;
  // carquery's model years start at 1941
  private baseYear = 1940;

  constructor(
    private http: HttpClient
    ) {}

  public yearOk(year: number) {
    if (!year) {
      return false;
    } else {
      return ((year > this.baseYear) && (year < this.maxYear));
    }
  }

  getMakesFromAPI(year?: number) {
    const params = new HttpParams()
    .set('cmd', 'getMakes')
    .set('sold_in_us', '1')
    .set('callback', 'JSONP_CALLBACK');
    if (this.yearOk(year)) {
      params.set('year', year.toString());
    }
    const options = params.toString();

    return this.http.jsonp(`${this.url}?${options}`, 'JSONP_CALLBACK').pipe(
      map((res) => {
        console.log(res);
        return res;
      })
    );
  }

  public getMakes(year?: number): Make[] {
    const allMakes: Make[] = [];
    let oneMake: any;
    this.getMakesFromAPI(year)
      .subscribe(result => {
        while (result['Makes'].length > 0) {
          oneMake = result['Makes'].shift();
          if (oneMake.make_is_common === '1') {
            allMakes.push(new Make(oneMake.make_id, oneMake.make_display));
          }
        }
      });
    return allMakes;
  }

  // Models

  private getModelsFromAPI(makeID: string, year?: number) {
    const params = new HttpParams()
    .set('cmd', 'getModels')
    .set('sold_in_us', '1')
    .set('callback', 'JSONP_CALLBACK')
    .set('make', makeID);
    if (this.yearOk(year)) {
      params.set('year', year.toString());
    }
    const options = params.toString();

    return this.http.jsonp(`${this.url}?${options}`, 'JSONP_CALLBACK').pipe(
      map((res) => {
        console.log('got models', res);
        return res;
      })
    );
  }

  public getModels(make: Make, year?: number): string[] {
    const allModels: string[] = [];
    let oneModel: any;
    this.getModelsFromAPI(make.id, year)
      .subscribe(result => {
        while (result['Models'].length > 0) {
          oneModel = result['Models'].shift();
          if (oneModel.model_is_common !== '0') {
            allModels.push(oneModel.model_name);
          }
        }
      });
    return allModels;
  }

  public validYears(): number[] {
    const validYears: number[] = [];
    for (let i = this.maxYear; i > this.baseYear; i--) {
      validYears.push(i);
    }
    return validYears;
  }
}
