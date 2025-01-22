"use client";

import { useRouter } from "next/navigation";

interface Project {
  id: number;
  name: string;
  status: string;
}

interface ProjectsListProps {
  projects: Project[];
}

export default function ProjectsList({ projects }: ProjectsListProps) {
  const router = useRouter();

  const handleProjectClick = (projectId: number) => {
    router.push(`/projects/${projectId}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      {projects.map((project) => (
        <div
          key={project.id}
          onClick={() => handleProjectClick(project.id)}
          className="cursor-pointer bg-white shadow rounded-md p-4 hover:shadow-lg transition"
        >
          <h2 className="text-lg font-bold text-gray-800">{project.name}</h2>
          <p className="mt-2 text-sm text-gray-600">Status: {project.status}</p>
        </div>
      ))}
    </div>
  );
}
