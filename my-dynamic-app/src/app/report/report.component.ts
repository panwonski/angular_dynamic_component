import {Component, OnInit} from "@angular/core";
import {ReportItem, ReportTypeDefinition} from "./configuration/ReportTypeDefinition";
import {DynamicReportComponent} from "./dynamic-report/DynamicReport.component";
import {ActivatedRoute} from "@angular/router";
import {inject} from "@angular/core";
import {NgForOf} from "@angular/common";


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  imports: [
    DynamicReportComponent,
    NgForOf
  ],
  standalone: true,
  providers: [
    ReportTypeDefinition
  ]
})
export class ReportComponent implements OnInit {
  private route = inject(ActivatedRoute)
  private reportTypeDefinition = inject(ReportTypeDefinition);
  public report!: ReportItem;

  ngOnInit(): void {
    console.log('Report Component ngOnInit');
    this.selectReport();
    console.log('report', this.report);
  }

  constructor() {
    console.log("ReportComponent initialized");
  }

  selectReport() {
    const name = this.route.snapshot.paramMap.get("name");
    const report = this.reportTypeDefinition.getReportByName(name);
    if (report) {
      this.report = report;
      console.log(`Selected report: ${report.name}`);
    } else {
      console.error(`Report with name ${name} not found`);
    }
  }

  onClickSearch() {
    console.log("Search button clicked");
    // Here you can implement the logic to fetch the report data based on the criteria
  }

}