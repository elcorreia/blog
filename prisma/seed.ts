import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔹 Populando o banco de dados...');

  // Criar usuários de exemplo
  // const user1 = await prisma.user.upsert({
  //   where: { email: 'user1@email.com' },
  //   update: {},
  //   create: {
  //     email: 'user1@email.com',
  //     name: 'User One',
  //     username: 'userone',
  //     isVerified: true
  //   },
  // });

  // const user2 = await prisma.user.upsert({
  //   where: { email: 'user2@email.com' },
  //   update: {},
  //   create: {
  //     email: 'user2@email.com',
  //     name: 'User Two',
  //     username: 'usertwo'
  //   },
  // });

  // Criar posts de exemplo
  // await prisma.post.createMany({
  //   data: [
  //     {
  //       title: 'Meu Primeiro Post',
  //       content: 'Este é um post de exemplo.',
  //       userId: user1.id,
  //       visibility: 'PUBLIC',
  //     },
  //     {
  //       title: 'Outro Post',
  //       content: 'Outro conteúdo de exemplo.',
  //       userId: user2.id,
  //       visibility: 'FRIENDS',
  //     },
  //   ],
  // });
  //
  // console.log('✅ Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
