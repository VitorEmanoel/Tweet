import React, { Component } from 'react';

import 
{ 
    View,
    Text, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity, 
    KeyboardAvoidingView,
    AsyncStorage
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { StackActions, NavigationActions } from 'react-navigation';

export default class Login extends Component {
    static navigationOptions = {
        title: "Inicio"
    }

    state = {
        username: '',
    }

    async componentDidMount(){
        const username = await AsyncStorage.getItem("@GoTwitter:username");
        if(username){
            this.navigationToTimeline();
        }
    }

    handleInputChange = username =>{
        this.setState({ username });
    }

    handleLogin = async () =>{
        const { username } = this.state;
        if(!username.length) return;
        await AsyncStorage.setItem("@GoTwitter:username", username);
        this.navigationToTimeline();
    }

    navigationToTimeline = () =>{
        const resetAction = StackActions.reset({
            index: 0,
            actions:[NavigationActions.navigate({ routeName: 'Timeline' })]
        });
        this.props.navigation.dispatch(resetAction);
    };

  render() {
    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.content}>
                <View>
                    <Icon name="twitter" size={64} color="#4BB0EE" />
                </View>
                <TextInput
                style={styles.input}
                placeholder="Nome de usuario"
                value={this.state.username}
                onChangeText={this.handleInputChange}/>
                <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
            </View>


        </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFF"
    },
  
    content: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 30
    },
  
    input: {
      borderWidth: 1,
      borderColor: "#DDD",
      borderRadius: 5,
      height: 44,
      paddingHorizontal: 15,
      alignSelf: "stretch",
      marginTop: 30
    },
  
    button: {
      height: 44,
      alignSelf: "stretch",
      marginTop: 10,
      backgroundColor: "#4BB0EE",
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center"
    },
  
    buttonText: {
      color: "#FFF",
      fontSize: 16,
      fontWeight: "bold"
    }
  });
  