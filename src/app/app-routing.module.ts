import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewAppointmentComponent } from './new-appointment/new-appointment.component';
import { DeleteAppointmentComponent } from './delete-appointment/delete-appointment.component';
import { UpdateAppointmentComponent } from './update-appointment/update-appointment.component';

const routes: Routes = [
  {
    path: "new-appointment", component: NewAppointmentComponent,
  },
  {
    path: "delete-appointment", component: DeleteAppointmentComponent,
  },
  {
    path: "update-appointment", component: UpdateAppointmentComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
