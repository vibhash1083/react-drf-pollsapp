import { GET_CHOICES, ADD_CHOICE} from '../constants/ActionTypes';

const initialState = [];

export default function choices(state = initialState, action) {
  switch (action.type) {

  case GET_CHOICES:
    return [...action.choices];

  case ADD_CHOICE:
    return [...state, action.choice];


  default:
    return state;
  }
}
