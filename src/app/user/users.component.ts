import { Component, OnInit } from '@angular/core'
import { ObservableArray } from '@nativescript/core';
import { User } from '~/models/User'

import {UserService} from './user.service';

@Component({
  selector: 'ns-items',
  template: `
    <ActionBar title="My App"> </ActionBar>

    <GridLayout rows="*, auto">
      <ListView row=0 [items]="users" class="list-group">
        <ng-template let-item="item">
            <Label class="list-group-item" [text]="item.firstName + ' ' + item.lastName"></Label>
        </ng-template>
      </ListView>

      <GridLayout row=1  columns="*,*">
        <Button col=1 text="Add User" class="-primary" (tap)="addUser()"></Button>
        <Button col=0 text="Delete Users" class="-secondary" (tap)="deleteUsers()"></Button>
      </GridLayout>
    </GridLayout>
  `
})
export class UsersComponent implements OnInit {
  users: ObservableArray<User>;

  constructor(private userService: UserService) {}

  async ngOnInit() {
    const users = await this.userService.getUsers()
    this.users = new ObservableArray(users);
  }

  async addUser() {
    const user = await this.userService.addRandomUser();
    this.users.push(user)
  }

  async deleteUsers() {
    await this.userService.deleteUsers();
    this.users.splice(0, this.users.length);
  }
}
