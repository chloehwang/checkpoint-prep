import { connect } from 'react-redux';
import AllStars from './AllStars';
import {addStar} from '../../action-creators';

const mapStateToProps = function (state) {
  return {
    stars: state.allStars
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    createStar: function (starName) {
      const thunk = addStar(starName);
      dispatch(thunk);
    }
  };
};

const allStarsContainer = connect(
    mapStateToProps, 
    mapDispatchToProps
)(AllStars);

export default allStarsContainer;

