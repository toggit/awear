import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DateTimePickerModule } from 'ng-pick-datetime';
import { AgmCoreModule } from '@agm/core';
import { MomentModule } from 'angular2-moment';
import { ReportsService } from './reports.service'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DateTimePickerModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDe57BC6wQqjiG6ZgH8Ga6QfM7ixmco5cA'
    }),
    MomentModule,
    HttpModule
  ],
  providers: [ReportsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
