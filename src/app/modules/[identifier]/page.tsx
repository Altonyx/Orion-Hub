import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function ModuleDetails({ params }: { params: { identifier: string } }) {
  const module = await prisma.module.findUnique({
    where: { identifier: params.identifier },
  });

  if (!module) {
    return <div>Module not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-700">{module.name}</h1>
      <p className="text-gray-600">Identifier: {module.identifier}</p>
      <p className="text-gray-600">Type: {module.moduleType}</p>
      <p className="text-gray-600">Test Env: {module.testEnvStatus}</p>
      <p className="text-gray-600">Prod Env: {module.prodEnvStatus}</p>
      <p className="text-gray-600">
        Last Modified: {new Date(module.modifiedTime).toLocaleString()}
      </p>
      <div className="mt-6">
        <h2 className="text-lg font-bold text-gray-700">History</h2>
        <ul className="mt-2 space-y-2">
          {module.history.map((record, index) => (
            <li key={index} className="text-sm text-gray-600 border-t pt-2">
              <p>
                <strong>Changed By:</strong> {record.changedBy}
              </p>
              <p>
                <strong>Timestamp:</strong> {new Date(record.timestamp).toLocaleString()}
              </p>
              <p>
                <strong>Changes:</strong> {record.changes}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
