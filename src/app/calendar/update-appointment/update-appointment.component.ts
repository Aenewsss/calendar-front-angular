import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IAppointment } from 'src/interfaces/appointment.interface';
import { AppointmentService } from 'src/services/appointment.service';

@Component({
  selector: 'app-update-appointment',
  templateUrl: './update-appointment.component.html',
  styleUrls: ['./update-appointment.component.scss']
})
export class UpdateAppointmentComponent {

  constructor(
    private appointmentService: AppointmentService,
    private router: Router,
  ) { }

  selected!: Date | null;
  newAppointmentSelected: Date = new Date();

  currentAppointmentDate!: Date
  currentAppointmentId!: string
  newAppointment!: Date


  appointments: IAppointment[] = []

  ngOnInit(): void {
    this.appointmentService.GetAppointments()
      .subscribe(response => {
        this.appointments = response.appointments
      })
  }

  async selectAppointment(id: string) {
    this.appointmentService.GetAppointmentById(id).subscribe(res => {
      this.currentAppointmentDate = res.appointment.date
      this.currentAppointmentId = res.appointment._id
    })
  }

  async updateAppointment(id: string) {
    this.appointmentService.UpdateAppointmentById(id, this.newAppointmentSelected)
      .subscribe(response => {
        this.router.navigate(['/'])
        alert("Appointment updated")
      })
  }

}
