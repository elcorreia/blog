import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Exclude, Expose } from 'class-transformer';

@ObjectType()
export class UserOutput {
  @Field(() => ID)
  @Expose()
  id: string;

  @Field(() => String)
  @Expose()
  username: string;

  @Field(() => String, { nullable: true })
  @Expose()
  email?: string;

  @Field(() => String, { nullable: true })

  bio?: string;

  @Field(() => Boolean)
  @Expose()
  isVerified: boolean;

  @Field(() => Date)
  @Exclude()
  updatedAt: Date;

  @Field(() => Date)
  @Exclude()
  createdAt: Date;
}
