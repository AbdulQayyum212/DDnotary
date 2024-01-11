import CustomLogoMarker from '../components/CustomLogoMarker';
import { selectAccessToken, selectProfileData } from '../stores/slices/UserSlice';
import * as Location from 'expo-location';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, View, Text, SafeAreaView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'twrnc';
import {
  selectDestination,
  selectOrigin,
  setOrigin,
  setTravelTimeInformation,
} from '../stores/NavSlice';
import axios from 'axios';
import COLORS from '../constants/colors';
import { useNavigation } from '@react-navigation/native';

const Map = ({ route }) => {
  const { notary_id } = route?.params?.details;
  const user = useSelector(selectProfileData);
  const type = user?.user_type;
  const GOOGLE_MAPS_APIKEY = 'AIzaSyCSEEKrvzM3-vFcLEoOUf256gzLG7tyWWc';
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const accessToken = useSelector(selectAccessToken);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    if (!origin || !destination) return;

    // Zoom  @ fit to markers
    setTimeout(() => {
      mapRef?.current?.fitToSuppliedMarkers(['origin', 'destination'], {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      });
    }, 5000);
  }, [origin, destination]);

  useEffect(() => {
    if (!origin || !destination) return;

    const getTravelTime = async () => {
      fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${
          origin.lat + ',' + origin.lng
        }&destinations=${destination.lat + ',' + destination.long}&key=${GOOGLE_MAPS_APIKEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          // console.log('data', JSON.stringify(data));
          dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
        })
        .catch((error) => {
          console.error(error);
        });
    };
    getTravelTime();
  }, [origin, destination, GOOGLE_MAPS_APIKEY]);
  useEffect(() => {
    if (type === 7) GetCurrentLocation();
  }, []);
  const GetCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return;
    }
    try {
      await Location.watchPositionAsync({ accuracy: Location.Accuracy.High }, (loc) => {
        const region = {
          lat: loc.coords.latitude,
          lng: loc.coords.longitude,
        };
        // console.log('location', loc);
        dispatch(setOrigin(region));
        PostCurrentLocation(region);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const PostCurrentLocation = (region: any) => {
    // console.log(region);
    axios
      .post(
        'https://docudash.net/api/create-request-locations-update',
        {
          NotaryRequestsReturnID: notary_id,
          long: region.lng,
          lat: region.lat,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        const data = response.data;
        // console.log('PostCurrentLocation', data);
      })
      .catch((err) => {
        false;
        console.log('Err PostCurrentLocation', err);
        // if (err.response.status === 401) {
        //   Alert.alert('Session Expired', 'Please login again');
        //   dispatch(logoutUser());
        //   clearToken();
        // }
      });
  };
  if (destination === null || origin === null) return;
  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <View
        style={{
          padding: 15,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      >
        <Icon name="arrow-left" size={28} onPress={() => navigation.goBack()} />
        <Text
          style={{
            color: COLORS.primary,
            fontWeight: 'bold',
            fontSize: 16,
            textAlign: 'center',
            flex: 1,
          }}
        >
          Notary
        </Text>
      </View>

      <MapView
        ref={mapRef}
        style={tw`flex-1 `}
        // mapType="mutedStandard"
        initialRegion={{
          // latitude: 36.70983349999999,
          // longitude: -81.9773482,
          latitude: parseFloat(origin.lat),
          longitude: parseFloat(origin.lng),
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        {origin && destination && (
          <MapViewDirections
            origin={{
              latitude: origin.lat,
              longitude: origin.lng,
            }}
            destination={{
              latitude: destination.lat,
              longitude: destination.long,
            }}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="black"
          />
        )}
        {origin && (
          // <Marker
          //   coordinate={{
          //     latitude: parseFloat(origin.lat),
          //     longitude: parseFloat(origin.lng),
          //   }}
          //   title="Origin"
          //   // description={origin.description}
          //   identifier="origin"
          // />
          <CustomLogoMarker
            LogoMarker
            coordinate={{
              latitude: parseFloat(origin.lat),
              longitude: parseFloat(origin.lng),
            }}
            title="Origin"
            identifier="origin"
          />
        )}
        {destination && (
          <Marker
            coordinate={{
              latitude: parseFloat(destination.lat),
              longitude: parseFloat(destination.long),
            }}
            title="destination"
            // description={destination.description}
            identifier="destination"
          />
        )}
      </MapView>
    </SafeAreaView>
  );
};

export default Map;

const styles = StyleSheet.create({});
// function setLoading(arg0: boolean) {
//   throw new Error('Function not implemented.');
// }