export interface ICell {
  i:number;
  j:number;
  classes: string[];
  text:string
  is(attribute:string):boolean;
  toggle(attribute:string):void;
}
