import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { GenerateSignatureDetail } from '@type/index';
import { colors } from '@utils/Colors';
import React, { ReactNode, useState } from 'react';
import { Alert, Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import tw from 'twrnc';

interface IRow {
  title: string;
  shortName: string | ReactNode;
}
const Row = ({ title, shortName }: IRow) => {
  return (
    <View id={title} key={title} style={tw`flex-row items-center justify-between`}>
      <Text style={tw`text-4 font-nunito-SemiBold`}>{title}</Text>
      <View style={tw`w-8 h-8 rounded-full  justify-center items-center bg-[${colors.green}]`}>
        <Text style={tw`text-3 text-black`}>{shortName}</Text>
      </View>
    </View>
  );
};

const SigningOrderModal = ({
  senderName,
  details,
}: {
  senderName: string | undefined;
  details: GenerateSignatureDetail[] | undefined;
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Pressable onPress={() => setModalVisible(true)} style={tw`flex-row items-center gap-2`}>
        <Image style={tw`h-3 w-3 `} source={require('@assets/SigningOrder.png')} />
        <Text>SIGNING ORDER</Text>
      </Pressable>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={tw`flex-1 justify-center items-center`}>
          <View style={tw`border-2 border-[${colors.gray}] w-75 bg-white py-10 rounded-lg gap-5`}>
            <Pressable
              style={tw`absolute top-1 right-1 p-1`}
              onPress={() => setModalVisible(false)}
            >
              <MaterialCommunityIcons name="close-circle" size={30} />
            </Pressable>
            <Text style={tw`text-black font-bold text-4.5 px-5 mb-3`}>Signing Order Diagram</Text>
            <View style={tw`bg-[#E6FFD6] w-[100%] p-3 px-8 gap-5`}>
              <View
                style={tw`border-2 h-[93%] top-5 right-11.5 border-[${colors.green}] w-1 absolute self-end overflow-hidden`}
              ></View>
              {/* Sender */}
              {senderName && (
                <Row
                  title={'Sender: ' + senderName}
                  shortName={senderName
                    .replace(/\b(\w)\w+/g, '$1.')
                    .replace(/\s/g, '')
                    .replace(/\.$/, '')
                    .toUpperCase()}
                />
              )}

              {/* 1 */}
              {details?.map((element: any) => {
                return (
                  <Row
                    title={element.recName}
                    shortName={element.recName
                      .replace(/\b(\w)\w+/g, '$1.')
                      .replace(/\s/g, '')
                      .replace(/\.$/, '')
                      .toUpperCase()}
                  />
                );
              })}

              <Row
                title={'Pending'}
                shortName={<AntDesign name="checkcircle" size={27} color="white" />}
              />
            </View>
            <Pressable
              onPress={() => setModalVisible(false)}
              style={tw`border-2 justify-center items-center p-1 w-20 mx-5 rounded-lg bg-white`}
            >
              <Text>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default SigningOrderModal;

const styles = StyleSheet.create({});
