// Components
import React, { Component } from 'react';
import Main from '../containers/Main';
import PropTypes from 'prop-types';



class App extends Component {
    // componentDidMount() {		    
    // }
    render(){
        const {} = this.props
        return(
            <Main />
        )
    }
}

App.propTypes = {
}
export default App;