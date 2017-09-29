import React from "react";
import TextField from 'material-ui/TextField';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            description: ''
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div style={{
                display: 'flex', justifyContent:'space-between'
            }}>
                <div style={{
                    flex: 1
                }}>First </div>
                <input></input>
                <div style={{
                    flex: 1
                }}>Last Name</div>
                <input></input>
                <TextField
                    id="firstName"
                    label="First Name"
                    value={this.state.firstName}
                    //onChange={this.handleChange('firstName')}
                    margin="normal"
                />
                <TextField
                    id="lastName"
                    label="Last Name"
                    value={this.state.lastName}
                    //onChange={this.handleChange('lastName')}
                    margin="normal"
                />
            </div>
        )
    }
}

export default App;
