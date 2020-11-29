import React, { useContext, useState } from 'react';
import { GrudgeContext } from './GrudgeContext';

const NewGrudge = () => {
  const [person, setPerson] = useState('');
  const [reason, setReason] = useState('');

  const { addGrudge, historyUtils } = useContext(GrudgeContext);
  const { undo, redo, hasPast, hasFuture } = historyUtils;

  const handleChange = event => {
    event.preventDefault();
    addGrudge({ person, reason });
  };

  return (
    <>
      <form className="NewGrudge" onSubmit={handleChange}>
        <input
          className="NewGrudge-input"
          placeholder="Person"
          type="text"
          value={person}
          onChange={event => setPerson(event.target.value)}
        />
        <input
          className="NewGrudge-input"
          placeholder="Reason"
          type="text"
          value={reason}
          onChange={event => setReason(event.target.value)}
        />
        <input className="NewGrudge-submit button" type="submit" />
      </form>
      <button className="full-width" disabled={!hasPast} onClick={undo}>undo</button>
      <button className="full-width" disabled={!hasFuture} onClick={redo}>redo</button>
    </>
  );
};

export default NewGrudge;
