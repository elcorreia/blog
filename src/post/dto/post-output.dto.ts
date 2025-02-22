import { ObjectType, Field, ID } from '@nestjs/graphql';
import { PostStatus, PostVisibility } from '@prisma/client'
import { Exclude, Expose } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator'

@ObjectType()
export class PostOutput {
  @Field(() => ID)
  @Expose()
  id: string;

  @Field(() => String)
  @Expose()
  title: string;

  @Field(() => String)
  @Expose()
  content: string;

  @Field(() => String)
  @Expose()
  slug: string;

  @Field(() => String, { nullable: true })
  @Expose()
  imageUrl?: string;

  @Field(() => Boolean)
  @Expose()
  published: boolean;

  @Field(() => PostVisibility)
  @Expose()
  visibility: PostVisibility;

  @Field(() => PostStatus)
  @Expose()
  status: PostStatus;

  @Field(() => Boolean)
  @Expose()
  isAnonymous: boolean;

  @Field(() => String, { nullable: true })
  @Expose()
  location?: string;

  @Field(() => String, { nullable: true })
  @Expose()
  lessonLearned?: string;

  @Field(() => Date)
  @Expose()
  createdAt: Date;

  @Exclude()
  userId: string;

  @Exclude()
  updatedAt: Date;
}
