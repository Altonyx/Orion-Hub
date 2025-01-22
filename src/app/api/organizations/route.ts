import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const organizations = await prisma.organization.findMany({
    include: {
      users: true,
      projects: true,
    },
  });

  return NextResponse.json(organizations);
}
