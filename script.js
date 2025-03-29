document.addEventListener("DOMContentLoaded", function () {
    // Open & Close Login Modal
    document.getElementById("openLoginModal")?.addEventListener("click", function () {
        document.getElementById("authModal").style.display = "block";
    });

    document.querySelector(".close")?.addEventListener("click", function () {
        document.getElementById("authModal").style.display = "none";
    });

    // Handle Login & Signup Tabs
    window.openTab = function (tab) {
        document.getElementById("loginTab").style.display = tab === "login" ? "block" : "none";
        document.getElementById("signupTab").style.display = tab === "signup" ? "block" : "none";
    };

    // Signup Function
    window.signup = function () {
        let email = document.getElementById("signupEmail").value.trim();
        let password = document.getElementById("signupPassword").value.trim();

        if (!email || !password) {
            alert("Please fill in all fields.");
            return;
        }

        if (localStorage.getItem(email)) {
            alert("User already exists!");
            return;
        }

        localStorage.setItem(email, JSON.stringify({ password, profile: {} }));
        alert("Signup successful! You can now log in.");
    };

    // Login Function
    window.login = function () {
        let email = document.getElementById("loginEmail").value.trim();
        let password = document.getElementById("loginPassword").value.trim();

        if (!email || !password) {
            alert("Please enter both email and password.");
            return;
        }

        let storedUser = JSON.parse(localStorage.getItem(email));

        if (storedUser && storedUser.password === password) {
            alert("Login successful!");
            localStorage.setItem("loggedInUser", email);
            window.location.href = "services.html";
        } else {
            alert("Invalid credentials.");
        }
    };

    // Logout Function
    window.logout = function () {
        localStorage.removeItem("loggedInUser");
        alert("Logged out successfully!");
        window.location.href = "index.html"; // Redirect to home/login page
    };

    // Sidebar Toggle
    window.toggleMenu = function () {
        let sidebar = document.getElementById("sidebar");
        let mainContent = document.querySelector(".main-content");

        sidebar.classList.toggle("open");
        mainContent.style.marginLeft = sidebar.classList.contains("open") ? "250px" : "0";
    };

    // Night Mode Toggle with Persistence
    document.getElementById("nightModeToggle")?.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("nightMode", document.body.classList.contains("dark-mode"));
    });

    // Apply Night Mode on Load
    if (localStorage.getItem("nightMode") === "true") {
        document.body.classList.add("dark-mode");
    }

    // Load User Profile Data
    function loadUserProfile() {
        let email = localStorage.getItem("loggedInUser");
        if (!email) return;

        let userData = JSON.parse(localStorage.getItem(email))?.profile || {};

        document.getElementById("username")?.setAttribute("value", userData.name || "");
        document.getElementById("email")?.setAttribute("value", email);
        document.getElementById("phone")?.setAttribute("value", userData.phone || "");
        document.getElementById("address")?.setAttribute("value", userData.address || "");

        let savedPic = localStorage.getItem(email + "_profilePic");
        if (savedPic) {
            document.getElementById("profilePic").src = savedPic;
        }
    }

    // Save User Profile Data
    document.getElementById("profileForm")?.addEventListener("submit", function (event) {
        event.preventDefault();

        let email = localStorage.getItem("loggedInUser");
        if (!email) {
            alert("No user logged in!");
            return;
        }

        let userData = {
            name: document.getElementById("username").value,
            phone: document.getElementById("phone").value,
            address: document.getElementById("address").value
        };

        let storedUser = JSON.parse(localStorage.getItem(email)) || {};
        storedUser.profile = userData;
        localStorage.setItem(email, JSON.stringify(storedUser));

        alert("Profile updated successfully!");
    });

    // Upload Profile Picture
    document.getElementById("uploadPic")?.addEventListener("change", function (event) {
        let file = event.target.files[0];
        if (file) {
            let reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById("profilePic").src = e.target.result;
                let email = localStorage.getItem("loggedInUser");
                localStorage.setItem(email + "_profilePic", e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    // Auto-load profile when on profile page
    if (document.getElementById("profileForm")) {
        loadUserProfile();
    }
});
// Toggle Sidebar menu
function toggleMenu() {
    document.getElementById('sidebar').classList.toggle('open');
}

// Switch between profile tabs
function openTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');

    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => button.classList.remove('active'));
    document.querySelector(`.tab-btn:contains(${tabName})`).classList.add('active');
}
