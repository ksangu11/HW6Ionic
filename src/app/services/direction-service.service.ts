import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DirectionServiceService {

  constructor(private http: HttpClient) { }

  getDirection(from: string, to: string): Array<any>{
    let directionList = [];
    let url: string = `http://open.mapquestapi.com/directions/v2/route?key=hPM1OUWI4GMJ3KpjhlAi3q7COZuONxKz&from=${from}&to=${to}`;

    //console.log(url)
    this.http.get(url)
    .subscribe(data => {
      let maneuvers = data['route']['legs'][0]['maneuvers'];
      let maneuversList = [];
      
      for (var i in maneuvers){
        let detail = {
          narrative : maneuvers[i]['narrative'],
          distance : maneuvers[i]['distance'],
          mapUrl : maneuvers[i]['mapUrl'],
          iconUrl : maneuvers[i]['iconUrl'],
          order : parseInt(i)+1
      }
      maneuversList.push(detail);
    }
    let obj = {
      distance : data['route']['distance'],
      time : data['route']['formattedTime'],
      detail: maneuversList
  }

  directionList.push(obj);
}, err => {
  console.error('ERROR', err);
});
//console.log(directionList)
return directionList;
  }
}
