import React, { Component } from 'react'
import Header from './components/Header';
import Form from './components/Form';
import Table from './components/Table';
import Footer from './components/Footer';
import usersService from './services/usersService';
import './App.css';
import countries from "countries-list";

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            gender: '',
            age: 0,
            image: '',
            occupation: '',
            location: '',
            position: '',
            users: []
        }
    }

    // handle Change
    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }

    // GET LOCATION
    getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }

    // GET POSITION
    showPosition = async (position) => {
        console.log("Latitude: " + position.coords.latitude + ", " +
            "Longitude: " + position.coords.longitude);
        this.setState({
            position: {
                lat: position.coords.latitude,
                long: position.coords.longitude
            }
        });
        console.log(this.state.position);
        const newOne = {
            name: this.state.name,
            gender: this.state.gender,
            age: parseInt(this.state.age),
            image: this.state.image,
            occupation: this.state.occupation,
            location: this.state.location,
            position: this.state.position,
            isEditing: false
        };
        console.log(newOne);
        const newData = await usersService.create(newOne);

        this.setState({
            name: '',
            gender: '',
            age: 0,
            image: '',
            occupation: '',
            location: '',
            position: '',
            users: [newData, ...this.state.users]
        });
    }


    // handle submit
    handleSubmit = (event) => {
        event.preventDefault();

        this.getLocation();

    }

    toggleEdit = (event) => {
        const index = event.currentTarget.id;
        console.log(event.target);
        const users = this.state.users;
        this.setState({
            name: users[index].name,
            gender: users[index].gender,
            age: users[index].age,
            location: users[index].location,
            occupation: users[index].occupation,
            image: users[index].image
        })
        users[index].isEditing = true;
        this.setState({
            users: users
        });

    }
    //  Fetch data
    async fetchUsers() {
        const users = await usersService.getAll();
        this.setState({ users: users });
        console.log(users);
    }
    // Show data
    componentDidMount() {
        this.fetchUsers();
        console.log(countries.countries);
    }

    // edit data
    save = async (event) => {
        event.preventDefault();
        const id = event.target.id;
        const users = this.state.animal;

        const index = users.findIndex(item => item._id === id);
        console.log(index);

        const updatedData = {
            _id: id,
            name: this.state.name,
            gender: this.state.gender,
            age: parseInt(this.state.age),
            image: this.state.image,
            occupation: this.state.occupation,
            location: this.state.location,
            isEditing: false
        }

        users[index] = updatedData;
        console.log(users);
        this.setState({
            name: '',
            gender: '',
            age: 0,
            image: '',
            occupation: '',
            location: '',
            users: users
        });
        await usersService.updateCompletionStatus(id, updatedData);
    }

    // delete data
    deleteData = async (event) => {
        const id = event.currentTarget.getAttribute('a-key');
        await usersService.delete(id);
        const users = this.state.users;
        const index = users.findIndex(item => item._id === id);
        this.setState({
            users: [
                ...users.slice(0, index),
                ...users.slice(index + 1)
            ]
        })
    }

    // CALCULATE DISTANCE
    distance(lat1, lon1, lat2, lon2, unit) {
        if ((lat1 === lat2) && (lon1 === lon2)) {
            return 0;
        }
        else {
            var radlat1 = Math.PI * lat1 / 180;
            var radlat2 = Math.PI * lat2 / 180;
            var theta = lon1 - lon2;
            var radtheta = Math.PI * theta / 180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180 / Math.PI;
            dist = dist * 60 * 1.1515;
            if (unit === "K") { dist = dist * 1.609344 }
            if (unit === "N") { dist = dist * 0.8684 }
            return dist;
        }
    }

    render() {
        const { name, gender, age, location, occupation, image } = this.state;
        return (
            <React.Fragment >
                <Header />
                <Form name={name}
                    gender={gender} age={age}
                    occupation={occupation} location={location} image={image}

                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit} />

                <Table users={this.state.users} delete={this.deleteData} />

                <Footer />
            </React.Fragment >
        )
    }
}

export default App