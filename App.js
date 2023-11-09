/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React ,{useState, useEffect} from 'react';
import {  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  FlatList} from 'react-native';
import {getFontFamily} from './assets/fonts/helper';
import Title from './components/Title/Title';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import globalStyle from './assets/styles/globalStyle';
import UserStory from './components/UserStory/UserStory';

const App = () => {
  const userStories= [
    {
      firstName: 'Joseph',
      id: 1,
      profileImage: require('./assets/images/default_profile.png'),
    },
    {
      firstName: 'Angel',
      id: 2,
      profileImage: require('./assets/images/default_profile.png'),
    },
    {
      firstName: 'White',
      id: 3,
      profileImage: require('./assets/images/default_profile.png'),
    },
    {
      firstName: 'Olivier',
      id: 4,
      profileImage: require('./assets/images/default_profile.png'),
    },
    {
      firstName: 'Nata',
      id: 5,
      profileImage: require('./assets/images/default_profile.png'),
    },
    {
      firstName: 'Nicolas',
      id: 6,
      profileImage: require('./assets/images/default_profile.png'),
    },
    {
      firstName: 'Nino',
      id: 7,
      profileImage: require('./assets/images/default_profile.png'),
    },
    {
      firstName: 'Nana',
      id: 8,
      profileImage: require('./assets/images/default_profile.png'),
    },
    {
      firstName: 'Adam',
      id: 9,
      profileImage: require('./assets/images/default_profile.png'),
    },
];
  const userStoriesPageSize = 4;
  const [userStoriesCurrentPage, setUserStoriesCurrentPage] = useState(1);
  const [userStoriesRenderedData, setUserStoriesRenderedData] = useState([]);
  const [isLoadingUserStories, setIsLoadingUserStories] = useState(false);

  const pagination = (database, currentPage, pageSize) => {
    console.log('CurrentPageis : ', currentPage);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;   
    if (startIndex >= database.length) {
      return [];
    }
    return database.slice(startIndex, endIndex);
  }

  useEffect (() =>{
    setIsLoadingUserStories(true);
    const getInitalData = pagination(userStories, 1, userStoriesPageSize);
    setUserStoriesRenderedData(getInitalData);
    setIsLoadingUserStories(false);
  },[])

  return (
    <SafeAreaView>
      <View style={globalStyle.header}>
        <Title title={'Let`s explore'} />
      <TouchableOpacity style= {globalStyle.messageIcon}>
        <FontAwesomeIcon icon={faEnvelope}/>
        <View style={globalStyle.messageNumberContainer}>
          <Text style={globalStyle.messageNumber}>2</Text>
        </View>
      </TouchableOpacity>        
    </View>
    <View style={globalStyle.userStoryContainer}>
        <FlatList
        onEndReachedThreshold={0.5}
        onEndReached={() => {
           if(isLoadingUserStories) 
              return;  
           setIsLoadingUserStories(true);
           const contentToAppend = pagination(userStories, userStoriesCurrentPage+1, userStoriesPageSize);
           if(contentToAppend.length > 0){
            setUserStoriesCurrentPage(userStoriesCurrentPage + 1);
            setUserStoriesRenderedData(prev => [...prev, ...contentToAppend]);
           }
           setIsLoadingUserStories(false);
        }}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          data={userStoriesRenderedData}
          renderItem={({item}) => (
            <UserStory
              key= {'userStory'+item.id}
              firstName={item.firstName}
              profileImage={item.profileImage}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default App;