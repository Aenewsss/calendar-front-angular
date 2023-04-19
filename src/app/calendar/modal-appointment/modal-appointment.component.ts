import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IAppointment, IModalAppointment } from 'src/interfaces/appointment.interface';
import { AppointmentService } from 'src/services/appointment.service';
import { SELECT_HOURS } from 'src/utils/select-hours.constants';

@Component({
  selector: 'app-modal-appointment',
  templateUrl: './modal-appointment.component.html',
  styleUrls: ['./modal-appointment.component.scss', '../new-appointment/new-appointment.component.scss']
})
export class ModalAppointmentComponent {

  constructor(
    public dialogRef: MatDialogRef<ModalAppointmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IModalAppointment,
    private appointmentService: AppointmentService,
  ) { }

  selectHours: string[] = SELECT_HOURS

  appointmentTitle: string = this.data.currentAppointment.title;
  appointmentTime: string = this.data.currentAppointment.time;
  appointmentDate: Date = this.data.currentAppointment.date;
  appointmentDescription: string = this.data.currentAppointment.description || '';

  private appointmentId: string = this.data.currentAppointment.id;

  updateAppointment() {
    const dto: IAppointment = {
      id: this.appointmentId,
      date: this.appointmentDate,
      time: this.appointmentTime,
      title: this.appointmentTitle,
      description: this.appointmentDescription
    }

    this.appointmentService.UpdateAppointmentById(dto).subscribe(el => console.log(el))
    this.dialogRef.close();
  }

  deleteAppointment() {
    this.appointmentService.DeleteAppointmentById(this.appointmentId).subscribe(el => console.log(el))
    this.dialogRef.close();
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
