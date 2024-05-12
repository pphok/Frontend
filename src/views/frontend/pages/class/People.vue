<script setup>
import { ref } from 'vue';

const title = 'Class Code';
const copyTextValue = ref('#####');
const isInputReadOnly = ref(true);
const students = ref([
    {
        name: 'Alice Johnson',
        email: 'alicejohnson@example.com',
        profileImage: 'path_to_profile_image.jpg'
    },
    {
        name: 'Alice Johnson',
        email: 'alicejohnson@example.com',
        profileImage: 'path_to_profile_image.jpg'
    }
    // Add more student objects as needed
]);
const peopleMenu = ref([]);

const overlayPeopleMenuItems = ref([
    {
        label: 'Change Role',
        icon: 'fas fa-user',
        command: () => {}
    },
    {
        label: 'Remove',
        icon: 'fas fa-trash',
        command: () => {}
    }
]);

const togglePeopleMenu = (event, index) => {
    peopleMenu.value[index].toggle(event);
};

const copyText = () => {
    const copyText = document.querySelector('.copy-input');
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand('copy');
    alert('Copied the text: ' + copyText.value);
};

const updateLength = (event) => {
    console.log(event);
};

const search = () => {
    // Handle search
};
</script>

<template>
    <div class="grid grid-nogutter">
        <div class="col-9 search-grid w-full" style="border-right: 1px solid #ddd">
            <div class="search-container">
                <input type="text" placeholder="Invite people by email" class="search-input" @input="updateLength" />
                <button @click="search" class="search-button">Search</button>
            </div>
            <br />
            <div class="studentinfo">
                <div class="number_student">
                    <h4>{{ students.length }} Students</h4>
                    <hr class="divider1" />
                </div>
                <div id="app" class="scrollable-container">
                    <div v-for="(student, index) in students" :key="index" class="profile-box p-3">
                        <div class="profile-info">
                            <!-- <div class="profile-image">
                                <img :src="student.profileImage" />
                            </div>
                            <div class="profile-details-name">
                                <p>{{ student.name }}</p>
                            </div> -->
                            <Avatar :image="`https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1`" shape="circle" />
                            <span class="font-bold ml-2">{{ student.name }}</span>
                        </div>
                        <div class="profile-details-email">
                            <a :href="'mailto:' + student.email" class="profile-details-email" style="color: #2281b6">{{ student.email }}</a>
                        </div>
                        <div class="options pr-3">
                            <div style="text-align: end">
                                <Menu ref="peopleMenu" :model="overlayPeopleMenuItems" :popup="true" />
                                <button type="button" @click="(e) => togglePeopleMenu(e, index)" class="p-link">
                                    <i class="pi pi-ellipsis-v"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-3">
            <div>
                <div class="card">
                    <p>{{ title }}</p>
                    <!-- Input field container -->
                    <div class="input-container">
                        <!-- Input field to copy from -->
                        <div class="copy-input-container">
                            <input type="text" class="copy-input" v-model="copyTextValue" :readonly="isInputReadOnly" />
                            <!-- Icon to copy -->
                            <span class="fluent--copy-16-regular copy-icon" @click="copyText"></span>
                        </div>
                        <!-- Buttons -->
                        <div class="buttons-container">
                            <button class="custom-button button1"><span class="system-uicons--reset"></span> Reset</button>
                            <button class="custom-button button2">Turn Off</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.scrollable-container {
    height: calc(100vh - 27rem);
    overflow: auto;
}
.container {
    display: flex;
    gap: 20px;
}
.remove {
    color: red;
}

.search-grid,
.card-grid {
    flex: 1;
}

.search-container {
    display: flex;
    align-items: center;
}

.search-input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 15px;
    margin-right: 8px;
    background-color: #f1f1f1;
}

.search-button {
    padding: 10px 25px;
    margin-left: 10px;
    margin-right: 20px;
    background-color: #1ebbd7;
    color: white;
    border: none;
    border-radius: 30px;
    cursor: pointer;
}

.divider2 {
    width: 1px;
    background-color: #ccc;
    margin-right: -700px; /* Removed */
}
.divider {
    width: 1px;
    background-color: #ccc;
}

.card-container {
    display: flex;
    justify-content: flex-end;
}

.card {
    width: 200px;
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.copy-input-container {
    position: relative;
}

.copy-input {
    width: calc(100% - 30px);
    padding: 8px 30px 8px 10px;
    margin-bottom: 16px;
    border: 1px solid #ccc;
    border-radius: 6px;
    box-sizing: border-box;
    font-size: 16px;
    background-color: #f1f1f1;
    width: 160px;
}

.copy-icon {
    position: absolute;
    right: 10px; /* Adjust the distance from the right edge */
    top: 35%;
    transform: translateY(-50%);
    cursor: pointer;
    z-index: 1;
}

.fluent--copy-16-regular::after {
    display: inline-block;
    width: 20px;
    height: 20px;
    vertical-align: middle;
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='black' d='M4 4.085V10.5a2.5 2.5 0 0 0 2.336 2.495L6.5 13h4.414A1.5 1.5 0 0 1 9.5 14H6a3 3 0 0 1-3-3V5.5a1.5 1.5 0 0 1 1-1.415M11.5 2A1.5 1.5 0 0 1 13 3.5v7a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 5 10.5v-7A1.5 1.5 0 0 1 6.5 2zm0 1h-5a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.5-.5'/%3E%3C/svg%3E");
    position: absolute;
    right: 5px; /* Adjust the distance from the right edge */
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
}
.custom-button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 160px;
    margin-bottom: 10px;
}

.button1 {
    background-color: white;
    border: 1px solid #1ebbd7;
    color: #1ebbd7;
}

.button2 {
    background-color: white;
    border: 1px solid red;
    color: red;
}

.custom-button:hover {
    opacity: 0.8;
}
.profile-box {
    width: 95%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 8px;
    background-color: FFFFFF;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: 1px solid #ccc; /* Add border around the entire profile box */
    margin-bottom: 10px; /* Add margin bottom to create space between students */
    padding: 1px;
}

.profile-info {
    display: flex;
    align-items: center;
}

.profile-image img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
    background-color: darkgray;
    margin-right: 20px;
    margin-left: 10px;
}

.profile-details p {
    margin: 0;
    font-size: 16px;
}
.dot-space {
    margin-right: 3px;
}

.options {
    position: relative;
}
.profile-details-name {
    margin-right: 200px;
}

.dot {
    width: 5px;
    height: 5px;
    background-color: black;
    border-radius: 50%;
    display: inline-block;
    cursor: pointer;
    margin-left: -20px;
    font-size: 3px;
}

.options-dropdown {
    position: absolute;
    top: 30px;
    right: 10px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    z-index: 1;
}

.options-dropdown ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.options-dropdown li {
    padding: 10px 20px;
    cursor: pointer;
}

.options-dropdown li:hover {
    background-color: #f2f2f2;
}
</style>
