import '../App.css'
import SideBar from './SideBar';
import logo from '../chevron-left.svg';

function Home() {
  return (
    <div className="App">
      <nav class="navbar navColor">
        <div class="container-fluid">
          <button class="btn btn-link navbar-brand" >
            <img src={logo} className="me-2" alt="logo" />
            <span class='text-white'>View Audience</span>
          </button>
        </div>
      </nav>
      <SideBar />
    </div>
  );
}

export default Home;


