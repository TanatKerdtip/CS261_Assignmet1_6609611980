function submitLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    const loginBox = document.getElementById('loginBox');

    if (!username || !password) {
        errorMessage.textContent = "Please fill out both username and password.";
        errorMessage.style.color = "red";
        loginBox.style.display = "none";
        return;
    }
    if (username.length !== 10) {
        errorMessage.textContent = 'Username must have 10 digits.';
        loginBox.style.display = "none";
        return;
    } else {
        errorMessage.textContent = ""; 
    }

    const requestBody = {
        UserName: username,
        PassWord: password
    };

    fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Application-Key": "TU18bbfe2d383671b26b42e604126ea4e2d0404a5e07f4250751ea4f3454c854184847e14ac8099c336ff47391e956d147", 
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        if (data.status) {
            loginBox.innerHTML = `
                <p><strong>Name (EN):</strong> ${data.displayname_en}</p>
                <p><strong>ชื่อ (ภาษาไทย):</strong> ${data.displayname_th}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Faculty:</strong> ${data.faculty}</p>
                <p><strong>Department:</strong> ${data.department}</p>
                <p><strong>StudentID:</strong> ${data.username}</p>
                <button id="closeBtn" class="close-btn" onclick="closeLoginBox()">Close</button>
            `;
        } else {
            loginBox.innerHTML =  `
            <p><strong>Login failed: </strong>${data.message}</p>
            <p>${data.Description}</p>
            <button id="closeBtn" class="close-btn" onclick="closeLoginBox()">Close</button>;
        `
        }

        loginBox.style.display = "block"; 
    })
    .catch(error => {
        console.error('Error:', error);
        loginBox.innerHTML = `<p><strong>Login Failed: </strong>${error.message}</p>;`;
        loginBox.style.display = "block";
    });
}

function closeLoginBox() {
    document.getElementById('loginBox').style.display = 'none';
}

