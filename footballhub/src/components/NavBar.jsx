
import React from 'react';
import soccerBall from '../assets/fireball.png';
import { Link } from 'react-router-dom';


const NavBar = () => {
  return (
    <nav className='navBar'>
      <Link to='/'>      
        <div className="logoFH">FootballHub</div>
      </Link>
      <Link to='/'>
        <div className="home-button"> <img className='ball' src={soccerBall} alt="firey soccer ball" /></div>
      </Link>
      <Link to='/new'>
        <button className="post-button">Make a Post!</button>
      </Link>
    </nav>
  );
};

export default NavBar;
