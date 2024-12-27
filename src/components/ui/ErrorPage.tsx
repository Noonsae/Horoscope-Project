"use client"

import { useRouter } from "next/navigation";
import { startTransition } from "react";

type ErrorProps = {
  reset?: () => void
}

const ErrorPage = ({reset}: ErrorProps) => {

  const handleClick = () => {
    startTransition(() => {
      refresh();
      if(reset) reset();
    });
  };

  const { refresh } = useRouter();

  return (
    <div className="flex flex-col justify-center items-center h-[90vh]">
      <h2 className="text-3xl font-bold mb-6">
        에러가 발생했습니다. 다시 시도해주세요.
      </h2>
      <button
        className="px-4 py-1 border border-solid border-foreground text-foreground rounded-[8px]"
        onClick={handleClick}
      >
        Try again
      </button>
    </div>
  );
};

export default ErrorPage;
