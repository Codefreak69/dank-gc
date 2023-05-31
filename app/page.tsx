import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import Image from "next/image";

export default async function Home() {
  return (
    <div className="min-h-100 flex flex-col gap-2">
      <Button>Yoo</Button>
      Hello world{" "}
    </div>
  );
}
