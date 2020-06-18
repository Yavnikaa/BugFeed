import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import queryString from 'query-string'
import {Loader} from 'semantic-ui-react'

import { loginUser } from '../actions/userActions'

class Auth extends Component{

    constructor(props){
        super(props)
        this.state = {
            isLoading:true,
        }
    }

    componentDidMount(){
        if(!this.props.token){
            let values = queryString.parse(this.props.location.search)
            this.props.loginUser(values.code)
        }
    }
    render(){
        localStorage.setItem('token', this.props.token )
        let isLoading = !this.props.token 
        return (
            <Fragment>
                {this.props.err? <Redirect to = '/'/>:
                    isLoading? <Loader active size='large'>Loading</Loader>:
                        <Redirect to = '/projects'/>
                }
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    user : state.item
})

export default connect(mapStateToProps, { loginUser })(Auth)