"use client"
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="w-full min-h-screen flex justify-center items-center">
      <Image
        src="/vote-image-1.jpg"
        alt="wallpaper"
        fill
        priority
        className="object-cover -z-10"
      />
      <div className="flex flex-col gap-2 backdrop-blur-md rounded-lg p-10">
        <h1 className="text-xl font-sans text-black">Online Voting App</h1>
        <Link href="/login" className="bg-white p-5 text-lg rounded-lg text-black uppercase text-center">Go ahead</Link>
      </div>
    </section>
  );
}
