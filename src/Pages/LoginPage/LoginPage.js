import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

//custom file imports
import LoginForm from '../../components/LoginForm/LoginForm';
import RegisterTab from '../../components/RegisterTab/RegisterTab';

//Need to select mentor or volunteer and display page based on selection
//Need to redirect to login once form is complete

//Material-UI imports
import { Tabs, Tab, Grid } from '@material-ui/core';

function LoginPage(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch to get all dropdown information to render on page load
    dispatch({
      type: 'GET_EDUCATION',
    });
    dispatch({
      type: 'GET_GENDER',
    });
    dispatch({
      type: 'GET_ETHNICITY',
    });
  }, [dispatch]);

  //config for tabs
  const [selectedTab, setSelectedTab] = React.useState(0);
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  return (
    <div>
      <Grid container justify="center">
        <Grid item>
          <Tabs value={selectedTab} onChange={handleTabChange} centered>
            <Tab label="log-in" />
            <Tab label="register" />
          </Tabs>
          <div className="topBorder">
            {selectedTab === 0 && <LoginForm />}
            {selectedTab === 1 && <RegisterTab />}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default connect(mapStoreToProps)(LoginPage);
