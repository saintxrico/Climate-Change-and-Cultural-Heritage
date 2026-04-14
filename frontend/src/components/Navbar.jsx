import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-green-600 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-xl font-bold">Climate Watch Kenya</h1>
        <ul className="flex space-x-4">
          <li><a href="/">Home</a></li>
          <li><a href="/report">Report Issue</a></li>
          <li><a href="/map">Map</a></li>
          <li><a href="/events">Events</a></li>
          <li><a href="/learn">Learn</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;