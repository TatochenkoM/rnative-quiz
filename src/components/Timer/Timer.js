import React, {useState, useEffect} from 'react'
import {Text} from 'react-native'

export default function Timer (props) {
const [time, setTime] = useState(0);

let timer = () => {
    setTime(time+1);
}

useEffect(() => {
    if(props.timeStop) {

    } else {
            let time_i = setInterval(() => {
                timer();
            }, 800);
            return () => clearInterval(time_i);
        }
})


    return (
        <Text>Time: {time} seconds</Text>
    )

}
