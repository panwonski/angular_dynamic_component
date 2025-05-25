import {Component, Input} from "@angular/core";
import {ReportItem} from "../configuration/ReportTypeDefinition";
import {AddressCriteriaComponent} from "../criteria/AddressCriteria/AddressCriteria.component";
import {PriceCriteriaComponent} from "../criteria/PriceCriteria/PriceCriteria.component";
import {DateCriteriaComponent} from "../criteria/DateCriteria/DateCriteria.component";
import {NgComponentOutlet, NgForOf} from "@angular/common";



@Component({
  selector: 'dynamic-report',
  templateUrl: './DynamicReport.component.html',
  styleUrls: ['./DynamicReport.component.scss'],
  imports: [NgComponentOutlet, NgForOf],
  standalone: true,
  providers: []
})
export class DynamicReportComponent {
  @Input() report!: ReportItem;


  constructor() {
    console.log("DynamicReportComponent initialized");
  }

  ngOnInit(): void {
    console.log('DynamicReportComponent ngOnInit');

  }


}