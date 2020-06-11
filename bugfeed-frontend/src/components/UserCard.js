import React from 'react'
import '../css/UserCard.css'
import {Card,Image} from 'semantic-ui-react'


const UserCard = ({info}) => {
    return(
        <div className='container'>
        <div className='heading'> User List</div>
             <Card className='card'>
            <Card.Content>
        <Image
          floated='right'
          size='mini'
          src= {info.display_picture}
        />

        <Card.Header><strong>{info.username}</strong></Card.Header>
        
        <Card.Meta>{info.branch_name} , {info.current_year} year
        <br/>
        {info.enrol_number} <br/> </Card.Meta>
        <br/>
        <Card.Description> <strong> Projects:</strong> 
        </Card.Description>
        </Card.Content>
        </Card>
        </div>
       

    )
}

export default UserCard