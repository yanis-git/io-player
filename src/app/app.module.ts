import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IoPlayerComponent } from './io-player/io-player/io-player.component';
import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [IoPlayerComponent],
  entryComponents: [IoPlayerComponent],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: []
})
export class AppModule {
    constructor(private injector: Injector) {
        const customElement = createCustomElement(IoPlayerComponent, { injector });
        customElements.define('io-player', customElement);
    }

    ngDoBootstrap() { }

}
