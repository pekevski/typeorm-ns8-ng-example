import { Injectable } from '@angular/core'
import { User } from '~/models/User'
import { getConnection } from "typeorm";
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient) {}
 
 
  getUsers(): Promise<Array<User>> {
    return User.find()
  }

  async addRandomUser(): Promise<User> {

    const result: any = await this.http.get("https://randomuser.me/api/").toPromise();

    const randomUser = result.results[0];
    const {first, last} = randomUser.name;
    const {thumbnail} = randomUser.picture;
    const {date, age} = randomUser.dob;

    const user = new User();
    user.firstName = first;
    user.lastName = last;
    user.age = age;
    user.dob = date;
    user.thumbnail = thumbnail;
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
