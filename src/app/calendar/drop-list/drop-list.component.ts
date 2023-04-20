import { Component, OnInit, OnDestroy } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';
import { AppointmentService } from 'src/services/appointment.service';
import { EMPTY_LIST } from 'src/utils/empty-list.constants';
import { DAY_HOURS } from 'src/utils/hours.constants';
import { IAppointment, IAppointmentResponse } from 'src/interfaces/appointment.interface';
import { DateService } from 'src/services/date.service';
import { IEmptyList } from 'src/interfaces/empty-list.interface';
import { MatDialog } from '@angular/material/dialog';
import { ModalAppointmentComponent } from '../modal-appointment/modal-appointment.component';

@Component({
  selector: 'app-drop-list',
  templateUrl: './drop-list.component.html',
  styleUrls: ['./drop-list.component.scss']
})
export class DropListComponent implements OnInit, OnDestroy {

  constructor(
    private appointmentsService: AppointmentService,
    private dateService: DateService,
    public dialog: MatDialog,
  ) { }

  appointments: IEmptyList[] = EMPTY_LIST;
  dayHours = DAY_HOURS;

  selectedDate: Date = new Date()

  private currentDate: Date = new Date();

  private appointmentsSub!: Subscription;
  private datesSub!: Subscription;

  ngOnInit() {
    this.appointmentsSub = this.appointmentsService
      .getAppointmentsUpdateListener()
      .subscribe((appointmentsUpdated: IAppointmentResponse) => {
        this.updateList(appointmentsUpdated);
      });

    this.datesSub = this.dateService
      .getToolbarDateUpdateListener()
      .subscribe((toolbarDateUpdated: Date) => {
        this.currentDate = toolbarDateUpdated;

        this.appointmentsService.GetAppointments().subscribe(result => this.updateList(result))

      });

  }

  ngOnDestroy() {
    this.appointmentsSub.unsubscribe();
    this.datesSub.unsubscribe();
  }

  updateList(appointmentsUpdated: IAppointmentResponse) {

    this.verifyEmptyList(appointmentsUpdated)

    this.verififyLengthDifference(appointmentsUpdated)

    Object.values(appointmentsUpdated).forEach((appointment: IAppointment) => {

      const currentAppointmentIndex = this.appointments.findIndex(el => el.appointment.id == appointment.id)

      this.appointments[currentAppointmentIndex] = {
        appointment: {
          id: '', title: '', date: new Date(), time: ''
        },
        disabled: true
      }

      if ((this.currentDate.getDate() == new Date(appointment.date).getDate()) && (this.currentDate.getMonth() == new Date(appointment.date).getMonth())) {

        const hourFormatted = this.formatTimeIndex(appointment.time)

        this.appointments[hourFormatted] = {
          appointment: {
            id: appointment.id, title: appointment.title, date: appointment.date, time: appointment.time, description: appointment.description
          },
          disabled: false
        }
      }
    })
  }

  formatTimeIndex(time: string) {
    return Number(time.split(':')[0])
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.appointments, event.previousIndex, event.currentIndex);
    this.changeHourAfterMove(event.previousIndex, event.currentIndex)
  }

  changeHourAfterMove(previousIndex: number, currentIndex: number) {
    this.appointments[currentIndex].appointment.time = this.formatHour(currentIndex)
    this.appointmentsService.UpdateAppointmentById(this.appointments[currentIndex].appointment)
  }

  formatHour(hour: number): string {
    return `${hour.toString().padStart(2, '0')}:00`
  }

  openAppointment(appointment: IAppointment) {
    this.dialog.open(ModalAppointmentComponent, {
      data: { currentAppointment: appointment }
    });
  }

  verifyEmptyList(appointmentsUpdated: IAppointmentResponse) {
    if (!Object.values(appointmentsUpdated).length) {
      this.appointments = new Array(24).fill({
        appointment: {
          id: '',
          title: '',
          date: '',
          time: '',
          description: '',
        },
        disabled: true
      })
    }
  }

  verififyLengthDifference(appointmentsUpdated: IAppointmentResponse) {
    const disabled = this.appointments.filter(el => el.disabled == false)

    if (disabled > Object.values(appointmentsUpdated)) {
      this.appointments = new Array(24).fill({
        appointment: {
          id: '',
          title: '',
          date: '',
          time: '',
          description: '',
        },
        disabled: true
      })
    }
  }

  goToDate(date: Date) {
    this.dateService.changeDayOfYearByDate(date)
  }

}