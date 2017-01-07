import {Router, ActivatedRoute} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable()
export class RouterService {
  constructor(private router: Router, private route: ActivatedRoute) {
    };

  navigateToHome() {
    this.router.navigateByUrl('/home');
  }

  navigateToGroupEdit(groupName: string) {
    this.router.navigateByUrl(groupName + '/edit');
  }

  navigateToPlanSelect(groupName: string) {
    this.router.navigateByUrl(groupName + '/plan');
  }

  navigateToPlan(planId: number) {
    this.router.navigateByUrl('/plan/' + planId);
  }
}
