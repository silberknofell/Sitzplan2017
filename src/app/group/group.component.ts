import {Component, OnInit} from '@angular/core';
import {GroupService} from "../services/group.service";
import {Gruppe} from "../pojos/gruppe";
import {Sus} from "../pojos/sus";
import {RouterService} from "../services/router-service";
import {ActivatedRoute} from "@angular/router";
import {PlanService} from "../services/plan-service";
@Component({
  selector: 'group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  private _gruppe: Gruppe = Gruppe.getLeereGruppe();
  private _sus:Sus[];
  anzeigenamen :string[];

  get gruppe(): Gruppe {
    return this._gruppe;
  }

  set gruppe(value: Gruppe) {
    this._gruppe = value;
    this.reloadSusList();
  }
  private reloadSusList() {
    this.groupService.getSusFromGroupId(this._gruppe.id).subscribe(susList => this.susList = susList);
  }

  get susList(): Sus[] {
    return this._sus;
  }

  set susList(value: Sus[]) {
    this._sus = value;
    this.anzeigenamen = value.map(sus => sus.name);
  }

  constructor(private groupService:GroupService,
              private routerService: RouterService,
              private route: ActivatedRoute,
              private planService: PlanService) {
    route.params.subscribe((p) => this.setName(p['name']));
  }

  ngOnInit() {

  }


  setName(name:string) {
    this.groupService.getGroupFromName(name).subscribe(g => this.gruppe = g);
  }

  onNewGroupName(newName:string) {
    this.gruppe.bezeichnung = newName;
    this.groupService.updateGroupName(this.gruppe).subscribe(
      () => this.routerService.navigateToGroupEdit(this.gruppe.bezeichnung)
    );
  }

  deleteSus(susId:number) {
    this.groupService.deleteSus(susId).subscribe(
      () => this.reloadSusList()
    );
  }

  onNewSus(susVorlage) {
    let groupId = this.gruppe.id;
    let sus = Sus.leererSus(groupId);
    sus.nachname = susVorlage.nachname;
    sus.name = susVorlage.anzeigename;
    this.groupService.addSus(sus).subscribe(
      () => this.reloadSusList()
    );
  }

  onDeleteGroup(name:string) {
    this.groupService.deleteGroup(name).subscribe(
      () => this.routerService.navigateToHome()
    );
  }

  onNewPlan() {
    this.planService.buildNewPlan(this.gruppe.id);
  }
}
