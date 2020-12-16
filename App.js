import React, {useState} from 'react'
import {ActivityIndicator, StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import {getQuestions} from './src/components/axios/getQuestion.js'
import Question from './src/components/Question/Question'
import Timer from './src/components/Timer/Timer'

export default function App() {
  const [questData, setQuestData] = useState([]);
  const [quize, setQuize] = useState(false);
  const [end, setEnd] = useState(false);
  const [questNum, setQuestNum] = useState(0);
  const [score, setScore] = useState(0);
  const [timeStop, setTimeStop] = useState(false);
  const [loading, setLoading] = useState(false);

  let Quiz = () => {
    setLoading(true)
    getQuestions()
      .then(data => {
        data.map((el) => {
          setQuestData(questData => [...questData, {question:el.question, answer:[...el.incorrect_answers, el.correct_answer], correct:el.correct_answer}])
          })
        })
      .then(() => setQuize(true))
      .then(() =>  setEnd(false))
      .then(() => setTimeStop(false))
      .then(() => setScore(0))
      .then(() => setQuestNum(0))
      .then(() =>  setLoading(false))
  }

  let QuizAgain = () => {
    setQuestData([]);
    Quiz();
  }

  let nextQuest = () => {
    setLoading(true)
    if(questNum === questData.length-1) {
      setEnd(true)
      setTimeStop(true)
      setLoading(false)
      return
    } 
    setQuestNum(questNum+1)
    setLoading(false)
  }


  let upScore = () => {
    setScore(score+1);
  }

 

  return (
    <View style={styles.container}>
    {loading ? <ActivityIndicator size="large" color="#00ff00" />
    : end ? ( <View style={styles.again_block}>
              <View  style={styles.score_block}>
                  <Timer timeStop={timeStop}/>
                  <Text>Score: {score}/{questData.length}</Text>
              </View>
              <TouchableOpacity
                  style={styles.btn}
                  onPress={QuizAgain}
              >
                <Text style={styles.btn_title}>Try again</Text>
              </TouchableOpacity>
          </View>
          )
    : quize 
      ? ( <View  style={styles.question_block}>
            <View style={styles.score_block}>
              <Timer timeStop={timeStop}/>
              <Text>Score: {score}</Text>
            </View>
            <Question question={questData[questNum].question} 
              answers={questData[questNum].answer} 
              correct={questData[questNum].correct} 
              nextQuest={nextQuest} 
              upScore={upScore} 
            />
          </View>
      )
      :  
      <TouchableOpacity
        style={styles.btn}
        onPress={Quiz}
      >
        <Text style={styles.btn_title}>Start quiz</Text>
      </TouchableOpacity>
    }
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
  btn: {
    display: "flex",
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
    shadowColor: 'black',
    shadowOpacity: 0.4,
    shadowOffset: {height:10, width:10},
    shadowRadius: 20,
    width: 90 + '%',
    },
    btn_title: {
      fontSize: 18,
      textTransform: 'uppercase',
      color: "#fff"
    },
    again_block: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 100 + '%',
    }, 
    score_block: {
      width: 90 + '%',
      height: 50,
      display: "flex",
      justifyContent: 'space-around',
      alignItems: 'center',
      flexDirection: 'row',
      marginBottom: 25,
      borderWidth: 2,
    },
    question_block: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 100 + '%',
    }
});
