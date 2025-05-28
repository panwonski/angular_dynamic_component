import {Component, OnInit, Input} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: "date-criteria",
  templateUrl: "./PriceCriteria.component.html",
  styleUrls: ["./PriceCriteria.component.scss"],
  standalone: true,
  imports: [
    FormsModule, CommonModule
  ],
})
export class PriceCriteriaComponent implements OnInit {
  minPrice: number = 0;
  maxPrice: number = 1000;

  @Input() selectedMinPrice!: number | null;
  @Input() selectedMaxPrice!: number | null;
  @Input() config!: any;




  ngOnInit(): void {
    console.log("PriceCriteriaComponent ngOnInit");
  }

  constructor() {
    console.log("PriceCriteriaComponent initialized");
  }
}
