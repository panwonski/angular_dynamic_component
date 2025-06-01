import {
  Component,
  OnInit,
  Input,
  signal,
  Signal,
  effect,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { criteriaService } from '../../reportService/criteriaService';

@Component({
  selector: 'date-criteria',
  templateUrl: './PriceCriteria.component.html',
  styleUrls: ['./PriceCriteria.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class PriceCriteriaComponent implements OnInit {
  @Input() config: any;

  minPrice = signal<number | null>(null);
  maxPrice = signal<number | null>(null);

  constructor(private criteria_Service: criteriaService) {
    effect(() => {
      this.criteria_Service.updatePriceCriteria({
        minPrice: this.minPrice(),
        maxPrice: this.maxPrice(),
      });
    });
  }

  ngOnInit(): void {
    console.log('PriceCriteriaComponent ngOnInit');
  }
}
