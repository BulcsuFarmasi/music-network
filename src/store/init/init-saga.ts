import createSagaMiddleware, { SagaMiddleware } from "redux-saga";

export const initSagaMiddleware = (): SagaMiddleware => {
  const sagaMiddleware: SagaMiddleware = createSagaMiddleware();
  return sagaMiddleware;
};
