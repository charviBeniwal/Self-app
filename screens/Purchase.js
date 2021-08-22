import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import StoryCard from "./StoryCard";

import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { FlatList } from "react-native-gesture-handler";
import firebase from "firebase";


let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

let stories = require("./temp_stories.json");

export default class Purchase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      light_theme: true,
      stories: [],
      milkPurchased: 0,
      credits: 10
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
    //this.fetchStories();
    // this.fetchUser();
  }

  /* fetchStories = () => {
     firebase
       .database()
       .ref("/posts/")
       .on(
         "value",
         snapshot => {
           let stories = [];
           if (snapshot.val()) {
             Object.keys(snapshot.val()).forEach(function (key) {
               stories.push({
                 key: key,
                 value: snapshot.val()[key]
               });
             });
           }
           this.setState({ stories: stories });
           this.props.setUpdateToFalse();
         },
         function (errorObject) {
           console.log("The read failed: " + errorObject.code);
         }
       );
   };
 
   fetchUser = () => {
     let theme;
     firebase
       .database()
       .ref("/users/" + firebase.auth().currentUser.uid)
       .on("value", snapshot => {
         theme = snapshot.val().current_theme;
         this.setState({ light_theme: theme === "light" });
       });
   };
 */
  /*  renderItem = ({ item: story }) => {
      return <StoryCard story={story} navigation={this.props.navigation} />;
    };
  
    keyExtractor = (item, index) => index.toString();*/

  increasePurchase = () => {
    this.setState({
      milkPurchased: this.state.milkPurchased + 0.5
    })
  }

  decreasePurchase = () => {

    var milkPurchased = this.state.milkPurchased - 0.5;
    if(milkPurchased <= 0){
      milkPurchased = 0
    }
    this.setState({
      milkPurchased: milkPurchased 
    })
  }

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View
          style={
            this.state.light_theme ? styles.containerLight : styles.container
          }
        >
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require("../assets/milk.png")}
                style={styles.iconImage}
              ></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text
                style={
                  this.state.light_theme
                    ? styles.appTitleTextLight
                    : styles.appTitleText
                }
              >
                Dairy Lite
              </Text>
            </View>
          </View>
          <View style={styles.cardContainer}>
            <View>
              <Text style={styles.credits}> CREDITS:  </Text>
              <Text style={styles.creditNo}> {this.state.credits}  </Text>
              <Text style={styles.milkPurchase}> {10 / 2} litres of milk can be Purchased</Text>
              <Text>(1/2 litre = 1 Credits ; 1 litre = 2 Credits)</Text>
            </View>
            <View>
              <Text>How much milk do you want to Purchase?</Text>
              <TouchableOpacity onPress={this.increasePurchase}><Text> + </Text></TouchableOpacity>
              <Text>{this.state.milkPurchased}</Text>
              <TouchableOpacity onPress={this.decreasePurchase}><Text> - </Text></TouchableOpacity>
            </View>
            <View>
              <Text>Total milk to be Purchased {this.state.milkPurchased} litres</Text>
              <TouchableOpacity onPress={()=>this.props.navigation.navigate("PurchaseSummary",{credits:this.state.credits,milkPurchased: this.state.milkPurchased})}><Text>OK</Text></TouchableOpacity>
            </View>
          </View>
          <View style={{ flex: 0.08 }} />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#a6f7b4"
  },
  containerLight: {
    flex: 1,
    backgroundColor: "#a6f7b4"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row"
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center"
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center"
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans"
  },
  appTitleTextLight: {
    color: "#3d403e",
    fontSize: RFValue(50),
    fontFamily: "Bubblegum-Sans",
  },
  cardContainer: {
    flex: 0.85
  },
  noStories: {
    flex: 0.85,
    justifyContent: "center",
    alignItems: "center"
  },
  noStoriesTextLight: {
    fontSize: RFValue(40),
    fontFamily: "Bubblegum-Sans"
  },
  noStoriesText: {
    color: "white",
    fontSize: RFValue(40),
    fontFamily: "Bubblegum-Sans"
  },
  credits: {
    color:"#033954",
    fontSize: RFValue(35),
    fontFamily:"Bubblegum-Sans",
    marginTop: 60,
    marginLeft: 115
  },
  creditNo: {
    color:"#ed0559",
    fontSize: RFValue(35),
    fontFamily:"Bubblegum-Sans",
    marginTop: 10,
    marginLeft: 165
  },
  milkPurchase: {
    color:"#033954",
    fontSize: RFValue(20),
    fontFamily:"Bubblegum-Sans",
    marginTop: 20,
    marginLeft: 80
  }
});
