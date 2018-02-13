// Components
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

class MainBody extends Component {
    
    render(){
        const {} = this.props
        return(
            <View style={styles.container}>
                <Text>Open up App.js to start working on your app!</Text>
                <Text>Changes you make will automatically reload.</Text>
                <Text>Shake your phone to open the developer mmmenumvq.</Text>
            </View>
        )
    }
}



MainBody.propTypes = {
    // isLoggedIn: PropTypes.bool.isRequired

}

export default MainBody;