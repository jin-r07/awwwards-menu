import Image from "next/image";

export default function Home() {
  return (
    <main className="w-full h-full bg-white text-5xl font-mono">
      <div className="w-full h-screen text-black flex items-center justify-center mb-[90vh]">Landing Page</div>
      <div className="w-full h-screen text-black flex items-center justify-center mb-[90vh]">Second Page</div>
      <div className="fixed bottom-0 left-0 w-full h-screen flex items-center justify-center bg-black -z-[1]">Behind Page</div>
    </main>
  );
}