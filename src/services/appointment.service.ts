import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { IAppointment, IAppointmentResponse, IAppointmentResponseById } from 'src/interfaces/appointment.interface';
import { Observable } from "rxjs"
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  headers!: HttpHeaders

  constructor(private client: HttpClient) {
    this.headers = new HttpHeaders({ 'content-type': 'application/json' })
  }

  GetAppointments(): Observable<IAppointmentResponse> {
    return this.client.get<IAppointmentResponse>(environment.apiAdress + "/list-appointments")
  }

  GetAppointmentById(id: string): Observable<IAppointmentResponseById> {
    return this.client.get<IAppointmentResponseById>(environment.apiAdress + `/appointment/${id}`)
  }

  NewAppointment(date: Date): Observable<any> {
    return this.client.post<any>(environment.apiAdress + "/insert-appointment/", {
      date,
    }, { headers: this.headers, observe: 'response' })
  }

  UpdateAppointmentById(id: string, newDate: Date): Observable<IAppointmentResponseById> {
    return this.client.put<IAppointmentResponseById>(environment.apiAdress + `/update-appointment/${id}`, {
      date: newDate
    })
  }

  DeleteAppointmentById(id: string): Observable<IAppointmentResponseById> {
    return this.client.delete<IAppointmentResponseById>(environment.apiAdress + `/remove-appointment/${id}`)
  }
}
