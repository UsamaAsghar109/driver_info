import CheckBox from '@react-native-community/checkbox'
import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker'
import React, { Component } from 'react'
import { Button, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native';

export class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timedata: ["Early Mornings ( 3:00 am - 6:00 am )", "Mornings ( 6:00 am - 9:00 am )",
        "Late Mornings ( 9:00 am - 12:00 pm )", "Aternoons ( 12:00 pm - 3:00 pm )", "Evenings ( 3:00 pm - 6:00 pm )",
        "Late Evenings ( 6:00 pm - 9:00 pm )", "Night ( 9:00 pm - 12:00 am )", "Late Night ( 12:00 am - 3:00 am )"],
      weekdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      datat: [],
      dataw: [],
      selectedTimings: [],
      finalValue: '',
      finalWeek: '',
      user: 'parttime',
      hoursValue: 1,
      city: '',
      phone: '',
      vehicleModel: '',
      vehicleMake: '',
      vehicleYear: '',
      data: null

    }
  }

  componentDidMount() {
    let Temp = this.state.timedata
    let FormateData = []
    for (let i = 0; i < Temp.length; i++) {
      FormateData.push({
        id: i,
        key: Temp[i],
        checked: false
      })
    }
    this.setState({ datat: FormateData })

    let TempDays = this.state.weekdays
    let FormatWeek = []
    for (let i = 0; i < TempDays.length; i++) {
      FormatWeek.push({
        id: i,
        key: TempDays[i],
        checked: false
      })
    }
    this.setState({ dataw: FormatWeek })
  }
  onChecked(id) {
    const data = this.state.datat
    const index = data.findIndex(x => x.id === id);
    data[index].checked = !data[index].checked
    this.setState(data)
  }
  onCheckedWeek(id) {
    const dataw = this.state.dataw
    const indexw = dataw.findIndex(x => x.id === id);
    dataw[indexw].checked = !dataw[indexw].checked
    this.setState(dataw)
  }
  renderTimings() {
    return this.state.datat.map((item, key) => {
      return (
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }} key={key} onPress={() => this.onChecked(item.id)}>
          <CheckBox value={item.checked} onValueChange={() => { this.onChecked(item.id) }} />
          <Text style={{ fontStyle: 'italic' }}>{item.key}</Text>
        </TouchableOpacity>
      )
    })
  }

  renderWeekDays() {
    return this.state.dataw.map((item, key) => {
      return (
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }} key={key} onPress={() => this.onCheckedWeek(item.id)}>
          <CheckBox value={item.checked} onValueChange={() => { this.onCheckedWeek(item.id) }} />
          <Text style={{ fontStyle: 'italic' }}>{item.key}</Text>
        </TouchableOpacity>
      )
    })
  }

  getSelectedTimings() {
    var keys = this.state.datat.map((t) => t.key)
    var checks = this.state.datat.map((t) => t.checked)
    let selectedValue = []
    for (let i = 0; i < checks.length; i++) {
      if (checks[i] == true) {
        selectedValue.push(keys[i])
      }
    }
    var confirm = JSON.stringify(selectedValue);
    console.log(selectedValue)
    // alert(selectedValue)
    this.setState({ finalValue: confirm })
  }

  getSelectedWeek() {
    var keys = this.state.dataw.map((t) => t.key)
    var checks = this.state.dataw.map((t) => t.checked)
    let selectedValue = []
    for (let i = 0; i < checks.length; i++) {
      if (checks[i] == true) {
        selectedValue.push(keys[i])
      }
    }
    var confirm = JSON.stringify(selectedValue);
    console.log(selectedValue)
    // alert(selectedValue)
    this.setState({ finalWeek: confirm })
    console.log("Final week value:" + this.state.finalWeek)
  }
  updateUser = (user) => {
    this.setState({ user: user })
    console.log(user)
  }
  getVal(val) {
    this.setState({ hoursValue: val })
    console.log(val);


  }

  submitData() {
    // this.getSelectedTimings()
    // this.getSelectedWeek()

    // fetch('https://boxeyi.herokuapp.com/api/driver_info', {
    //   method: "POST",
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjM5MzUyMDU0LCJpYXQiOjE2MzgwNTYwNTQsImp0aSI6IjU3OGFlZjMyMmZiODRiZWQ5ZjUxNjg2NDFhNTNlM2VjIiwidXNlcl9pZCI6Mn0.hhJCNEO1Ioy88Qj5maVLqa_7m0KT7uTfoLQHyftsHzU'
    //   },
    //   body: JSON.stringify({
    //     phone: this.state.phone,
    //     city: this.state.city,
    //     rideshare_driver: this.state.user,
    //     hours_per_week: this.state.hoursValue,
    //     // driving_time: this.state.finalValue,
    //     // driving_days: this.state.finalWeek,
    //     vehicle_make: this.state.vehicleMake,
    //     vehicle_model: this.state.vehicleModel,
    //     vehicle_year: this.state.vehicleYear

    //   })
    // })

    fetch('https://boxeyi.herokuapp.com/api/driver_info', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjM5NDM5ODM3LCJpYXQiOjE2MzgxNDM4MzcsImp0aSI6IjRlNWMxM2Y1OWQyMDRlN2NiZTZiOGVjOTdjMGE5YWUyIiwidXNlcl9pZCI6Mn0.z8LuKH1opXjEGEi8mj_jEpZ56uSnyTw0L8MxmhuxHJU'
      },
      body: JSON.stringify({
        phone: this.state.phone,
        city: this.state.city,
        rideshare_driver: this.state.user,
        hour_per_week: this.state.hoursValue,
        driving_time: this.state.finalValue,
        driving_days: this.state.finalWeek,
        vehicle_make: this.state.vehicleMake,
        vehicle_model: this.state.vehicleModel,
        vehicle_year: this.state.vehicleYear

      })
    })

      .then(async (response) => {
        let data = await response.json();
        console.log(data)
      })
      // .then(respondata => {
      //   this.setState({ data: respondata })
      //   let roomName = ''
      //   let roomFloor = ''
      //   if (this.state.data) {
      //     roomName = this.state.data.data.vehicle_make
      //     roomFloor = this.state.data.data.city
      //     console.log("Value of response is :" + roomFloor)
      //   }

      // })
      .catch((error) => {
        console.log(error)
      })

    // .then((res) => {
    //   if (res.status == 200) {
    //     console.log("This is response before JSON" + res);
    //     let data = res.text();
    //     let daata = res.json();
    //     console.log("Dataaa", daata)
    //     console.log("Successfully", data)
    //   }

    // })

    // .catch((err) => {
    //   console.log("This is error " + err)
    // })
  }
  render() {
    return (
      <ScrollView>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Phone</Text>
          <TextInput
            style={styles.inputStyle}
            placeholder="Phone Number"
            onChangeText={(val) => this.setState({ phone: val })} />

          <Text style={styles.title}>City</Text>
          <TextInput
            style={styles.inputStyle}
            placeholder="City"
            onChangeText={(val) => this.setState({ city: val })} />

          <Text style={styles.title}>RideShare Driver</Text>
          <Picker selectedValue={this.state.user} onValueChange={this.updateUser}>
            <Picker.Item label="Fulltime" value="fulltime" />
            <Picker.Item label="Parttime" value="parttime" />
          </Picker>
          <Text style={{ color: 'green', fontSize: 20, textAlign: 'center' }}>{this.state.user}</Text>
          <Text style={styles.title}>Hours</Text>

          <Slider
            style={{ width: "100%", height: 40, color: 'blue' }}
            minimumValue={0}
            maximumValue={100}
            minimumTrackTintColor="grey"
            maximumTrackTintColor="blue"
            value={this.state.hoursValue}
            onValueChange={(val) => this.setState({ hoursValue: parseInt(val) })}
          // onSlidingComplete={(val) => this.setState({ hoursValue: parseInt(val) })}
          />
          <Text style={{ textAlign: "center" }}>Hours:{this.state.hoursValue}</Text>
          <Text style={styles.title}>Which times of the day do you often drive for work? </Text>

          {this.renderTimings()}
          <Button onPress={() => { this.getSelectedTimings() }} title="Confirm"
          />
          {this.state.finalValue == 0 ? <Text>Select timings and press confirm</Text> : <Text>confirmed</Text>}
          {/* <Text>Selected Timings {this.state.finalValue}</Text> */}

          <Text style={styles.title}>What days of the week you often drive? </Text>

          {this.renderWeekDays()}
          <Button onPress={() => { this.getSelectedWeek() }} title="Confirm"
          />
          {this.state.finalWeek == 0 ? <Text>Select weekdays and press confirm</Text> : <Text>confirmed</Text>}
          {/* <Text>Selected Week {this.state.finalWeek}</Text> */}

          <Text style={styles.title}>Vehicle Info</Text>

          <TextInput
            style={styles.inputStyle}
            value={this.state.vehicleMake}
            placeholder="Vehicle Make"
            onChangeText={(val) => this.setState({ vehicleMake: val })} />

          <TextInput
            style={styles.inputStyle}
            value={this.state.vehicleModel}
            placeholder="Vehicle Model"
            onChangeText={(val) => this.setState({ vehicleModel: val })} />

          <TextInput
            style={styles.inputStyle}
            value={this.state.vehicleYear}
            placeholder="Vehicle Year"
            onChangeText={(val) => this.setState({ vehicleYear: val })} />
          {/* <Text>{this.state.data.data.phone}</Text> */}

          <Button onPress={() => { this.submitData() }} title="Submit"
          />
        </View>
      </ScrollView>
    )
  }
}

export default App

const styles = StyleSheet.create({
  inputStyle: {
    borderWidth: 1,
    marginHorizontal: 10,
    marginTop: 10,
    paddingHorizontal: 15,
    borderRadius: 10
  },
  title: {
    fontSize: 20,
    marginLeft: 15,
    marginTop: 10
  }
})


