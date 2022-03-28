import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();
async function main() {
  await prisma.user.deleteMany();
  await prisma.todo.deleteMany();
  const user = await prisma.user.create({
    data: {
      first_name: faker.name.firstName('Male'),
      last_name: faker.name.lastName('Male'),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: 'ADMIN',
      is_active: true,
    },
  });
  await prisma.todo.create({
    data: {
      title: faker.lorem.words(),
      body: faker.lorem.paragraphs(),
      user_id: user.id,
    },
  });
}
main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
