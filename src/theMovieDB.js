import axios from 'axios';

function theMovieDB(query) {
  const key = 'b961a1064289cb0d0579059f4191e6fa';

  return axios({
    url: 'https://api.themoviedb.org/3/search/movie',
    method: 'GET',
    responseType: 'json',
    params: {
      api_key: key,
      query: query
    }
  });
}

export default theMovieDB;
