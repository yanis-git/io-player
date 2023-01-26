import {IoPlayerComponent} from './io-player/io-player.component';
import {BrowserModule} from '@angular/platform-browser';
import {DoBootstrap, Injector, NgModule} from '@angular/core';
import {createCustomElement} from '@angular/elements';

@NgModule({
    declarations: [
        IoPlayerComponent
    ],
    imports: [
        BrowserModule
    ],
    exports: [
        IoPlayerComponent
    ],
    providers: [],
    bootstrap: []
})
export class IoPlayerModule implements DoBootstrap {
  constructor(private injector: Injector) {
    const customElement = createCustomElement(IoPlayerComponent, {injector});
    customElements.define('io-player', customElement);
  }

  // eslint-disable-next-line  @angular-eslint/no-empty-lifecycle-method
  ngDoBootstrap() {
  }
}
