import { registerEnumType } from '@nestjs/graphql';
import { PostVisibility, PostStatus } from '@prisma/client';

// Registrar ENUM do Prisma para GraphQL
registerEnumType(PostVisibility, {
  name: 'PostVisibility', // Nome do enum no GraphQL
  description: 'Define a visibilidade do post (Público, Amigos ou Privado)',
});

registerEnumType(PostStatus, {
  name: 'PostStatus',
  description: 'Status do post (Ativo, Moderado ou Deletado)',
});
