import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  useEffect(() => {
    const url = "https://randomuser.me/api/?page=1&results=1&seed=abc";

    fetch(url)
    .then(response => response.json())
    .then(json => {
      const profileDetails = json.results[0];
      setImageUrl(profileDetails.picture.medium);
      setFirstName(profileDetails.name.first);
      setLastName(profileDetails.name.last);
      setGender(profileDetails.gender);
      setPhoneNo(profileDetails.phone);
      setLoading(true);
    })
    .catch(error => console.log(error))
  },[]);

  if(!loading){
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
          <View style={styles.pictureContainer}>
            <Image 
            style={styles.profilePicture}
            source={{uri :imageUrl}}/>
          </View>
          <View style={styles.profileDetailsContainer}>
              <View style={styles.nameContainer}>
                <Text style={styles.textStyle}>{firstName}</Text>
                <Text style={styles.textStyle}>{lastName}</Text>
              </View>
              <View>
                <Text style={styles.textStyle}>{gender}</Text>
              </View>
              <View>
                <Text style={styles.textStyle}>{phoneNo}</Text>
              </View>
          </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileContainer:{
    width:"90%",
    borderColor:"black",
    borderWidth:3,
    padding:25,
    flexDirection:"row"
  },
  pictureContainer:{
    width:'40%',
    borderColor:'black',
    borderWidth:3,
    height:125
  },
  profilePicture:{
    width:120,
    height:120
  },
  profileDetailsContainer:{
    flexDirection:"column",
    paddingVertical:5,
    paddingHorizontal:20,
    width:"60%"
  },
  nameContainer:{
    flexDirection:"row",
    justifyContent:"space-between"
  },
  textStyle:{
    fontSize:25,
    fontFamily:'sans-serif-condensed',
    textTransform:'capitalize'
  }
});
