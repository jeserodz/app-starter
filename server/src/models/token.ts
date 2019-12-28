// prettier-ignore
import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";
import { User } from "./user";

@ObjectType()
@Entity()
export class Token extends BaseEntity {
  @Field(type => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  jwt: string;

  @Field()
  @ManyToOne(type => User)
  user: User;

  @Field()
  @CreateDateColumn()
  createdAt: string;

  @Column({ nullable: true })
  deletedAt: Date;
}
