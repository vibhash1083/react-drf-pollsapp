import { combineReducers } from 'redux';
import ques from './ques';
import choices from './choices';


const rootReducer = combineReducers({
  			ques,
  			choices
});

export default rootReducer;
