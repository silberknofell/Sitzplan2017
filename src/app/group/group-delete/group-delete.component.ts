import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {GroupService} from "../../services/group.service";

@Component({
  selector: 'group-delete',
  templateUrl: './group-delete.component.html',
  styleUrls: ['./group-delete.component.css']
})
export class GroupDeleteComponent implements OnInit {
  @Input() name: string;
  @Output() onDeleteGroup = new EventEmitter<string>();
  eingabeName: string;
  deleteGroup: boolean;

  constructor() {
  }

  ngOnInit() {
    this.deleteGroup = false;
  }

  deleteGroupToggle() {
    this.deleteGroup = ! this.deleteGroup;
  }

  keyDownFunction(event) {
    if (event.keyCode == 13) {
      if (this.eingabeName == this.name) {
        console.log("Lösche Gruppe " + this.name);
        this.onDeleteGroup.emit(this.name);
      } else {
        alert("Name stimmt nicht. Es wird nichts gelöscht.");
      }
    }
  }

}
