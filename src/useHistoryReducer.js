import { useCallback, useReducer } from 'react';

export const useHistoryReducer = (clientReducer, initialClientState) => {
  const initialState = {
    past: [],
    present: initialClientState,
    future: [],
  }

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

  return [currentState.present, dispatch, undo, redo];
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