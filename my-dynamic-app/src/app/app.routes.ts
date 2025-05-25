import { Routes } from '@angular/router';
import {ReportComponent} from "./report/report.component";
import {AppComponent} from "./app.component";

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'report/:name', component: ReportComponent }
]
