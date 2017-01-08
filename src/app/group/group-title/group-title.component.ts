import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {GroupService} from "../../services/group.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'group-title',
  templateUrl: './group-title.component.html',
  styleUrls: ['./group-title.component.css']
})
export class GroupTitleComponent implements OnInit {
  @Input() name: string;
  @Output() onNewGroupName = new EventEmitter<string>();
  @Output() onDeleteGroup = new EventEmitter<string>();
  @Output() onNewPlan = new EventEmitter<string>();

  groupList: string[] = [];
  myFocusEmitter = new EventEmitter<boolean>()

  constructor(private groupService: GroupService) {
  }

  ngOnInit() {
    this.groupService.getGroups()
      .subscribe(gruppen => this.groupList = gruppen.map(g => g.bezeichnung.trim()));
  }

  saveNewGroupName(form: NgForm) {
    if (form.valid) {
      this.onNewGroupName.emit(form.value.newName);
      form.reset();
    }
  }

  newPlan() {
    this.onNewPlan.emit();
  }

  passDeleteEvent(name: string) {
    this.onDeleteGroup.emit(name);
  }
}
