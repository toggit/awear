import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class ReportsService {

  constructor(private http: Http) { }

  private geoLength: number = 0;
  private tagLength: number = 0;

  private clients: any = {};

  getTagCount() {
    return this.geoLength;
  }

  getGeoCount() {
    return this.tagLength;
  }

  getReportsByDate(begindDate) {
    return this.http.post('/api/reports', { "date": begindDate })
      .map(
      (response: Response) => {
        const data: any[] = response.json();

        this.geoLength = 0;
        this.tagLength = 0;

        this.findClosetGeo4Tag(data); // O(n)
        this.removeTagsWithoutMatch(data);   // O(n)
        return data;
      }
      );
  }

  findClosetGeo4Tag(arr: any[]): any {

    arr.forEach((elm: any, idx: number, arr: any[]) => {
      if (!(this.clients.hasOwnProperty(elm.client_id))) {
        this.clients[elm.client_id] = {};
        this.clients[elm.client_id].prevGeoIndx = -1;
      }

      if (elm.type === "geo") {
        this.geoLength++;
        elm.label = 'G';
        this.clients[elm.client_id].prevGeoIndx = idx;
      } else {
        elm.label = 'T';
        this.tagLength++;
        if (this.clients[elm.client_id].prevGeoIndx != -1) {
          elm.geo_index = arr[this.clients[elm.client_id].prevGeoIndx].index;
          elm.diff = Math.abs(new Date(elm.time).getTime() - new Date(arr[this.clients[elm.client_id].prevGeoIndx].time).getTime())
          elm.location = arr[this.clients[elm.client_id].prevGeoIndx].location;
        }
      }

      return elm;
    })
  }

  removeTagsWithoutMatch(arr: any[]) {
    var tagsWithoutGeo: any[] = [];
    for (var i = arr.length; i-- > 0;) {
      if (arr[i].type === "geo") {
        this.clients[arr[i].client_id].prevGeoIndx = i;
      } else {
        if (this.clients[arr[i].client_id].prevGeoIndx != -1) {
          if (!arr[i].hasOwnProperty("diff") || arr[i].diff > (Math.abs(new Date(arr[i].time).getTime() - new Date(arr[this.clients[arr[i].client_id].prevGeoIndx].time).getTime()))) {
            arr[i].geo_index = arr[this.clients[arr[i].client_id].prevGeoIndx].index;
            arr[i].location = arr[this.clients[arr[i].client_id].prevGeoIndx].location;
          }
        } else {
          arr.push(i);
        }
      }
    }

    for (var i = tagsWithoutGeo.length - 1; i >= 0; i--) {
      console.log("geo not found for tag with clientId: " + arr[i].client_id);
      arr.splice(tagsWithoutGeo[i], 1);
      this.tagLength--;
    }

  }

}
