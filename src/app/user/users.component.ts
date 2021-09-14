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
          <GridLayout columns="auto, *" rows="auto, auto" class="list-group-item">
            <Image col=0 rowSpan=2 [src]="item.thumbnail" class="m-r-10" borderRadius="50%" loadMode="async" stretch="aspectFill" decodeWidth="20" decodeHeight="20"></Image>
            <Label col=1 row=0 [text]="item.firstName + ' ' + item.lastName"></Label>
            <Label col=1 row=1 [text]="'Age: ' + item.age + ', DOB: ' + (item.dob | date)"></Label>
          </GridLayout>
        </ng-template>
      </ListView>

      <GridLayout row=1  columns="*,*">
        <Button col=1 text="Add User" class="-primary -rounded-sm" (tap)="addUser()"></Button>
        <Button col=0 text="Delete Users" class="-primary -orange -rounded-sm" (tap)="deleteUsers()"></Button>
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
