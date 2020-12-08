import './stylesheets/App.scss'
import Container from './components/Weather/Container'
import Map from './components/Map'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
					<Route
						exact
						path="/weather"
						render={(routeProps) => (
              <Container />
              )}
					/>
					<Route
						exact
						path="/live-map"
						render={(routeProps) => (
              <Map />
						)}
					/>
        </Switch>
    </div>
  );
}

export default App;
