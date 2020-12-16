import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'


function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
  return array
}

export default function Question(props) {


let combinedFunct = () => {
    props.nextQuest();
    props.upScore();
}

  let answers = shuffle(props.answers);

  return (
        <View style={styles.container}>
            <Text style={styles.question}>{props.question}</Text>
            <View style={styles.answ_block}>
                {answers.map(el => {
                    return el === props.correct ? <TouchableOpacity style={styles.btn} key={Math.random()} onPress={combinedFunct}><Text style={styles.btn_answ}>{el}</Text></TouchableOpacity>
                    : (
                       <TouchableOpacity style={styles.btn} key={Math.random()} onPress={props.nextQuest}><Text style={styles.btn_answ}>{el}</Text></TouchableOpacity>
                    )
                })}
            </View>
        </View>
  );
}

const styles = StyleSheet.create({
    container: {
        width: 90 + '%',
        height: 80 + '%',
        position: 'relative',
    },
    question: {
        fontWeight: 'bold',
        position: 'relative',
        fontSize: 24,
        top: 0,
        marginBottom: 40,
    },
    answ_block: {
        width: 100 + '%',
        height: 250,
        position: 'absolute',
        bottom: 10,
    },
    btn: {
        display: "flex",
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
        shadowColor: 'black',
        shadowOpacity: 0.4,
        shadowOffset: {height:10, width:10},
        shadowRadius: 20,
        width: 100 + '%',
        marginTop: 10,
    },
    btn_answ: {
      textAlign: 'center',
      fontSize: 18,
      textTransform: 'uppercase',
      color: "#fff"
    },
});
