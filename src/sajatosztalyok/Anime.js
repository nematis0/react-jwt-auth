import React, { Component } from 'react';
import { Modal } from 'react-native';
import { View, Text, StyleSheet, TouchableOpacity,Dimensions, Image, FlatList, ScrollView} from 'react-native-web';
import Iframe from 'react-iframe';




var screenWidth = Dimensions.get('window').width;



export default class Anime extends Component {

  constructor(props) {

    super(props);

    this.state = {text: '',akttema:1, isVisible: false,animedata:[],dataSource:[], dataSource2:[], dataSourcelinkek:[]};

  }



  componentDidMount(){

    return fetch('http://localhost:8080/Animek')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson,
          animedata: [],
          dataSource2: responseJson,
  
        }, function(){

        });

      })

      .catch((error) =>{
        console.error(error);

      });

  }



  displayModal(show){
    this.setState({isVisible: show})
  }

report=async(uzi)=>{
  alert(uzi)
}

  kereses=async (tipus)=>{
    //alert(tipus)

    let bemenet={
      bevitel3:tipus
    }



    return fetch('http://localhost:8080/tipusok',{
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}

    }
     
    )

    .then((response) => response.json())
    .then((responseJson) => {

      this.setState({
        isLoading: false,
        dataSource: responseJson
        
      }, function(){

      });

    })

    .catch((error) =>{

      console.error(error);

    });

  }



  hivas=async (szam)=>{
  //alert(szam)
    this.setState({akttema:szam})

    let bemenet={
      bevitel1:szam
    }



    return fetch('http://localhost:8080/animekomment',{
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

        //alert(JSON.stringify(this.state.dataSource2))

      });

      var bemenet={bevitel1:szam}
      //fetch animelink


    })

    .catch((error) =>{
      console.error(error);

    });

  }



  render() {

    return (

      <View style = { styles.container }>





      <View style = {styles.ButtonViewContainer}>





    <ScrollView

        horizontal={true}

        pagingEnabled={true}

        showsHorizontalScrollIndicator={false}

        ref={(node) => this.scroll = node}

    >

          <TouchableOpacity style={styles.ButtonContainer}

          onPress={async ()=>this.kereses("Action")}>

          <View style={styles.ScrollContainer}>

          <Text style={styles.ScrollTextContainer}>Action</Text>

          </View>

          </TouchableOpacity>



          <TouchableOpacity style={styles.ButtonContainer}

          onPress={async ()=>this.kereses("Comedy")}>

          <View style={styles.ScrollContainer}>

          <Text style={styles.ScrollTextContainer}>Comedy</Text>

          </View>

          </TouchableOpacity>



      </ScrollView>

      </View>



        <Modal

            animationType = {"slide"}

            transparent={false}

            visible={this.state.isVisible}

            onRequestClose={() => {

              //Alert.alert('Modal has now been closed.');

            }}>

          <View style = {styles.modal} /* Modal Törzse */>


        
          



          <Text style = {styles.cim} /*Cím */ >{this.state.animedata.anime_cim}</Text>





          <Text style = {styles.cim} /*Cím */ >{this.state.animedata.anime_leiras}</Text>



          <FlatList

          data={this.state.dataSource2}

          renderItem={({item}) => 



          <View style={{borderWidth:1,margin:20,backgroundColor:"#367588",paddingLeft:10,paddingRight:10,borderRadius:10}}>

        <Iframe url={item.anime_link}
        width="auto"
        height="500px"
        id="myId"
        className="myClassname"
        display="initial"
        position="relative"/>

         

          <Text style={styles.cim}>{item.uzenet_szoveg}</Text>

          <Text style={styles.cim}>{item.uzenet_nev}</Text>
        
          <TouchableOpacity style={styles.ButtonContainer}
          onPress={async ()=>this.report()}>
          <View style={styles.ScrollContainer}>
          </View>
          </TouchableOpacity>

          

     

   

        </View>

        

        }

    

          keyExtractor={({uzenet_id}, index) => uzenet_id}

        />



          </View>

          <View style = {styles.container2}>

              <Text //Bezáró Gomb

                style={styles.closeText}

                onPress={() => {

                  this.displayModal(!this.state.isVisible);}}>Bezárás

              </Text>

            </View>

          </Modal>



          <FlatList

          data={this.state.dataSource}

          renderItem={({item}) => 

          <View style={{borderWidth:5,borderColor:"#0fb0fb",borderRadius:10, margin:20,backgroundColor:"lightgray"}}>

          <Image resizeMode='contain' source={{uri:'http://localhost:8080/'+item.anime_kep}} style={{width:300,height:300,marginLeft:"auto",marginRight:"auto"}} />

          <TouchableOpacity

              style={styles.button}

              onPress={() => {

              this.displayModal(true); 

              this.setState({animedata:item})

              this.hivas(item.anime_id);

              }}>

              <Text style={styles.buttonText}>{item.anime_cim}</Text>

          </TouchableOpacity>

          </View>          

           }

          keyExtractor={({anime_id}, index) => anime_id}

          />

 

        </View>

      );

  }

};



