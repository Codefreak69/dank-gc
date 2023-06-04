import { Skeleton } from "@/components/ui/skeleton";
import { FunctionComponent } from "react";

interface LoadingProps {}

const Loading: FunctionComponent<LoadingProps> = () => {
  return (
    <div className="pt-8 mx-auto py-8 md:py-6">
      <Skeleton className=" mb-8 h-12 w-60 bg-purple-200 " />
      <Skeleton className=" mb-8 h-4 w-32 bg-purple-300 " />
      <Skeleton className=" mb-8 h-4 w-32 bg-purple-300 " />
      <Skeleton className=" mb-8 h-4 w-32 bg-purple-300 " />
    </div>
  );
};

export default Loading;
