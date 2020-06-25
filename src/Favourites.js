import React, { Component } from 'react';
import firebase from 'firebase';
import theMovieDB from './theMovieDB';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

class Favourites extends Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      userInput: '',
      selectedMovie: {}
    };
  }

  componentDidMount() {
    // const movie = theMovieDB('gladiator');
    // // console.log(movie);
    // movie.then((response) => {
    //   console.log(response.data.results[0]);
    // });
    const dbRef = firebase.database().ref('favourites');

    dbRef.on('value', (response) => {
      const newState = [];
      const data = response.val();

      for (let key in data) {
        newState.push({
          title: data[key],
          id: key
        });
      }

      this.setState({
        movies: newState
      });
    });
  }

  handleChange = (event) => {
    this.setState({
      userInput: event.target.value
    });
  };

  handleClick = (event) => {
    event.preventDefault();
    const dbRef = firebase.database().ref('favourites');
    dbRef.push(this.state.userInput);

    this.setState({
      userInput: ''
    });
  };

  handleSelect = (movieTitle) => {
    const promise = theMovieDB(movieTitle);
    // let newState = {};

    promise.then((response) => {
      const movieObj = response.data.results[0];
      const posterBaseURL = 'https://image.tmdb.org/t/p/w500';
      const imdbBaseURL = 'https://www.imdb.com/title/';

      const newState = {
        originalTitle: movieObj.original_title,
        releaseDate: movieObj.release_date,
        overview: movieObj.overview,
        voteAverage: movieObj.vote_average,
        posterPath: `${posterBaseURL}${movieObj.poster_path}`
        // imdbPath: `${imdbBaseURL}${movieObj.imdb_id}`
      };

      this.setState({
        selectedMovie: newState
      });
    }).catch((error) => {
      this.setState({
        selectedMovie: {
          originalTitle: "",
          releaseDate: "",
          overview: "",
          voteAverage: "",
          posterPath: "#"
        }
      });
    });
  };

  deleteMovie = (movieID) => {
    const dbRef = firebase.database().ref('favourites');
    dbRef.child(movieID).remove();
  };

  render() {
    return (
      <section className="favourites">
        <h2>My Favourites</h2>
        <div className="gridContainer">
          <div className="gridLeft">
            <form>
              <input
                type="text"
                placeholder="Movie Title"
                value={this.state.userInput}
                onChange={this.handleChange}
              />
              <button type="submit" onClick={this.handleClick}>Add Movie</button>
            </form>
            <ul>
              {this.state.movies.map((movie) => {
                return (
                  <li key={movie.id} onClick={() => this.handleSelect(movie.title)}>
                    <button onClick={() => this.deleteMovie(movie.id)}><FontAwesomeIcon icon={faTimesCircle} /> Remove</button>
                    <span><FontAwesomeIcon icon={faAngleRight} /> {movie.title}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="gridRight">
            <h3>{this.state.selectedMovie.originalTitle}</h3>
            <img src={this.state.selectedMovie.posterPath} alt={`Poster for the movie ${this.state.selectedMovie.originalTitle}`} />
            <p>Release date: {this.state.selectedMovie.releaseDate}</p>
            <p>Overview: {this.state.selectedMovie.overview}</p>
            <p>IMDB rating: {this.state.selectedMovie.voteAverage}</p>
            <a href={this.state.selectedMovie.imdbPath}>IMBD Page</a>
          </div>
        </div>
      </section>
    );
  }
}

export default Favourites;
