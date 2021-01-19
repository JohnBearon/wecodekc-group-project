import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

//custom MATERIAL-UI imports
import { Box, Button, Typography } from '@material-ui/core';

class ProfileInfoPanel extends Component {
  render() {
    //loop through to get each skill from database
    const skills = this.props.store.verifiedUserDetailReducer[0].skills_label_array.map(
      (item, index) => {
        return (
          <Typography key={index} gutterBottom>
            {item}
          </Typography>
        );
      }
    );

    return (
      <div>
        <div>
          {/* TODO - CONDITIONAL RENDER PROFILE PIC IF IMAGE EXISTS */}

          {!this.props.store.verifiedUserDetailReducer[0]
            .image_link_array[0] ? (
            <img
              src={
                'https://wecodekc.s3.us-east-2.amazonaws.com/default-profile-icon-16.jpg'
              }
              className="placeholder"
              alt="profile"
            />
          ) : (
            <img
              src={
                this.props.store.verifiedUserDetailReducer[0]
                  .image_link_array[0]
              }
              className="placeholder"
              alt="profile"
            />
          )}
        </div>
        <div className="profile-area">
          <Typography gutterBottom>
            {this.props.store.user.first_name} {this.props.store.user.last_name}
          </Typography>
          {/* TODO ROLE FROM USER REDUCER */}
          <Typography gutterBottom>
            Role:
            {this.props.store.verifiedUserDetailReducer.role_label}
          </Typography>
          <Typography gutterBottom>
            Zipcode: {this.props.store.user.zip_code}
          </Typography>
          <Typography gutterBottom>
            Phone number: {this.props.store.user.phone_number}
          </Typography>
          <Typography gutterBottom>
            Email: {this.props.store.user.email}
          </Typography>
          <Typography gutterBottom>
            Company:
            {this.props.store.verifiedUserDetailReducer.company}
          </Typography>
          <Typography gutterBottom>Skills:</Typography>
          {JSON.stringify(
            this.props.store.verifiedUserDetailReducer.skills_label_array
          )}
          {this.props.store.verifiedUserDetailAll.skills_label_array && (
            <Typography>{skills}</Typography>
          )}

          {skills}
          <Box mt={2}>
            <Button
              color="secondary"
              variant="contained"
              onClick={this.props.edit}
            >
              Edit Profile
            </Button>
          </Box>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ProfileInfoPanel);
