import {Injectable} from '@angular/core';
import {Gruppe} from "../pojos/gruppe";
import {Http} from "@angular/http";
import {Sus} from "../pojos/sus";
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class GroupService {
  private url = 'http://geihe.net/sitzplan2/rest/';

  constructor(private http: Http,) {
  }

  getGroups(): Observable<Gruppe[]> {
    let url = this.url + 'gruppen';
  return this.http.get(url).map(res => this.createGroups(res.json()));
}

  private createGroups(gTemplate:any[]): Gruppe[] {
    let g: Gruppe[] = [];
    gTemplate.forEach(gv => g.push(new Gruppe(gv)) );
    return g;
  }

  getGroupFromName(name:string): Observable<Gruppe> {
    let url = this.url + 'gruppe/' + name;
    return this.http.get(url).map(res => new Gruppe(res.json()));
  }
  getGroupFromId(id:number): Observable<Gruppe> {
    let url = this.url + 'gruppe_id/' + id;
    return this.http.get(url).map(res => new Gruppe(res.json()));
  }

  getSusFromGroupId(id) : Observable<Sus[]> {
    let url = this.url + 'suslist/' + id;

    return this.http.get(url).map(res => this.createSus(res.json()));
  }

  private createSus(sTemplate:any[]): Sus[] {
    let s: Sus[] = [];
    sTemplate.forEach(sv => s.push(new Sus(sv)) );
    return s;
  }

  updateGroupName(gruppe: Gruppe):Observable<any> {
    let url = this.url + 'gruppe/';
    return this.http.post(url, JSON.stringify(gruppe));
  }

  deleteSus(id:number) {
    let url = this.url + 'sus/' + id;
    return this.http.delete(url);
  }

  addSus(sus:Sus) {
    let url = this.url + 'sus';
    return this.http.post(url, JSON.stringify(sus));
  }

  deleteGroup(bezeichnung:string) {
    let url = this.url + 'gruppe/' + bezeichnung;

    return this.http.delete(url);
  }

  addGroup(newGroupName: string) {
    let group:Gruppe = Gruppe.getLeereGruppe();
    group.bezeichnung = newGroupName;
    return this.updateGroupName(group);
  }
}

