import { connect } from 'react-redux';
import MainBody from '../components/MainBody';


const mapStateToProps = (state) => {
  return {
    // isLoggedIn: !_.isEmpty(state.user.token),
  }
}

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {onLoginClick: ApiAuthenticate.authenticate}
// }

const Main = connect(
  mapStateToProps,
  // mapDispatchToProps
)(MainBody)

export default Main;
