import React, { Component } from 'react';
import { StyleSheet,Text, TextInput, View,TouchableOpacity, FlatList, RefreshControl  } from 'react-native-web';
import Belvitel from './Belvitel';


export default class Forumuzenet extends Component {
  constructor(props) {
    super(props);
    this.state = {
        nev: '',
        komment:"",

        dataSource:[]

    };
  }
  
  componentDidMount(){
    return fetch('http://localhost:8080/forumkommentfelvitel')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){
        });
      })
      .catch((error) =>{
        console.error(error);
      });

  }




  ujratoltes=()=>{
    //alert(szam)
    this.setState({})

    return fetch('http://localhost:8080/forumkommentfelvitel')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){
        });
      })
      .catch((error) =>{
        console.error(error);
      });

  }

 
  render() {
    return (

        <View>

        <Belvitel tema_Belvitel={this.state.tema}  frissit={()=>this.ujratoltes()}  />

        <Text style={{fontSize:30, textAlign:'center', marginTop:25}}>Megjegyzések</Text>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => 

          <View style={{backgroundColor:'lightblue', borderRadius:15, margin:10}}>

          <Text style={{color:"#dd00cc",fontSize:18,marginTop:5, marginLeft:10}}>
          {item.forum_nev} </Text>
          <Text style={{color:"black",fontSize:20, marginLeft:10}}>
          {item.forum_komment} </Text>          
   
          </View>
        
        }
    
          keyExtractor={({forum_id}, index) => forum_id}
        />
    </View>
    );
  }
}

const styles = StyleSheet.create({
    gombSzoveg:{
            textAlign:'center',
            color:'white',
            marginTop:'auto',
            marginBottom:'auto',
            fontSize:16
    },
    gomb:{
            height:25,
            backgroundColor:'blue',
            width:'25%',
            borderRadius:10
    },
});