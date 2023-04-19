import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { DateService } from 'src/services/date.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  constructor(private dateService: DateService) {}

  selectedDate: string = this.dateService.handleSelectedDate();
  selectedIndex: number = this.dateService.getTodayDayOfYear();

  handlePage(e: PageEvent) {
    this.dateService.handleDayOfYear(e.pageIndex)
    this.selectedDate = this.dateService.handleSelectedDate(e.pageIndex)
  }
}
