import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';
import { AppointmentService } from 'src/services/appointment.service';
import { EMPTY_LIST } from 'src/utils/empty-list.constants';
import { DAY_HOURS } from 'src/utils/hours.constants';
import { IAppointment, IAppointmentResponse } from 'src/interfaces/appointment.interface';
import { DateService } from 'src/services/date.service';

@Component({
  selector: 'app-drop-list',
  templateUrl: './drop-list.component.html',
  styleUrls: ['./drop-list.component.scss']
})
export class DropListComponent implements OnInit {

  constructor(
    private appointmentsService: AppointmentService,
    private dateService: DateService,
  ) { }

  appointments = EMPTY_LIST;
  dayHours = DAY_HOURS;

  currentDate: Date = new Date();

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
        console.log('new date:', toolbarDateUpdated)
        this.currentDate = toolbarDateUpdated;
      });

  }

  ngOnDestroy() {
    this.appointmentsSub.unsubscribe();
    this.datesSub.unsubscribe();
  }

  updateList(appointmentsUpdated: IAppointmentResponse) {
    Object.values(appointmentsUpdated).forEach((appointment: IAppointment) => {
      console.log(appointment.date)
      if (this.currentDate.getDate() == appointment.date.getDate()) {


        const hourFormatted = this.formatHourNumber(appointment.time)

        this.appointments[hourFormatted] = {
          appointment: {
            _id: appointment._id, title: appointment.title, date: appointment.date, time: appointment.time
          },
          disabled: false
        }
      }
    })
  }

  formatHourNumber(time: string) {
    return Number(time.split(':')[0])
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.appointments, event.previousIndex, event.currentIndex);
  }
}