import HelloDisplay from '../components/home/HelloDisplay';
import HealthCheck from '../components/home/HealthCheck';
import config from '../config';
import '../styles/home.css';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="home-page">
      <div className="hero">
        <h1>Welcome to node(nest)-react-mongoDB-playground</h1>
        <p>Start Building...</p>
      </div>

      <div className="demo-section">
        <h2>API Demo</h2>
        <HelloDisplay backendUrl={config.backendUrl} />
        <HealthCheck backendUrl={config.backendUrl} />
        <Link to="/users">Go to Users Page</Link>
      </div>
    </div>
  );
}
