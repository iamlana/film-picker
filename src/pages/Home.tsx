import { Link } from "react-router-dom";
import AdmissionTickets from "../assets/admission-tickets.png";
import { DeveloperInfo } from "../components/DeveloperInfo";

export function Home() {
  return (
    <div className="home-screen">
      <div className="grow flex flex-col text-5xl items-center justify-center px-5 gap-8">
        <h2 className="text-center font-bold">
          Pick your five <br />
          movies to watch
        </h2>
        <img src={AdmissionTickets} width="48px" />
        <Link to="/films" className="text-3xl font-bold">
          Start
        </Link>
      </div>
      <DeveloperInfo />
    </div>
  );
}
