import React, { Component, Fragment } from 'react';
import firebase from './firebase';
import Header from './Header';
import Favourites from './Favourites';
import Watchlist from './Watchlist';
import Footer from './Footer';

class App extends Component {

  // constructor() {
  //   super();
  //   this.state = {
  //     favourites: [],
  //     watchlist: [],
  //     favouritesInput: '',
  //     watchlistInput: ''
  //   };
  // }

  // componentDidMount() {
    // const dbRef = firebase.database().ref();

    // dbRef.on('value', (response) => {
    //   const newFavourites = [];
    //   const newWatchlist = [];
    //   const data = response.val();

    // });
  //   const favouritesRef = firebase.database().ref('favourites');
  //   const watchlistRef = firebase.database().ref('watchlist');

  //   favouritesRef.on('value', (response) => {
  //     const newState = [];
  //     const data = response.val();

  //     for (let key in data) {
  //       newState.push({
  //         title: data[key],
  //         id: key
  //       });
  //     }

  //     this.setState({
  //       favourites: newState
  //     });
  //   });

  //   watchlistRef.on('value', (response) => {
  //     const newState = [];
  //     const data = response.val();

  //     for (let key in data) {
  //       newState.push({
  //         title: data[key],
  //         id: key
  //       });
  //     }

  //     this.setState({
  //       watchlist: newState
  //     });
  //   });
  // }

  // handleChange = (event) => {
  //   this.setState({
  //     [event.target.name]: event.target.value
  //   });
  // };

  // handleFavouritesClick = (event) => {
  //   event.preventDefault();
  //   const favouritesRef = firebase.database().ref('favourites');
  //   favouritesRef.push(this.state.favouritesInput);

  //   this.setState({
  //     favouritesInput: ''
  //   });
  // };

  // handleWatchlistClick = (event) => {
  //   event.preventDefault();
  //   const watchlistRef = firebase.database().ref('watchlist');
  //   watchlistRef.push(this.state.watchlistInput);

  //   this.setState({
  //     watchlistInput: ''
  //   });
  // };

  // deleteFavouritesMovie = (movieID) => {
  //   const favouritesRef = firebase.database().ref('favourites');
  //   favouritesRef.child(movieID).remove();
  // };

  // deleteWatchlistMovie = (movieID) => {
  //   const watchlistRef = firebase.database().ref('watchlist');
  //   watchlistRef.child(movieID).remove();
  // };

  render() {
    return (
      <Fragment>
        <Header />
        <main>
          <Favourites />
          <Watchlist />
        </main>
        <Footer />
      </Fragment>
    );
  }
}

export default App;
