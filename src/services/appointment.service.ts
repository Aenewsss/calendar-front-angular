import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { IAppointment, IAppointmentResponse, IAppointmentResponseById } from 'src/interfaces/appointment.interface';
import {  Observable, Subject } from "rxjs"
import { AppointmentDto } from 'src/dtos/appointment.dto';
import { v4 as uuidv4 } from 'uuid';
@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private apiBaseUrl = 'api/appointments';
  private headers!: HttpHeaders;

  private appointmentsUpdated = new Subject<IAppointmentResponse>();

  constructor(private client: HttpClient) {
    this.headers = new HttpHeaders({ 'content-type': 'application/json' })
  }

  GetAppointments(): Observable<IAppointmentResponse> {
    return this.client.get<IAppointmentResponse>(this.apiBaseUrl)
  }

  GetAppointmentById(id: string): Observable<IAppointmentResponseById> {
    return this.client.get<IAppointmentResponseById>(this.apiBaseUrl + `/appointment/${id}`)
  }

  NewAppointment(appointment: AppointmentDto): Observable<IAppointment> {
    appointment.id = uuidv4()
    const newAppointment = this.client.post<any>(this.apiBaseUrl, appointment)

    newAppointment.subscribe(res => {
      this.GetAppointments().subscribe(response => {
        this.appointmentsUpdated.next(response);
      })
    })

    return newAppointment
  }

  UpdateAppointmentById(id: string, newDate: Date): Observable<IAppointmentResponseById> {
    return this.client.put<IAppointmentResponseById>(this.apiBaseUrl + `/update-appointment/${id}`, {
      date: newDate
    })
  }

  DeleteAppointmentById(id: string): Observable<IAppointmentResponseById> {
    return this.client.delete<IAppointmentResponseById>(this.apiBaseUrl + `/remove-appointment/${id}`)
  }

  getAppointmentsUpdateListener(): Observable<IAppointmentResponse> {
    return this.appointmentsUpdated.asObservable();
  }

}
