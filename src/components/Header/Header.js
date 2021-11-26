import LiveTvIcon from '@mui/icons-material/LiveTv';
import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div>
      <span
        onClick={() => window.scroll(0, 0)}
        className="header">Level up Entertainment<LiveTvIcon style={{fontSize:50}}/></span>
    </div>
  )
}

export default Header
