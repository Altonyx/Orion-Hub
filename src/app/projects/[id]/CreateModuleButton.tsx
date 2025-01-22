"use client";

import { useState } from "react";

interface CreateModuleButtonProps {
  projectId: number;
}

export default function CreateModuleButton({ projectId }: CreateModuleButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [moduleType, setModuleType] = useState("");
  const [testEnvStatus, setTestEnvStatus] = useState("Not Deployed");
  const [prodEnvStatus, setProdEnvStatus] = useState("Not Deployed");
  const [error, setError] = useState("");

  const handleCreateModule = async () => {
    if (!name || !identifier || !moduleType) {
      setError("Name, Identifier, and Module Type are required.");
      return;
    }

    try {
      const response = await fetch(`/api/modules`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId,
          name,
          identifier,
          moduleType,
          testEnvStatus,
          prodEnvStatus,
          history: [
            {
              changedBy: "Admin", // Replace with the actual user making the change
              timestamp: new Date().toISOString(),
              changes: "Module created.",
            },
          ],
        }),
      });

      if (response.ok) {
        setShowModal(false);
        setName("");
        setIdentifier("");
        setModuleType("");
        setTestEnvStatus("Not Deployed");
        setProdEnvStatus("Not Deployed");
        window.location.reload(); // Reload the page to show the new module
      } else {
        const data = await response.json();
        setError(data.error || "Failed to create module.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Create Module
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md w-96">
            <h2 className="text-lg font-bold mb-4">Create Module</h2>
            <input
              type="text"
              placeholder="Module Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-md p-2 mb-4"
            />
            <input
              type="text"
              placeholder="Identifier (e.g., 'auth-module')"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full border rounded-md p-2 mb-4"
            />
            <input
              type="text"
              placeholder="Module Type (e.g., 'Core', 'Feature')"
              value={moduleType}
              onChange={(e) => setModuleType(e.target.value)}
              className="w-full border rounded-md p-2 mb-4"
            />
            <select
              value={testEnvStatus}
              onChange={(e) => setTestEnvStatus(e.target.value)}
              className="w-full border rounded-md p-2 mb-4"
            >
              <option value="Not Deployed">Not Deployed</option>
              <option value="Deployed">Deployed</option>
              <option value="In Testing">In Testing</option>
            </select>
            <select
              value={prodEnvStatus}
              onChange={(e) => setProdEnvStatus(e.target.value)}
              className="w-full border rounded-md p-2 mb-4"
            >
              <option value="Not Deployed">Not Deployed</option>
              <option value="Deployed">Deployed</option>
            </select>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateModule}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
