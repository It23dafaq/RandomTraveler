/** Angular **/
import {Observable,of} from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {catchError,map,tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';

/** Data-Model **/
import {FlightData} from './Search-data';

/******************************************************************************/
/******************************************************************************/

@Injectable({
  providedIn: 'root'
})

export class FlightService {
private BaseUrl = 'https://api.skypicker.com/flights';  // URL to web api
  constructor(private http: HttpClient) { }
  /**Get flights
    obj => the form data user inserted
    **/
  getFlights(obj): Observable<FlightData[]> {
   // TODO: send the message _after_ fetching the heroes
   console.log(obj);
   return this.http.get<FlightData>(this.BaseUrl,{
      responseType:'json',
        params:{
          fly_from: obj.flyName,
          price_from:'1',
          price_to:obj.budgetPrice,
          flight_type:obj.flyType,
          nights_in_dst_from:obj.dayRange[0],
          nights_in_dst_to:obj.dayRange[1],
          partner:'picky',
          sort:'price'
          }
        }
    ).pipe(
      catchError(this.handleError)
    );
 }

 private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
 }
}