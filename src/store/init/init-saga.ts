import createSagaMiddleware, { SagaMiddleware } from "redux-saga";

const initSagaMiddleware = (): SagaMiddleware => {
  const sagaMiddleware: SagaMiddleware = createSagaMiddleware();
  return sagaMiddleware;
};

export default initSagaMiddleware;
