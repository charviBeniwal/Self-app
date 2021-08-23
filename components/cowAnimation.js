import React from 'react'
import LottieView from 'lottie-react-native'

export default class CowAnimation extends React.Component{
    render(){
        return(
            <LottieView
            source = {require('../assets/fitnessCow.json')}
            style={{width: "60%"}}
            autoPlay loop
            />
        )
    }
}