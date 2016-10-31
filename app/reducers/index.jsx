import { combineReducers } from 'redux';
import { CREATE_STAR, RECEIVE_STARS, SELECT_STAR, RECIEVE_WISHES, DELETE_WISH} from '../action-creators';

const initialState = {
    allStars: [],
    selectedStar: {},
    wishes: [],
}

const rootReducer = function(state = initialState, action) {
  switch(action.type) {
    case CREATE_STAR:
        return Object.assign({}, state, {allStars: state.allStars.concat(action.star)});
    case RECEIVE_STARS:
        return Object.assign({}, state, {allStars: action.stars});
    case SELECT_STAR:
    console.log('ACTIONNNNN!!!!', action)
        return Object.assign({}, state, {selectedStar: action.star, wishes: action.wishes})
    case RECIEVE_WISHES:
        return Object.assign({}, state, {wishes: action.wishes})
    case DELETE_WISH: 
        var updatedWishes = state.wishes.filter(wish => {
            return wish.id !== action.wish.id;
        })
        return Object.assign({}, state, {wishes: updatedWishes})
    default: return state;
  }
};

export default rootReducer;
