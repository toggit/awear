import { Component } from '@angular/core';
import { ReportsService } from './reports.service';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Awear Solutions';
  lat: number = 43.8111842796614470;
  lng: number = -90.8245581575583860;
  reports: any[] = [];
  geoCount: number = 0;
  tagCount: number = 0;
  momentValue: moment.Moment;

  constructor(private reportService: ReportsService) { }

  ngOnInit() {
    this.momentValue = moment().subtract(2, 'h');
  }

  public setMoment(momentVal): any {
    this.momentValue = momentVal;
    // console.log('date change: ' + momentVal);
    this.reportService.getReportsByDate(this.momentValue)
      .subscribe(
      (reports: any[]) => {
        if (reports.length > 0) {
          this.reports = reports;
          this.geoCount = this.reportService.getGeoCount();
          this.tagCount = this.reportService.getTagCount();
          if (this.geoCount > 0) {
            this.lat = this.reports[0].location.coordinates[1];
            this.lng = this.reports[0].location.coordinates[0];
          }
        }
      },
      (error) => console.log(error)
      );
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

}