import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { IAppointment } from 'src/interfaces/appointment.interface';

@Injectable({
  providedIn: 'root',
})
export class MockData implements InMemoryDbService {
  createDb() {
    const appointments: IAppointment[] = [];

    return { appointments };
  }
}