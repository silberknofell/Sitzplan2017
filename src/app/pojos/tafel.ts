import {Cell} from "./cell";
import {createClassStmt} from "@angular/compiler/src/output/class_builder";
export class Tafel extends Cell{
  constructor() {
    super(0, 3);
    this.classes.push('fest');
    this.classes.push('tafel');
    this.text = "Tafel";
  }
}
