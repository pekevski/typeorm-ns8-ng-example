import { Component, OnInit } from '@angular/core'
import { User } from '~/models/User'

import {UserService} from './user.service';

@Component({
  selector: 'ns-items',
  template: `
    <ActionBar title="My App"> </ActionBar>

    <GridLayout>
      <ListView [items]="users">
        <ng-template let-item="item">
            <Label [text]="item.firstName + ' ' + item.lastName"></Label>
        </ng-template>
      </ListView>
    </GridLayout>
  `
})
export class UsersComponent implements OnInit {
  users: Array<User>

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.users = this.userService.getUsers()
  }
}
