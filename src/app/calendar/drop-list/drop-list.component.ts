import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { EMPTY_LIST } from 'src/utils/empty-list.constants';
import { DAY_HOURS } from 'src/utils/hours.constants';

@Component({
  selector: 'app-drop-list',
  templateUrl: './drop-list.component.html',
  styleUrls: ['./drop-list.component.scss']
})
export class DropListComponent {
  appointments = EMPTY_LIST

  dayHours = DAY_HOURS

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.appointments, event.previousIndex, event.currentIndex);
  }
}
