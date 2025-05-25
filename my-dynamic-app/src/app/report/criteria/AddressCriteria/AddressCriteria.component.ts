import {Component, OnInit, Input} from "@angular/core";
import {FormsModule} from "@angular/forms";
import { CommonModule } from '@angular/common';

@Component({
  selector: "address-criteria",
  templateUrl: "./AddressCriteria.component.html",
  styleUrls: ["./AddressCriteria.component.scss"],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class AddressCriteriaComponent implements OnInit {
  cityList: string[] = [];
  countryList: string[] = [];
  street: string = "";
  zipCode: string = "";

  @Input() selectedCity!: string | null;
  @Input() selectedCountry!: string | null;
  @Input() providedStreet!: string | null;
  @Input() providedZipCode!: string | null;


  ngOnInit(): void {
    this.loadCities();
    this.loadCountries();
    console.log("AddressCriteriaComponent ngOnInit");
  }

  constructor() {
    console.log("AddressCriteriaComponent initialized");
  }

  loadCities() {
    // it will be async
    // Simulate an API call to fetch cities based on the selected country
    this.cityList = ["New York", "Los Angeles", "Chicago", "Toronto", "Vancouver", "Mexico City"];
  }

  loadCountries() {
    // it will be async
    // Simulate an API call to fetch countries
    this.countryList = ["USA", "Canada", "Mexico"];
  }
}