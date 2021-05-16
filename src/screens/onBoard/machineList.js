
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
import apiRoot from '../../../apiconfig';
import axios from 'axios';
import EditMachine from './editMachine';

export default class MachineList extends React.Component {
    
    constructor(props){
     super(props);
        this.state={
            modalVisible:false,
            machineId:''
        }        
    }
    closeModal=()=>{
        const{modalVisible}=this.state
        this.setState({modalVisible:!modalVisible})
        this.props.get();
    }

    render(){
        const{modalVisible,machineId}=this.state
        return(
            <ScrollView keyboardShouldPersistTaps="true">            
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
          
          <Text style={styles.onBoardTitle}>Update Machine</Text>
          
          
          <EditMachine close={this.closeModal}
          
          id={machineId}
          />
          </View>
        </View>
      </Modal>
      
    </View>

                         
                   <Text style={styles.machineTitle}>
                             Machine List
                         </Text>
                         {this.props.machine.length >0 ? 
                           this.props.machine.map((person, index) => (                               
                               <Text style={styles.listContainer} id={index} onPress={()=>{
                                this.setState({
                                    modalVisible:!modalVisible,
                                    machineId:person.machineid
                                
                                })
                               }}>  
                               <View style={styles.listSubContainer}>
                                  <Text >
                                               <Text style={styles.listTextColor}>
                                               Machine Name : 
                                               
                                               </Text>
                                  
                                           <Text style={styles.listContent} >
                                           {person.machinename}
                                           </Text> 
       
                                           
                                      </Text> 
                                      
                               </View>
                               {"\n"}
                               <View style={styles.listSubContainer}>      
                                 <Text>
                               <Text style={styles.listTextColor}>
                                   Machine Mobile :
                               
                               </Text>  
                               <Text style={styles.listContent} >
                               {person.mobile1}
                                           </Text> 
                               </Text>                    
                               </View> 
       
                                                    
                               </Text>
                   
           ))
           :
           <Text style={styles.emptyListContainer}
           >  
           <View style={styles.listSubContainer}>
              <Text >
                           <Text style={styles.listTextColorCenter}>
                           Add Machines to View here
                           
                           </Text>                       
                  </Text> 
                  
           </View>
           </Text>
           }     
           
                   
               </ScrollView>  
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
    emptyListContainer:{
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
        textAlign:'center'        
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
        alignSelf: "stretch"        

                  
        
    },
    listTextColorCenter:{
        color: '#612B8B',
        fontWeight:'bold',
        textAlign:'center'
        
        
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

