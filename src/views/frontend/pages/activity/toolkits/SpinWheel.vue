<script setup>
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
    inputData: String
});
const canvas = ref(null);
const ctx = ref(null);
const winner = ref('NONE');
const inputText = ref(props.inputData);

// Helper functions
const randomColor = () => ({
    r: Math.floor(Math.random() * 255),
    g: Math.floor(Math.random() * 255),
    b: Math.floor(Math.random() * 255)
});

const toRad = (deg) => deg * (Math.PI / 180.0);
const randomRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const easeOutSine = (x) => Math.sin((x * Math.PI) / 2);
const getPercent = (input, min, max) => ((input - min) * 100) / (max - min) / 100;

// Reactive data
const items = ref([]);
const currentDeg = ref(0);
const step = ref(0);
const colors = ref([]);
const itemDegs = ref({});
const winnerDialogShow = ref(false);

// Initialize canvas context
onMounted(() => {
    ctx.value = canvas.value.getContext('2d');
    createWheel();
});

// Watch for changes in inputText and update items
watch(inputText, () => {
    items.value = inputText.value.split('\n').filter((item) => item.trim() !== '');
    if (items.value.length < 3) {
        items.value = [...items.value, ...items.value, ...items.value, ...items.value];
    } else if (items.value.length < 4) {
        items.value = [...items.value, ...items.value, ...items.value];
    }
    step.value = 360 / items.value.length;
    // colors.value = [];
    for (let i = 0; i < items.value.length + 1; i++) {
        colors.value.push(randomColor());
    }
    draw();
});

watch(
    () => props.inputData,
    (newValue) => {
        inputText.value = newValue;
    }
);

const closeWinnerDialog = () => {
    winnerDialogShow.value = false;
};

const createWheel = () => {
    items.value = inputText.value.split('\n').filter((item) => item.trim() !== '');
    if (items.value.length < 4) {
        items.value = [...items.value, ...items.value, ...items.value, ...items.value];
    }
    step.value = 360 / items.value.length;
    // colors.value = [];
    for (let i = 0; i < items.value.length + 1; i++) {
        colors.value.push(randomColor());
    }
    draw();
};

const draw = () => {
    const centerX = canvas.value.width / 2;
    const centerY = canvas.value.height / 2;
    const radius = canvas.value.width / 2;

    ctx.value.beginPath();
    ctx.value.arc(centerX, centerY, radius, toRad(0), toRad(360));
    ctx.value.fillStyle = `rgb(33,33,33)`;
    ctx.value.lineTo(centerX, centerY);
    ctx.value.fill();

    let startDeg = currentDeg.value;
    for (let i = 0; i < items.value.length; i++, startDeg += step.value) {
        let endDeg = startDeg + step.value;
        const color = colors.value[i];
        const colorStyle = `rgb(${color.r},${color.g},${color.b})`;

        ctx.value.beginPath();
        ctx.value.arc(centerX, centerY, radius - 2, toRad(startDeg), toRad(endDeg));
        const colorStyle2 = `rgb(${color.r - 10},${color.g - 10},${color.b - 10})`;
        ctx.value.fillStyle = colorStyle2;
        ctx.value.lineTo(centerX, centerY);
        ctx.value.fill();

        ctx.value.beginPath();
        ctx.value.arc(centerX, centerY, radius - 30, toRad(startDeg), toRad(endDeg));
        ctx.value.fillStyle = colorStyle;
        ctx.value.lineTo(centerX, centerY);
        ctx.value.fill();

        ctx.value.save();
        ctx.value.translate(centerX, centerY);
        ctx.value.rotate(toRad((startDeg + endDeg) / 2));
        ctx.value.textAlign = 'center';
        ctx.value.fillStyle = color.r > 180 || color.g > 180 || color.b > 180 ? '#000' : '#fff';
        ctx.value.font = 'normal 18px Arial';
        if (items.value.length > 30) {
            ctx.value.font = 'normal 12px Arial';
        } else if (items.value.length > 60) {
            ctx.value.font = 'normal 4px Arial';
        }
        const text = items.value[i];
        const maxTextWidth = 140; // Set the maximum width for the text

        // Measure the width of the text
        let textWidth = ctx.value.measureText(text).width;

        // Check if the text exceeds the maximum width
        if (textWidth > maxTextWidth) {
            let truncatedText = text;
            let ellipsisWidth = ctx.value.measureText('...').width;

            // Reduce the text width by removing characters until it fits within the available space
            while (textWidth + ellipsisWidth > maxTextWidth && truncatedText.length > 0) {
                truncatedText = truncatedText.slice(0, -1);
                textWidth = ctx.value.measureText(truncatedText).width;
            }

            // Append ellipsis to the truncated text
            truncatedText += '...';

            // Draw the truncated text
            ctx.value.fillText(truncatedText, 130, 10);
        } else {
            // Draw the original text if it fits within the available space
            ctx.value.fillText(text, 130, 10);
        }
        ctx.value.restore();

        itemDegs.value[items.value[i]] = {
            startDeg: startDeg,
            endDeg: endDeg
        };

        if (startDeg % 360 < 360 && startDeg % 360 > 270 && endDeg % 360 > 0 && endDeg % 360 < 90) {
            winner.value = items.value[i];
        }
    }
};

