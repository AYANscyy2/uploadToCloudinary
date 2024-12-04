import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className=" bg-[#000022] w-screen h-[100px] p-5 text-white flex justify-between items-center">
        <div>Home</div>
        <Link href="/playground">Playground</Link>
      </div>
    </>
  );
}
