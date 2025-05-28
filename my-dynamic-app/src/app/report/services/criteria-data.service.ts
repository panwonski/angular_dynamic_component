import { Injectable, Signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CriteriaDataService {
  private criteriaSignals: Map<string, Signal<any>> = new Map();

  registerCriteriaSignal(criteriaId: string, signal: Signal<any>) {
    this.criteriaSignals.set(criteriaId, signal);
  }

  getAllCriteriaData(): Record<string, any> {
    const data: Record<string, any> = {};
    this.criteriaSignals.forEach((signal, id) => {
      data[id] = signal();
    });
    return data;
  }
}
