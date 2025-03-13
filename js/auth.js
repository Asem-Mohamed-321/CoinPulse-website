  // save to local storage
  const saveUsers = (users) => {
    localStorage.setItem('users', JSON.stringify(users))
  }

  // fetch users from local
  const loadUsers = () => {
    return JSON.parse(localStorage.getItem('users')) || []
  }


  
  
  export const signUp = (name, email, password) => {
    const users = loadUsers()
  
    // Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/
  
    if (!emailRegex.test(email)) {
      showInline('Invalid email format. Please enter a valid email address.', 'danger', 'signup')
      return
    }
  
    if (!passwordRegex.test(password)) {
      showInline('Password must be at least 8 characters, include one uppercase letter and one number.', 'danger', 'signup')
      return
    }
  
    // check if  already exists
    if (users.some(user => user.email === email)) {
      showInline('User already exists. Please log in!', 'danger', 'signup')
      return
    }
  
  
    
    
    // save new user to localStorage
    const newUser = { name, email, password, watchList: [] }
    users.push(newUser)
    saveUsers(users)
  
    
    
    
    // Automatic log in
    sessionStorage.setItem('loggedInUser', JSON.stringify(newUser))
    //showInline('Sign up successful! You are now logged in.', 'success', 'signup')
    showMsg('Sign up successful! You are now logged in.', 'success',)
    
    
    updateNavbar(newUser.name)


  
    
    
    
    // Hide the form automatic
    const authModal = bootstrap.Modal.getInstance(document.getElementById('authModal'))
    if (authModal) {
      authModal.hide()
    }
  }



  
  const logIn = (email, password) => {
    const users = loadUsers()
    const user = users.find(user => user.email === email && user.password === password)
    
    if (user) {
      sessionStorage.setItem('loggedInUser', JSON.stringify(user))
      
      //showInline(`Welcome back, ${user.name}!`, 'success', 'login')
      showMsg(`Welcome back, ${user.name}!`, 'success')
      
      updateNavbar(user.name)
  
      // Hide the form automatic
      const authModal = bootstrap.Modal.getInstance(document.getElementById('authModal'))
      if (authModal) {
        authModal.hide()
      }
      controlAddCoinsButton()
    } else {
      showInline('Invalid email or password', 'danger', 'login')
    }
  }




  // Show message func
  const showMsg = (message, color) => {
    const messageDiv = document.createElement('div')
    messageDiv.className = `alert alert-${color} text-center`
    messageDiv.innerText = message
  
    const container = document.querySelector('.backgroundcontainer')
    container.prepend(messageDiv)
  
    setTimeout(() => messageDiv.remove(),700)
  }






  
  const showInline = (message, color, section) => {
    const form = document.querySelector(`#${section}`)
    if (form) {
      const old = form.querySelector('.inline-message')
      if (old) {
        old.remove()
      }
  
      const messageDiv = document.createElement('div')
      messageDiv.className = `inline-message alert alert-${color} text-center`
      messageDiv.innerHTML = message
  
      form.prepend(messageDiv)
  
      setTimeout(() => messageDiv.remove(), 3000)
    }
  }
  

  





  const logOut = () => {
    sessionStorage.removeItem('loggedInUser')
    alert('Logged out')
    resetNavbar()
    controlAddCoinsButton()
  }
////////////////////////////////////



// update nav with user's name
  const updateNavbar = (name) => {
    const loginLink = document.getElementById('loginLink')
    if (loginLink) {
        loginLink.innerHTML = `${name} | <a href="#" id="logoutLink" class="nav-link d-inline">Log Out</a>`
        loginLink.href = '#'
        
        document.getElementById('logoutLink').addEventListener('click', logOut)
    }
  }



  const resetNavbar = () => {
    const loginLink = document.getElementById('loginLink')
    if (loginLink) {
        loginLink.innerHTML = 'Log In'
        loginLink.href = '#'
    }
  }




  const protectRoute = (event) => {
    const sessionUser = sessionStorage.getItem('loggedInUser')
    if (!sessionUser) {
        event.preventDefault()
        const loginModal = new bootstrap.Modal(document.getElementById('authModal'))
        loginModal.show()
    }
  }




// check logged in user session
  const checkSession = () => {
    const sessionUser = sessionStorage.getItem('loggedInUser')
    if (sessionUser) {
        const user = JSON.parse(sessionUser)
        updateNavbar(user.name)
        return true
    }
    else return false
  }







  document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.querySelector('#signup form')
    const loginForm = document.querySelector('#login form')
    const watchlistLink = document.getElementById('watchlistLink')

    if (watchlistLink) {
        watchlistLink.addEventListener('click', protectRoute)
    }

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const name = document.getElementById('signupName').value
        const email = document.getElementById('signupEmail').value
        const password = document.getElementById('signupPassword').value
        signUp(name, email, password)
        signupForm.reset()
    })

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const email = document.getElementById('loginEmail').value
        const password = document.getElementById('loginPassword').value
        logIn(email, password)
        loginForm.reset()
    })

    checkSession()
  })



  const controlAddCoinsButton = () => {
    const addCoinsButton = document.getElementById('addCoin')
    const sessionUser = sessionStorage.getItem('loggedInUser')
  
    if (addCoinsButton) {
      addCoinsButton.replaceWith(addCoinsButton.cloneNode(true))
      const newAddCoinsButton = document.getElementById('addCoin')
  
      if (sessionUser) {
        newAddCoinsButton.disabled = false
        newAddCoinsButton.addEventListener('click', () => {
          const addCoinModal = new bootstrap.Modal(document.getElementById('addCoinModal'))
          addCoinModal.show()
        })
      } else {
        newAddCoinsButton.disabled = false
        newAddCoinsButton.addEventListener('click', () => {
          showMsg('Please log in to add coins to your watchlist.',"danger")
        })
      }
    }
  }
  





  

  document.addEventListener('DOMContentLoaded', controlAddCoinsButton)




