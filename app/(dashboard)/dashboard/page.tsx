import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const Dashboard = async ({}) => {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
};

export default Dashboard;
