"use client";

import { useRouter } from "next/navigation";

interface HistoryRecord {
  changedBy: string;
  timestamp: string;
  changes: string;
}

interface Module {
  id: number;
  name: string;
  identifier: string;
  testEnvStatus: string;
  prodEnvStatus: string;
  modifiedTime: string;
  moduleType: string;
  history: HistoryRecord[];
}

interface ProjectModulesProps {
  modules: Module[];
}

export default function ProjectModules({ modules }: ProjectModulesProps) {
  const router = useRouter();

  const handleRowClick = (identifier: string) => {
    // Navigate to the module's details page
    router.push(`/modules/${identifier}`);
  };

  return (
    <div className="mt-6">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="px-4 py-2 text-left text-sm font-bold text-gray-600">
              Name
            </th>
            <th className="px-4 py-2 text-left text-sm font-bold text-gray-600">
              Identifier
            </th>
            <th className="px-4 py-2 text-left text-sm font-bold text-gray-600">
              Test Env
            </th>
            <th className="px-4 py-2 text-left text-sm font-bold text-gray-600">
              Prod Env
            </th>
            <th className="px-4 py-2 text-left text-sm font-bold text-gray-600">
              Last Modified
            </th>
            <th className="px-4 py-2 text-left text-sm font-bold text-gray-600">
              Type
            </th>
          </tr>
        </thead>
        <tbody>
          {modules.map((module) => (
            <tr
              key={module.id}
              onClick={() => handleRowClick(module.identifier)}
              className="border-b cursor-pointer hover:bg-gray-50 transition"
            >
              <td className="px-4 py-2 text-sm text-gray-700">{module.name}</td>
              <td className="px-4 py-2 text-sm text-gray-700">
                {module.identifier}
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">
                {module.testEnvStatus}
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">
                {module.prodEnvStatus}
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">
                {new Date(module.modifiedTime).toLocaleString()}
              </td>
              <td className="px-4 py-2 text-sm text-gray-700">
                {module.moduleType}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
