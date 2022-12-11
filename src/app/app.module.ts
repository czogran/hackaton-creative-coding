import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {MenuModule} from "primeng/menu";
import {ButtonModule} from "primeng/button";
import {BreadcrumbModule} from "primeng/breadcrumb";
import {MegaMenuModule} from "primeng/megamenu";
import { PaperComponent } from './paper/paper.component';

@NgModule({
  declarations: [
    AppComponent,
    PaperComponent
  ],
  imports: [
    BrowserModule,
    MenuModule,
    ButtonModule,
    BreadcrumbModule,
    MegaMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
