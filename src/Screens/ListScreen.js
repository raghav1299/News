import * as React from 'react';
import { Text, View, SafeAreaView, Linking, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Store from './Store';
import { fontCustomSize } from './font';
import { Observer } from 'mobx-react';

function CustomHeader ({title, props}){
    return(
    <View style={{flexDirection: 'row', height: 50}}>
      <View style={{flex: 1, justifyContent: 'center'}}>
          <TouchableOpacity onPress={()=>props.navigation.goBack()}>
        <Image style={{width:30, height: 30, marginLeft:5}}
        source={require('../images/arrow.png')}
        resizeMode="contain"
        />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{textAlign: 'center', fontSize: 20}}>{title}</Text>
      </View>
      <View style={{flex: 1}}></View>
    </View>
    )
    }

export default ListScreen = (props) =>{
    return(
        <SafeAreaView style={{ flex: 1}}>
<View>
      <CustomHeader title="NEWS" props={props}/>
</View>
<Observer>
        {
          ()=>(
<View style={{ backgroundColor: 'grey', flex: 1, marginTop: 5}}>
{Store.userData.urlToImage == "" ? null : Store.userData.urlToImage == null ? null : <Image source={{ uri: Store.userData.urlToImage }} style={{ height: 150 }} />}
<Text style={{ fontFamily: "Bold",color:'white', fontSize: fontCustomSize(20), marginTop: fontCustomSize(13) }}>{Store.userData.title}</Text>
<Text style={{ fontFamily: "Bold",color:'white', fontSize: fontCustomSize(15), marginTop: fontCustomSize(13) }}>{Store.userData.description}</Text>
<Text style={{ fontFamily: "Bold",color:'white', fontSize: fontCustomSize(15), marginTop: fontCustomSize(10) }}>{Store.userData.content}</Text>


<TouchableOpacity style={{ backgroundColor:'grey'}}
 onPress={()=> Linking.openURL(Store.userData.url)}>
 <Text style={{color:'lightblue', marginTop: fontCustomSize(4)}}>Click here to read more</Text>
   </TouchableOpacity>
   </View>
   )
  }
  </Observer>
   </SafeAreaView>
    )
}