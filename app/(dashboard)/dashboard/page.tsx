import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const Dashboard = async ({}) => {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <pre>Dashboard</pre>
    </div>
  );
};

export default Dashboard;
