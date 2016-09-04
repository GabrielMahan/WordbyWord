class NavBar extends React.Component{


  render(){
    return(
      <nav className="navbar navbar-default navbar-fixed-top">
          { this.props.currentUser ?
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right">
              <li className="active"><a href="/"><span className="sr-only">Home</span></a></li>
              <li><a href='/about'>About</a></li>
              <li>
                  <form  method="post" action="/users/sign_out">
                    <input id="logoutButton" type="Submit" value="Log Out"/>
                    <input type="hidden" name="_method" value="Delete"/>
                  </form>
              </li>
            </ul>
          </div>
          :
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav navbar-left">
            <a class="navbar-brand" href="/"><img id="brand-logo" src="/assets/test_logo_2.png"/></a>
          </ul>
           <ul className="nav navbar-nav navbar-right">
              <li><a href='/about'>About</a></li>
              <li><a href='/users/sign_up'>Register</a></li>
              <li><a href='/users/sign_in'>Sign In</a></li>
            </ul>
          </div>
        }
      </nav>
    )
  }
}
