import React, { Component } from 'react';
import firebase from 'firebase';

class Watchlist extends Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      userInput: ''
    };
  }

  componentDidMount() {
    const dbRef = firebase.database().ref('watchlist');

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
    const dbRef = firebase.database().ref('watchlist');
    dbRef.push(this.state.userInput);

    this.setState({
      userInput: ''
    });
  };

  deleteMovie = (movieID) => {
    const dbRef = firebase.database().ref('watchlist');
    dbRef.child(movieID).remove();
  };

  render() {
    return (
      <section className="watchlist">
        <h2>My Watchlist</h2>
        <form>
          <input
            value={this.state.userInput}
            onChange={this.handleChange}
            type="text"
          />
          <button onClick={this.handleClick}>Add Movie</button>
        </form>
        <ul>
          {this.state.movies.map((movie) => {
            return (
              <li key={movie.id}>
                <p>{movie.title}</p>
                <button onClick={() => this.deleteMovie(movie.id)}>Delete</button>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}

export default Watchlist;
