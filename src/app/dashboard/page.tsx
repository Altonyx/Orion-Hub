import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div>Please log in to access the dashboard</div>;
  }

  return <h1>Welcome to the Dashboard, {session.user?.name}!</h1>;
}
