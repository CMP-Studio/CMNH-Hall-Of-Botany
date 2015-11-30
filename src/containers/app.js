import { bindActionCreators } from 'redux';
import { connect } from 'react-redux/native';
import CheckboxList from '../components/checkboxList';
import * as CheckboxListActions from '../actions/actions';

function mapStateToProps(state) {
  return {
    rows: state.rows
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CheckboxListActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckboxList);
