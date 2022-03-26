import React from 'react';
import {StyleSheet, FlatList, ActivityIndicator, Text, View, Image , TouchableOpacity } from 'react-native-web';

export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  szavazat=(szam)=>{
    //alert(szam)
    var bemenet={
      bevitel6:szam
    }
  fetch("http://localhost:8080/animetorles", {
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    }
  
  )
  .then(x => x.text())
  .then(y => {alert(y);this.lekerdezes()});
    
  }
  lekerdezes=()=>{
    fetch('http://localhost:8080/Animek')
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

  componentDidMount(){
    this.lekerdezes()
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

          <View >
          <Text style={{color:"black",fontSize:20, fontWeight:"bold",textAlign:"center",marginTop:15,marginBottom:5}}   >{item.anime_cim} </Text>
          <Image  source={{uri: 'http://localhost:8080/'+item.anime_kep}} style={{width:300,height:300,marginLeft:"auto",marginRight:"auto"}} />  

          <TouchableOpacity
          onPress={async ()=>this.szavazat(item.anime_id)}>
          <View style={styles.gomb}>
          <Text style={styles.gombSzoveg}>Törlés</Text>
          </View>
         </TouchableOpacity>
          </View>
        
        }

        
          keyExtractor={({anime_id}, index) => anime_id}
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
    width:'28%',
    alignSelf:'center',
},
});