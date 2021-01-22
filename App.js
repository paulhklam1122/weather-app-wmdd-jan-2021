import { StatusBar } from 'expo-status-bar'
import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Content from './components/Content'
import Footer from './components/Footer'
import Form from './components/Form'

const API_KEY = 'c8c4865b1ee49f77a87780ffabb644b3'

class App extends Component {
  state = {
    temp: '',
    windSpeed: '',
    pressure: '',
    minTemp: '',
    city: '',
    countryCode: ''
  }

  fetchData = () => {
    this.fetchCityData(this.state.city)
  }

  fetchCityData = async city => {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    const api_call = await fetch(url)

    const response = await api_call.json()
    console.log('response', response)

    this.setState({
      temp: response.main.temp,
      windSpeed: response.wind.speed,
      minTemp: response.main.temp_min,
      pressure: response.main.pressure,
      countryCode: response.sys.country,
      weather: response.weather[0].main
    })
  }


  render () {
    console.log('current text', this.state.city)
    const { city, countryCode, temp, minTemp, windSpeed, pressure, weather } = this.state
    return (
      <View style={styles.container}>
        <Form
          onSubmit={this.fetchData}
          onChangeText={text => this.setState({ city: text })}
        />
        <Content
          temp={temp}
          city={city}
          countryCode={countryCode}
          weather={weather}
        />
        <Footer
          pressure={pressure}
          windSpeed={windSpeed}
          minTemp={minTemp}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App
