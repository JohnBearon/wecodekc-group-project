import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

//custom file imports
import EventListItem from '../../components/EventListItem/EventListItem';
import EventsBar from '../../components/EventsBar/EventsBar';

//material ui imports
import {
  Grid,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
} from '@material-ui/core';
import { withStyles, createStyles } from '@material-ui/core/styles';

const muiStyles = (theme) =>
  createStyles({
    typography: {
      [theme.breakpoints.down('sm')]: {
        height: '50%',
      },
    },
  });

class EventsPage extends Component {
  state = {
    orderBy: 1,
    //course = true/ event = false
  };
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_EVENTS',
    });
  }
  handleChange = (e) => {
    this.setState({
      typeOfEvent: !this.props.store.eventReducer.event_type,
    });
    this.props.dispatch({
      type: 'GET_EVENTS',
      typeOfEvent: this.state.orderBy,
    });
  };

  // handleEdit = (e) => {
  //   e.preventDefault();
  //   this.setState({
  //     ascDsc: !this.state.edit,
  //   });
  // };

  render() {
    const eventsArray = this.props.store.eventReducer.map((item, index) => {
      return (
        <Grid item sm={12} md={4} lg={4}>
          <EventListItem
            key={index}
            event={item}
            index={index}
            {...this.props}
          />
        </Grid>
      );
    });

    return (
      <div style={{ padding: 20 }}>
        <EventsBar />
        <Box mb={2}>
          <Grid container justify="space-evenly">
            <Grid item>
              <Typography
                variant="h3"
                component="h2"
                gutterBottom
                className={this.props.classes.typography}
              >
                Upcoming Events
              </Typography>
            </Grid>
            <Grid item>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="filter">Sort By</InputLabel>
                <Select
                  style={{ minWidth: 140 }}
                  labelId="filter"
                  id="filter"
                  // value={filter}
                  // onChange={this.handleChange}
                  label="filter"
                >
                  <MenuItem value={1}>Both</MenuItem>
                  <MenuItem value={2}>Events</MenuItem>
                  <MenuItem value={3}>Courses</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        <Grid container spacing={3}>
          {eventsArray}
        </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(withStyles(muiStyles)(EventsPage));
