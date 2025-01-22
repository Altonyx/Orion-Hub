"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Dashboard: React.FC = () => {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchOrganizations = async () => {
      setLoading(true);
      const response = await fetch("/api/organizations");
      const data = await response.json();
      setOrganizations(data);
      setLoading(false);
    };
  
    fetchOrganizations();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleCardClick = (id: number) => {
    // Navigate to the organization details page
    router.push(`/organizations/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-700">Organizations</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {organizations.length === 0 && (
          <p className="text-gray-600">No organizations available.</p>
        )}
        {organizations.map((org: any) => (
          <div
            key={org.id}
            onClick={() => handleCardClick(org.id)}
            className="cursor-pointer bg-white shadow rounded-md p-4 hover:shadow-lg transition"
          >
            <h2 className="text-lg font-bold text-gray-800">{org.name}</h2>
            <p className="mt-2 text-sm text-gray-600">
              {org.description || "No description available"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
