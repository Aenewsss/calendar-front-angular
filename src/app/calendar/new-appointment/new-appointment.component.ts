import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentService } from 'src/services/appointment.service';

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.scss']
})
export class NewAppointmentComponent {

  constructor(
    private appointmentsService: AppointmentService,
    private router: Router,
    ){}
  
  selected: Date = new Date();

  async createAppointment() {

      this.appointmentsService.NewAppointment(this.selected).subscribe(res => this.router.navigate(['/']))
      alert("Created")
  }
}
