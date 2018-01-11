import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import taskReducer from './tasks';
import projectReducer from './projects';
import clientReducer from './clients';


export default combineReducers({
    router: routerReducer,
    taskStore: taskReducer,
    projectStore: projectReducer,
    clientStore: clientReducer,
});
