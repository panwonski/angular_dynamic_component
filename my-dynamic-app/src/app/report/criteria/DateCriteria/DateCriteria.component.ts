import {Component, Input, OnInit} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: "date-criteria",
  templateUrl: "./DateCriteria.component.html",
  styleUrls: ["./DateCriteria.component.scss"],
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
})
export class DateCriteriaComponent implements OnInit {
  dateFrom: string = "";
  dateTo: string = "";

  @Input() selectedDateFrom!: Date | null;
  @Input() selectedDateTo!: Date | null;


  ngOnInit(): void {
    console.log("DateCriteriaComponent ngOnInit");
  }

  constructor() {
    console.log("DateCriteriaComponent initialized");
  }
}