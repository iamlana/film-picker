import { useContext } from "react";
import { Link } from "react-router-dom";
import AdmissionTickets from "../assets/admission-tickets.png";
import Replay from "../assets/replay.png";
import { PickedFilmsContext } from "../context";
import { DeveloperInfo } from "../components/DeveloperInfo";

export function PicksScreen() {
  let [pickedFilms, setPickedFilms] = useContext(PickedFilmsContext);

  function onStartAgain() {
    setPickedFilms([]);
  }

  return (
    <div className="picks-screen flex flex-col h-screen justify-between p-5">
      <span className="flex-none flex flex-row gap-2 md:gap-4 align-middle justify-center items-center">
        <img src={AdmissionTickets} width="48px" />
        <h1 className="text-3xl md:text-5xl">Your chosen movies</h1>
      </span>
      <ul className="grow flex flex-col justify-between w-max mx-auto py-16 w-auto">
        {pickedFilms.map((film) => (
          <li key={film.rank} className="relative mb-2 pl-9">
            <span className="flex flex-row gap-6 items-center justify-start">
              <img src={film.posterSmall} width="40px" />
              <h2>{film.title}</h2>
            </span>
          </li>
        ))}
      </ul>
      <Link
        onClick={onStartAgain}
        to="/films"
        className="  text-3xl font-bold flex flex-row gap-4 align-middle justify-center items-center mb-4">
        {pickedFilms.length ? (
          <h2>Pick another five</h2>
        ) : (
          <h2>You haven't pick any!</h2>
        )}
        <img src={Replay} width="32px" height="32px" />
      </Link>
      <DeveloperInfo />
    </div>
  );
}
