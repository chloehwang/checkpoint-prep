import { connect } from 'react-redux';
import SingleStar from './SingleStar';
import {addWish, deleteWish} from '../../action-creators'

const mapStateToProps = function (state) {
  console.log('wishes??', state)
  return {
    star: state.selectedStar,
    wishes: state.wishes
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    createWish: function (wish, starId) {
      const thunk = addWish(wish);
      dispatch(thunk);
    },
    remove: function (wishId) {
      const thunk = deleteWish(wishId);
      dispatch(thunk)
    }
  };
};

const SingleStarContainer = connect(
    mapStateToProps, 
    mapDispatchToProps
)(SingleStar);

export default SingleStarContainer;