let speed = 0;
let maxRotation = randomRange(360 * 3, 360 * 6);
let pause = false;

const animate = () => {
    if (pause) {
        winnerDialogShow.value = true;
        return;
    }
    speed = easeOutSine(getPercent(currentDeg.value, maxRotation, 0)) * 20;
    if (speed < 0.01) {
        speed = 0;
        pause = true;
    }
    currentDeg.value += speed;
    draw();
    window.requestAnimationFrame(animate);
};

const spin = () => {
    if (speed !== 0 || !items.value.length) {
        return;
    }

    maxRotation = 0;
    currentDeg.value = 0;
    createWheel();
    draw();

    maxRotation = randomRange(360 * 3, 360 * 6);
    pause = false;
    window.requestAnimationFrame(animate);
};
</script>

<template>
    <div class="full">
        <div class="header">
            <Dialog header="Dialog" v-model:visible="winnerDialogShow" :breakpoints="{ '960px': '75vw' }" :style="{ width: '30vw' }" :modal="true">
                <p class="line-height-3 m-0">
                    {{ winner }}
                </p>
                <template #footer>
                    <Button label="Ok" @click="closeWinnerDialog" icon="pi pi-check" class="p-button-outlined main-button" />
                </template>
            </Dialog>
        </div>
        <div class="wheel" @click="spin">
            <canvas ref="canvas" width="400" height="400"></canvas>
            <div class="center-circle">
                <div class="triangle"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.header h1,
p {
    text-align: center;
}

.wheel {
    margin-top: 40px;
    display: flex;
    justify-content: center;
    position: relative;
}

.center-circle {
    width: 100px;
    height: 100px;
    border-radius: 60px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-family: Arial, Helvetica, sans-serif;
}

.triangle {
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 30px solid black;
    position: absolute;
    top: 50%;
    right: -160%;
    transform: translateY(-50%);
    z-index: 99;
}
.triangle:before {
    content: '';
    width: 0;
    height: 0;
    border-top: 7px solid transparent; /* Slightly larger than the original triangle */
    border-bottom: 7px solid transparent;
    border-right: 28px solid #11b981; /* Slightly larger and black */
    position: absolute;
    top: -1px; /* Adjust position to align with the original triangle */
    right: -161%; /* Adjust position to align with the original triangle */
    transform: translate(103%, -45%);
    z-index: 1;
}

textarea {
    background-color: rgba(20, 20, 20, 0.2);
    caret-color: #fff;
    resize: none;
    color: #fff;
}

.inputArea {
    display: flex;
    justify-content: center;
    margin-top: 40px;
}
</style>
