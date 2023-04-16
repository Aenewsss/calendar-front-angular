import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { HttpClientModule } from '@angular/common/http';
import { CalendarRoutingModule } from './calendar-routing.module';
import { MatCardModule } from "@angular/material/card"
import { MatDatepickerModule } from "@angular/material/datepicker"
import { NewAppointmentComponent } from './new-appointment/new-appointment.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { DropListComponent } from './drop-list/drop-list.component'
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    CalendarComponent,
    NewAppointmentComponent,
    ToolbarComponent,
    DropListComponent
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    DragDropModule,
    MatListModule
  ]
})
  export class CalendarModule { }
