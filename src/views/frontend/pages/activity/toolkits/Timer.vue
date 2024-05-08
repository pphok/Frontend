<!-- <script setup>
import { ref, computed, onUnmounted } from 'vue';

const time = ref(0);
const interval = ref(null);
const isRunning = ref(false);
const isPaused = ref(false);
const timeInput = ref('');
const timeHours = ref('00');
const timeMinutes = ref('00');
const timeSeconds = ref('00');

const formattedTime = computed(() => {
    const hours = Math.floor(time.value / 3600);
    const minutes = Math.floor((time.value % 3600) / 60);
    const seconds = time.value % 60;
    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    timeInput.value = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
});

const setTime = () => {
    if (timeInput.value > 0) {
        time.value = timeInput.value * 60; // Convert minutes to seconds
    }
};

const start = () => {
    if (!isRunning.value) {
        isRunning.value = true;
        isPaused.value = false;
        interval.value = setInterval(() => {
            if (time.value > 0) {
                time.value--;
            } else {
                clearInterval(interval.value);
                time.value = 0;
            }
        }, 1000);
    }
};

const pause = () => {
    isRunning.value = false;
    isPaused.value = !isPaused.value;
    clearInterval(interval.value);
};

const reset = () => {
    isRunning.value = false;
    isPaused.value = false;
    time.value = 0;
    clearInterval(interval.value);
};

// Validate time input to ensure it's a positive number
const validateTimeInput = () => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    console.log(regex.test(timeHours))
    // if (timeHours.value > 59 || !regex.test(timeHours.value)) {
    //     timeHours.value = '59';
    // }
    // if (timeMinutes.value > 59) {
    //     timeMinutes.value = '59';
    // }
    // if (timeSeconds.value > 59) {
    //     timeSeconds.value = '59';
    // }
};

// Cleanup interval on component unmount
onUnmounted(() => {
    clearInterval(interval.value);
});
</script>

<template>
    <div class="w-full flex justify-content-center align-item center">
        <TimeInput />
        <div>
            <div>
                <InputText class="timer p-3 pr-0" v-model="timeHours" @input="validateTimeInput" max="59" min="0" maxlength="2" type="text" placeholder="hh" />
                <span class="mr-2 font-bold"> h </span>
                <InputText class="timer p-3" v-model="timeMinutes" @input="validateTimeInput" maxlength="2" type="text" placeholder="mn" />
                <span class="mr-2 font-bold"> m </span>
                <InputText class="timer p-3" v-model="timeSeconds" @input="validateTimeInput" maxlength="2" type="text" placeholder="ss" />
                <span class="mr-2 font-bold"> s </span>
            </div>
            <div class="controls mt-2">
                <Button @click="start">Start</Button>
                <Button @click="pause" severity="danger">Pause</Button>
                <Button @click="reset" severity="secondary">Reset</Button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.timer {
    width: 3.6rem;
}
.controls button {
    margin-right: 0.5em;
}
</style> -->

