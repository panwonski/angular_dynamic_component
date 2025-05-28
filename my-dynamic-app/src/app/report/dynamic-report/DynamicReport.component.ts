import {Component, Input, output, signal} from "@angular/core";
import {ReportItem} from "../configuration/ReportTypeDefinition";
import {AddressCriteriaComponent} from "../criteria/AddressCriteria/AddressCriteria.component";
import {PriceCriteriaComponent} from "../criteria/PriceCriteria/PriceCriteria.component";
import {DateCriteriaComponent} from "../criteria/DateCriteria/DateCriteria.component";
import {NgComponentOutlet, NgForOf, NgIf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";


@Component({
  selector: 'dynamic-report',
  templateUrl: './DynamicReport.component.html',
  styleUrls: ['./DynamicReport.component.scss'],
  imports: [NgComponentOutlet, NgForOf, ReactiveFormsModule, NgIf],
  standalone: true,
  providers: []
})
export class DynamicReportComponent {
  @Input() report!: ReportItem;

  // Create a signal for the form
  formSignal = signal<FormGroup>(new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(5)]),
    dynamicBirthDate: new FormGroup({
      day: new FormControl("", [
        Validators.required,
        Validators.min(1),
        Validators.max(31),
      ]),
      month: new FormControl("", [
        Validators.required,
        Validators.min(1),
        Validators.max(12),
      ]),
      year: new FormControl("", [
        Validators.required,
        Validators.min(1900),
        Validators.max(new Date().getFullYear()),
      ]),
    }),
  }));

  // Create an output to notify parent of form changes
  formChange = output<FormGroup>();


  // Make the dynamic form easily accessible
  get dynamicSignUpForm(): FormGroup {
    return this.formSignal();
  }

  constructor() {
    console.log("DynamicReportComponent initialized");
  }

  ngOnInit(): void {
    console.log('DynamicReportComponent ngOnInit');
    console.log('DynamicReportComponent criteriaList',  this.report.criteriaList)
    // Notify parent of the initial form
    this.formChange.emit(this.dynamicSignUpForm);

    // Subscribe to form value changes
    this.dynamicSignUpForm.valueChanges.subscribe(() => {
      // Emit the form whenever it changes
      this.formChange.emit(this.dynamicSignUpForm);
    });
  }

  onFormSubmit() {
    if (this.dynamicSignUpForm.valid) {
      console.log('Form submitted with values:', this.dynamicSignUpForm.value);
      this.formChange.emit(this.dynamicSignUpForm);
    }
  }
}
