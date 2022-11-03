import React, { useState } from "react";
import { Button, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const TimePicker = ({ setTimehandler, title }: { setTimehandler: (value: string) => void, title?: string}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [time, setTime] = useState('');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    const timeSplit = date.toLocaleTimeString('pt-BR').split(':')
    timeSplit[2] = '00'
    setTime(timeSplit.join(':'))
    setTimehandler(timeSplit.join(':'))
    hideDatePicker();
  };

  return (
    <View>
      <Button title={time || title || "time"} onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default TimePicker;