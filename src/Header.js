import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <header>
        <div>
          <h1>My <span>Movie</span> DB</h1>
          <p>Welcome to your own personalized movie database.</p>
          <p>We'll keep track of your all-time favourite flicks and what's on your watch list next, so you can keep your eyes on the big screen.</p>
          <button>Let's get started</button>
        </div>
      </header>
    );
  }
}

export default Header;
