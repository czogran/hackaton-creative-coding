import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { InterfacePanelComponent } from './interface-panel/interface-panel.component';
import {NgModule} from "@angular/core";

const routes: Routes = [
    {
        path: 'user',
        component: UserPanelComponent,
    },
    {
        path: 'interface',
        component: InterfacePanelComponent,
    },
    { path: '**', redirectTo: 'user' },
];

const options: ExtraOptions = {
    anchorScrolling: 'enabled',
    onSameUrlNavigation: 'reload',
    scrollPositionRestoration: 'enabled',
};

@NgModule({
    imports: [RouterModule.forRoot(routes, options)],
    exports: [RouterModule],
    providers: [],
})
export class AppRoutingModule {}
