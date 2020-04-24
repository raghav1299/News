//import * as React from 'react';
import React, { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, Image,Linking } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import ListScreen from './src/Screens/ListScreen';
import Store from './src/Screens/Store';
import Axios from 'axios';
import { Observer } from 'mobx-react';
import { fontCustomSize } from './src/Screens/font';


function CustomHeader ({title}){
return(
<View style={{flexDirection: 'row', height: 50}}>
  <View style={{flex: 1, justifyContent: 'center'}}>
    <Image style={{width:30, height: 30, marginLeft:5}}
    source={require('./src/images/menu.png')}
    resizeMode="contain"
    />
  </View>
  <View style={{flex: 1, justifyContent: 'center'}}>
    <Text style={{textAlign: 'center', fontSize: 20}}>{title}</Text>
  </View>
  <View style={{flex: 1}}></View>
</View>
)
}

function HomeScreen(props) {

  
  return (
    <SafeAreaView style={{ flex: 1}}>
      <CustomHeader title="NEWS"/>
    
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <Observer>
        {
          ()=>(
   <FlatList
        data={Store.data.articles}
        renderItem={({ item }) => (<TouchableOpacity
            onPress={() => {
              props.navigation.navigate("List");
              Store.userData = item;
            }}
        >
            <View style={{ padding: 2, elevation: 3, margin: 5, backgroundColor: 'grey' }}>
                <Text style={{ fontFamily: "Bold",color:'white', marginBottom: fontCustomSize(7) }}>Author:{item.author}</Text>
                {item.urlToImage == "" ? null : item.urlToImage == null ? null : <Image source={{ uri: item.urlToImage }} style={{ height: 150 }} />}
                <Text style={{ fontFamily: "Bold",color:'white', fontSize: fontCustomSize(20), marginTop: fontCustomSize(13) }}>{item.title}</Text>
                {/* <Text style={{ fontFamily: "Bold",color:'white', fontSize: fontCustomSize(15), marginTop: fontCustomSize(10) }}>{item.content}</Text>
                <Text style={{ fontFamily: "Bold",color:'white', fontSize: fontCustomSize(15), marginTop: fontCustomSize(10) }}>{item.description}</Text> */}
                <Text style={{ fontFamily: "Bold",color:'white', fontSize: fontCustomSize(13), marginTop: fontCustomSize(5) }}>Published at:{item.publishedAt}</Text>
                <Text style={{ fontFamily: "Bold",color:'white', fontSize: fontCustomSize(13), marginTop: fontCustomSize(2) }}>Source:{item.source.name}</Text>
            </View>
        </TouchableOpacity>)
        }
        keyExtractor={(item) => (item.title)}
    />)
        }
      </Observer>
 </View>
</SafeAreaView>

  );
}

function SettingsScreen() {
  return (
    <SafeAreaView style={{ flex: 1}}>
      <CustomHeader title="Setting"/>
      <View style={{ backgroundColor: 'white', flex: 1 }}>
      <Observer>
        {
          ()=>(
   <FlatList
        data={Store.data1.statewise}
        renderItem={({ item }) => (<TouchableOpacity
            //onPress={() => {
              //props.navigation.navigate("List");
              //Store.userData = item;
           // }}
        >
            <View style={{ padding: 2, elevation: 3, margin: 5, backgroundColor: 'grey' }}>
                <Text style={{ fontFamily: "Bold",color:'white', fontSize:fontCustomSize(20), marginBottom: fontCustomSize(5) }}>State:{item.state}</Text>
                <Text style={{ fontFamily: "Bold",color:'white', fontSize: fontCustomSize(15), marginTop: fontCustomSize(5) }}>Confirmed:{item.confirmed}</Text>
                <Text style={{ fontFamily: "Bold",color:'white', fontSize: fontCustomSize(15), marginTop: fontCustomSize(5) }}>Recovered:{item.recovered}</Text>
                <Text style={{ fontFamily: "Bold",color:'white', fontSize: fontCustomSize(15), marginTop: fontCustomSize(5) }}>Deceased:{item.deaths}</Text>
                <Text style={{ fontFamily: "Bold",color:'white', fontSize: fontCustomSize(15), marginTop: fontCustomSize(5) }}>Active:{item.active}</Text>
                <Text style={{ fontFamily: "Bold",color:'white', fontSize: fontCustomSize(15), marginTop: fontCustomSize(5) }}>Last Updated:{item.lastupdatedtime}</Text>
            </View>
        </TouchableOpacity>)
        }
        keyExtractor={(item) => (item.lastupdatedtim)}
    />)
        }
      </Observer>
 </View>
    </SafeAreaView>
  );
}

function HomeStack(){
  return(
  <StackNavigator.Navigator initialRouteName="Home">
    <StackNavigator.Screen component={HomeScreen} name={"Home"} options={navOption}/>
    <StackNavigator.Screen component={ListScreen} name={"List"} options={navOption}/>
  </StackNavigator.Navigator>
  )
}

function SettingsStack(){
  return(
  <StackNavigator.Navigator initialRouteName="Settings">
    <StackNavigator.Screen component={SettingsScreen} name={"Setting"} options={navOption}/>
    <StackNavigator.Screen component={ListScreen} name={"List"} options={navOption}/>
  </StackNavigator.Navigator>
  )
}

const Tab = createBottomTabNavigator();
const StackNavigator = createStackNavigator();
const navOption = () =>({
  headerShown: false
})

export default function App() {

  useEffect(() => {
    Axios.get("https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=2719918152a7463492d900316ee90bf1").then(res => {
        Store.data = res.data;
    })
    Axios.get("https://api.covid19india.org/data.json").then(res => {
      Store.data1 = res.data;
    })
  })
  

  return (
            <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="NEWS" component={HomeStack}/>
        <Tab.Screen name="CovID-19" component={SettingsStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}