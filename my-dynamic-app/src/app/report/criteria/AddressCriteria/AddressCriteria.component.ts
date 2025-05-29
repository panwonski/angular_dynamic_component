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
  selector: 'address-criteria',
  templateUrl: './AddressCriteria.component.html',
  styleUrls: ['./AddressCriteria.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class AddressCriteriaComponent implements OnInit {
  @Input() config: any; // <-- Add this line!

  cityList: string[] = [];
  countryList: string[] = [];
  selectedCountry = signal<string>('');
  selectedCity = signal<string>('');
  providedStreet = signal<string>('');
  providedZipCode = signal<string>('');

  constructor(private criteria_Service: criteriaService) {
    effect(() => {
      this.criteria_Service.updateAddressCriteria({
        country: this.selectedCountry(),
        city: this.selectedCity(),
        street: this.providedStreet(),
        zipCode: this.providedZipCode(),
      });
    });
  }

  ngOnInit(): void {
    this.loadCities();
    this.loadCountries();
  }

  loadCities() {
    this.cityList = [
      'New York',
      'Los Angeles',
      'Chicago',
      'Toronto',
      'Vancouver',
      'Mexico City',
    ];
  }

  loadCountries() {
    this.countryList = ['USA', 'Canada', 'Mexico'];
  }
}
