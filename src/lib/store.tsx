// FILE: src/lib/store.tsx
'use client'

import { createContext, useReducer, useEffect, useState } from 'react';

const initialState = {
  policies: [],
  integrations: [],
  evidence: [],
  logs: [],
  loaded: false,
  toast: { message: '', type: '' }
};

const StoreContext = createContext<[typeof initialState, React.Dispatch<any>]>([initialState, () => {}]);

const storeReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SEED':
      return { ...state, ...action, loaded: true };
    case 'ADD_ENTITY':
      return { ...state, [action.entity]: [...state[action.entity], action.data] };
    case 'UPDATE_ENTITY':
      return { ...state, [action.entity]: state[action.entity].map((item: any) => item.id === action.data.id ? action.data : item) };
    case 'DELETE_ENTITY':
      return { ...state, [action.entity]: state[action.entity].filter((item: any) => item.id !== action.id) };
    case 'TOAST':
      return { ...state, toast: { message: action.message, type: action.toastType } };
    case 'DISMISS_TOAST':
      return { ...state, toast: { message: '', type: '' } };
    default:
      return state;
  }
};

const useStore = () => {
  const [state, dispatch] = useReducer(storeReducer, initialState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const entities = ['policies', 'integrations', 'evidence', 'logs'];
      const data = await Promise.all(entities.map(async entity => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/${entity}`);
        return response.json();
      }));
      dispatch({ type: 'SEED', policies: data[0], integrations: data[1], evidence: data[2], logs: data[3] });
      setLoading(false);
    };

    if (typeof window !== 'undefined' && localStorage.getItem('app_policies')) {
      dispatch({
        type: 'SEED',
        policies: JSON.parse(localStorage.getItem('app_policies') || '[]'),
        integrations: JSON.parse(localStorage.getItem('app_integrations') || '[]'),
        evidence: JSON.parse(localStorage.getItem('app_evidence') || '[]'),
        logs: JSON.parse(localStorage.getItem('app_logs') || '[]')
      });
      setLoading(false);
    } else {
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && state.loaded && !loading) {
      localStorage.setItem('app_policies', JSON.stringify(state.policies));
      localStorage.setItem('app_integrations', JSON.stringify(state.integrations));
      localStorage.setItem('app_evidence', JSON.stringify(state.evidence));
      localStorage.setItem('app_logs', JSON.stringify(state.logs));
    }
  }, [state, loading]);

  const optimisticDispatch = (action: any) => {
    dispatch(action);
    const { entity, data, id } = action;
    let method, url, body;

    switch (action.type) {
      case 'ADD_ENTITY':
        method = 'POST';
        url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/${entity}`;
        body = JSON.stringify(data);
        break;
      case 'UPDATE_ENTITY':
        method = 'PUT';
        url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/${entity}/${id}`;
        body = JSON.stringify(data);
        break;
      case 'DELETE_ENTITY':
        method = 'DELETE';
        url = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/${entity}/${id}`;
        break;
    }

    if (!url) return;

    fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body })
      .catch(error => {
        console.error('API Error:', error);
        dispatch({ type: 'DISMISS_TOAST' });
        dispatch(action); // Revert state on error
      });
  };

  return [state, optimisticDispatch];
};

export { StoreContext, useStore };