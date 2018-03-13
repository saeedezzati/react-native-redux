// Components
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'powderblue',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    },
    
});


class MainBody extends Component {
    
    render(){
        const {} = this.props
        return(
                <View style={styles.container}>
                    <View style={{flex: 1, backgroundColor: 'powderblue'}} />
                    <View style={{flex: 2, backgroundColor: 'skyblue'}} />
                    <View style={{flex: 3, backgroundColor: 'steelblue'}} />
                    <Button
                        onPress={() => {
                            Alert.alert('You tapped the button!');
                        }}
                        title="Press Meee"
                    />

                </View>
        )
    }
}



MainBody.propTypes = {
    // isLoggedIn: PropTypes.bool.isRequired

}

export default MainBody;