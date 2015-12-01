import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';
import HallOfBotanyView from '../components/hallOfBotanyView';
import * as HallOfBotanyActions from '../actions/actions';

function mapStateToProps(state) {
  return {
    context: state.context
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(HallOfBotanyActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HallOfBotanyView);
