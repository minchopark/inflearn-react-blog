import {createStore, compose, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {createBrowserHistory} from 'history';
import {routerMiddleware} from 'connected-react-router';

import createRootReducer from './redux/reducers/index';
import rootSaga from './redux/sagas/index';


export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();


// 웹의 모든상태를 담고있는 초기값
const initialState = {};


// 향후에 미들웨어를 더 쓴다면 배열안에 더 추가해주면 된다
const middlewares = [sagaMiddleware, routerMiddleware(history)];

// 크롬 같은곳에서 redux로 개발을할때 어떻게 상태가 진행되고있는지 확인하게 해주는 개발도구
const devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

// 배포환경에서는 devtools 가 보이게되고 개발자 도구를 안보이게 해줘야함
const composeEnhancer = process.env.NODE_ENV === "production" ? compose : devtools || compose;

// store 를 만들어주세요
const store = createStore(
    createRootReducer(history),
    initialState,
    composeEnhancer(applyMiddleware(...middlewares))
)

// saga미들웨어를 작동해주세요
sagaMiddleware.run(rootSaga)

// store 한곳에 모든 상태값을 저장한 후 이곳에서 상태값을 끄집어내 필요한곳에서 쓰게 한다
// 한곳에서만 값을 확인하면된다.
// reducers 에서 상태값을 어떻게 관리할지를 정해준다. ex) 로그인을 요청했다, 성공했다, 실패했다
// sagas 이러한 상태일때 어떠한 함수들이 작동을 해야하는지 결정해준다
// reducers-sagas 한 세트로 같이 작동


export default store;