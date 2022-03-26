import React, { Component } from 'react';
import { StyleSheet,Text, TextInput, View, TouchableOpacity} from 'react-native-web';
import FileUpload from "./Upload";

export default class Animefelvitel extends Component {
  constructor(props) {
    super(props);
    this.state = {

        id: '',
        cim:"", 
        tipus:"", 
        kep:"", 
        leiras:"",
        link:"",
        
    };
  }

felvitel=async ()=>{
    //alert("megnyomva a gomb")

    if (this.state.anime_cim==""|| this.state.anime_tipus==""|| this.state.anime_kep==""|| this.state.anime_leiras==""|| this.state.anime_link)
    {
      alert("toltsd ki!!")
      return
    }
    let bemenet={
      bevitel1:this.state.anime_cim,
      bevitel2:this.state.anime_tipus,
      bevitel3:this.state.anime_kep,
      bevitel4:this.state.anime_leiras,
      bevitel5:this.state.anime_link,
      
    }

    fetch('http://localhost:8080/animefelvitel',{
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    }
       
   
    )

    

    .then((response) => response.text())
    .then((szoveg) => {

    alert(szoveg)
     
    this.setState({anime_cim:""})
    this.setState({anime_tipus:""})
    this.setState({anime_kep:""})
    this.setState({anime_leiras:""})
    this.setState({anime_link:""})
    

})
    
}


  render() {
    return (
      <View style = {{}}>
        <View style={{padding: 10, backgroundColor:'#dddddd'}}>

  
          <Text style={{color:'black'}}>
                Anime cím
            </Text>
          <TextInput
            placeholderTextColor="#dddddd"
            style={{backgroundColor:'white', marginBottom:15, borderRadius:10, height:30}}
            placeholder="Anime cím: "
            onChangeText={(anime_cim) => this.setState({anime_cim})}
            value={this.state.anime_cim}
          />
          <Text style={{color:'black'}}>
                Típus
            </Text>
          <TextInput
            placeholderTextColor="#dddddd"
            style={{backgroundColor:'white', marginBottom:15, borderRadius:10, height:30}}
            placeholder="Anime típusa: "
            onChangeText={(anime_tipus) => this.setState({anime_tipus})}
            value={this.state.anime_tipus}
          />
          <Text style={{color:'black'}}>
                Leírás
            </Text>
          <TextInput
            placeholderTextColor="#dddddd"
            style={{backgroundColor:'white', marginBottom:15, borderRadius:10, height:30}}
            placeholder="Anime leírás: "
            onChangeText={(anime_leiras) => this.setState({anime_leiras})}
            value={this.state.anime_leiras}
          />
          <Text style={{color:'black'}}>
                Anime
            </Text>
          <TextInput
            placeholderTextColor="#dddddd"
            style={{backgroundColor:'white', marginBottom:15, borderRadius:10, height:30}}
            placeholder="Anime link: "
            onChangeText={(anime_link) => this.setState({anime_link})}
            value={this.state.anime_link}
          />
          <FileUpload anime_cim={this.state.anime_cim} anime_tipus={this.state.anime_tipus} anime_kep={this.state.anime_kep} anime_leiras={this.state.anime_leiras} anime_link={this.state.anime_link}      ></FileUpload>
  
          </View>
  
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
            backgroundColor:'blue',
            width:'45%',
            alignSelf:'center',
            borderRadius:10
    },
});