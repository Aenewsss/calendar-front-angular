import { Injectable } from '@angular/core';
import { Subject, Observable } from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class DateService {
  private toolbarDateUpdated = new Subject<Date>();
  private selectedDateUpdated = new Subject<string>();
  private selectedIndexUpdated = new Subject<number>();

  handleSelectedDate(newDayOfYear?: number) {

    const dayOfYear = newDayOfYear ? newDayOfYear : this.getTodayDayOfYear()

    const currentDate = new Date()

    currentDate.setMonth(0)
    currentDate.setDate(dayOfYear)

    this.toolbarDateUpdated.next(currentDate)

    return this.formatDate(currentDate)
  }

  formatDate(date: Date) {
    const todayDay = date.getDate();
    const todayMonth = date.toLocaleDateString('en-US', { month: 'long' })
    const todayYear = date.getFullYear();

    this.selectedDateUpdated.next(`${todayMonth}  ${todayDay},  ${todayYear}`);
    return `${todayMonth}  ${todayDay},  ${todayYear}`
  }

  getTodayDayOfYear() {
    this.selectedIndexUpdated.next(Math.ceil((Number(new Date()) - Number(new Date(new Date().getFullYear(), 0, 1))) / (1000 * 60 * 60 * 24)))
    return Math.ceil((Number(new Date()) - Number(new Date(new Date().getFullYear(), 0, 1))) / (1000 * 60 * 60 * 24))
  }

  changeDayOfYearByDate(date: Date){
    const dayOfYear = Math.ceil((Number(date) - Number(new Date(date.getFullYear(), 0, 1))) / (1000 * 60 * 60 * 24)) + 1

    this.handleSelectedDate(dayOfYear)
    this.selectedIndexUpdated.next(dayOfYear)
  }

  handleDayOfYear(dayOfYear: number) {
    this.selectedIndexUpdated.next(dayOfYear)
  }

  getSelectedIndexUpdateListener(): Observable<number> {
    return this.selectedIndexUpdated.asObservable();
  }

  getSelectedDateUpdateListener(): Observable<string> {
    return this.selectedDateUpdated.asObservable();
  }

  getToolbarDateUpdateListener(): Observable<Date> {
    return this.toolbarDateUpdated.asObservable();
  }
}