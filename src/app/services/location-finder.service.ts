import { Injectable } from '@angular/core';
// import { Http, Response, URLSearchParams } from '@angular/http';
import { SharedDataService } from './shared-data.service';

import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

@Injectable()
export class LocationFinderService {
  // Google and Mapquest let me down, ArcGIS to the rescue

  constructor(
    // private http: Http,
    // private shared: SharedDataService
  ) { }

  getPlaceMatches(input: string, lat: string, long: string): Observable<any> {
    const url = 'http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest';
    // My apologies to anyone who needs to document that they fixed their car
    // at any of the various places I'm now filtering out (some of the more
    // entertaining ones: Glacier, Volcano, Ruin, Creperie, Public Restroom)
    // The following isn't perfect, but it's better, and still lets you fix
    // your car at someone's house.
    // let category = 'Shops and Service,Travel and Transport,Professional and Other Places,'
    //                + 'Address,Education,Residence';
    // if (!input || input.length < 2) {
    //   return null;
    // } else {
    //   const params = new URLSearchParams();
    //   params.set('text', input);
    //   params.set('f', 'json');
    //   if (lat && long) {
    //     // The API documentation insists it is looking for lat,long, but if
    //     // I send that I get results from very far away. If I send long,lat
    //     // it works, regardless of whether I include the "LatLong" category.
    //     params.set('location', long + ',' + lat);
    //     category += ',LatLong';
    //   }
    //   console.log(params);
    //   params.set('category', category);
    //   return this.http
    //     .get(url, { search: params })
    //     .map((res: Response) => res.json());
    // }
    return null;
  }

}
