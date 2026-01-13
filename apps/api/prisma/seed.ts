import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.upsert({
    where: { slug: 'rascador-noah' },
    update: {},
    create: {
      name: 'Rascador Noah',
      slug: 'rascador-noah',
      description: 'Rascador para gatos premium, hecho a mano con cartón de alta densidad.',
      price: 35000,
      stock: 50,
      imageUrl: 'https://placehold.co/600x400?text=Rascador+Noah',
      isActive: true,
    },
  });

  console.log({ product });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });