import { Injectable } from '@nestjs/common';
import { PrismaService } from "@/database/prisma/prisma.service";
import { Post, Prisma } from '@prisma/client';
import { NotFoundError } from '@/shared/erros/not-found-error'
import { SearchParams, SearchResult } from '@/post/type/search'

@Injectable()
export class PostRepository {

  sortableFields: string[] = ['title', 'createdAt']
  constructor(private readonly prisma: PrismaService) {}

  async createPost(data: Prisma.PostCreateInput): Promise<Post> {
    return this.prisma.post.create({ data });
  }

  async updatePost(params: { where: Prisma.PostWhereUniqueInput; data: Prisma.PostUpdateInput; }): Promise<Post> {
    const { where, data } = params;
    return this.prisma.post.update({ where, data });
  }

  async findPostById(postId: string): Promise<Post> {
    const post = await this.prisma.post.findUnique({ where: { id: postId } });

    if (!post) {
      throw new NotFoundError(`Post not found using ID ${postId}`)
    }
    return post
  }

  async findBySlug(slug: string): Promise<Post> {
    const post = await this.prisma.post.findUnique({
      where: { slug },
    })
    return post
  }

  async findAllPosts(): Promise<Post[]> {
    return this.prisma.post.findMany({});
  }

  async deletePost(postId: string): Promise<Post> {
    return this.prisma.post.delete({ where: { id: postId } });
  }

  async search(params: SearchParams): Promise<SearchResult> {
    const { page = 1, perPage = 15, filter, sort, sortDir } = params
    const sortable = this.sortableFields?.includes(sort) || false
    const orderByField = sortable ? sort : 'createdAt'
    const orderByDir = sortable ? sortDir : 'desc'

    const count = await this.prisma.post.count({
      ...(filter && {
        where: {
          OR: [
            { title: { contains: filter, mode: 'insensitive' } },
            { content: { contains: filter, mode: 'insensitive' } },
          ],
        },
      }),
    })

    const post = await this.prisma.post.findMany({
      ...(filter && {
        where: {
          OR: [
            { title: { contains: filter, mode: 'insensitive' } },
            { content: { contains: filter, mode: 'insensitive' } },
          ],
        },
      }),
      orderBy: {
        [orderByField]: orderByDir,
      },
      skip: page > 0 ? (page - 1) * perPage : 1,
      take: perPage > 0 ? perPage : 15,
    })

    return {
      items: post,
      currentPage: page,
      perPage,
      lastPage: Math.ceil(count / perPage),
      total: count,
    }
  }
}
