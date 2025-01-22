import { PrismaClient } from "@prisma/client";
import ProjectsList from "./ProjectsList";

const prisma = new PrismaClient();

export default async function OrganizationProjectsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const organizationId = parseInt(id, 10);

  if (isNaN(organizationId)) {
    return <div>Invalid organization ID.</div>;
  }

  const organization = await prisma.organization.findUnique({
    where: { id: organizationId },
    include: {
      projects: true,
    },
  });

  if (!organization) {
    return <div>Organization not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-700">
        Projects in {organization.name}
      </h1>
      {/* Pass projects to the client component */}
      <ProjectsList projects={organization.projects} />
    </div>
  );
}
