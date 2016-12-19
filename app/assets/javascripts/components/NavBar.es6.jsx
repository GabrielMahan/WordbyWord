class NavBar extends React.Component{

  constructor(){
    super();
    this.state = {userSignedIn: null}
  }
  componentDidMount(){
    this.setState({userSignedIn: this.props.userSignedIn})
    // debugger;
  }
  render(){
    return(
      <nav id="nb" className="navbar navbar-default">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <h1 className="navbar-title"> Word by Word </h1>
            <ul className="nav navbar-nav navbar-right">

              <li className="navbar-buttons">
                <a className="navbar-links" id="dashboard-link" href="/dashboard">My Dashboard</a>
              </li>

              <li className="navbar-buttons">
                { this.state.userSignedIn
                ? <form method="post" action="/users/sign_out">
                    <input className="navbar-links logout-button" type="Submit" value="Log Out"/>
                    <input type="hidden" name="_method" value="Delete"/>
                  </form>
                : <a className="navbar-links" href="/users/sign_in"> Sign In </a>
                }

              </li>

            </ul>
          </div>
      </nav>
    )
  }
}
