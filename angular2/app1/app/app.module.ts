//Every Angular application has at least one module: the root module, named AppModule here.
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
// Edit the file app/app.module.ts to import your new AppComponent and add it in the declarations and bootstrap fields in the NgModule decorator:
import {AppComponent} from './app.component'
@NgModule({
	imports:[BrowserModule],
	declarations:[AppComponent],
	bootstrap:[AppComponent],
	})
export class AppModule{}

