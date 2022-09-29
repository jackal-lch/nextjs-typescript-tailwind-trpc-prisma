import { PrismaClient } from '@prisma/client';

// to prevent creating a new PrismaClient everytime when it get called
// therefore we declare it as global variable
// and check if it existed already

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}
