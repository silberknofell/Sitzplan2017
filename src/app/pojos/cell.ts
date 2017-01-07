import {ICell} from "./icell";
import {ArrayUtil} from "../util/array-util";
export class Cell implements ICell{
  classes: string[] = [];
  text="";

  constructor(public i:number, public j:number) {
    this.classes=['cell'];
  }

  is(attribute: string): boolean {
    return ArrayUtil.isInArray(this.classes, attribute);
  }

  toggle(attribute: string):void {
    return ArrayUtil.toggleArrayItem(this.classes, attribute);
  }
}
