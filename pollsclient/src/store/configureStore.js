import { createStore, compose, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import rootReducer from '../reducers';

const enhancer = compose(
  applyMiddleware(promise)
);

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers').default)
    );
  }

  return store;
}
