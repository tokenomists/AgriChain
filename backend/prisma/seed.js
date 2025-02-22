const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Clean up existing data
  await prisma.salesData.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.farm.deleteMany({});
  await prisma.farmer.deleteMany({});
  await prisma.user.deleteMany({});

  // Create Users
  const user1 = await prisma.user.create({
    data: {
      address: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
      name: 'John Smith',
      email: 'john@example.com',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      address: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
      name: 'Maria Garcia',
      email: 'maria@example.com',
    },
  });

  // Create Farmers
  const farmer1 = await prisma.farmer.create({
    data: {
      userId: user1.id,
    },
  });

  const farmer2 = await prisma.farmer.create({
    data: {
      userId: user2.id,
    },
  });

  // Create Farms
  const farm1 = await prisma.farm.create({
    data: {
      farmId: 1,
      name: 'Green Valley Organics',
      location: 'California, USA',
      farmerId: farmer1.id,
      certifications: ['Organic', 'Non-GMO'],
    },
  });

  const farm2 = await prisma.farm.create({
    data: {
      farmId: 2,
      name: 'Sunshine Farms',
      location: 'Florida, USA',
      farmerId: farmer2.id,
      certifications: ['Fair Trade', 'Sustainable'],
    },
  });

  // Create Products
  await prisma.product.createMany({
    data: [
      {
        productId: 1,
        name: 'Organic Tomatoes',
        description: 'Fresh, locally grown organic tomatoes',
        price: 4.99,
        quantity: 100,
        farmId: farm1.id,
        ipfsHash: 'QmX7YYj8jzFqGo1oZ2kS5Km4XjGdP1hV4RWp9R3Q9X9Z9Z',
      },
      {
        productId: 2,
        name: 'Organic Lettuce',
        description: 'Crisp and fresh organic lettuce',
        price: 3.99,
        quantity: 50,
        farmId: farm1.id,
        ipfsHash: 'QmY8jzFqGo1oZ2kS5Km4XjGdP1hV4RWp9R3Q9X9Z9Z9Z9',
      },
      {
        productId: 3,
        name: 'Fresh Oranges',
        description: 'Sweet and juicy Florida oranges',
        price: 6.99,
        quantity: 200,
        farmId: farm2.id,
        ipfsHash: 'QmZ8jzFqGo1oZ2kS5Km4XjGdP1hV4RWp9R3Q9X9Z9Z9Z9',
      },
    ],
  });

  // Create Sales Data (6 months of data for each farmer)
  const months = ['2024-09', '2024-10', '2024-11', '2024-12', '2025-01', '2025-02'];
  
  for (const farmer of [farmer1, farmer2]) {
    for (const month of months) {
      await prisma.salesData.create({
        data: {
          month,
          revenue: Math.floor(Math.random() * (10000 - 5000) + 5000), // Random revenue between 5000 and 10000
          farmerId: farmer.id,
        },
      });
    }
  }

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });