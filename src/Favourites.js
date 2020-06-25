import React, { Component } from 'react';
import firebase from 'firebase';
import theMovieDB from './theMovieDB';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import noImage from './assets/noImage.png';

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

    promise.then((response) => {
      const movieObj = response.data.results[0];
      const posterBaseURL = 'https://image.tmdb.org/t/p/w500';

      const newState = {
        originalTitle: movieObj.original_title,
        releaseDate: `Release Date: ${movieObj.release_date}`,
        overview: `Overview: ${movieObj.overview}`,
        voteAverage: `IMDB Rating: ${movieObj.vote_average}`,
        posterPath: `${posterBaseURL}${movieObj.poster_path}`
      };

      this.setState({
        selectedMovie: newState
      });
    }).catch(() => {
      this.setState({
        selectedMovie: {
          originalTitle: "",
          releaseDate: "",
          overview: "The selected movie could not be found. Check the spelling of the movie title.",
          voteAverage: "",
          posterPath: noImage
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
            <img src={this.state.selectedMovie.posterPath || noImage} alt={`Poster for the movie ${this.state.selectedMovie.originalTitle}`} />
            <div>
              <h3>{this.state.selectedMovie.originalTitle}</h3>
              <p>{this.state.selectedMovie.releaseDate}</p>
              <p>{this.state.selectedMovie.overview}</p>
              <p>{this.state.selectedMovie.voteAverage}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Favourites;
