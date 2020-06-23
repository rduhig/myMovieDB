import React, { Component, Fragment } from 'react';
import firebase from './firebase';
import Header from './Header';
import Favourites from './Favourites';
import Watchlist from './Watchlist';
import Footer from './Footer';

class App extends Component {
  constructor() {
    super();
    this.state = {
      favourites: [],
      watchlist: []
    };
  }
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
