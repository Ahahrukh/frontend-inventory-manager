import React from 'react'

const Home = (props) => {
  return (
    <div>
        
<nav className="navbar navbar-expand-lg navbar-light bg-light">
 
  <div className="container">
    <button
      className="navbar-toggler"
      type="button"
      data-mdb-toggle="collapse"
      data-mdb-target="#navbarButtonsExample"
      aria-controls="navbarButtonsExample"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <i className="fas fa-bars"></i>
    </button>
    <div className="collapse navbar-collapse" id="navbarButtonsExample">
      
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link" href={props.paths['1']}>{props.options['1']}</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href={props.paths['2']}>{props.options['2']}</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href={props.paths['3']}>{props.options['3']}</a>
        </li>
      </ul>
      <div className="d-flex align-items-center">
        {props.options['4']}
      </div>
    </div>
  </div>
 
</nav>

    </div>
  )
}

export default Home