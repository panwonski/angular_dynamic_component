import {
  Component,
  ViewChild,
  QueryList,
  OnInit,
  signal,
  Signal,
  effect,
  ChangeDetectorRef,
} from '@angular/core';
import {
  ReportItem,
  ReportTypeDefinition,
} from './configuration/ReportTypeDefinition';

import { DynamicReportComponent } from './dynamic-report/DynamicReport.component';
import { ActivatedRoute } from '@angular/router';
import { inject } from '@angular/core';
import { NgForOf, CommonModule } from '@angular/common';
import { criteriaService } from '../report/reportService/criteriaService';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  imports: [DynamicReportComponent, CommonModule],
  standalone: true,
  providers: [ReportTypeDefinition],
})
export class ReportComponent implements OnInit {
  // @ViewChild(DynamicReportComponent) dynamicReport!: DynamicReportComponent;

  showAddress = true;
  private route = inject(ActivatedRoute);
  private reportTypeDefinition = inject(ReportTypeDefinition);
  public report!: ReportItem;
  searchResults: any[] = [];

  ngOnInit(): void {
    console.log('Report Component ngOnInit');
    this.selectReport();
    console.log('report', this.report);
  }

  constructor(
    private criteria_Service: criteriaService,
    private cdr: ChangeDetectorRef
  ) {
    console.log('ReportComponent initialized');

    //    // ✅ Automatically update formData whenever any signal changes
    //   effect(() => {
    //   const data = this.criteria_Service.getCurrentCriteria();
    //   this.formData = data;
    //   this.cdr.markForCheck();
    // });
  }

  selectReport() {
    const name = this.route.snapshot.paramMap.get('name');
    const report = this.reportTypeDefinition.getReportByName(name);
    if (report) {
      this.report = report;

      if (this.report?.name === 'LIST_OF_ITEMS_WITHOUT_CITY') {
        this.showAddress = false;
      } else {
        this.showAddress = true;
      }
      console.log(`Selected report: ${report.name}`);
    } else {
      console.error(`Report with name ${name} not found`);
    }
  }

  formData: any = null;

  onClickSearch() {
    this.formData = this.criteria_Service.getCurrentCriteria();
    console.log('Form data collected from service:', this.formData);
  }
}
