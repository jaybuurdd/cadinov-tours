import React from 'react'

function Navbar () {
  const user = JSON.parse(localStorage.getItem('currentUser'))
  function logout(){
    localStorage.removeItem('currentUser')
    window.location.href='/login'
  }
  return (
    <div>
      <nav class='navbar navbar-expand-lg navbar-light bg-light'>
        <div class='container-fluid'>
          <a class='navbar-brand' href='/'>
            Cadinov Tours
          </a>
          <button
            class='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarNav'
            aria-controls='navbarNav'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
          <span class='navbar-toggler-icon' ></span>
          </button>

          <div
            class='collapse navbar-collapse justify-content-end'
            id='navbarNav'
          >
            <ul class='navbar-nav '>
              {/* If user is logged in show  name else show login/register options. */}
              {user ? (
                <>
                  <div class='dropdown'>
                    <button
                      class='btn btn-secondary dropdown-toggle'
                      type='button'
                      id='dropdownMenuButton'
                      data-toggle='dropdown'
                      aria-haspopup='true'
                      aria-expanded='false'
                    >
                    <i className='fa fa-user fa-custom-width'></i>{user.name}
                    </button>
                    <div
                      class='dropdown-menu'
                      aria-labelledby='dropdownMenuButton'
                    >
                      <a class='dropdown-item' href='/profile'>
                        Profile
                      </a>
                      <a class='dropdown-item' href='#' onClick={logout}>
                        Logout
                      </a>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <li class='nav-item register'>
                    <a
                      class='nav-link active'
                      aria-current='page'
                      href='/register'
                    >
                      Register
                    </a>
                  </li>
                  <li class='nav-item'>
                    <a class='nav-link' href='/login'>
                      Login
                    </a>
                  </li>
                </>
              )}
              {/* end of statement, everything below will always show on navbar. */}

              <li class='nav-item'>
                <a class='nav-link' href='/home'>
                  Excursions
                </a>
              </li>  
              <li class='nav-item'>
                <a class='nav-link' href='/terms&policy'>
                  Terms & Policy
                </a>
              </li>
              <li class='nav-item'>
                <a class='nav-link' href='/contact-us'>
                  Contact Us
                </a>
              </li>
              <li class='nav-item'>
                <a
                  class='nav-link disabled'
                  href='javscript:void(0)'
                  tabindex='-1'
                  aria-disabled='true'
                >
                  Cadinov Tours ⓒ 2022
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
