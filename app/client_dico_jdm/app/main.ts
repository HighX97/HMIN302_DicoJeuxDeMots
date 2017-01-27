import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
// The app module factory produced by the static offline compiler
//Not run
import { AppModuleNgFactory } from './app.module.ngfactory';


const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);
