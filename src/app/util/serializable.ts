export class Serializable {

  constructor (template) {
    if (template) {
      this.fillFromTemplate(template);
    }
  }

  fillFromTemplate(template:Object) {
    for (let propName in template) {
      this[propName] = template[propName]
    }
  }
}
