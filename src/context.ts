import { createContext } from "react";
import { FilmProps } from "./types";

export const PickedFilmsContext = createContext<
  [FilmProps[], React.Dispatch<React.SetStateAction<FilmProps[]>>]
>([[], () => {}]);
