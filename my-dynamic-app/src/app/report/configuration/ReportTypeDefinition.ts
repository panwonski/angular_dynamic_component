import {ReportGroupEnum} from "../enum/ReportGroupEnum";
import {ReportNameEnum} from "../enum/ReportNameEnum";
import {Injectable} from "@angular/core";
import {AddressCriteriaComponent} from "../criteria/AddressCriteria/AddressCriteria.component";
import {PriceCriteriaComponent} from "../criteria/PriceCriteria/PriceCriteria.component";
import {DateCriteriaComponent} from "../criteria/DateCriteria/DateCriteria.component";


export class ReportItem {
  name: ReportNameEnum;
  group: ReportGroupEnum;
  title: string;
  tableHeader: string[];
  backendUrl: string;
  criteriaList: any[]

  constructor(name: ReportNameEnum, group: ReportGroupEnum, title: string, tableHeader: string[], backendUrl: string, criteriaComponentList: any[]) {
    this.name = name;
    this.group = group;
    this.title = title;
    this.tableHeader = tableHeader;
    this.backendUrl = backendUrl;
    this.criteriaList = criteriaComponentList;
  }
}

@Injectable()
export class ReportTypeDefinition {
  reportConfigurationList: ReportItem[] = [
    {
      name: ReportNameEnum.LIST_OF_ITEMS_WITH_CITY,
      group: ReportGroupEnum.GROUP_A,
      title: "List of things with city",
      tableHeader: ["Name", "City", "Price"],
      backendUrl: "http://localhost:8080/api/report/list-of-items-with-city",
      criteriaList: [
        {
          component: AddressCriteriaComponent,
          config: {
            fields: [
              {
                city: {required: true, visible: true},
                street: {required: false, visible: true},
                zipCode: {required: false, visible: true},
                country: {required: false, visible: true},
                secretField: {required: false, visible: false}
              }
            ]
          }
        },
        {
          component: PriceCriteriaComponent,
          config: {
            fields: [
              {minPrice: {required: false, visible: true}},
              {maxPrice: {required: false, visible: true}}
            ]
          }
        },
        {
          component: DateCriteriaComponent,
          config: {
            fields: [
              {startDate: {required: true, visible: true}},
              {endDate: {required: true, visible: true}}
            ]
          }
        }
      ]
    },
    {
      name: ReportNameEnum.LIST_OF_ITEMS_WITHOUT_CITY,
      group: ReportGroupEnum.GROUP_B,
      title: "List of things without city",
      tableHeader: ["Name", "Price"],
      backendUrl: "http://localhost:8080/api/report/list-of-items-without-city",
      criteriaList: [
        {
          component: PriceCriteriaComponent,
          config: {
            fields: [
              {minPrice: {required: false, visible: true}},
              {maxPrice: {required: false, visible: true}}
            ]
          }
        },
        {
          component: DateCriteriaComponent,
          config: {
            fields: [
              {startDate: {required: false, visible: true}},
              {endDate: {required: false, visible: true}}
            ]
          }
        }
      ]
    }
  ]

  getReportByName(name: string | null): ReportItem | undefined {
    if (!name) {
      return undefined;
    }
    // Find the enum value by string
    const enumValue = Object.values(ReportNameEnum).find(val => val === name);
    if (!enumValue) {
      return undefined;
    }
    // Find the report by enum value
    return this.reportConfigurationList.find(report => report.name === enumValue);
  }
}