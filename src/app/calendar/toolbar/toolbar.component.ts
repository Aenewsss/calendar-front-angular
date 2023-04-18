import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  selectedDate: string = this.handleSelectedDate();
  selectedIndex: number = this.getTodayDayOfYear()

  handleSelectedDate(newDayOfYear?: number) {
    let dayOfYear;

    dayOfYear = newDayOfYear ? newDayOfYear : this.getTodayDayOfYear()

    const currentDate = new Date()

    currentDate.setMonth(0)
    currentDate.setDate(dayOfYear)

    return this.formatDate(currentDate)
  }

  formatDate(date: Date) {
    const todayDay = date.getDate();
    const todayMonth = date.toLocaleDateString('en-US', { month: 'long' })
    const todayYear = date.getFullYear();

    return this.selectedDate = `${todayMonth}  ${todayDay},  ${todayYear}`
  }

  getTodayDayOfYear() {
    return this.selectedIndex = Math.ceil((Number(new Date()) - Number(new Date(new Date().getFullYear(), 0, 1))) / (1000 * 60 * 60 * 24));
  }

  handlePage(e: PageEvent) {
    this.handleDayOfYear(e.pageIndex)
    this.handleSelectedDate(e.pageIndex)
  }

  handleDayOfYear(dayOfYear: number) {
    this.selectedIndex = dayOfYear
  }


}
