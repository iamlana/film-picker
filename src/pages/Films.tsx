import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdmissionTickets from "../assets/admission-tickets.png";
import { FilmCard } from "../components/FilmCard";
import { PickedFilmsContext } from "../context";
import getMainColors from "../gradient-definer";
import { FilmProps } from "../types";
import { DeveloperInfo } from "../components/DeveloperInfo";

export function Films() {
  const [films, setFilms] = useState<FilmProps[]>([]);
  const [currentFilm, setCurrentFilm] = useState(0);
  const [pickedFilms, setPickedFilms] = useContext(PickedFilmsContext);
  const currentFilmData = films.at(currentFilm) as FilmProps;
  const navigate = useNavigate();
  const remainingPicks = 5 - pickedFilms.length;
  const [bgGradient, setBgGradient] = useState("");

  const img: HTMLImageElement = new Image();
  img.crossOrigin = "anonymous";
  img.src = currentFilmData?.posterSmall;

  img.onload = function () {
    const [color1, color2] = getMainColors(img);

    setBgGradient(
      `radial-gradient(50% 50% at 50% 50%, ${color1} 0%, ${color2} 100%)`,
    );
  };

  useEffect(() => {
    const getData = async () => {
      const resp = await fetch("data.json");
      const json = await resp.json();
      setFilms(randomizeFilmsOrder(json));
    };
    getData();
  }, []);

  function randomizeFilmsOrder(films: FilmProps[]) {
    const randomizedFilms = films.sort(() => Math.random() - 0.5);
    return randomizedFilms;
  }

  function onLike() {
    onShowNextFilm();
    onAddToPicked();
  }

  function onDislike() {
    onShowNextFilm();
  }

  function onShowNextFilm() {
    if (currentFilm === films.length - 1) {
      return setCurrentFilm(0);
    }
    return setCurrentFilm(currentFilm + 1);
  }

  function onAddToPicked() {
    if (currentFilmData && pickedFilms.length < 4) {
      setPickedFilms([...pickedFilms, currentFilmData]);
    } else if (currentFilmData && pickedFilms.length === 4) {
      setPickedFilms([...pickedFilms, currentFilmData]);
      navigate("/top-five");
    }
  }

  return (
    <div className="films-screen" style={{ backgroundImage: bgGradient }}>
      <Link
        to="/top-five"
        className="flex-none flex flex-row items-center align-middle justify-end gap-2 pb-4"
      >
        <img src={AdmissionTickets} width="32px" />
        <p>{remainingPicks} picks remaining</p>
      </Link>
      <div className="grow mb-4">
        {currentFilmData && currentFilmData.posterLarge && (
          <FilmCard
            onLike={onLike}
            onDislike={onDislike}
            film={currentFilmData}
          />
        )}
      </div>
      <DeveloperInfo />
    </div>
  );
}