<script>
export default {
    data() {
        return {
            hours: '00',
            minutes: '00',
            seconds: '00',
            error: false,
            errorMessage: '',
            invalidHours: false,
            invalidMinutes: false,
            invalidSeconds: false,
            isRunning: false,
            isPaused: false,
            interval: null,
            time: 0
        };
    },
    methods: {
        clearInput(field) {
            if (this[field] === 0 || this[field] === '00') {
                this[field] = '00';
            }
            this.error = false;
        },
        handleInput(field) {
            let value = parseInt(this[field]);
            if (isNaN(value) || value < 0 || value > 59) {
                this[field] = '00';
                this.error = true;
                switch (field) {
                    case 'hours':
                        this.invalidHours = true;
                        this.errorMessage = 'Invalid hours value';
                        break;
                    case 'minutes':
                        this.invalidMinutes = true;
                        this.errorMessage = 'Invalid minutes value';
                        break;
                    case 'seconds':
                        this.invalidSeconds = true;
                        this.errorMessage = 'Invalid seconds value';
                        break;
                }
            } else {
                switch (field) {
                    case 'hours':
                        this.invalidHours = false;
                        break;
                    case 'minutes':
                        this.invalidMinutes = false;
                        break;
                    case 'seconds':
                        this.invalidSeconds = false;
                        break;
                }
            }
        },
        handleStart() {
            if (!this.isRunning) {
                let hours = parseInt(this['hours']);
                let minutes = parseInt(this['minutes']);
                let seconds = parseInt(this['seconds']);

                if (isNaN(hours)) hours = 0;
                if (isNaN(minutes)) minutes = 0;
                if (isNaN(seconds)) seconds = 0;

                let totalSeconds = hours * 3600 + minutes * 60 + seconds;
                if (totalSeconds <= 0) {
                    this.error = true;
                    this.errorMessage = 'Invalid time value';
                    return;
                }
                this.time = totalSeconds;
                this.isRunning = true;
                this.isPaused = false;
                this.interval = setInterval(() => {
                    if (this.time > 0) {
                        this.time--;
                        let h = Math.floor(this.time / 3600);
                        let m = Math.floor((this.time % 3600) / 60);
                        let s = this.time % 60;
                        this.hours = h != 0 ? (h < 10 ? '0' + h : h) : '00';
                        this.minutes = m != 0 ? (m < 10 ? '0' + m : m) : '00';
                        this.seconds = s != 0 ? (s < 10 ? '0' + s : s) : '00';
                    } else {
                        clearInterval(this.interval);
                        this.isRunning = false;
                        this.time = 0;
                    }
                }, 1000);
            }
        },
        handlePause() {
            this.isRunning = false;
            this.isPaused = !this.isPaused;
            clearInterval(this.interval);
        },
        handleReset() {
            this.isRunning = false;
            this.isPaused = false;
            this.time = 0;
            this.hours = '00';
            this.minutes = '00';
            this.seconds = '00';
            clearInterval(this.interval);
        }
    }
};
</script>

<template>
    <div id="card">
        <div id="time_input">
            <label for="hours">
                <input type="number" id="hours" :style="{ color: seconds < 10 ? 'red' : 'black' }" min="0" :disabled="isRunning" v-model="hours" @focus="clearInput('hours')" @input="handleInput('hours')" :class="{ invalid: invalidHours }" />
                <span class="label lbl-hrs">hours</span>
            </label>
            <span>:</span>
            <label for="minutes">
                <input
                    type="number"
                    id="minutes"
                    :style="{ color: seconds < 10 ? 'red' : 'black' }"
                    min="0"
                    :disabled="isRunning"
                    v-model="minutes"
                    @focus="clearInput('minutes')"
                    @input="handleInput('minutes')"
                    :class="{ invalid: invalidMinutes }"
                />
                <span class="label lbl-min">minutes</span>
            </label>
            <span>:</span>
            <label for="seconds">
                <input
                    type="number"
                    id="seconds"
                    :style="{ color: seconds < 10 ? 'red' : 'black' }"
                    min="0"
                    :disabled="isRunning"
                    v-model="seconds"
                    @focus="clearInput('seconds')"
                    @input="handleInput('seconds')"
                    :class="{ invalid: invalidSeconds }"
                />
                <span class="label lbl-sec">seconds</span>
            </label>
        </div>
        <div class="action-btn mt-2">
            <Button @click="handleStart" class="mr-2">Start</Button>
            <Button @click="handlePause" class="mr-2" severity="danger">Pause</Button>
            <Button @click="handleReset" severity="secondary">Reset</Button>
        </div>
    </div>
</template>

<style scoped>
#time_input {
    border: 2px solid var(--inactive);
    width: fit-content;
    color: #86c288;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
}

.action-btn {
    display: flex;
    align-items: center;
    justify-content: center;
}

input {
    width: 60px;
    height: 60px;
    border: none;
    box-sizing: border-box;
    padding: auto 15px;
    text-align: center;
    color: #132c14;
}

label {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
}

.label {
    font-size: 0.65rem;
    position: absolute;
    top: 4.5px;
}

.label.lbl-hrs {
    left: 20px;
}

.label.lbl-min {
    left: 14px;
}

.label.lbl-sec {
    left: 13px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type='number'] {
    -moz-appearance: textfield;
}

#time_input,
input {
    border-radius: 8px;
    font-size: 1.5rem;
}

input:focus {
    outline: 3px solid var(--active);
}

input:focus + .label {
    color: var(--active);
}

.invalid {
    outline: 3px solid red;
}

#error {
    color: red;
    text-align: center;
    margin-top: 1rem;
}
</style>
