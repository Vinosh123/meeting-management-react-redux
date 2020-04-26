import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { getValidUser, login } from '../Actions/LoginActions';
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Uname: '',
            Upwd: '',
            message: '',
            error: true,
        }
    }
    componentDidMount() {
        this.props.doLogin();
    }
    getValues = (e) => {
        e.preventDefault();
        let name = document.getElementById('Uname').value;
        let pwd = document.getElementById('Upwd').value;

        this.setState({
            Uname: name,
            Upwd: pwd,
        })
    }

    handleLogin = (e) => {
        e.preventDefault();
        let data = this.props.loginData;
        data.forEach((value) => {
            if (this.state.Uname === value.userId && this.state.Upwd === value.password)
                this.props.history.push('/Dashboard');
            else this.setState({ message: 'please enter valid credentials' });
        });
        this.props.storeUname(this.state.Uname);
    }
    render() {
        return (
            <Fragment>
                <div className="login">
                    <input type="text" name="Uname" className="" id="Uname" placeholder="Username" onChange={this.getValues} />
                    <input type="password" name="password" className="" id="Upwd" placeholder="password" onChange={this.getValues} />
                    <input type="submit" className="" onClick={this.handleLogin} style={{ alignItems: 'center' }} /><br />
                    <p style={{ color: 'Red' }}>{this.state.message}</p>
                </div>
            </Fragment>
        )
    }
}
function mapStateToProps(state, props) {
    return {
        loginData: state.loginLogoutReducer.users,
        loggedUser: state.loginLogoutReducer.username,
    };
}
function UserData(dispatch) {
    return {
        storeUname: (username) => dispatch(login(username)),
        doLogin: () => dispatch(getValidUser()),
    }
}

export default connect(mapStateToProps, UserData)(Login);