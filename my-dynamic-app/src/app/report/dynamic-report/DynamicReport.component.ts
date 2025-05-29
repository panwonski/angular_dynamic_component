import { Component, ViewChildren, QueryList, Input } from '@angular/core';
import { AddressCriteriaComponent } from '../criteria/AddressCriteria/AddressCriteria.component';
import { PriceCriteriaComponent } from '../criteria/PriceCriteria/PriceCriteria.component';
import { DateCriteriaComponent } from '../criteria/DateCriteria/DateCriteria.component';
import { NgComponentOutlet, NgForOf, CommonModule } from '@angular/common';
import {
  ReportTypeDefinition,
  ReportItem,
} from '../configuration/ReportTypeDefinition';

@Component({
  selector: 'dynamic-report',
  templateUrl: './DynamicReport.component.html',
  styleUrls: ['./DynamicReport.component.scss'],
  imports: [NgComponentOutlet, NgForOf, CommonModule],
  standalone: true,
  providers: [],
})
export class DynamicReportComponent {
  @Input() report!: any;

  constructor(private reportTypeDef: ReportTypeDefinition) {
    console.log('DynamicReportComponent initialized');
  }

  ngOnInit(): void {
    console.log('DynamicReportComponent ngOnInit');
    // For example, pick a report by name
    // this.selectedReport = this.reportTypeDef.getReportByName('LIST_OF_ITEMS_WITH_CITY');
  }
}
