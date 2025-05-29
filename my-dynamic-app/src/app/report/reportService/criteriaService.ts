// criteriaService.ts
import { Injectable, signal, WritableSignal } from '@angular/core';

export interface AddressCriteria {
  country: string;
  city: string;
  street: string;
  zipCode: string;
}

export interface PriceCriteria {
  minPrice: number | null;
  maxPrice: number | null;
}

export interface DateCriteria {
  startDate: string | null;
  endDate: string | null;
}

@Injectable({ providedIn: 'root' })
export class criteriaService {
  // Signals holding form state
  public addressCriteria: WritableSignal<AddressCriteria> = signal({
    country: '',
    city: '',
    street: '',
    zipCode: '',
  });

  public priceCriteria: WritableSignal<PriceCriteria> = signal({
    minPrice: null,
    maxPrice: null,
  });

  public dateCriteria: WritableSignal<DateCriteria> = signal({
    startDate: null,
    endDate: null,
  });

  // Methods to update criteria state
  updateAddressCriteria(data: Partial<AddressCriteria>) {
    this.addressCriteria.update((old) => ({ ...old, ...data }));
  }

  updatePriceCriteria(data: Partial<PriceCriteria>) {
    this.priceCriteria.update((old) => ({ ...old, ...data }));
  }

  updateDateCriteria(data: Partial<DateCriteria>) {
    this.dateCriteria.update((old) => ({ ...old, ...data }));
  }

  // Method to get combined form data snapshot (readonly object)
  getCurrentCriteria() {
    return {
      address: this.addressCriteria(),
      price: this.priceCriteria(),
      date: this.dateCriteria(),
    };
  }
}
