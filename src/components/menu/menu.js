import { React, useState, useEffect } from "react";
import "./menu.css";
import Api from "../api/api";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import { ToggleButton } from "react-bootstrap";

const Menu = ({ getMoviesByGenre }) => {
  const [checked, setChecked] = useState([]);
  const [radioValue, setRadioValue] = useState("1");
  const [genres, setGenres] = useState([]);

  const getGenres = async () => {
    const api = renderToStaticMarkup(<Api genre={true}></Api>);
    const response = await fetch(api.replace(/amp;/g, ""));
    const genres = await response.json();
    setGenres(Object.values(genres.genres));
    console.log(genres);
  };

  useEffect(() => {
    getGenres();
  }, []);

  return (
    <>
      <div className="containerLogo">
        <img
          src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
          alt=""
        />
      </div>
      <div className="containerButton">
        <div className="containerText">
          <h1>
            Milhões de filmes, séries e pessoas para descobrir. Explore já.
          </h1>
        </div>
        <div className="containerButton2">
          <h4>FILTRE POR:</h4>
          {genres.map((genre) => {
            return (
              <span key={genre.id}>
                <input
                  type="checkbox"
                  id="textBox"
                  checked={
                    (checked.includes({ id: genre.id, checked: checked }) &&
                      !checked.includes({ id: genre.id, checked: !checked }),
                    console.log(checked))
                  }
                  value={genre.id}
                  onChange={
                    ((e) => () =>
                      setChecked([
                        ...checked,
                        {
                          id: genre.id,
                          checked: e.currentTarget.checked,
                        },
                      ]),
                    console.log(genre.id))
                  }
                  //onClick={() => getMoviesByGenre(genre.id)}
                ></input>
                <label className="buttonGenre" htmlFor="textBox" id={genre.id}>
                  {genre.name}
                </label>
              </span>
            );
          })}
        </div>
        <br />
        <br />
      </div>
    </>
  );
};

export default Menu;
