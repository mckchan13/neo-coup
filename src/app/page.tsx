import Button from "../components/Button";
import Link from "next/link";

export default function Home() {
  const handleClick = () => {

  }
  return (
    <main>
      <div className="grid grid-rows-3">
        <div></div>

        <div className="flex flex-row justify-around">
          <div>I&apos;m on the left</div>
          <div>
            <Button className="border px-2 py-2">
              <Link href={"/game"}>Login</Link>
            </Button>
          </div>
          <div>I&apos;m on the right</div>
        </div>

        <div></div>
      </div>
    </main>
  );
}
