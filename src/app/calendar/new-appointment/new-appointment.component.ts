import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppointmentDto } from 'src/dtos/appointment.dto';
import { IModalData } from 'src/interfaces/modal-data.interface';
import { AppointmentService } from 'src/services/appointment.service';
import { DateService } from 'src/services/date.service';
import { SELECT_HOURS, } from 'src/utils/select-hours.constants';

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.scss']
})
export class NewAppointmentComponent {

  constructor(
    public dialog: MatDialog,
    private appointmentService: AppointmentService,
    private dateService: DateService,
  ) {
    this.appointmentService.GetAppointments().subscribe(el => console.log(el))
  }

  private datesSub!: Subscription;
  private currentDate !: Date;

  ngOnInit() {
    this.datesSub = this.dateService
      .getToolbarDateUpdateListener()
      .subscribe((toolbarDateUpdated: Date) => {
        this.currentDate = toolbarDateUpdated;
      });
  }

  ngOnDestroy() {
    this.datesSub.unsubscribe();
  }

  openDialog() {
    this.dialog.open(ModalNewAppointment, {
      data: { currentDate: this.currentDate }
    });
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
    @Inject(MAT_DIALOG_DATA) public data: IModalData,
  ) { }


  selectHours: string[] = SELECT_HOURS

  appointmentTitle!: string;
  appointmentTime!: string;
  appointmentDate: Date = this.data.currentDate || new Date();
  appointmentDescription!: string;

  onCloseClick(): void {
    this.dialogRef.close();
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