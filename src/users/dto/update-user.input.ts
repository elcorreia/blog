import { InputType, Field, ID } from '@nestjs/graphql'
import { IsOptional, IsString, IsEmail, MinLength } from 'class-validator';

@InputType()
export class UpdateUserInput {

  @Field(() => ID)
  @IsString()
  id: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  username?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @MinLength(10)
  bio?: string;
}
