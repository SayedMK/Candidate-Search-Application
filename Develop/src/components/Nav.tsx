import { Link, useLocation } from 'react-router-dom';


const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  const currentPage = useLocation().pathname;
  
  return (
    <nav>
      <ul className="nav">
        <li className="nav-item">
          <Link
            to="/"
            className={currentPage === '/' ? 'nav-link active' : 'nav-link'}
          >
            <div>
              Home
            </div>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/SavedCandidates"
            className={currentPage === '/SavedCandidates' ? 'nav-link active' : 'nav-link'}
          >
            <div>
              Saved Candidates
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  )
};

export default Nav;
