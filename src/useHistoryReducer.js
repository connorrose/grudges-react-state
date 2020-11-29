import { useCallback, useReducer } from 'react';

export const useHistoryReducer = (clientReducer, initialClientState) => {
  const initialState = {
    past: [],
    present: initialClientState,
    future: [],
  }

  // Alternatively, shuffling state could be handled in a wrapped dispatch
  // instead of a wrapped reducer. However, this makes the history state
  // less "redux"-like by manipulating it manually
  const reducer = (state, action) => {
    if (action?.type === 'UNDO') {
      if (state.past.length === 0) return state;

      const [newPresent, ...newPast] = state.past;
      const newFuture = [state.present, ...state.future];
      return {
        past: newPast,
        present: newPresent,
        future: newFuture,
      }
    }

    if (action?.type === 'REDO') {
      if (state.future.length === 0) return state;

      const [newPresent, ...newFuture] = state.future;
      const newPast = [state.present, ...state.past];
      return {
        past: newPast,
        present: newPresent,
        future: newFuture,
      }
    }

    return {
      past: [state.present, ...state.past],
      present: clientReducer(state.present, action),
      future: [],
    }
  }

  const [currentState, dispatch] = useReducer(reducer, initialState);

  const undo = useCallback(() => {
    dispatch({ type: 'UNDO'})
  }, [dispatch]);

  const redo = useCallback(() => {
    dispatch({ type: 'REDO'})
  }, [dispatch]);

  const hasPast = currentState.past.length !== 0;
  const hasFuture = currentState.future.length !== 0;

  return [currentState.present, dispatch, { undo, redo, hasPast, hasFuture, }];
}

// FORM VALIDATION?
/*
const initialState = {
  first: '',
  last: '',
  gender: false,
}

const [formData, setFormData] = useState(initialState);

const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

const reset = setFormData(initialState)
*/