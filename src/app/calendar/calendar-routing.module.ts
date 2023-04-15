import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarComponent } from './calendar.component';
import { NewAppointmentComponent } from './new-appointment/new-appointment.component';

const routes: Routes = [
    {
        path: "",
        component: CalendarComponent
    },
    {
        path: "new-appointment",
        component: NewAppointmentComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CalendarRoutingModule { }