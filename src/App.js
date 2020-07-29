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
            email: '',
            userName: '',
            age: 18,
            image: '',
            location: '',
            password: '',
            female: false,
            male: true,
            users: []
        }
    }

    // handle Change
    handleChange = (event) => {
        event.target.id !== "image" ? this.setState({ [event.target.id]: event.target.value })
            : this.setState({ [event.target.id]: event.target.files });
    }

    // toggleGender
    toggleGender = () => {
        this.setState({
            female: !this.state.female,
            male: !this.state.male
        });
    }

    // GET LOCATION
    getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }

    // GET POSITION AND CREATE NEW USER
    showPosition = async (position) => {
        // get position
        this.setState({
            position: {
                lat: position.coords.latitude,
                long: position.coords.longitude
            }
        });

        // upload Image

        const file = Array.from(this.state.image)[0];

        const formData = new FormData();

        formData.append('file', file);

        const image = await usersService.uploadImage(formData);
        this.setState({
            image: image.url
        })

        // set information of new account
        const newOne = {
            email: this.state.email,
            userName: this.state.userName,
            age: parseInt(this.state.age),
            image: this.state.image,
            location: this.state.location,
            position: this.state.position,
            password: this.state.password,
            isEditing: false
        };

        // set gender
        this.state.female ? newOne.gender = "Female" : newOne.gender = "Male";
        console.log(newOne);

        // add newData to db
        const newData = await usersService.create(newOne);

        this.setState({
            email: '',
            userName: '',
            age: 18,
            image: '',
            location: '',
            password: '',
            female: false,
            male: true,
            users: [newData, ...this.state.users]
        });
    }

    // UPLOAD IMAGE
    async uploadImage() {

    }
    // handle submit
    handleSubmit = (event) => {
        event.preventDefault();
        this.getLocation();
    }

    //  Fetch data
    async fetchUsers() {
        const users = await usersService.getAll();
        this.setState({ users: users });
        console.log(users);
    }

    // Get all countries
    getAllCountries = () => {
        const allCountries = [];
        for (let key in countries.countries) {
            allCountries.push(countries.countries[key]);
        }
        allCountries.sort((item1, item2) => item1.name - item2.name);
        this.setState({
            countries: allCountries
        })
    }
    // Show data
    componentDidMount() {
        this.fetchUsers();
        console.log(countries.countries);
        this.getAllCountries();
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
        const { userName, email, age, location, image, password, female, male, countries } = this.state;
        return (
            <React.Fragment >
                <Header />
                <Form userName={userName}
                    email={email} age={age}
                    location={location} image={image}
                    password={password}
                    female={female}
                    male={male}
                    countries={countries}

                    handleChange={this.handleChange}
                    toggleGender={this.toggleGender}
                    handleSubmit={this.handleSubmit} />

                <Table users={this.state.users} delete={this.deleteData} />

                <Footer />
            </React.Fragment >
        )
    }
}

export default App