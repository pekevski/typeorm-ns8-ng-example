import { Injectable } from '@angular/core'
import { User } from '~/models/User'
import { getConnection } from "typeorm";


@Injectable({
  providedIn: 'root',
})
export class UserService {
 
 
  getUsers(): Promise<Array<User>> {
    return User.find()
  }

  async addRandomUser(): Promise<User> {
    const user = new User();
    user.firstName = 'firstName';
    user.lastName = 'lastName';
    user.age = 100;
    return await user.save();
  }

  async deleteUsers(): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(User)
      .execute();
  }

  timeout = (ms) => new Promise(resolve => setTimeout(resolve, ms));

}
