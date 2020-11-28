import React, { useReducer, useCallback } from 'react';

import id from 'uuid/v4';

import Grudges from './Grudges';
import NewGrudge from './NewGrudge';

import initialState from './initialState';

const GRUDGE_ADD = 'GRUDGE_ADD';
const GRUDGE_FORGIVE = 'GRUDGE_FORGIVE';

const reducer = (state, action) => {
  const { type, payload } = action;

    if (type === GRUDGE_ADD) {
      return [action.payload, ...state];
    }

    if (type === GRUDGE_FORGIVE) {
      return state.map((grudge) => (
        grudge.id === payload.id
          ? {...grudge, forgiven: !grudge.forgiven}
          : grudge
      ));
    } 

    return state;
}

/* ----- COMPONENT ----- */
const Application = () => {
  const [grudges, dispatch] = useReducer(reducer, initialState);

  const addGrudge = ({ person, reason }) => {
    dispatch({
      type: GRUDGE_ADD,
      payload: {
        person,
        reason,
        forgiven: false,
        id: id(),
      },
    })
  };

  const toggleForgiveness = useCallback((id) => {
    dispatch({
      type: GRUDGE_FORGIVE,
      payload: {
        id,
      }
    })
  }, [dispatch]);

  return (
    <div className="Application">
      <NewGrudge onSubmit={addGrudge} />
      <Grudges grudges={grudges} onForgive={toggleForgiveness} />
    </div>
  );
};

export default Application;
