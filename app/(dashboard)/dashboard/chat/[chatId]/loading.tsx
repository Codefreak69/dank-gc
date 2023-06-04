import { Skeleton } from "@/components/ui/skeleton";
import { FunctionComponent } from "react";

interface LoadingProps {}

const Loading: FunctionComponent<LoadingProps> = () => {
  return (
    <div className="flex-1 justify-between flex flex-col h-full max-h-[calc(100vh - 6rem)]">
      <div className="flex  bg-background  sm:items-center justify-between py-3 border-b-2 border-gray-200 ">
        <div className="relative flex items-center space-x-4">
          <div className="relative">
            <div className="relative w-8 sm:w-12 h-8 sm:h-12">
              <Skeleton className=" w-full h-full rounded-full animate-pulse bg-purple-200" />
            </div>
          </div>

          <div className="flex flex-col leading-tight">
            <div className="text-xl flex items-center ">
              <span className="text-gray-700 mr-3 font-semibold ">
                <Skeleton className=" w-24 h-6 animate-pulse bg-purple-200" />
              </span>
            </div>
            <span className="text-sm text-gray-600 ">
              <Skeleton className=" w-32 h-4 animate-pulse bg-purple-200" />
            </span>
          </div>
        </div>
      </div>

      <div
        id="messages"
        className="flex h-full flex-1 flex-col-reverse gap-4 p-3 overflow-y-auto scrollbar-thumb-purple-900  scrollbar-track-purple-400 scrollbar-thin scrollbar-rounded-full "
      >
        <div>
          <div className="chat-message">
            <div>
              <div>
                <span>
                  {/* add skeleton  */}
                  <Skeleton className=" w-24 h-10 animate-pulse bg-purple-200" />
                  <span className="ml-2 text-xs text-gray-400 "></span>
                </span>
              </div>

              <div>
                <Skeleton className=" w-8 h-8 rounded-full animate-pulse bg-purple-200" />
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 px-4 pt-4 mb-2 sm:mb-0 pb-2">
          <div className="reative flex-1 overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-purple-600 ">
            <Skeleton className=" w-full h-10 animate-pulse bg-purple-200" />

            <div className="absolute right-1 bottom-1 flex justify-between py-2 pl-3 pr-4 m-1">
              <div className="flex-shrink-0 ">
                <Skeleton className=" w-24 h-10 animate-pulse bg-purple-200" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
