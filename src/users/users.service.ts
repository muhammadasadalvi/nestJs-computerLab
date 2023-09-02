import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    /*
    ****One way****
    repo: Repository<User>;

    constructor(repo: Repository<User>) {
        this.repo = repo;
    }
    */

    /*
    * @InjectRepository => it injects Users repository
    * Repository<User> => generic type and dependency injection not work well with generic type so @InejctRepository is an aid
    * private repo => it make repo accessible in class level
    */
    constructor(@InjectRepository(User) private repo: Repository<User>) {
    }

    create(email: string, password: string) {
        const user = this.repo.create({
            email: email,
            password: password
        });

        return this.repo.save(user);
    }
}
