import {
  Component,
  Input,
  OnInit,
  signal,
  Signal,
  effect,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForOf, CommonModule } from '@angular/common';
import { criteriaService } from '../../reportService/criteriaService';

@Component({
  selector: 'date-criteria',
  templateUrl: './DateCriteria.component.html',
  styleUrls: ['./DateCriteria.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    // NgForOf
  ],
})
export class DateCriteriaComponent implements OnInit {
  @Input() config: any;

  startDate = signal<string | null>(null);
  endDate = signal<string | null>(null);

  constructor(private criteria_Service: criteriaService) {
    effect(() => {
      this.criteria_Service.updateDateCriteria({
        startDate: this.startDate(),
        endDate: this.endDate(),
      });
    });
  }

  ngOnInit(): void {
    console.log('DateCriteriaComponent ngOnInit');
  }
}
