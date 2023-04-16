import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { emptyList } from 'src/utils/empty-list.constants';
import { dayHours } from 'src/utils/hours.constants';

@Component({
  selector: 'app-drop-list',
  templateUrl: './drop-list.component.html',
  styleUrls: ['./drop-list.component.scss']
})
export class DropListComponent {
  appointments = emptyList

  dayHours = dayHours

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.appointments, event.previousIndex, event.currentIndex);
  }
}
