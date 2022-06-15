import axios from "axios";

const Api = (props) => {
  let url = "";
  const key = "eaeb92c72348468a01f7087f5e0d293a";
  console.log(props.genre);

  //movie by id
  if (props.id) {
    url =
      "https://api.themoviedb.org/3/movie/" +
      props.id +
      "?api_key=" +
      key +
      "&language=pt-BR";
  }
  //genre movies
  else if (props.genre) {
    url =
      url +
      "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
      key +
      "&language=pt-BR";
  }
  //popular movies
  else {
    url =
      "https://api.themoviedb.org/3/movie/popular?api_key=" +
      key +
      "&language=pt-BR&page=" +
      props.page;
  }
  return url;
};

export default Api;
