window.addEventListener("load", function(){

    //loading navbar html
    document.getElementsByTagName("nav")[0].innerHTML=`
    <div class="container-fluid ">
            <a href="main.html" id="logo"><img src="../images/websiteLogo.PNG"></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                    <a class="nav-link" href="./main.html">Coins</a>
                    <a class="nav-link" href="./converter.html">Converter</a>
                    <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#contactUsModal">Contact Us</a>
                </div>
                <div class="navbar-nav ms-auto me-5 pe-5">
                <a class="nav-link" href="./watchList.html" id="watchlistLink">My Watchlist</a>
                <a class="nav-link" id="loginLink" href="#" data-bs-toggle="modal" data-bs-target="#authModal">Log In</a>
            </div>
            </div>
        </div>
    `

    //loading contactus html
    this.document.getElementById("contactUsModal").innerHTML=`
        <div class="modal-dialog">
    <div class="modal-content">

      <div class="modal-header">
        <h5 class="modal-title" id="contactUsModal">Contact Us</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      
      <div class="modal-body">
      
        <form action="#" method="get">
          <div class="mb-3">
            <label for="contactName" class="form-label">Your Name</label>
            <input type="text" class="form-control" id="contactName" name="name" placeholder="Enter Your Name">
          </div>
          <div class="mb-3">
            <label for="contactEmail" class="form-label">Your Email</label>
            <input type="email" class="form-control" id="contactEmail" name="email" placeholder="Enter Your Email">
          </div>
          <div class="mb-3">
            <label for="contactMessage" class="form-label">Your Message</label>
            <textarea class="form-control" id="contactMessage" name="message" rows="4" placeholder="Enter Your Message"></textarea>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-primary">Send Message</button>
          </div>
        </form>


    </div>

    </div>
    
</div>
    `

    //login popupwindow html 
    this.document.getElementById("authModal").innerHTML=`
    <div class="modal-dialog">
<div class="modal-content p-4 shadow-lg rounded-3">
    <div class="modal-header border-0">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
        <div class="nav nav-tabs justify-content-center" id="authTabs" role="tablist">
            <div class="nav-item me-4" role="presentation">
                <button class="nav-link active fw-bold text-primary" id="login-tab" data-bs-toggle="tab" data-bs-target="#login" type="button" role="tab">
                    Log In
                </button>
            </div>
            <div class="nav-item" role="presentation">
                <button class="nav-link fw-bold text-primary" id="signup-tab" data-bs-toggle="tab" data-bs-target="#signup" type="button" role="tab">
                    Sign Up
                </button>
            </div>
        </div>
        <div class="tab-content mt-4" id="authTabsContent">
            <!-- Log In -->
            <div class="tab-pane fade show active" id="login" role="tabpanel">
                <form>
                    <div class="mb-3">
                        <label for="loginEmail" class="form-label fw-semibold">Email Address</label>
                        <input type="email" class="form-control rounded-2" id="loginEmail" placeholder="Enter your email...">
                    </div>
                    <div class="mb-3">
                        <label for="loginPassword" class="form-label fw-semibold">Password</label>
                        <input type="password" class="form-control rounded-2" id="loginPassword" placeholder="Enter your password...">
                    </div>
                    <button type="submit" class="btn btn-primary w-100 py-2">Log In</button>
                </form>
            </div>
            <!-- Sign Up -->
            <div class="tab-pane fade" id="signup" role="tabpanel">
                <form>
                    <div class="mb-3">
                        <label for="signupName" class="form-label fw-semibold">Full Name</label>
                        <input type="text" class="form-control rounded-2" id="signupName" placeholder="Enter your full name...">
                    </div>
                    <div class="mb-3">
                        <label for="signupEmail" class="form-label fw-semibold">Email Address</label>
                        <input type="email" class="form-control rounded-2" id="signupEmail" placeholder="Enter your email address...">
                    </div>
                    <div class="mb-3">
                        <label for="signupPassword" class="form-label fw-semibold">Password</label>
                        <input type="password" class="form-control rounded-2" id="signupPassword" placeholder="Create a password...">
                    </div>
                    <button type="submit" class="btn btn-success w-100 py-2">Sign Up</button>
                </form>
            </div>
        </div>
    </div>
</div>
</div>
    `

    //footer HTML
    this.document.getElementsByTagName("footer")[0].innerHTML = `
    <div class="container mx-auto">
            <div class="row align-middle">
                <div class="col-2 offset-0 offset-lg-2 d-block d-lg-none">
                    <h5>CoinPulse.com</h5>
                    <a href="#">Methodology</a>
                    <a href="#">Support(Discord)</a>
                    <a href="#">Our API</a>
                    <br>
                    <h5>LEGALS</h5>
                    <a href="#">Terms of Service</a>
                    <a href="#">Privacy Policy</a>
                </div>
                <div class="col-2 offset-0 offset-lg-2 d-none d-lg-block">
                    <h5>CoinPulse.com</h5>
                    <a href="#">Methodology</a>
                    <a href="#">Support(Discord)</a>
                    <a href="#">Our API</a>
                </div>
                <div class="col-2 d-none d-lg-block">
                    <h5>LEGALS</h5>
                    <a href="#">Terms of Service</a>
                    <a href="#">Privacy Policy</a>
                </div>
                <div class="col-2 offset-2 offset-lg-0">
                    <h5>CONNECT WITH US</h5>
                    <a href="#" id="footer-a">
                        <img src="../images/discord.png" >
                    </a>
                    &nbsp;
                    <a href="#" id="footer-a">
                        <img src="../images/x.png" >
                    </a>
                </div>

                <div class="col-2 offset-2 offset-lg-0">
                    <h5>CoinPulse APP</h5>
                    <a href="#">
                        <img src="../images/g2.png" id="footer-pic1">
                    </a>
                    <br>
                    <a href="#">
                        <img src="../images/app2.png" id="footer-pic2">
                    </a>
                </div>
            </div>
        <br><br>
    </div>
    `
})