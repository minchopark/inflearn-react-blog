import {all} from 'redux-saga/effects';

// * : 제너레이터 함수, 여러값을 반환할수있는 최신문법
// [] 안에 여러가지 sagas 값들을 넣고 사용할수있다.
export default function* rootSaga() {
    yield all([]);
}
