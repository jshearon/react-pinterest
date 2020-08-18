import React from 'react';
import Auth from '../Auth/Auth';

class MyNavbar extends React.Component {
  render() {
    return (
      <div className="MyNavbar">
        <nav className="navbar navbar-light bg-light justify-content-between">
          <h4 className="navbar-brand">Navbar</h4>
            <Auth authed={this.props.authed}/>
        </nav>
      </div>
    );
  }
}

export default MyNavbar;
