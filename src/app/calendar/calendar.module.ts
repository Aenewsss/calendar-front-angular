import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { HttpClientModule } from '@angular/common/http';
import { CalendarRoutingModule } from './calendar-routing.module';
import { MatCardModule } from "@angular/material/card"
import { MatDatepickerModule } from "@angular/material/datepicker"
import { ModalNewAppointment, NewAppointmentComponent } from './new-appointment/new-appointment.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { DropListComponent } from './drop-list/drop-list.component'
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ModalAppointmentComponent } from './modal-appointment/modal-appointment.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    CalendarComponent,
    NewAppointmentComponent,
    ToolbarComponent,
    DropListComponent,
    ModalAppointmentComponent,
    ModalNewAppointment
  ],
  imports: [
    FormsModule,
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
    MatListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatSelectModule,
    MatSnackBarModule
  ]
})
export class CalendarModule { }
