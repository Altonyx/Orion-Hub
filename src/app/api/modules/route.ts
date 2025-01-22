import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const { projectId, name, identifier, moduleType, testEnvStatus, prodEnvStatus, history } =
      await req.json();

    // Validate required fields
    if (!projectId || !name || !identifier || !moduleType) {
      return NextResponse.json(
        { error: "Project ID, Name, Identifier, and Module Type are required." },
        { status: 400 }
      );
    }

    // Create module
    const module = await prisma.module.create({
      data: {
        projectId,
        name,
        identifier,
        moduleType,
        testEnvStatus: testEnvStatus || "Not Deployed",
        prodEnvStatus: prodEnvStatus || "Not Deployed",
        history: history || [],
      },
    });

    // Return success response
    return NextResponse.json(module, { status: 201 });
  } catch (error) {
    console.error("Error creating module:", error);
    return NextResponse.json(
      { error: "An internal server error occurred." },
      { status: 500 }
    );
  }
}
