// File to create test admin users
// Execute: node prisma/seed.js

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Create Organizations
  const org1 = await prisma.organization.create({
    data: {
      name: "Tech Innovators",
      description: "A company focused on innovative tech solutions.",
      users: {
        create: [
          {
            name: "Sheldon Henriques",
            email: "svhenriques@csuchico.edu",
            password: await bcrypt.hash("password123", 10), // Replace with hashed password in production
          },
          {
            name: "Bob Smith",
            email: "bob@techinnovators.com",
            password: await bcrypt.hash("password123", 10),
          },
        ],
      },
      projects: {
        create: [
          {
            name: "AI Research",
            status: "In Progress",
            modules: {
              create: [
                {
                  name: "Natural Language Processing",
                  identifier: "nlp-module",
                  moduleType: "Core",
                  testEnvStatus: "Deployed",
                  prodEnvStatus: "Not Deployed",
                  history: [
                    {
                      changedBy: "Sheldon Henriques",
                      timestamp: new Date().toISOString(),
                      changes: "Initial deployment of NLP module to test environment.",
                    },
                  ],
                },
                {
                  name: "Image Recognition",
                  identifier: "image-recognition-module",
                  moduleType: "Feature",
                  testEnvStatus: "Not Deployed",
                  prodEnvStatus: "Not Deployed",
                  history: [],
                },
              ],
            },
          },
          {
            name: "Cloud Platform",
            status: "Completed",
            modules: {
              create: [
                {
                  name: "Storage Service",
                  identifier: "storage-service",
                  moduleType: "Core",
                  testEnvStatus: "Deployed",
                  prodEnvStatus: "Deployed",
                  history: [
                    {
                      changedBy: "Bob Smith",
                      timestamp: new Date().toISOString(),
                      changes: "Storage Service deployed to production.",
                    },
                  ],
                },
              ],
            },
          },
        ],
      },
    },
  });

  const org2 = await prisma.organization.create({
    data: {
      name: "Green Solutions",
      description: "Sustainable energy and green tech.",
      users: {
        create: [
          {
            name: "Charlie Green",
            email: "charlie@greensolutions.com",
            password: await bcrypt.hash("password123", 10),
          },
        ],
      },
      projects: {
        create: [
          {
            name: "Solar Initiative",
            status: "In Progress",
            modules: {
              create: [
                {
                  name: "Solar Panel Monitoring",
                  identifier: "solar-monitoring",
                  moduleType: "Feature",
                  testEnvStatus: "In Testing",
                  prodEnvStatus: "Not Deployed",
                  history: [
                    {
                      changedBy: "Charlie Green",
                      timestamp: new Date().toISOString(),
                      changes: "Initial setup for solar panel monitoring module.",
                    },
                  ],
                },
              ],
            },
          },
        ],
      },
    },
  });

  console.log("Organizations created:", org1, org2);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
