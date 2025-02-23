import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class UserDTO {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  username?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  bio?: string;

  @Field(() => Boolean)
  isVerified: boolean;

  @Field(() => Date)
  createdAt: Date;
}
