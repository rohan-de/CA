function showNotification() {
  const notificationbar = document.getElementById('notificationbar');
  notificationbar.classList.add('visible');
}
// Function to hide the notification with animation
function hideNotification() {
  const notificationbar = document.getElementById('notificationbar');
  notificationbar.classList.remove('visible');
}

// Show the notification when the page loads
window.onload = function () {
  setTimeout(showNotification, 200); // Delay the appearance slightly for better effect
};
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

//articleSection & Imagesection
window.addEventListener('load', () => {
  const textSection = document.querySelector('.articlesection');
  const imageSection = document.querySelector('.Image-section');

  textSection.classList.add('show');

  // Delay image appearance after text
  setTimeout(() => {
    imageSection.classList.add('show');
  }, 400); // 0.6s delay
});

function toggleButtonColor(button) {
  button.classList.toggle('clicked');
}

AOS.init({
  duration:1000, 
  once:true
});


// AOS.init({
//     duration: 1000, // Animation speed (1 second)
//     once: true      // Whether animation should happen only once - while scrolling down
//   });