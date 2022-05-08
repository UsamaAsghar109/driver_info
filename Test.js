import CheckBox from '@react-native-community/checkbox'
import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker'
import React, { Component } from 'react'
import { Button, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native';

export class TestApp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            timedata: ["Early Mornings ( 3:00 am - 6:00 am )", "Mornings ( 6:00 am - 9:00 am )",
                "Late Mornings ( 9:00 am - 12:00 pm )", "Aternoons ( 12:00 pm - 3:00 pm )", "Evenings ( 3:00 pm - 6:00 pm )",
                "Late Evenings ( 6:00 pm - 9:00 pm )", "Night ( 9:00 pm - 12:00 am )", "Late Night ( 12:00 am - 3:00 am )"],
            weekdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            data: [],
            dataw: [],
            selectedTimings: [],
            finalValue: [],
            finalWeek: [],
            user: 'parttime',
            hoursValue: 1,
            city: '',
            phone: '',
            vehicleModel: '',
            vehicleMake: '',
            vehicleYear: ''

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
        this.setState({ data: FormateData })

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
        const data = this.state.data
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
        return this.state.data.map((item, key) => {
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
        var keys = this.state.data.map((t) => t.key)
        var checks = this.state.data.map((t) => t.checked)
        let selectedValue = []
        for (let i = 0; i < checks.length; i++) {
            if (checks[i] == true) {
                selectedValue.push(keys[i])
            }
        }
        console.log(selectedValue)
        // alert(selectedValue)
        this.setState({ finalValue: selectedValue })
    }

    getSelectedWeek() {
        var keys = this.state.dataw.map((t) => t.key)
        var checks = this.state.data.map((t) => t.checked)
        let selectedValue = []
        for (let i = 0; i < checks.length; i++) {
            if (checks[i] == true) {
                selectedValue.push(keys[i])
            }
        }
        console.log(selectedValue)
        // alert(selectedValue)
        this.setState({ finalWeek: selectedValue })
    }
    updateUser = (user) => {
        this.setState({ user: user })
        console.log(user)
    }
    getVal(val) {
        console.log(val);
    }

    submitData() {
        // this.getSelectedTimings()
        // this.getSelectedWeek()
        // console.log("Clicked")

        fetch('https://boxeyi.herokuapp.com/api/driver_info', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjM5MzM3NDE1LCJpYXQiOjE2MzgwNDE0MTUsImp0aSI6ImFjMDViYWVjNGIzYTRkMzdiZDgxNjA4NjJhZmQ4ZWQ0IiwidXNlcl9pZCI6Mn0.Iv4EGW88txk87T2cZQ157n3_E45ucusgGZZcqqXQtiQ'
            },
            body: JSON.stringify({
                phone: this.state.phone,
                city: this.state.city,
                rideshare_driver: this.state.user,
                hours_per_week: this.state.hoursValue,
                // driving_time: this.state.finalValue,
                // driving_days: this.state.finalWeek,
                vehicle_make: this.state.vehicleMake,
                vehicle_model: this.state.vehicleModel,
                vehicle_year: this.state.vehicleYear

            })
        })

            .then((res) => {
                if (res.status == 200) {
                    console.log("This is response before JSON" + res);
                    let data = res.text();
                    let daata = res.json();
                    console.log("Dataaa", daata)
                    console.log("Successfully", data)
                }

            })

            .catch((err) => {
                console.log("This is error " + err)
            })
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
                        onSlidingComplete={val => this.getVal(val)}
                    />
                    <Text style={{ textAlign: "center" }}>Hours:{this.state.hoursValue}</Text>
                    <Text style={styles.title}>Which times of the day do you often drive for work? </Text>

                    {/* {this.renderTimings()} */}

                    {/* <Text>Selected Timings {this.state.finalValue}</Text> */}

                    <Text style={styles.title}>What days of the week you often drive? </Text>

                    {/* {this.renderWeekDays()} */}

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

                    <Button onPress={() => { this.submitData() }} title="Get"
                    />
                </View>
            </ScrollView>
        )
    }
}

export default TestApp

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


