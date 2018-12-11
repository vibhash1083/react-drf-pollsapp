import { GET_QUES, ADD_QUES, DELETE_QUES, EDIT_QUES} from '../constants/ActionTypes';

const initialState = [];

export default function ques(state = initialState, action) {
  switch (action.type) {

  case GET_QUES:
    return [...action.ques];

  case ADD_QUES:
    return [...state, action.que];

  case DELETE_QUES:
    return state.filter(que =>
      que.id !== action.id
    );
  case EDIT_QUES:
    return state.map(que =>
      que.id === action.que.id ? action.que : que
    );
  default:
    return state;
  }
}
