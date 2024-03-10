import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo.svg";

export default function Page() {
  return (
    <div className="flex flex-col">
      <header className="px-4 lg:px-6 h-[5vh] flex items-center shadow-md">
        <Link href="/">
          <Image src={Logo} width={50} height={50} alt="logo" />
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-md font-medium hover:underline underline-offset-4"
            href="#"
          >
            Features
          </Link>
          <Link
            className="text-md font-medium hover:underline underline-offset-4"
            href="#"
          >
            About
          </Link>
          <Link
            className="text-md font-medium hover:underline underline-offset-4"
            href="#"
          >
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full min-h-[45vh] grid place-items-center py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container flex flex-col items-center px-4 md:px-6 text-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Visual collaboration made easy
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                The online whiteboard platform where teams get work done. Use{" "}
                <span className="font-extrabold text-slate-600">draw-hero</span>{" "}
                to collaborate in real time, share ideas, and create
                breakthroughs.
              </p>
            </div>
            <Link
            className="inline-flex w-[20%] h-12 items-center justify-center rounded-full bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            href="/dashboard"
            >
            Get Started
            </Link>
          </div>
        </section>
        <section className="w-full h-[45vh] py-12 md:py-24 lg:py-32 border-t">
          <div className="container grid items-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mx-auto/none">
                The Infinite Canvas
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Let your imagination run wild. Create, collaborate, and
                brainstorm on an endless canvas.
              </p>
            </div>
            <div className="mx-auto w-full max-w-2xl grid gap-4 lg:max-w-4xl lg:grid-cols-2 lg:gap-10">
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold">Real-time collaboration</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Bring your team together with a platform built for
                  collaboration. Everyone can see changes in real time, add
                  comments, and vote on the best ideas.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold">Unlimited canvases</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Dont be limited by space. With Miro, you can create as many
                  boards as you need. Organize your ideas, projects, and plans
                  without worrying about running out of space.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container grid items-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Experience the workflow the best frontend teams love.
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Let your team focus on shipping features instead of managing
                infrastructure with automated CI/CD.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <form className="flex space-x-2">
                <Input
                  className="max-w-lg flex-1"
                  placeholder="Enter your email"
                  type="email"
                />
                <Button type="submit">Sign Up</Button>
              </form>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Sign up to get notified when we launch.
                <Link className="underline underline-offset-2" href="#">
                  Terms & Conditions
                </Link>
              </p>
            </div>
          </div>
        </section> */}
      </main>
      <footer className="h-[5vh] flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Draw Hero. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
