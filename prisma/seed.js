// File to create test admin users
// execute : node prisma/seed.js

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("password", 10);
  await prisma.user.create({
    data: {
      email: "test1@google.org",
      password: hashedPassword,
    },
  });

  console.log("Test user created");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
