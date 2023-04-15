import { Component, OnInit } from '@angular/core';
import { IAppointment } from 'src/interfaces/appointment.interface';
import { AppointmentService } from 'src/services/appointment.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  constructor(private appointmentService: AppointmentService) { }

  selected!: Date | null;

  appointments: IAppointment[] = []

  ngOnInit(): void {
    this.appointmentService.GetAppointments()
      .subscribe(response => {
        this.appointments = response.appointments
      })
  }

}
