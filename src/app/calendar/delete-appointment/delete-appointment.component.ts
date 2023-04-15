import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IAppointment } from 'src/interfaces/appointment.interface';
import { AppointmentService } from 'src/services/appointment.service';

@Component({
  selector: 'app-delete-appointment',
  templateUrl: './delete-appointment.component.html',
  styleUrls: ['./delete-appointment.component.scss']
})
export class DeleteAppointmentComponent {

  constructor(
    private appointmentService: AppointmentService,
    private router: Router,
  ) { }
  
  selected!: Date | null;
  appointments: IAppointment[] = []

  ngOnInit(): void {
    this.appointmentService.GetAppointments()
      .subscribe(response => {
        this.appointments = response.appointments
      })
  }

  async deleteAppointment(id: string) {
    this.appointmentService.DeleteAppointmentById(id).subscribe(res => this.router.navigate(['/']))
    alert("Deleted")
  }
}
