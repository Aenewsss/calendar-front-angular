import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { AppointmentDto } from 'src/dtos/appointment.dto';
import { SnackEmojiEnum } from 'src/dtos/snack-emoji.enum';
import { SnackMessagesEnum } from 'src/dtos/snack-messages.enum';
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
export class ModalNewAppointment implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ModalNewAppointment>,
    private appointmentsService: AppointmentService,
    @Inject(MAT_DIALOG_DATA) public data: IModalData,
    private snackBar: MatSnackBar
  ) { }

  selectHours: string[] = SELECT_HOURS

  appointmentTitle!: string;
  appointmentTime: string = this.getCurrentHour();
  appointmentDate: Date = this.data.currentDate || new Date();
  appointmentDescription!: string;

  ngOnInit(): void {
    this.appointmentsService.GetAppointments().subscribe(result => this.checkAvailableTimes(result))
  }

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
    this.snackBar.open(SnackMessagesEnum.NEW_APPOINTMENT, SnackEmojiEnum.NEW_APPOINTMENT, {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    })
    this.dialogRef.close();
  }

  getCurrentHour(): string {
    const hour = new Date().getHours()
    const minutes = new Date().getMinutes()

    return this.selectHours.filter(el => el.split(':')[0] == hour.toString() && (Number(el.split(':')[1]) > minutes || minutes > Number(el.split(':')[1])))[0]
  }

  checkAvailableTimes(appointments: any) {
    if(this.appointmentDate.getDate() == new Date().getDate()){
      const unavailableTimes = appointments?.flatMap((el: any) => SELECT_HOURS.filter(hour => hour.split(':')[0] == el.time.split(':')[0]))
      
      const availableTimes = this.selectHours.filter(hour => !unavailableTimes.includes(hour))
      
      this.selectHours = availableTimes
    }
  }

}