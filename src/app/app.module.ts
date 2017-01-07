import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule, Routes} from "@angular/router";
import {AppComponent} from './app.component';
import {GroupSelectComponent } from './group-select/group-select.component';
import {GroupService} from "./services/group.service";
import { GroupComponent } from './group/group.component';
import {SusNeuComponent} from "./group/sus-neu/sus-neu.component";
import { GroupTitleComponent } from './group/group-title/group-title.component';
import { IsNewName } from './directives/is-new-name.directive';
import { UrlSafeDirective } from './directives/url-safe.directive';
import { FocusDirective } from './directives/focus.directive';
import { GroupDeleteComponent } from './group/group-delete/group-delete.component';
import { PlanSelectComponent } from './plan-select/plan-select.component';
import { PlanComponent } from './plan/plan.component';
import {RouterService} from "./services/router-service";
import {PlanService} from "./services/plan-service";
import {PlanLayoutService} from "./services/plan-layout-service";
import { PlanTitelComponent } from './plan/plan-titel/plan-titel.component';


const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: GroupSelectComponent},
  {path: ':name/edit', component: GroupComponent},
  {path: ':name/plan', component: PlanSelectComponent},
  {path: 'plan/:plan_id', component: PlanComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    GroupSelectComponent,
    GroupComponent,
    SusNeuComponent,
    GroupTitleComponent,
    IsNewName,
    UrlSafeDirective,
    FocusDirective,
    GroupDeleteComponent,
    PlanSelectComponent,
    PlanComponent,
    PlanTitelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [GroupService, RouterService, PlanService, PlanLayoutService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
