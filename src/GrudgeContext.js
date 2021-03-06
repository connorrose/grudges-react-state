import React, { createContext } from 'react';
import { useHistoryReducer } from './useHistoryReducer';
import id from 'uuid/v4';
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

export const GrudgeContext = createContext();

const GrudgeProvider = ({ children }) => {
  const [grudges, dispatch, historyUtils] = useHistoryReducer(reducer, initialState);

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
  
  const toggleForgiveness = (id) => {
    dispatch({
      type: GRUDGE_FORGIVE,
      payload: {
        id,
      }
    })
  };

  const value = { grudges, addGrudge, toggleForgiveness, historyUtils };

  return (
    <GrudgeContext.Provider value={value}>
      {children}
    </GrudgeContext.Provider>
  )
}

export default GrudgeProvider;
