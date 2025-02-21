import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsBoolean, IsEnum, IsString, Min } from 'class-validator';
import { PostStatus, PostVisibility } from '@prisma/client'

@InputType()
export class CreatePostInput {

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  title: string;

  @Field(() => String)
  @IsNotEmpty()
  content: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  imageUrl?: string;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  published?: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  isAnonymous?: boolean;

  @Field(() => PostVisibility, { nullable: true })
  @IsOptional()
  @IsEnum(PostVisibility)
  visibility?: PostVisibility;

  @Field(() => PostStatus, { nullable: true })
  @IsOptional()
  @IsEnum(PostStatus)
  status?: PostStatus;

  @Field(() => String, { nullable: true })
  @IsOptional()
  location?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  lessonLearned?: string;
}
