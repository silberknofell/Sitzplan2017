export class ArrayUtil {
  static toggleArrayItem(a, v) {
    var i = a.indexOf(v);
    if (i === -1)
      a.push(v);
    else
      a.splice(i, 1);
  }

  static isInArray(a, v): boolean {
    return a.indexOf(v) >= 0;
  }
}
