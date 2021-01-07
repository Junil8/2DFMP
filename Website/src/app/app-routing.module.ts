import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuardService } from './services/guard.service';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { GameComponent } from './components/game/game.component';
import { AccountComponent } from './components/account/account.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'game', component: GameComponent, canActivate: [GuardService], runGuardsAndResolvers: 'always' },
  { path: 'account', component: AccountComponent, canActivate: [GuardService], runGuardsAndResolvers: 'always' },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload',
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
