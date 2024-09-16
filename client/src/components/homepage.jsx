import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <nav>
        <Link to="/profile">Profile</Link>
        <Link to="/add-skill">Add Skill</Link>
        <Link to="/skills">Skill List</Link>
      </nav>
    </div>
  );
};

export default Home;
