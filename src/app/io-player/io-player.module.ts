import {IoPlayerComponent} from './io-player/io-player.component';
import {BrowserModule} from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';
import {createCustomElement} from '@angular/elements';

@NgModule({
    declarations: [
        IoPlayerComponent
    ],
    entryComponents: [
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
export class IoPlayerModule {
    constructor(private injector: Injector) {
        const customElement = createCustomElement(IoPlayerComponent, { injector });
        customElements.define('io-player', customElement);
    }

    ngDoBootstrap() { }

}
