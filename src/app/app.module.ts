import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../environments/environment';
import { CoreModule } from './core/core.module';
import { CoreComponent } from './core/core.component';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    CoreModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [CoreComponent]
})
export class AppModule { }
