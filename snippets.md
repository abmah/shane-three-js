/\*\*

- Camera Animation based on Scroll Percentage with Easing
  \*/

let targetPos = { x: -2.1, y: .77, z: .5 };
let targetRotation = { x: 0, y: Math.PI / 2, z: 0 };
let targetPos2 = { x: -36.1, y: .77, z: .5 };

gsap.registerPlugin(ScrollTrigger);

// Store the initial position of the camera
const initialCameraPosition = {
x: camera.position.x,
y: camera.position.y,
z: camera.position.z,
};

// Create a GSAP timeline for the first animation
const timeline1 = gsap.timeline({
scrollTrigger: {
trigger: ".trig02",
start: "top center",
end: "bottom center",
markers: true,
scrub: 3,
},
});

timeline1.to(camera.position, {
x: targetPos.x,
y: targetPos.y,
z: targetPos.z,
ease: 'power2.inOut',
});

// Calculate adjusted target position for the second animation
const targetPos2Adjusted = {
x: targetPos2.x - initialCameraPosition.x,
y: targetPos2.y - initialCameraPosition.y,
z: targetPos2.z - initialCameraPosition.z,
};

// Create a GSAP timeline for the second animation
const timeline2 = gsap.timeline({
scrollTrigger: {
trigger: ".trig03",
start: "top center",
end: "bottom center",
markers: true,
scrub: 3,
},
});

timeline2.to(cameraGroup.position, {
x: initialCameraPosition.x + targetPos2Adjusted.x,
y: initialCameraPosition.y + targetPos2Adjusted.y,
z: initialCameraPosition.z + targetPos2Adjusted.z,
ease: 'power2.inOut',
});

// html

        <div class="landing-page-container">

            <section class="hero-section">

                <h1 class="hero-title">
                    <span>Crypto Finance</span>
                </h1>
                <h1 class="hero-title hero-title-second">
                    <span>Redefined</span>
                </h1>


                <div class="hero-subtitle">
                    <p>
                        <span class="hero-sub-1"> A New Era For Crypto Finance</span>
                    </p>
                    <p>
                        <span class="hero-sub-2"> Fuelled By Truth, Trust and</span>
                    </p>
                    <p>
                        <span class="hero-sub-3"> Transparency Has Arrived</span>
                    </p>
                </div>


                <button onclick="showEmailInput()" class="btn btn-primary">
                    Join Waitlist
                </button>

            </section>


        </div>

        <!-- <div class="bottom-blur"></div> -->

        <div class="marquee-container">
            <img src="images/REVIVE.svg" class="logo-overlay" alt="overlay">
        </div>





        <div class="cards-wrapper">

            <div class="card  card-1">
                <div class="card-border"></div>
                <div class="card-content">
                    <div class="card-logo-and-title">
                        <img src="images/truth.svg" alt="truth">
                        <p class="card-title">Truth</p>
                    </div>

                    <p class="card-text">
                        We are committed to<strong class="card-text-strong"> unwavering integrity </strong> and <strong
                            class="card-text-strong">ethical
                            decision-making </strong>in all aspects of our
                        business.
                    </p>
                    <button onclick="showEmailInput()" class="btn">Learn More</button>
                    <div class="card-background-container">
                        <img class="card-background" src="images/truth-card-background.svg" alt="card-background">
                    </div>
                </div>
            </div>

            <div class="card card-2">
                <div class="card-border"></div>
                <div class="card-content">
                    <div class="card-logo-and-title">
                        <img src="images/trust.svg" alt="truth">
                        <p class="card-title">Trust</p>
                    </div>

                    <p class="card-text">
                        We believe that <strong class="card-text-strong">competent leadership </strong>and <strong
                            class="card-text-strong">clear-cut accountability </strong>are essential for every leader.
                    </p>
                    <button onclick="showEmailInput()" class="btn">Learn More</button>
                    <div class="card-background-container">
                        <img class="card-background" src="images/trust-card-background.svg" alt="card-background">
                    </div>
                </div>
            </div>

            <div class="card card-1">
                <div class="card-border"></div>
                <div class="card-content">
                    <div class="card-logo-and-title">
                        <img src="images/transparency.svg" alt="truth">
                        <p class="card-title">Transparency</p>
                    </div>

                    <p class="card-text">
                        It is our belief that
                        <strong class="card-text-strong"> proven governance </strong>and
                        <strong class="card-text-strong"> verifiable compliance</strong> are
                        critical to the success of
                        our business.
                    </p>
                    <button onclick="showEmailInput()" class="btn">Learn More</button>
                    <div class="card-background-container">
                        <img class="card-background" src="images/transparency-card-background.svg"
                            alt="card-background">
                    </div>
                </div>
            </div>
        </div>

        <div class="about-card ">
            <img class="close-button" src="images/x.svg" alt="x" onclick="hideAboutCard()">

            <img class="rocket" src="images/rocket.svg" alt="rocket">
            <p class="about-text ">
                <span class="about-text-0">Our mission is to forge a new era for the Crypto</span>
            </p>


            <p class="about-text ">
                <span class="about-text-1"> Finance industry, fuelled by truth, trust and</span>
            </p>
            <p class="about-text">
                <span class="about-text-2">transparency. It is no secret that the catastrophic</span>
            </p>
            <p class="about-text">
                <span class="about-text-3">failures of FTX, Celsius, Voyager, BlockFi and others</span>
            </p>
            <p class="about-text">
                <span class="about-text-4">left the credibility of the Crypto Finance industry in</span>
            </p>
            <p class="about-text">
                <span class="about-text-5">tatters.</span>
            </p>
            <br>
            <p class="about-text">
                <span class="about-text-6"> However, we strongly believe it is possible to recover</span>
            </p>
            <p class="about-text">
                <span class="about-text-7">from this setback, regaining customer trust by</span>
            </p>
            <p class="about-text">
                <span class="about-text-8">having truth and transparency as the new standard of </span>
            </p>
            <p class="about-text">
                <span class="about-text-9"> operation.</span>
            </p>

            </p>
        </div>



        <div class="lower-page">
            <img class="page-lines" src="images/lines.svg" alt="">
        </div>


        <div class="email-container hidden">
            <div class="email-input-success">
                <img src='images/x.svg' alt='x' onclick='hideEmailInput()' class='x-icon'>
                <p class='email-submit-message'>Thanks. We will be in touch as soon as our product is ready for beta
                    testing.</p>
            </div>
            <img src="images/x.svg" alt="x" onclick="hideEmailInput()" class="x-icon">
            <p class="email-input-header">Enter your email below to join our waitlist and be one of the first to gain
                access to our mobile app beta program.</p>
            <input id="email-input" class="email-input" placeholder="Enter Your Email" type="text">
            <div class="message-container">
                <p class="message"></p>
            </div>
            <button onclick="sendEmail()" class="sub-btn btn">Submit</button>
        </div>


        <!-- <div class="footer">
            <p>Revive Finance Ltd. &#x2022 1309 Coffen Avenue, Suite 8704, Sheridan, Wyoming 82801 &#x2022 Phone (307)
                381
                6553</p>
        </div> -->
