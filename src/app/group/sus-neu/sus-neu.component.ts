import {Component, OnInit, Output, EventEmitter, Input, AfterViewInit} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'sus-neu',
  templateUrl: './sus-neu.component.html',
  styleUrls: ['./sus-neu.component.css']
})
export class SusNeuComponent implements OnInit, AfterViewInit {
  anzeigename:string;
  nachname:string;
  @Output() onNewSus = new EventEmitter<Object>();
  @Input() nameList: string[];

  myFocusEmitter = new EventEmitter<boolean>()

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.myFocusEmitter.emit(true);
  }

  addSus(form: NgForm) {
    this.onNewSus.emit(form.value);
    this.myFocusEmitter.emit(true);
  }
}
