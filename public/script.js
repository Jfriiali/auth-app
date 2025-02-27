const API_URL = "http://localhost:5000/api/auth";

function login() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            localStorage.setItem("token", data.token);
            alert("ورود موفقیت‌آمیز بود!");
            window.location.href = "profile.html"; // هدایت به صفحه پروفایل
        } else {
            alert(data.message);
        }
    })
    .catch(error => console.error("Error:", error));
}

function goToProfile() {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("لطفاً ابتدا وارد شوید!");
    } else {
        window.location.href = "profile.html";
    }
}

function logout() {
    localStorage.removeItem("token");
    alert("شما از حساب خود خارج شدید!");
    window.location.href = "index.html";
}
