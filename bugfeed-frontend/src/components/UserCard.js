import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Skeleton from '@material-ui/lab/Skeleton';
import '../css/UserCard.css'

import { Link } from "react-router-dom";

export default function UserCard(props) {

  return (
    <Card
      className="card"
      variant="outlined"
    >
      <CardHeader
        title={
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              {
                !props.name
                  ?
                  <Skeleton width={100} height={50} animation="wave" />
                  :
                  <Link to={"/users/" + props.enrol_number}>{props.name}</Link>
              }
            </div>
        }
        subheader={
          <div>
            <span>{
              props.enrol_number ?
                props.enrol_number
                :
                <Skeleton width={140} animation="wave" />
            }</span>
            <br />
            {
              props.current_year 
            } year
            <br />
            {props.branch_name}
            <br />
          </div>
        }
      />
    </Card>
  );
}