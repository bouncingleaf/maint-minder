import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class LocationFinderService {

  constructor(
    private http: HttpClient
  ) { }

  getPlaceMatches(input: string, lat: string, long: string): Observable<any> {
    input = input.trim();
    const url = 'http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest';
    // My apologies to anyone who needs to document that they fixed their car
    // at any of the various places I'm now filtering out (some of the more
    // entertaining ones: Glacier, Volcano, Ruin, Creperie, Public Restroom)
    // The following isn't perfect, but it's better, and still lets you fix
    // your car at someone's house.
    let category = 'Shops and Service,Travel and Transport,Professional and Other Places,Address,Education,Residence';
    if (!input || input.length < 2) {
      return null;
    } else {
      const params = new HttpParams().set('text', input).set('f', 'json');
      if (lat && long) {
        // The API documentation insists it is looking for lat,long, but if
        // I send that I get results from very far away. If I send long,lat
        // it works, regardless of whether I include the "LatLong" category.
        params.set('location', long + ',' + lat);
        category += ',LatLong';
      }
      params.set('category', category);
      console.log(params);
      return this.http
        .get(url, {params: params} ).pipe(
          map((res: Response) => res.json())
        );
    }
  }

}
