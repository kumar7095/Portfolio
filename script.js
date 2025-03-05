document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const sidebar = document.getElementById("sidebar");
  const closeSidebarButton = document.getElementById("close-sidebar"); // Close button
  const sidebarLinks = document.querySelectorAll("#sidebar .nav-links a");
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;
  const contactForm = document.getElementById("contact-form");

  // Function to open the sidebar
  function openSidebar() {
      sidebar.classList.add("active");
  }

  // Function to close the sidebar
  function closeSidebar() {
      sidebar.classList.remove("active");
  }

  // Open sidebar when hamburger is clicked
  hamburger.addEventListener("click", openSidebar);

  // Close sidebar when close button (×) is clicked
  closeSidebarButton.addEventListener("click", closeSidebar);

  // Close sidebar when clicking outside
  document.addEventListener("click", function (event) {
      if (!sidebar.contains(event.target) && !hamburger.contains(event.target)) {
          closeSidebar();
      }
  });

  // Close sidebar when a link is clicked
  sidebarLinks.forEach(function (link) {
      link.addEventListener("click", closeSidebar);
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll("nav .nav-links a").forEach(anchor => {
      anchor.addEventListener("click", function (e) {
          e.preventDefault();
          const targetId = this.getAttribute("href");
          const targetElement = document.querySelector(targetId);

          if (targetElement) {
              targetElement.scrollIntoView({ behavior: "smooth" });
              closeSidebar(); // Close sidebar after clicking a link
          }
      });
  });

  // Theme Toggle Functionality
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
      body.classList.add(savedTheme);
      updateThemeUI(savedTheme);
  }

  themeToggle?.addEventListener("click", () => {
      body.classList.toggle("dark-theme");
      const isDarkTheme = body.classList.contains("dark-theme");
      localStorage.setItem("theme", isDarkTheme ? "dark-theme" : "");
      updateThemeUI(isDarkTheme ? "dark-theme" : "");
  });

  // Helper function to update theme UI
  function updateThemeUI(theme) {
      const icon = theme === "dark-theme" ? "fa-sun" : "fa-moon";
      const tooltipText = theme === "dark-theme" ? "Light Mode" : "Dark Mode";

      if (themeToggle) {
          themeToggle.innerHTML = `<i class="fas ${icon}"></i><span class="tooltip">${tooltipText}</span>`;
      }
  }

  // Contact Form Submission Handling
  contactForm?.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Thank you for reaching out! I will get back to you soon.");
      this.reset();
  });
});
