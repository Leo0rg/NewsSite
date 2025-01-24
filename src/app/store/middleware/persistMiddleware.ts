import { Middleware, Action } from '@reduxjs/toolkit';

interface ActionWithType extends Action {
  type: string;
}

export const persistMiddleware: Middleware = store => next => (action: unknown) => {
  const result = next(action);
  
  if (typeof action === 'object' && action !== null && 'type' in action) {
    const typedAction = action as ActionWithType;
    
    // Сохраняем состояние auth при изменениях
    if (typedAction.type.startsWith('auth/')) {
      const state = store.getState();
      localStorage.setItem('authState', JSON.stringify(state.auth));
    }
    
    // Сохраняем состояние user при изменениях
    if (typedAction.type.startsWith('user/')) {
      const state = store.getState();
      localStorage.setItem('userState', JSON.stringify(state.user));
    }
  }
  
  return result;
}; 