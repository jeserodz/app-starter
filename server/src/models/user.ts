// prettier-ignore
import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";
import { Token } from "./token";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(type => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  username: string;

  @Column()
  password: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  email?: string;

  @Field()
  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @Column({ nullable: true })
  deletedAt: Date;
}
