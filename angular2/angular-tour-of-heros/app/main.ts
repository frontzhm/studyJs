// Now you need to tell Angular to start up your application.
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app.module';
const platform  = platformBrowserDynamic();
platform.bootstrapModule(AppModule);

