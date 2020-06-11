import React, {Component} from 'react'
import {Card,Container,Menu,Segment, Icon} from 'semantic-ui-react'

import UserCard from './UserCard.js'
import {urlUserApi} from '../urls'

import {Navbar} from './Navbar'

class UserPage extends Component{
    constructor(props){
        super(props)
        this.state = {
            current: 1,
          }
    }


  componentDidMount() {
    this.paginating(1)
  }

  paginating = page => {
    const URL = `${urlUserApi()}?page=${page}`
    this.props.requestUserData(URL)
    this.setState({
      current: page,
    })
    window.scrollTo(0, 0)
  }

  leftButtonClick = () => {
    if (this.state.current > 1) {
      let change = this.state.current
      this.setState({ current: change - 1 }, () => {
        this.paginating(this.state.current)
      })
    }
  }

  rightButtonClick = () => {
    if (this.state.current < this.props.apiUserData.count) {
      let change = this.state.current
      this.setState({ current: change + 1 }, () => {
        this.paginating(this.state.current)
      })
    }
  }

  render(){
      let menu = []
      for (let index = 1; index <= this.props.apiUserData.count; index++) {
           menu[index] = (
          <Menu.Item
            active={this.state.current === index}
            onClick={() => {
              this.paginating(index)
            }}
          >
            {index}
          </Menu.Item>
        )
      }
      if (this.props.apiUserData.loaded) {
          return(
            <Container
            textAlign="center"
          >
        
          <div>
              <Card.Group itemsPerRow={4}>
              {this.props.apiUserData.data.map(info => (
                <UserCard info={info} />
              ))}
              </Card.Group>
          </div>
          {this.props.apiUserData.count > 1 && (
            <Segment padded basic textAlign="center">
              <Menu pagination>
                <Menu.Item onClick={this.leftButtonClick} icon>
                  <Icon name="chevron left" />
                </Menu.Item>
                {menu}
                <Menu.Item onClick={this.rightButtonClick} icon>
                  <Icon name="chevron right" />
                </Menu.Item>
              </Menu>
            </Segment>
          )}
          </Container>
          )
      }
      else {
          return 'Loading...'
      }
  }
}

export default UserPage