import React, { useEffect, useState } from "react";
import "./list.css";
import Api from "../api/api";
import { renderToStaticMarkup, renderToString } from "react-dom/server";
import ReactPaginate from "react-paginate";
import Menu from "../menu/menu";
import ModalPopUp from "../modal/modal";

const url = "";

const List = () => {
  const [movies, setMovies] = useState([]);
  const [moviesDefault, setMoviesDefault] = useState([]);
  const [movie, setMovie] = useState([]);
  const [page, setPage] = useState(1);
  const [modalShow, setModalShow] = React.useState(false);

  const getMovies = async () => {
    const api = renderToStaticMarkup(<Api page={page}></Api>);
    const response = await fetch(api.replace(/amp;/g, ""));
    const movies = await response.json();
    setMovies(Object.values(movies)[1]);
    setMoviesDefault(Object.values(movies)[1]);
    console.log(movies);
  };

  const getMoviesByGenre = (idGenre) => {
    setMovies(moviesDefault);
    console.log(idGenre);
    const newMovieList = moviesDefault.filter((movie) =>
      movie.genre_ids.includes(idGenre)
    );
    setMovies(newMovieList);
  };

  useEffect(() => {
    getMovies();
  }, [page]);

  const handlePageClick = (data) => {
    setTimeout(() => {
      const number = data.selected + 1;
      setPage(number);
    }, 200);
    getMovies();
  };

  const handleModal = async (id) => {
    const api = renderToStaticMarkup(<Api page={page} id={id}></Api>);
    const response = await fetch(api.replace(/amp;/g, ""));
    const movie = await response.json();
    setModalShow(true);
    setMovie(movie);
  };

  const convertDate = (date) => {
    date = new Date(date);
    return (
      Intl.DateTimeFormat("en-US", {
        day: "2-digit",
      }).format(date) +
      " " +
      Intl.DateTimeFormat("en-US", {
        month: "short",
      })
        .format(date)
        .toUpperCase() +
      " " +
      new Intl.DateTimeFormat("en-US", {
        year: "numeric",
      }).format(date)
    );
  };

  return (
    <>
      <Menu getMoviesByGenre={getMoviesByGenre}></Menu>
      <div>
        {movies.map((movie) => {
          const { id, title, poster_path, release_date } = movie;
          return (
            <div
              className="containerPoster"
              key={id}
              onClick={() => handleModal(id)}
            >
              <a href="#">
                <img
                  src={"https://image.tmdb.org/t/p/original" + poster_path}
                  alt="imagem"
                  className="imagem"
                />
              </a>
              <h4>{title}</h4>
              <h5>{convertDate(release_date)}</h5>
            </div>
          );
        })}
      </div>
      <div className="paginator">
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          pageCount={100}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination justify-content-center"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </div>
      <ModalPopUp
        show={modalShow}
        onHide={() => setModalShow(false)}
        movie={movie}
      ></ModalPopUp>
    </>
  );
};

export default List;
