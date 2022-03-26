import React from 'react';
import {StyleSheet, FlatList, ActivityIndicator, Text, View, TouchableOpacity } from 'react-native-web';

export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  torles=(szam)=>{
    //alert(szam)
    var bemenet={
      bevitel7:szam
    }
  fetch("http://localhost:8080/uzenettorles", {
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    }
  
  )
  .then(x => x.text())
  .then(y => alert(y));

  }


  componentDidMount(){
    return fetch('http://localhost:8080/forumkommentek')
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



  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop:20}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => 

          <View style={{borderWidth:5, borderColor:"#0fb0fb", borderRadius:10, margin:20, backgroundColor:"lightgray"}}>
          <Text style={{color:"black", fontWeight:"bold", fontSize:18, marginTop:5, marginLeft:10, textAlign:'center'}}   >{item.forum_nev} </Text>
          <Text style={{color:"black", fontSize:20, marginLeft:10, textAlign:'center'}}   >{item.forum_szoveg} </Text> 

          <TouchableOpacity style={{padding:10}}
          onPress={async ()=>this.torles(item.forum_id)}>
          <View style={styles.gomb}>
          <Text style={styles.gombSzoveg}>Törlés</Text>
          </View>
         </TouchableOpacity>
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
    fontSize:25
},
gomb:{
    height:45,
    backgroundColor:'#0fb0fb',
    width:'45%',
    alignSelf:'center',
    borderRadius:10
},
});