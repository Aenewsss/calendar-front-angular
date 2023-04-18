import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppointmentService } from 'src/services/appointment.service';
import { SELECT_HOURS, } from 'src/utils/select-hours.constants';

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.scss']
})
export class NewAppointmentComponent {

  constructor(
    public dialog: MatDialog
  ) { this.openDialog() }


  openDialog() {
    this.dialog.open(ModalNewAppointment);
  }


}

@Component({
  selector: 'modal-new-appointment',
  templateUrl: 'modal-new-appointment.html',
  styleUrls: ['./new-appointment.component.scss']
})
export class ModalNewAppointment  {
  constructor(
    public dialogRef: MatDialogRef<ModalNewAppointment>,
    private appointmentsService: AppointmentService,
  ) { }

  selectHours: string[] = SELECT_HOURS
  selected: Date = new Date();

  appointmentTitle!: string;
  appointmentTime!: string;
  appointmentDate!: Date;


  onCloseClick(): void {
    this.dialogRef.close();
  }

  validateForm() {
    return false
  }

  async createAppointment() {
    console.log(this.appointmentTitle, this.appointmentTime, this.appointmentDate	)
    this.appointmentsService.NewAppointment(this.selected).subscribe(res => console.log(res))
  }

}