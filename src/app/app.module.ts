import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MegaMenuModule } from 'primeng/megamenu';
import { PaperComponent } from './paper/paper.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { InterfacePanelComponent } from './interface-panel/interface-panel.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { AppRoutingModule } from './app.routing';
import { ChipModule } from 'primeng/chip';
import { HttpServiceService } from './services/http-service.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent,
        PaperComponent,
        InterfacePanelComponent,
        UserPanelComponent,
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        MenuModule,
        ButtonModule,
        BreadcrumbModule,
        MegaMenuModule,
        ProgressBarModule,
        ChipModule,
        HttpClientModule,
    ],
    providers: [HttpServiceService],
    bootstrap: [AppComponent],
})
export class AppModule {}
