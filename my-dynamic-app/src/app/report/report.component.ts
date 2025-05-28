import {Component, inject, OnInit, signal, WritableSignal} from "@angular/core";
import {ReportItem, ReportTypeDefinition} from "./configuration/ReportTypeDefinition";
import {DynamicReportComponent} from "./dynamic-report/DynamicReport.component";
import {ActivatedRoute} from "@angular/router";
import {NgForOf} from "@angular/common";
import {FormArray, FormGroup, ReactiveFormsModule} from "@angular/forms";


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  imports: [
    DynamicReportComponent,
    NgForOf,
    ReactiveFormsModule
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

  // Fix the type declaration to explicitly use FormGroup
  dynamicComponentForms: WritableSignal<FormArray<FormGroup>> = signal(new FormArray<FormGroup>([]));

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

  // Update to accept FormGroup and add it to FormArray
  handleChangeOnDynamicCriteriaForms(form: FormGroup): void {
    const currentForms = this.dynamicComponentForms();

    // Check if this form is already in the array
    const formIndex = Array.from(currentForms.controls).findIndex(
      control => control === form
    );

    if (formIndex === -1) {
      // If not found, add it
      currentForms.push(form);
    } else {
      // If found, update it (though this may not be necessary since it's the same reference)
      currentForms.setControl(formIndex, form);
    }

    console.log('Dynamic forms updated:', currentForms.value);
  }

  onClickSearch() {
    console.log("Search button clicked");

    // Access the dynamic forms through the signal
    const dynamicForms = this.dynamicComponentForms();
    if (dynamicForms.length > 0) {
      // Log each form's value
      dynamicForms.controls.forEach((form, index) => {
        console.log(`Form ${index} data:`, form.value);
      });

      // Combine all form values into a single object if needed
      const allFormValues = dynamicForms.controls.reduce((result, form) => {
        return { ...result, ...form.value };
      }, {});

      console.log("Combined form data:", allFormValues);
      // Here you can implement the logic to fetch the report data based on the criteria
    }
  }
}
