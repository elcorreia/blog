import { ObjectType, Field, ID } from '@nestjs/graphql';
import { PostStatus, PostVisibility } from '@prisma/client';
import '../enums/post.enums';
import { UserDTO } from '@/users/dto/user.dto'
import { IsString } from 'class-validator' // ✅ Importa o arquivo que registra os enums

@ObjectType()
export class PostDTO {
  @Field(() => ID)
  @IsString()
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  slug: string;

  @Field(() => String)
  content: string;

  @Field(() => String, { nullable: true })
  imageUrl?: string;

  @Field(() => Boolean)
  published: boolean;

  @Field(() => PostVisibility)
  visibility: PostVisibility;

  @Field(() => Boolean)
  isAnonymous: boolean;

  @Field(() => String, { nullable: true })
  location?: string;

  @Field(() => String, { nullable: true })
  lessonLearned?: string;

  @Field(() => PostStatus)
  status: PostStatus;

  @Field(() => String)
  userId: string;

  @Field(() => UserDTO)
  user?: UserDTO

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
