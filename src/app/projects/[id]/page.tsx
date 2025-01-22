import { PrismaClient } from "@prisma/client";
import ProjectModules from "./ProjectModules";
import CreateModuleButton from "./CreateModuleButton";

const prisma = new PrismaClient();

export default async function ProjectDashboard({
  params,
}: {
  params: { id: string };
}) {
  const projectId = parseInt(params.id, 10);

  if (isNaN(projectId)) {
    return <div>Invalid project ID.</div>;
  }

  // Fetch project details, including its modules
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: {
      modules: true,
    },
  });

  if (!project) {
    return <div>Project not found.</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 text-xl font-bold text-blue-500">
          {project.name}
        </div>
        <nav className="mt-4">
          <ul>
            <li className="px-4 py-2 hover:bg-blue-50">
              <a href="#" className="text-gray-700">Modules</a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-700">Modules</h1>
          {/* Create Module Button */}
          <CreateModuleButton projectId={projectId} />
        </div>
        <ProjectModules modules={project.modules} />
      </main>
    </div>
  );
}
