import React from 'react';
import Grudges from './Grudges';
import NewGrudge from './NewGrudge';

/* ----- COMPONENT ----- */
const Application = () => (
  <div className="Application">
    <NewGrudge />
    <Grudges />
  </div>
);

export default Application;
