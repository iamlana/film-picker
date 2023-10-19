import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { PickedFilmsContext } from "./context";
import { Films } from "./pages/Films";
import { Home } from "./pages/Home";
import { PicksScreen } from "./pages/PicksScreen";
import { FilmProps } from "./types";

export function App() {
  const [pickedFilms, setPickedFilms] = useState<FilmProps[]>([]);
  return (
    <>
      <PickedFilmsContext.Provider value={[pickedFilms, setPickedFilms]}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/films" element={<Films />} />
          <Route path="/top-five" element={<PicksScreen />} />
          Pick your five movies to watch
        </Routes>
      </PickedFilmsContext.Provider>{" "}
    </>
  );
}
