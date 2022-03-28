/**
 * Section polyfill
 */
// Used for reflect-metadata in JIT. If you use AOT (and only Angular decorators), you can remove.
import 'core-js/es/reflect';
// Used for browsers with partially native support of Custom Elements
import '@webcomponents/custom-elements/src/native-shim';
// Used for browsers without a native support of Custom Elements
import '@webcomponents/custom-elements/custom-elements.min';
import 'zone.js';  // Included with Angular CLI.

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
