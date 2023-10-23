import Github from "../assets/github.png";

export function DeveloperInfo() {
  return (
    <div className="text-center">
      <span className="text-l bottom-0 align-middle">
        Developed by <span className="font-bold">Anna Lukianova</span>. <br />
        <a
          href="https://github.com/iamlana"
          target="_blank"
          className="underline underline-offset-2"
        >
          See other projects
        </a>
      </span>

      <span className="fixed bottom-0 right-0 w-0 h-0 border-l-[72px] border-b-[72px]  border-l-transparent border-b-white text-white">
        <img src={Github} className="z-10 fixed right-1 bottom-1 w-8 h-8" />
        <a
          href="https://github.com/iamlana"
          target="_blank"
          className="w-20 h-20 fixed right-0 bottom-0 z-30"
        />
      </span>
    </div>
  );
}
