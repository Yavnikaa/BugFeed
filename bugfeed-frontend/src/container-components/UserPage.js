import React from 'react';
import { Card, Typography } from '@material-ui/core';

import UserCard from '../components/UserCard';
import * as api_links from '../APILinks';

import axios from 'axios';

const UsersPage = (props) => {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    axios.get(api_links.API_ROOT + 'users/')
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <Card className="list-title-card" variant="outlined">
        <Typography className="list-title">
          Users
        </Typography>
        {/* <hr className="divider" /> */}
      </Card>
      <div className="user-card-container">
        {
          users.map(user => (
            <UserCard
              id={user.id}
              name={user.name}
              is_master={user.is_master}
              enrol_number={user.enrol_number}
              branch_name={user.branch_name}
              current_year={user.current_year}
              is_active={user.is_active}
              display_photo={user.display_picture}
            />
          ))
        }
      </div>
    </>
  );
}
export default UsersPage;