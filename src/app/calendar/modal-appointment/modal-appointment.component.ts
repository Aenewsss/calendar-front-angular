import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackEmojiEnum } from 'src/dtos/snack-emoji.enum';
import { SnackMessagesEnum } from 'src/dtos/snack-messages.enum';
import { IAppointment, IAppointmentResponse, IModalAppointment } from 'src/interfaces/appointment.interface';
import { AppointmentService } from 'src/services/appointment.service';
import { SELECT_HOURS } from 'src/utils/select-hours.constants';

@Component({
  selector: 'app-modal-appointment',
  templateUrl: './modal-appointment.component.html',
  styleUrls: ['./modal-appointment.component.scss', '../new-appointment/new-appointment.component.scss']
})
export class ModalAppointmentComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalAppointmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IModalAppointment,
    private appointmentService: AppointmentService,
    private snackBar: MatSnackBar
  ) { }

  selectHours: string[] = SELECT_HOURS

  appointmentTitle: string = this.data.currentAppointment.title;
  appointmentTime: string = this.data.currentAppointment.time;
  appointmentDate: Date = this.data.currentAppointment.date;
  appointmentDescription: string = this.data.currentAppointment.description || '';

  private appointmentId: string = this.data.currentAppointment.id;

  ngOnInit(): void {
    this.appointmentService.GetAppointments().subscribe(result => this.checkAvailableTimes(result))
  }

  updateAppointment() {
    const dto: IAppointment = {
      id: this.appointmentId,
      date: this.appointmentDate,
      time: this.appointmentTime,
      title: this.appointmentTitle,
      description: this.appointmentDescription
    }

    this.appointmentService.UpdateAppointmentById(dto).subscribe(() =>
      this.snackBar.open(SnackMessagesEnum.UPDATE_APPOINTMENT, SnackEmojiEnum.UPDATE_APPOINTMENT, {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      })
    )
    this.dialogRef.close();
  }

  deleteAppointment() {
    this.appointmentService.DeleteAppointmentById(this.appointmentId).subscribe(() =>
      this.snackBar.open(SnackMessagesEnum.DELETE_APPOINTMENT, SnackEmojiEnum.DELETE_APPOINTMENT, {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      })
    )
    this.dialogRef.close();
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  checkAvailableTimes(appointments: IAppointmentResponse) {
    if((new Date(this.appointmentDate).getDate() == new Date().getDate()) && (new Date(this.appointmentDate).getMonth() == new Date().getMonth())){
      const unavailableTimes = Object.values(appointments)?.flatMap((el: IAppointment) => SELECT_HOURS.filter(hour => hour.split(':')[0] == el.time.split(':')[0]))
      
      const availableTimes = this.selectHours.filter(hour => !unavailableTimes.includes(hour))
      
      this.selectHours = availableTimes
    }
  }
}
