import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';

import {provideHttpClient} from "@angular/common/http";
import {provideStore} from "@ngrx/store";
import {provideEffects} from "@ngrx/effects";
import {NgxUiLoaderHttpModule, NgxUiLoaderRouterModule} from "ngx-ui-loader";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore(),
    provideEffects(),
    importProvidersFrom(NgxUiLoaderHttpModule.forRoot({showForeground: true})),
    importProvidersFrom(NgxUiLoaderRouterModule.forRoot({showForeground: true}))
  ]
};