const styles = StyleSheet.create({

  container: {

    padding: 25,

    flex: 1,

    alignItems: 'center',

    justifyContent: 'center',

  },

  button: {

    display: 'flex',

    height: 60,

    borderRadius: 6,

    justifyContent: 'center',

    alignItems: 'center',

    width: '100%',

    backgroundColor: '#0fb0fb',

    shadowColor: '#fff',

    shadowOpacity: 0.5,

    padding:20,

    shadowOffset: { 

      height: 10, 

      width: 0 

    },

    shadowRadius: 25,

  },

  closeButton: {

    display: 'flex',

    height: 60,

    borderRadius: 6,

    justifyContent: 'center',

    alignItems: 'center',

    backgroundColor: '#FF3974',

    shadowColor: '#2AC062',

    shadowOpacity: 0.5,

    shadowOffset: { 

      height: 10, 

      width: 0 

    },

    shadowRadius: 25,

  },

  buttonText: {

    color: '#FFFFFF',

    fontSize: 22,

  },

  image: {

    marginTop: 150,

    marginBottom: 10,

    width: '100%',

    height: 350,

  },

  text: {

    fontSize: 24,

    marginBottom: 30,

    padding: 40,

  },

  closeText: {

    fontSize: 24,

    color: '#00479e',

    marginTop:'auto',

  },

  container2: {

    fontSize: 24,

    color: '#00479e',

    marginTop:'auto',

    alignSelf:'center',

    marginBottom:50,

  },

  cim: {

    fontWeight:"bold",

    textAlign:"center",

    fontSize:25

  },

  modal: {

    fontSize: 24,

    color: '#00479e',

    marginTop:100,

    textAlign: 'center',

  },

  gombSzoveg:{

    textAlign:'center',

    color:'white',

    marginTop:'auto',

    marginBottom:'auto',

    fontSize:25,

  },

  gomb:{

    height:45,

    backgroundColor:'#0fb0fb',

    width:'45%',

    alignSelf:'center',

    borderRadius:5

  },

  ButtonViewContainer: {

    flexDirection: 'row',

    paddingTop: 0,

  },

  ButtonContainer: {

    padding: 5,

  },

  ScrollContainer: {

    flexGrow: 1,

    marginTop: 0,

    width: screenWidth/2,

    justifyContent: 'center',

    alignItems: 'center',

    height:45,

    backgroundColor:'#0fb0fb',

    alignSelf:'center',

    borderRadius:5

  },

  ScrollTextContainer: {

    fontSize: 20,

    textAlign:'center',

    color:'white',

    marginTop:'auto',

    marginBottom:'auto',

    fontSize:25,

  },

});