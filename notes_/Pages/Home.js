import {StyleSheet,
  View,
  TouchableWithoutFeedback,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity
  } from 'react-native'
import React, { useState, useRef } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function Home() {
  const navigation = useNavigation();
  const handleAddNote = () => {
    navigation.navigate('Addnote'); 
  };
  const swiper = useRef();
  const [value, setValue] = useState(new Date());
  const [week, setWeek] = useState(0);


  const weeks = React.useMemo(() => {
    const start = moment().add(week, 'weeks').startOf('week');
    return [-1,0,1].map(adj => {
      return Array.from({ length: 7 }).map((_, index) => {
        const date = moment(start).add(adj, 'week').add(index, 'day');
        return {
          weekday: date.format('ddd'),
          date: date.toDate(),
        };
      });
    });
  }, [week]);
  return (
    <View style = {styles.full}>
      <View style = {styles.header}>
        <TextInput style = {styles.search} placeholder='Search...'>
        </TextInput>
        <Icon style = {styles.iconNoti} name="notifications-outline" size={30} />
      </View>

      <View style={styles.picker}>
          <Swiper
            index={1}
            ref={swiper}
            loop={false}
            showsPagination={false}
            onIndexChanged={ind => {
              if (ind === 1) {
                return;
              }
              setTimeout(() => {
                const newIndex = ind - 1;
                const newWeek = week + newIndex;
                setWeek(newWeek);
                setValue(moment(value).add(newIndex, 'week').toDate());
                swiper.current.scrollTo(1, false);
              }, 100);
            }}>
            {weeks.map((dates, index) => (
              <View
                style={[styles.itemRow]}
                key={index}>
                {dates.map((item, dateIndex) => {
                  const isActive =
                    value.toDateString() === item.date.toDateString();
                  return (
                    <TouchableWithoutFeedback
                      key={dateIndex}
                      onPress={() => setValue(item.date)}>
                      <View
                        style={[
                          styles.item,
                          isActive && {
                            backgroundColor: '#111',
                            borderColor: '#111',
                          },
                        ]}>
                        <Text
                          style={[
                            styles.itemWeekday,
                            isActive && { color: '#fff' },
                          ]}>
                          {item.weekday}
                        </Text>
                        <Text
                          style={[
                            styles.itemDate,
                            isActive && { color: '#fff' },
                          ]}>
                          {item.date.getDate()}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  );
                })}
              </View>
            ))}
          </Swiper>
      </View>
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
          <Text style={styles.subtitle}>{value.toDateString()}</Text>
          <View>
            {/* Tại đây sẽ hiển thị phần note khi người dùng nhập  */}
          </View>
      </View>
     <View style = {styles.buttonRight}>
      <TouchableOpacity onPress={handleAddNote} style={styles.buttonAdd}>
          <Text style={styles.text}>Add Note</Text>
        </TouchableOpacity>
     </View>
    </View>
  )
}

const styles = StyleSheet.create({  
    full: {
        marginHorizontal: 10,
    },
    search: {
        height: 50,
        width: 300,
        padding: 8,
        borderRadius: 15,
        backgroundColor: '#F3EEEA',
    },
    header: {
        flexDirection: 'row',
        marginTop: 30,
        alignItems: 'center',
    },
    iconNoti: {
        marginLeft: 20,
    },
    picker: {
      flex: 1,
      maxHeight: 120,
      paddingVertical: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    itemRow: {
      width: width - 60,
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'center',
      borderColor: '#e3e3e3',
    },
    item: {
      flex: 1,
      height: 70,
      marginHorizontal: 5,
      paddingVertical: 4,
      paddingHorizontal: 5,
      borderWidth: 1,
      borderRadius: 8,
      borderColor: '#e3e3e3',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    itemWeekday: {
      fontSize: 13,
      fontWeight: '500',
      color: '#737373',
      marginBottom: 4,
    },
    itemDate: {
      fontSize: 20,
      fontWeight: '600',
      color: '#111',
    },
    subtitle: {
      fontSize: 17,
      fontWeight: '600',
      color: '#999999',
      marginBottom: 12,
    },
    buttonAdd: {
      height: 50,
      width: 120,
      marginBottom: 30,
      backgroundColor: '#111',
      borderRadius: 20,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    text: {color: '#fff'},
    buttonRight: {
      alignItems: 'flex-end', // Đưa về bên phải
    },
})