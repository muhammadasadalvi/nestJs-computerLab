import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterUpdate, AfterRemove } from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @AfterInsert()
    logInsert() {
        console.log(`Inserted User with Id ${this.id}`);
    }

    @AfterUpdate()
    logUpdate() {
        console.log(`Updated User with Id ${this.id}`);
    }

    @AfterRemove()
    logRemoved() {
        console.log(`Updated User with Id ${this.id}`);
    }
}

/*
*hooks will not be executed if we directly call save method without creating an instance of class
*/