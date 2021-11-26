// @ts-nocheck
import { Container } from '@material-ui/core';
import { Helmet } from "react-helmet";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import MainNav from './components/MainNav/MainNav';
import Movies from './pages/Movies/Movies';
import Search from './pages/Search/Search';
import Series from './pages/Series/Series';
import Trending from './pages/Trending/Trending';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Helmet>
        <meta name="description" content="Get info for all your favourite movies and series" />
        <meta name="keywords" content="Movies, TV Series, Search Movies" />
        <title>Level Up Entertainment</title>
        {/* <style type="text/css">
          {
            `
            .App{
              background-color:#fff
            }
            .header{
              background-color:#fff;
              color:black
            }
            .media{
              background-color:#caf1de;
              color:#000
            }
            .media:hover{
background-color:#ffe7c7;
              color:black
            }
            `
          }
        </style> */}
      </Helmet>
      <div className="App">
        <Container>
          <Switch>
            <Route path="/" component={Trending} exact />
            <Route path="/movies" component={Movies} />
            <Route path="/series" component={Series} />
            <Route path="/search" component={Search} />
          </Switch>
        </Container>

      </div>
      <MainNav />

    </BrowserRouter>

  );
}

export default App;
