import { Injectable, NotFoundException } from '@nestjs/common';
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

        // create() method creates instance of entity type, it doesn't persist the data in database
        // to run all validation which we create on Entity we first create an instance then save()
        const user = this.repo.create({
            email: email,
            password: password
        });

        // save is used for persistance, it saves the data in database
        return this.repo.save(user);
    }

    findOne(id: number) {
        return this.repo.findOne({
            where: {
                id
            }
        });
    }
    find(email: string) {
        return this.repo.find({
            where: {
                email
            }
        })
    }
    async update(id: number, attrs: Partial<User>) {
        const user = await this.findOne(id);
        if (!user) {
            throw new NotFoundException('user not found');
        }
        Object.assign(user, attrs);
        return this.repo.save(user);
    }
    async remove(id: number) {
        const user = await this.findOne(id);
        if (!user) {
            throw new NotFoundException('user not found');
        }
        return this.repo.remove(user);
    }


}

/**
 * ----------------Note---------------------
 * save(), remove() work with entity and all entity hooks will be executed when save or reomve through these methods
 * insert(), update(), delete() repository methods works with instance of entity, hooks will not executed and all logic related to entity.
 * i.e validations etc will not executed. 
 */