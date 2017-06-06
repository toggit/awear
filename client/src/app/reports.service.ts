import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class ReportsService {

  constructor(private http: Http) { }

  private geo: any[] = [];
  private tag: any[] = [];

  getTagCount() {
    return this.geo.length;
  }

  getGeoCount() {
    return this.tag.length;
  }

  getReportsByDate(begindDate) {
    return this.http.post('/api/reports', { "date": begindDate })
      .map(
      (response: Response) => {
        const data: any[] = response.json();

        this.geo.splice(0, this.geo.length);
        this.tag.splice(0, this.tag.length)

        data.filter(
          (elm: any, idx: number, arr: any[]) => {
            if (elm.type === "geo") {
              this.geo.push(elm);
            } else {
              this.tag.push(elm);
            }
            return elm;
          }
        );

        if (this.geo.length > 0 && this.tag.length > 0) {
          this.findClosetGeo4Tag();
        }

        return data;
      }
      );
  }

  findClosetGeo4Tag() {
    this.tag.forEach(
      (tag_elm, idx, arr) => {
        tag_elm.match = false;
        const tag_time = new Date(tag_elm.time).getTime();
        tag_elm.diff = tag_time;
        tag_elm.label = 'T';
        this.geo.forEach(
          (geo_elm, idx, arr) => {
            geo_elm.label = 'G';
            if (tag_elm.client_id === geo_elm.client_id) { }
            if (tag_elm.match == false) {
              const geo_time = new Date(geo_elm.time).getTime();
              if (tag_time === geo_time) {
                console.log("match found: client_id=" + tag_elm.client_id + "  geo_index=" + geo_elm.index)
                tag_elm.match = true;
              } else {
                let diff = Math.abs(tag_time - geo_time);
                if (tag_elm.diff > diff)
                  tag_elm.diff = diff;
                tag_elm.location = geo_elm.location;
                tag_elm.geo_index = geo_elm.index;
              }
            }
          })
      }
    );
  }
}
