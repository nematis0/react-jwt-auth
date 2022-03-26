import React, { Component } from 'react';
import { StyleSheet,Text, TextInput, View,TouchableOpacity } from 'react-native-web';


export default class Belvitel extends Component {
  constructor(props) {
    super(props);
    this.state = {

        nev: '',
        komment:""
    };
  }

felvitel=async ()=>{
    //alert("megnyomva a gomb")

    if (this.state.nev=="" || this.state.komment=="")
    {
      alert("Add meg a nevet és a kommmentet!")
      return
    }
    let bemenet={
      bevitel1:this.state.nev,
      bevitel2:this.state.komment
    }

    fetch('http://localhost:8080/forumuzenetfelvitel',{
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    }
       
    )
    .then((response) => response.text())
    .then((szoveg) => {

    alert(szoveg)
     this.props.frissit() 

})
    
}



  render() {
    return (
      <View style = {{}}>
        <View style={{borderWidth:5,borderColor:"#0fb0fb",borderRadius:10, margin:20,backgroundColor:"lightgray"}}>
            <Text style={{color:'black'}}>
                Név:
            </Text>
          <TextInput
            placeholderTextColor="#dddddd"
            style={{backgroundColor:'white', marginBottom:15, borderRadius:10, height:30}}
            placeholder="Add meg a neved:"
            onChangeText={(nev) => this.setState({nev})}
            value={this.state.nev}
          />
  
          <Text style={{color:'black'}}>
                Komment:
            </Text>
          <TextInput
            placeholderTextColor="#dddddd"
            style={{backgroundColor:'white', marginBottom:15, borderRadius:10, height:30}}
            placeholder=" Add meg a kommentet:"
            onChangeText={(komment) => this.setState({komment})}
            value={this.state.komment}
          />
           <TouchableOpacity style={{padding:10}}
            onPress={async ()=>this.felvitel()}>
            <View style={styles.gomb}>
              <Text style={styles.gombSzoveg}>Küldés</Text>
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
    backgroundColor:'#0fb0fb',
    width:'45%',
    alignSelf:'center',
    borderRadius:10
    },
});