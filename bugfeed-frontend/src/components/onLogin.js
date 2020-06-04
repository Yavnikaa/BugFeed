import React ,{ Component } from "react";
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import queryString from 'query-string';
import ProjectsPage from './Projects';
import '../css/onLogin.css';


class OnLogin extends Component{
    state = {
        user_found: false,
        got_response: false,
        access_token: ""
    }
    
    componentDidMount(){
        let url = this.props.location.search;
        console.log(url)
        let params = queryString.parse(url)
        
        if(!this.state.got_response){
            axios({ 
                method:'post',
                url: "http://127.0.0.1:8000/users/onlogin/?code={$}",
                headers:{
                    'Content-Type':'application/json',
                },
                withCredentials: true,
                data:{
                    code: params['code']
                }
            }).then((response) => {
                console.log(response)
                
                if(response.data["Status"] === "User Created"){
                    this.setState({
                        user_found: true,
                        got_response: true,
                        access_token: response.data["access_token"]
                    });
                }
                else if(response.data["Status"] === "User not a member of IMG"){
                    this.setState({
                        ...this.state,
                        user_found: false,
                        got_response: true
                    })
                }
                else if(response.data["Status"] === "User Exists"){
                    this.setState({
                        user_found: true,
                        got_response: true,
                        access_token: response.data["access_token"]
                    })
                }
                console.log(this.state)
            })
        }
    }

    render(){

        if(this.state.got_response){
            if(this.state.user_found){
                return(<ProjectsPage access_token = {this.state.access_token}/>)
            }
            else {
                alert("You need to be an IMG member to use this app");
                return (<Redirect to ="/" exact/>)
            }
        }
        else{
            return(
                <div class="center-container">
                        <div class="dimmer">
                            <div class="loader">Loading</div>
                        </div>
                </div>
            )
        }
    }
}

export default OnLogin