import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HallOfBotanyView from '../components/hallOfBotanyView';
import * as HallOfBotanyActions from '../actions/actions';

function mapStateToProps(state) {
  return {
    activeBeacon: state.activeBeacon,
    audio: state.audio,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(HallOfBotanyActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HallOfBotanyView);
