import { Component, OnInit } from '@angular/core';
import { faBars, faPlay, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dropmenu',
  templateUrl: './dropmenu.component.html',
  styleUrls: ['./dropmenu.component.css']
})
export class DropmenuComponent implements OnInit {
  faBars = faBars;
  faPlay = faPlay;
  faUser = faUser;
  faSignOutAlt = faSignOutAlt;
  isActive:Boolean = false;

  constructor(private router: Router, private auth:AuthService) {
  }

  ngOnInit(): void {
  }

  setActive() {
    let active = {
      'is-active': this.isActive
    }

    return active;
  }

  onToggle() {
    this.isActive = !this.isActive;
  }

  onClickGame() {
    this.router.navigate(['/game']);
  }

  onClickAccount() {
    this.router.navigate(['/account']);
  }

  onClickLogout() {
    this.auth.clearAuthentication();
    this.router.navigate(['/']);
  }

}
