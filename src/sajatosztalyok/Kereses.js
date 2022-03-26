import React, { Component } from 'react';
import { StyleSheet,Text, TextInput, View,TouchableOpacity,FlatList,Image } from 'react-native-web';

export default class Kereses extends Component {
  constructor(props) {
    super(props);
    this.state = {
        nev: '', 
        dataSource:[],
        dataSource2:[]
    };
  }

kereses=async ()=>{
    //alert(this.state.nev)
    var bemenet={
      bevitel4:this.state.nev
    }

return fetch('http://localhost:8080/kereses', {
  method: "POST",
  body: JSON.stringify(bemenet),
  headers: {"Content-type": "application/json; charset=UTF-8"}

}

)
  .then((response) => response.json())
  .then((responseJson) => {

    this.setState({
      isLoading: false,
      dataSource2: responseJson,
    }, function(){

    });

  })

  .catch((error) =>{
    console.error(error);
  });

}

  render() {
    return (
    <View style = {{width:'95%',borderRadius:20,alignSelf:'center',flex:1,marginBottom:10}}>
      <View style={{borderWidth:5,borderColor:"#0fb0fb",borderRadius:10, margin:20,backgroundColor:"lightgray"}}>
          <Text style={{padding: 10, textAlign:'center',color:"black", fontWeight:"bold", textAlign:"center", fontSize:25}}>
              Keresés:
          </Text>

        <TextInput
          placeholderTextColor="white"
          style={{height: 40,width:'85%',alignSelf:'center',backgroundColor:'#0fb0fb',borderColor:'black',color:"white",textAlign:'center',}}
          placeholder="Anime cím"
          onChangeText={(nev) => this.setState({nev})}
          value={this.state.nev}
        />

         <TouchableOpacity style={{padding:10}}
          onPress={async ()=>this.kereses()}>
          <View style={styles.gomb}>
          <Text style={styles.gombSzoveg}>Keresés</Text>
          </View>
         </TouchableOpacity>

     </View>

    { this.state.dataSource2 ? 
      <FlatList
      data={this.state.dataSource2}
      renderItem={({item}) => 
      <View style={{borderWidth:5,borderColor:"#0fb0fb",borderRadius:10, margin:20,backgroundColor:"lightgray"}}>
      <Text style={{color:"black", marginTop:15, marginBottom:5, fontWeight:"bold", textAlign:"center", fontSize:25 }}   >{item.anime_cim} </Text>
      <Image  source={{uri: 'http://localhost:8080/'+item.anime_kep}} style={{width:300,height:400,marginLeft:"auto",marginRight:"auto"}} />  
      <Text style={{color: 'black', fontSize:15, fontWeight:"bold",textAlign:"center", marginTop:15, marginBottom:5, textAlign:"justify", margin: 15}}   >{item.anime_leiras} </Text>
      </View>

    }
    />
    : null}
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