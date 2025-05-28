import {Component, Input, OnInit} from "@angular/core";
import {FormsModule} from "@angular/forms";

@Component({
  selector: "date-criteria",
  templateUrl: "./DateCriteria.component.html",
  styleUrls: ["./DateCriteria.component.scss"],
  standalone: true,
  imports: [
    FormsModule
  ],
})
export class DateCriteriaComponent implements OnInit {
  dateFrom: string = "";
  dateTo: string = "";

  @Input() selectedDateFrom!: Date | null;
  @Input() selectedDateTo!: Date | null;
  @Input() config!: any;


  ngOnInit(): void {
    console.log("DateCriteriaComponent ngOnInit");
  }

  constructor() {
    console.log("DateCriteriaComponent initialized");
  }
}