import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsBoolean, IsEnum, IsString } from 'class-validator';
import { PostVisibility } from '@prisma/client';

@InputType()
export class UpdatePostInput {
  @Field(() => String)
  @IsString()
  id: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  title?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  content?: string;

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

  @Field(() => String, { nullable: true })
  @IsOptional()
  location?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  lessonLearned?: string;
}
