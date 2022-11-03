import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';

import TimePicker from './TimePicker';

const radioButtonsData = [{
  id: '1',
  label: '+',
  value: '+',
  selected: true
}, {
  id: '2',
  label: '-',
  value: '-',
  selected: false
}]

export default function App() {
  const [timeOne, setTimeOne] = React.useState('00:00:00')
  const [timeTwo, setTimeTwo] = React.useState('00:00:00')
  const [result, setResult] = React.useState('00:00:00')
  const [radioButtons, setRadioButtons] = React.useState(radioButtonsData)

  function onPressRadioButton(radioButtonsArray: any) {
    setRadioButtons(radioButtonsArray);
}

const sum = () => {
  const timeOneSplit = timeOne.split(':')
  const timeTwoSplit = timeTwo.split(':')

  let newTime = []
  newTime[0] = Number(timeOneSplit[0]) + Number(timeTwoSplit[0])
  newTime[1] = Number(timeOneSplit[1]) + Number(timeTwoSplit[1])

  if (newTime[1] > 60) {
    newTime[0] += 1
    newTime[1] -= 60
  }

  newTime[0] = Math.trunc(newTime[0])
  newTime[1] = Math.trunc(newTime[1])
  newTime[2] = '00'

  setResult(newTime.join(':'))
}

const sub = () => {
  const timeOneSplit = timeOne.split(':')
  const timeTwoSplit = timeTwo.split(':')

  let newTime = []
  newTime[0] = Number(timeOneSplit[0]) - Number(timeTwoSplit[0])
  newTime[1] = Number(timeOneSplit[1]) - Number(timeTwoSplit[1])

  if (newTime[1] < -60) {
    newTime[0] -= 1
    newTime[1] += 60
  }

  newTime[0] = Math.trunc(newTime[0])
  newTime[1] = Math.trunc(newTime[1])
  newTime[2] = '00'

  setResult(newTime.join(':'))
}

const calcHandler = () => {
  const operator = radioButtons[radioButtons.findIndex(value => value.selected)].value
  console.log(operator)

  if (operator === '+') {
    sum()
  } else {
    sub()
  }
}

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TimePicker setTimehandler={setTimeOne} title='00:00:00' />
      <View style={styles.calcContainer}>
        <RadioGroup 
              radioButtons={radioButtons} 
              onPress={onPressRadioButton}
              layout="row"
          />
          <Button color='green' title='calcular' onPress={() => calcHandler()} />
          <Text style={{ color: 'green', padding: 20, fontSize: 20 }}>{result}</Text>
      </View>
      <TimePicker  setTimehandler={setTimeTwo} title='00:00:00' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  calcContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  }
});
