import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  selectedDate: string = this.getSelectedDate();
  selectedIndex: number = this.getDayOfYear()

  getSelectedDate() {
    const dayOfYear = this.getDayOfYear()
    const currentDate = new Date()

    currentDate.setMonth(0)
    currentDate.setDate(dayOfYear)
    return this.formatDate(currentDate)
  }

  formatDate(date: Date): string {
    const todayDay = date.getDay();
    const todayMonth = date.toLocaleDateString('pt-BR', { month: 'long' })
    const todayYear = date.getFullYear();

    return todayDay + ' de ' + todayMonth + ' de ' + todayYear
  }

  getDayOfYear(): number {
    return Math.ceil((Number(new Date()) - Number(new Date(new Date().getFullYear(), 0, 1))) / (1000 * 60 * 60 * 24));
  }

  handlePage(e: PageEvent) {
    this.handleDayOfYear(e.pageIndex)
  }

  handleDayOfYear(dayOfYear: number) {
    this.selectedIndex = dayOfYear
  }
}
