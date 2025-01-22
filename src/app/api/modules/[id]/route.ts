import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(req: NextRequest) {
  const { id } = req.params;
  const { changes, changedBy } = await req.json();

  if (!id || !changes || !changedBy) {
    return NextResponse.json(
      { error: "Module ID, changes, and changedBy are required." },
      { status: 400 }
    );
  }

  const moduleId = parseInt(id, 10);

  try {
    const module = await prisma.module.findUnique({ where: { id: moduleId } });
    if (!module) {
      return NextResponse.json({ error: "Module not found." }, { status: 404 });
    }

    const updatedHistory = [
      ...(module.history || []),
      {
        changedBy,
        timestamp: new Date().toISOString(),
        changes,
      },
    ];

    const updatedModule = await prisma.module.update({
      where: { id: moduleId },
      data: { history: updatedHistory },
    });

    return NextResponse.json(updatedModule);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update module history." },
      { status: 500 }
    );
  }
}
