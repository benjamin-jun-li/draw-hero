import Image from "next/image";
import Logo from "@/public/logo.svg";

const Loading = () => {
  return (
    <main className="h-full w-full grid place-items-center">
      <div className="flex flex-row justify-center items-center gap-1 animate-pulse duration-800">
        <Image
          alt="logo"
          src={Logo}
          width={120}
          height={120}
          priority={true}
        />
        <span className="text-lg font-semibold">Loading</span>
      </div>
    </main>
  );
};

export default Loading;
