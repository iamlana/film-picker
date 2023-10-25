import { useEffect, useState } from "react";
import Dislike from "../assets/dislike.png";
import Like from "../assets/like.png";
import Star from "../assets/star.png";
import NoPoster from "../assets/no-poster.png";
import { FilmProps } from "../types";

interface FilmCardProps {
  onLike: () => void;
  onDislike: () => void;
  film: FilmProps;
}

export function FilmCard(props: FilmCardProps) {
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
  }, [props.film]);

  return (
    <span className="flex flex-col text-center gap-4 md:gap-6 w-[310px] md:w-[360px] mx-auto">
      <span className="flex flex-row font-bold items-center h-[5vh] gap-4">
        <h3 className="grow text-left">{props.film?.title}</h3>
        <span className="flex-none flex flex-row justify-end items-center gap-2">
          <img src={Star} width="31px" />
          <p className="text-[32px]">{props.film?.starRating}</p>
        </span>
      </span>
      <div className="h-[50vh] max-w-full">
        <img
          src={isError ? NoPoster : props.film?.posterLarge}
          className="w-full h-full object-contain"
          loading="lazy"
          onError={() => setIsError(true)}
        />
      </div>
      <div className="flex flex-row justify-between items-center">
        <img
          src={Dislike}
          className="w-8 md:w-12 min-w-8 md:min-w-12"
          onClick={props.onDislike}
        />
        <span className="flex flex-row gap-1">
          <p>{props.film?.year}</p>
          <span>&#8729;</span>
          <p>{props.film?.runtime}</p>
          <span>&#8729;</span>
          <p>{props.film?.pgRating}</p>
        </span>
        <span className="relative" onClick={props.onLike}>
          <img src={Like} className="w-8 md:w-12" />
          <img
            src={Like}
            className="w-8 md:w-12 hover:animate-ping absolute top-0"
          />
        </span>
      </div>
    </span>
  );
}
