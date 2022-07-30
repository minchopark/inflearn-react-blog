import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';


// connected-react-router를 사용한 connectRouter를 router라고 명명
// 향후에 Reducer 관련된것을 불러올때는 router라는걸 쓰면 이제 계속 connectRouter을 불러서 쓴다
const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
})

export default createRootReducer;