import {Component, OnInit} from '@angular/core';
import {Gruppe} from "../pojos/gruppe";
import {GroupService} from "../services/group.service";
import {Form, NgForm} from "@angular/forms";
import {RouterService} from "../services/router-service";
import {ActivatedRoute} from "@angular/router";
import {PlanService} from "../services/plan-service";

@Component({
  selector: 'group-select',
  templateUrl: './group-select.component.html',
  styleUrls: ['./group-select.component.css']
})


export class GroupSelectComponent implements OnInit {
  title = 'Gruppenauswahl';
  gruppen: Gruppe[] = [];
  gruppenNamen: string[];
  private newGroupToggle: boolean = false;

  constructor(private groupService: GroupService,
              private routerService: RouterService) {
  }

  ngOnInit() {
    this.groupService.getGroups().subscribe(gruppen => {
      this.gruppen = gruppen;
      this.gruppenNamen = gruppen.map(g => g.bezeichnung.trim());
    });
  }

  onSelect(group: Gruppe) {
    this.routerService.navigateToPlanSelect(group.bezeichnung);
  }

  onNewGroupToggle() {
    this.newGroupToggle = !this.newGroupToggle;
  }

  saveNewGroup(form: NgForm) {
    let newGroupName: string = form.value.newGroupName;
    console.log(form);
    if (form.valid) {
      this.groupService.addGroup(newGroupName).subscribe(() => this.ngOnInit());
    } else alert("Gruppenname nicht erlaubt.");
  }
}
