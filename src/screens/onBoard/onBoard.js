
import React, { useEffect, useState } from 'react';
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
} from 'react-native';
 import { FAB } from 'react-native-paper';
 import AsyncStorage from '@react-native-community/async-storage';
 import axios from 'axios';
 import apiRoot from '../../../apiconfig';
 import AddMachine from './addMachine'
import MachineList from './machineList';
 let uniqid=''
 

export default class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            modalVisible:false,
            unqiueId:'',
            machineData:[]

        }
        
        
        
    }
    storage= async()=>{
        let uid= await AsyncStorage.getItem('uniqueid')
        console.log(uid)
        const params={
            uniqueId:uid
        }      
        uniqid=uid
        console.log(uniqid)
      axios.post(`${apiRoot.url}/getUserMachine`,params)
      .then(response => response.data)
      .then(
          result => {
              
              console.log(result)
              this.setState({
                machineData:result.data
              })
          })
        
        
        
    }
    componentDidMount(){        
         this.storage();        
    }
    getUpdate=()=>{
        const params={
            uniqueId:uid
        }      
        
      axios.post(`${apiRoot.url}/getUserMachine`,params)
      .then(response => response.data)
      .then(
          result => {
              
              console.log(result)
              this.setState({
                machineData:result.data
              })
          })
    }
    
    closeModal=()=>{
        const{modalVisible}=this.state
        this.setState({modalVisible:!modalVisible})
    }
    render(){
        const{modalVisible,machineData}=this.state
        return(
            <View style={styles.container}>
            <View style={styles.switchContainer}> 
            <Text style={styles.onBoardTitle}>
                On Board Machine
            </Text>  
            </View>
            
            
        {/* list part */}             
             
             <MachineList machine={machineData} get={this.storage.bind(this)} />
        {/* list part */}  


            {/* modal */}
            <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {          
        //   setModalVisible(!modalVisible);
          this.setState({modalVisible:!modalVisible})
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          
          <Text style={styles.onBoardTitle}>Add Machine</Text>
          <AddMachine
          get={this.storage.bind(this)}
          close={this.closeModal}
          uni={uniqid}
          />
          
          
          </View>
        </View>
      </Modal>
      
    </View>

            {/* modal */}

         
        <FAB
    style={styles.fab}
    small
    icon="plus"    
    onPress={() => 
        this.setState({modalVisible:!modalVisible})        
    }
  /> 
        </View>
        )
    }

    
 }


const styles = StyleSheet.create({
    centeredView: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
          width:270,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },

    //   modal

    buttonText: {
        fontSize: 15,
        color: '#fff'        

    },
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    Btn: {
        width: "45%",
        backgroundColor: "#612B8B",
        borderRadius: 10,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 10,
        marginRight: 10
    },
    onBoardTitle:{
       fontSize:25,
       fontWeight:"bold"
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 5,
        flexWrap: 'wrap',
    },
    switch: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        marginVertical: 2,
        paddingVertical: 10,
        width: Dimensions.get('window').width / 3,
    },
    listContainer:{
        // borderColor:'#612B8B',
        borderWidth: 2,
        // backgroundColor:'#612B8B',                
        paddingVertical:15,
        paddingHorizontal:15,
        marginBottom:10,
        marginLeft:5,
        marginRight:5,      
        borderColor:'#612B8B',  
        borderRadius:5,
        alignSelf: "stretch",

                  
        
    },
    listTextColor:{
        color: '#612B8B',
        fontWeight:'bold',
        
        
    },
     tinyLogo: {
    width: 15,
    height: 15    
  },
    machineTitle:{
      fontSize:17,      
      fontWeight:'bold' ,
       backgroundColor:'#612B8B',  
      textAlign:'center',
      marginBottom:10,
      borderColor:'#612B8B',
      borderWidth:1,
      marginLeft:80,
      marginRight:80,
      paddingHorizontal:10,
      paddingVertical:10,
      color: '#fff'
        
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        backgroundColor:'#612B8B', 
        bottom: 0        
      },
      listContent:{
       color:'black'       
      },
      listSubContainer:{
        paddingVertical:10,
        // paddingHorizontal:15,
        
      }
});

