import React, { useState } from "react";
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    Pressable,
    ScrollView,
    Modal,
    Image,
    View,
    TextInput,
} from "react-native";
import apiRoot from '../../../apiconfig';
import axios from 'axios';

export default class AddMachine extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            name:'',
            mobile:'',
            uniqueId:this.props.uni
        }
    }
    onSubmit=()=>{
        const{name,mobile,uniqueId}=this.state;
        const params={
            machineName:name,
            mobile:mobile,
            uniqueId
        }
        console.log(params)
        axios.post(`${apiRoot.url}/createUserMachine`,params)
        .then(response => response.data)
        .then(
            result => {
                
                
                if(result.error)
                {
                    
                   var n = result.error.includes("Duplicate");
                     
                     if(n)
                     {
                         alert('Mobile Number Already Registered')
                     }
                }
                else{
                    console.log(result)
                    this.props.get();
                    this.props.close();
                }
            }).
            catch(err => 
                {
                    
                    alert('Duplicate '+err)                    
                }
                );
       
    }
    

    render() {
        const{name,mobile}=this.state;
        return (
            <View  style={styles.headText}>
                
                <TextInput
                    keyboardType="default"
                     onChangeText={name => this.setState({name:name})}
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                />

                <TextInput
                    keyboardType="default"
                     onChangeText={mobile=> this.setState({mobile:mobile})}
                    style={styles.input}
                    placeholder="Mobile"
                    value={mobile}
                />
                <View>
                    <Text style={styles.btnContainer}>
                <Pressable
              style={styles.btn}
              onPress={this.onSubmit}
            >
              <Text 
              style={styles.btnText}
              >Submit</Text>
            </Pressable>
            <Text>{"     "}</Text>
                <Pressable
              style={styles.btn}
              onPress={this.props.close}
            >
              <Text 
              style={styles.btnText}
              >Cancel</Text>
            </Pressable>
                 </Text>
                </View>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    
    input: {
        backgroundColor: "#DAE1F1",
        width: 200,
        height: 40,
        marginHorizontal: 20,
        borderRadius: 10,
        color: "#333333",
        marginBottom: 20,
        paddingLeft: 15,
    },
    headText: {
        marginTop:20
    },
    btnContainer:{       
       marginLeft:20,
       backgroundColor:'#fff'

    },
    btn:{
        
        backgroundColor:'#612B8B',
        width:80,
        paddingHorizontal:10,
        paddingVertical:10,
        

    },
    btnText:{
        color:'#fff',
        textAlign:'center'
    }

});
