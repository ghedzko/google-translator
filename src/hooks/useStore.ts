import { useReducer } from 'react';
import { AUTO_LANGUAGE } from '../constants';
import {
  type FromLanguage,
  type Language,
  type Action,
  type State,
} from '../types/types';

const initialState: State = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false,
};

function reducer(state: State, action: Action) {
  const { type } = action;
  if (type === 'INTERCHANGE_LANGUAGES') {
    // If the fromLanguage is auto, we don't want to interchange it
    if (state.fromLanguage === AUTO_LANGUAGE) return state;
    return {
      ...state,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage,
    };
  }
  if (type === 'CHANGE_FROM_LANGUAGE') {
    return {
      ...state,
      fromLanguage: action.payload,
    };
  }
  if (type === 'CHANGE_TO_LANGUAGE') {
    return {
      ...state,
      toLanguage: action.payload,
    };
  }
  if (type === 'CHANGE_FROM_TEXT') {
    return {
      ...state,
      loading: true,
      fromText: action.payload,
      result: '',
    };
  }
  if (type === 'SET_RESULT') {
    return {
      ...state,
      loading: false,
      result: action.payload,
    };
  }

  return state;
}
const useStore = () => {
  const [{ fromLanguage, toLanguage, fromText, loading, result }, dispatch] =
    useReducer(reducer, initialState);
  const interchangeLanguages = () => {
    dispatch({ type: 'INTERCHANGE_LANGUAGES' });
  };
  const setFromLanguage = (language: FromLanguage) => {
    dispatch({ type: 'CHANGE_FROM_LANGUAGE', payload: language });
  };
  const setToLanguage = (language: Language) => {
    dispatch({ type: 'CHANGE_TO_LANGUAGE', payload: language });
  };
  const setFromText = (text: string) => {
    dispatch({ type: 'CHANGE_FROM_TEXT', payload: text });
  };
  const setResult = (text: string) => {
    dispatch({ type: 'SET_RESULT', payload: text });
  };

  return {
    fromLanguage,
    toLanguage,
    fromText,
    loading,
    result,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
  };
};

export { useStore };
