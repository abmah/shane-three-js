let menu = document.getElementsByClassName("menu-list")[0];
const emailInput = document.getElementById("email-input");
const messageContainer = document.querySelector(".message");
const emailContainer = document.querySelector(".email-container");
let aboutcard = document.querySelector('.about-card');
const successMessage = document.querySelector(".email-input-success");
let initalEmailInput = document.querySelector('.inital-email-submit-input')


// Toggle menu button actions
let buttonToggle = () => {
  const button = document.getElementById("menu-button").classList;
  const isopened = "is-opened";
  let isOpen = button.contains(isopened);

  if (isOpen) {
    button.remove(isopened);

  } else {
    button.add(isopened);
  }

  menu.style.transform = isOpen ? "translateX(-100%)" : "translateX(0)";
};




// Show email input
function showEmailInput() {
  emailContainer.classList.remove("hidden");
  aboutcard.classList.remove('about-shown')
  emailContainer.focus();
}

// Hide email input
function hideEmailInput() {
  emailContainer.classList.add('hidden');
}


// about card
function showAboutCard() {
  aboutcard.classList.add('about-shown')
}

function hideAboutCard() {
  aboutcard.classList.remove('about-shown')
}




// Validate email format
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Send email on Enter key press
emailInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    sendEmail();
  }
});

// Send email function
function sendEmail() {
  const emailValue = emailInput.value.trim();

  if (!validateEmail(emailValue)) {
    messageContainer.textContent = 'Invalid email address';

    setTimeout(() => {
      messageContainer.textContent = "";
    }, 1000);
    return;
  }

  emailjs.init("dc8p-2hU5RtbKnhsI");
  var templateParams = {
    message: emailValue
  };

  messageContainer.textContent = 'Sending...';

  emailjs.send('service_thj6cx5', 'template_9rcg8sk', templateParams)
    .then(function (response) {
      successMessage.style.display = "block";
      messageContainer.innerHTML = 'Email sent successfully';
      console.log('SUCCESS!', response.status, response.text);
      emailInput.value = "";
      initalEmailInput.style.display = "none";
      setTimeout(() => {
        emailContainer.classList.add('hidden');
      }, 3000);
    })
    .catch(function (error) {
      messageContainer.textContent = 'Something Went Wrong';
      setTimeout(() => {
        messageContainer.textContent = "";
      }, 1000);
      console.log('FAILED...', error);
      emailInput.value = "";
    });
}


window.showEmailInput = showEmailInput;
window.hideEmailInput = hideEmailInput;
window.showAboutCard = showAboutCard;
window.hideAboutCard = hideAboutCard;
window.sendEmail = sendEmail;
window.flipDigits = flipDigits;


function pad(num, size) {
  return num.toString().padStart(size, '0');
}

function flipDigits(num) {
  const digits = document.querySelectorAll('.digit');
  digits.forEach((digit, index) => {
    const current = digit.querySelector('.current');
    const chars = pad(num, digits.length);
    digit.dataset.digitFrom = current.textContent;
    digit.dataset.digitTo = chars[index];
    current.dataset.digitFrom = current.textContent;
    current.dataset.digitTo = chars[index];
    current.textContent = chars[index];
    digit.classList.toggle('flip', digit.dataset.digitFrom !== current.textContent);
  });
}

function init() {
  const digits = document.querySelectorAll('.digit');
  digits.forEach((digit) => {
    const current = digit.querySelector('.current');
    current.addEventListener('animationend', () => {
      digit.classList.remove('flip');
    });
  });

}
init();


