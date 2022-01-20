import React, { Component } from 'react';

import { StyleSheet,Text, TextInput, View,TouchableOpacity,FlatList,Image } from 'react-native';



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

     // alert(JSON.stringify(this.state.dataSource2))

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

          <Text style={{padding: 10, fontSize: 35,textAlign:'center',color:"black"}}>

              Keresés:

          </Text>

        <TextInput

          placeholderTextColor="white"

          style={{height: 40,width:'85%',alignSelf:'center',backgroundColor:'#0fb0fb',borderColor:'black',color:"white",textAlign:'center',}}

          placeholder="..."

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



      /*<View style={{ border: "solid blue",width:600, marginLeft:"auto",marginRight:"auto",padding:20,marginBottom:10,borderRadius:20,}}>*/

      <View style={{borderWidth:5,borderColor:"#0fb0fb",borderRadius:10, margin:20,backgroundColor:"lightgray"}}>

      <Text style={{color:"black",fontSize:40,textAlign:"center",marginTop:15,marginBottom:5,fontWeight:"bold" }}   >{item.anime_cim} </Text>

      <Image  source={{uri: 'http://localhost:8080/'+item.anime_kep}} style={{width:300,height:300,marginLeft:"auto",marginRight:"auto"}} />  

      <Text style={{color:"white",fontSize:16,textAlign:"center",marginTop:15,marginBottom:5,textAlign:"justify"}}   >{item.anime_leiras} </Text>

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