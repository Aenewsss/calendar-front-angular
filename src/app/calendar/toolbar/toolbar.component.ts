import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from "rxjs";
import { DateService } from 'src/services/date.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {

  constructor(private dateService: DateService) { }

  private datesSub!: Subscription;

  selectedDate: string = this.dateService.handleSelectedDate();
  selectedIndex: number = this.dateService.getTodayDayOfYear();

  ngOnInit() {
    this.datesSub = this.dateService
      .getSelectedIndexUpdateListener()
      .subscribe((index: number) => {
        this.selectedIndex = index;
        this.selectedDate = this.dateService.handleSelectedDate(index)
      });

  }

  ngOnDestroy() {
    this.datesSub.unsubscribe();
  }

  handlePage(e: PageEvent) {
    this.dateService.handleDayOfYear(e.pageIndex)
    this.selectedDate = this.dateService.handleSelectedDate(e.pageIndex)
  }

  goToTodayDate() {
    this.selectedDate = this.dateService.handleSelectedDate()
  }

  openMyGithubRepo() {
    window.open("https://github.com/Aenewsss/calendar-front-angular", "_blank")
  }

  
}
