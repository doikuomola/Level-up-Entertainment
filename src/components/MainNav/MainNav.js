import { BottomNavigation, BottomNavigationAction, makeStyles } from '@material-ui/core';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import MovieIcon from '@material-ui/icons/Movie';
import SearchIcon from '@material-ui/icons/Search';
import TvIcon from '@material-ui/icons/Tv';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';


const useStyles = makeStyles({
  root: {
    width: "100%",
    position: 'fixed',
    bottom: 0,
    backgroundColor: "#2d313a",
    zIndex: 100
  }
})

const MainNav = () => {
  const history = useHistory();
  const classes = useStyles();
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (value === 0) history.push("/");
    else if(value===1)history.push("/movies")
    else if(value===2)history.push("/series")
    else if(value===3)history.push("/search")
  }, [value, history])
  return (
    <div>
      <BottomNavigation
        value={value}
        onChange={(e, newValue) => {
          setValue(newValue)
        }}
        showLabels
        className={classes.root}

      >
        <BottomNavigationAction
          style={{color:"white"}}
          label="Trending"
          icon={<WhatshotIcon />}
        />
        <BottomNavigationAction
          style={{ color: "white" }}
          label="Movies"
          icon={<MovieIcon />}
        />
        <BottomNavigationAction
          style={{ color: "white" }}
          label="TV Series"
          icon={<TvIcon />} />
        <BottomNavigationAction
          style={{ color: "white" }}
          label="Search"
          icon={<SearchIcon />} />
      </BottomNavigation>
    </div>
  )
}

export default MainNav
