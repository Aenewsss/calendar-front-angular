import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppointmentDto } from 'src/dtos/appointment.dto';
import { AppointmentService } from 'src/services/appointment.service';
import { SELECT_HOURS, } from 'src/utils/select-hours.constants';

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.scss']
})
export class NewAppointmentComponent {

  constructor(
    public dialog: MatDialog,
    private appointmentService: AppointmentService
  ) {
    this.appointmentService.GetAppointments().subscribe(el => console.log(el))
  }


  openDialog() {
    this.dialog.open(ModalNewAppointment);
  }


}

@Component({
  selector: 'modal-new-appointment',
  templateUrl: 'modal-new-appointment.html',
  styleUrls: ['./new-appointment.component.scss']
})
export class ModalNewAppointment {
  constructor(
    public dialogRef: MatDialogRef<ModalNewAppointment>,
    private appointmentsService: AppointmentService,
  ) { }

  selectHours: string[] = SELECT_HOURS
  selected: Date = new Date();

  appointmentTitle!: string;
  appointmentTime!: string;
  appointmentDate: Date = new Date();
  appointmentDescription!: string;


  onCloseClick(): void {
    this.dialogRef.close();
  }

  validateForm() {
    return false
  }

  async createAppointment() {
    const appointment: AppointmentDto = {
      title: this.appointmentTitle,
      time: this.appointmentTime,
      date: this.appointmentDate,
      description: this?.appointmentDescription
    }
    this.appointmentsService.NewAppointment(appointment).subscribe(res => console.log(res))
    this.dialogRef.close();
  }

}