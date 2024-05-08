<script>
export default {
    data() {
        return {
            profileImageUrl: 'default_profile_picture.jpg' // Assuming default image URL
        };
    },
    methods: {
        handleFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.profileImageUrl = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        },
        handleChangePassword() {
            // Add your change password functionality here
            alert('Change password clicked');
        },
        handleLogout() {
            // Add your logout functionality here
            alert('Logout clicked');
        },
        handleImageClick() {
            document.getElementById('file-input').click();
        }
    }
};
</script>
<template>
    <div class="grid">
        <div class="col-12 md:col-6 w-full">
            <div class="card">
                <div class="profile-image-container" @click="handleImageClick">
                    <div class="upper-section">
                        <img :src="profileImageUrl" id="preview-image" class="profile-image" />
                    </div>
                    <div class="lower-section">
                        <span class="bi--camera"></span>
                    </div>
                </div>
                <input type="file" id="file-input" accept="image/*" style="display: none" @change="handleFileChange" />
                <div class="address">
                    <h2>Hi</h2>
                    <p1 style="font-weight: bold">Email:</p1> <a href="">Hello@gmail.com</a>
                </div>
                <div class="btn-container">
                    <button class="btn change-password-btn" @click="handleChangePassword">Change Password</button>
                    <button class="btn logout-btn" @click="handleLogout">Logout</button>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
.card {
    height: calc(100vh - 12rem);
    overflow-y: auto;
    padding: 1rem;
    padding-top: 60px;
}
.address {
    text-align: center;
    padding-top: 5px;
}

.profile-image-container {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto 20px;
    cursor: pointer;
    position: relative;
    display: flex;
    flex-direction: column;
}

.upper-section {
    width: 100%;
    height: 70%;
    background-color: #ccc;
}

.lower-section {
    width: 100%;
    height: 30%;
    background-color: #494949;
    display: flex;
    justify-content: center;
    align-items: center;
}

.profile-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
}

.btn-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 200px;
    margin: 0 auto; /* Center align horizontally */
    align-items: center; /* Center align horizontally */
    padding-top: 20px;
}

.btn {
    border: none;
    padding: 15px 10px;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    width: 100%;
    font-weight: bold;
}

.change-password-btn {
    background-color: #ddd;
    color: black;
}

.change-password-btn:hover {
    background-color: #b6b0b0;
}

.logout-btn {
    background-color: white;
    color: red;
    border: 2px solid red;
}

.logout-btn:hover {
    background-color: #f2f2f2;
}

.bi--camera::after {
    display: inline-block;
    width: 30px;
    height: 30px;
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cg fill='%23fff'%3E%3Cpath d='M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z'/%3E%3Cpath d='M8 11a2.5 2.5 0 1 1 0-5a2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7a3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1 0a.5.5 0 0 1 1 0'/%3E%3C/g%3E%3C/svg%3E");
}
</style>
