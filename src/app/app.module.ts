import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IoPlayerComponent } from './io-player/io-player/io-player.component';
import { createCustomElement } from '@angular/elements';
import {IoPlayerModule} from './io-player/io-player.module';

@NgModule({
  declarations: [],
  entryComponents: [],
  imports: [
    BrowserModule,
    IoPlayerModule
  ],
  providers: [],
  bootstrap: []
})
export class AppModule {
    constructor(private injector: Injector) { }
    ngDoBootstrap() { }
}
