import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import useGetRequest from '../hooks/useCachedResources';
import { selectAccessToken, selectNotification, setNotification } from '@stores/slices/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'twrnc';
import { Avatar } from 'react-native-paper';
import HomeHeader from '@components/HomeHeader';
import { useNavigation } from '@react-navigation/native';
import NotFound from '../components/NotFound';
import axios from 'axios';

const Notification = () => {
  const accessToken = useSelector(selectAccessToken);
  const Notification = useSelector(selectNotification);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  console.log(Notification, 'Notification ==><>');
  const readNotification = (id: number) => {
    console.log('id id id id ', id);

    axios
      .post(
        'https://docudash.net/api/get-notifications',
        {
          id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      .then((response) => {
        const { status } = response.data;
        // console.log('response.data ==><><', response.data);

        if (status) {
          dispatch(setNotification(response.data));
        }
      })
      .catch((err) => {
        console.log('error', err);
      });
  };
  return (
    <SafeAreaView style={tw`flex-1 `}>
      <HomeHeader heading={'Notification'} />
      <FlatList
        contentContainerStyle={tw`flex-grow gap-5`}
        ListEmptyComponent={<NotFound onPress={() => console.log('Hello')} />}
        data={Notification?.NotificationsDetailsList}
        // contentContainerStyle={tw`gap-5`}
        renderItem={({ item, i }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                if (item.link_redirect_app === 'https://docudash.net/api/dashboard') {
                  readNotification(item.id);
                  navigation.navigate('HomeScreen');
                } else {
                  readNotification(item.id);
                  navigation.navigate('DocumentViewer', { LinkToView: item.link_redirect_app });
                }
              }}
              style={tw`flex-row items-center gap-2 justify-between px-4 border-b-2 border-b-gray-100 p-4`}
            >
              <View style={tw`flex-row items-center gap-2`}>
                <Avatar.Image
                  source={{
                    uri: item.ProfileImage
                      ? item.ProfileImage
                      : 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
                  }}
                  size={40}
                />
                <View style={tw`gap-1`}>
                  <Text>{item.title}</Text>
                  <Text>{item.body}</Text>
                </View>
              </View>
              <Text>{item.date}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Notification;
