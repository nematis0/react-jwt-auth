import React, { Component } from 'react';
import { StyleSheet,Text, TextInput, View,TouchableOpacity } from 'react-native-web';
import FileUpload from "./Upload"


export default class Animefelvitel extends Component {
  constructor(props) {
    super(props);
    this.state = {

        id: '',
        cim:"", 
        tipus:"", 
        kep:"", 
        leiras:"",
        
    };
  }

felvitel=async ()=>{
    //alert("megnyomva a gomb")

    if (this.state.id=="" || this.state.cim==""|| this.state.tipus==""|| this.state.kep==""|| this.state.leiras=="")
    {
      alert("toltsd ki!!")
      return
    }
    let bemenet={
      bevitel1:this.state.id,
      bevitel2:this.state.cim,
      bevitel3:this.state.tipus,
      bevitel4:this.state.kep,
      bevitel5:this.state.leiras,
      
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
     
    this.setState({id:""})
    this.setState({cim:""})
    this.setState({tipus:""})
    this.setState({kep:""})
    this.setState({leiras:""})
    

})
    
}


  render() {
    return (
      <View style = {{}}>
        <View style={{padding: 10, backgroundColor:'#dddddd'}}>

        

            <Text style={{color:'black'}}>
                ID
            </Text>
          <TextInput
            placeholderTextColor="#dddddd"
            style={{backgroundColor:'white', marginBottom:15, borderRadius:10, height:30}}
            placeholder="Anime ID: "
            onChangeText={(kerdes) => this.setState({kerdes})}
            value={this.state.kerdes}
          />
  
          <Text style={{color:'black'}}>
                Anime cím
            </Text>
          <TextInput
            placeholderTextColor="#dddddd"
            style={{backgroundColor:'white', marginBottom:15, borderRadius:10, height:30}}
            placeholder="Anime cím: "
            onChangeText={(kep) => this.setState({kep})}
            value={this.state.kep}
          />
          <Text style={{color:'black'}}>
                Típus
            </Text>
          <TextInput
            placeholderTextColor="#dddddd"
            style={{backgroundColor:'white', marginBottom:15, borderRadius:10, height:30}}
            placeholder="Anime típusa: "
            onChangeText={(valasz1) => this.setState({valasz1})}
            value={this.state.valasz1}
          />
          <Text style={{color:'black'}}>
                Kép
            </Text>
          <TextInput
            placeholderTextColor="#dddddd"
            style={{backgroundColor:'white', marginBottom:15, borderRadius:10, height:30}}
            placeholder="Anime kép: "
            onChangeText={(valasz2) => this.setState({valasz2})}
            value={this.state.valasz2}
          />
          <FileUpload></FileUpload>
          <Text style={{color:'black'}}>
                Leírás
            </Text>
          <TextInput
            placeholderTextColor="#dddddd"
            style={{backgroundColor:'white', marginBottom:15, borderRadius:10, height:30}}
            placeholder="Anime leírás: "
            onChangeText={(valasz3) => this.setState({valasz3})}
            value={this.state.valasz3}
          />
           <TouchableOpacity
            onPress={async ()=>this.felvitel()}>
            <View style={styles.gomb}>
              <Text style={styles.gombSzoveg}>Felvitel</Text>
            </View>
          </TouchableOpacity> 
  
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