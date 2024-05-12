<script>
export default {
    data() {
        return {
            students: [
                { name: 'Alice', scores: [null, null, null, null] },
                { name: 'Bob', scores: [null, null, null, null] },
                { name: 'Alice', scores: [null, null, null, null] },
                { name: 'Bob', scores: [null, null, null, null] },
                { name: 'Alice', scores: [null, null, null, null] },
                { name: 'Bob', scores: [null, null, null, null] },
                { name: 'Alice', scores: [null, null, null, null] },
                { name: 'Bob', scores: [null, null, null, null] },
                { name: 'Alice', scores: [null, null, null, null] },
                { name: 'Bob', scores: [null, null, null, null] },
                { name: 'Alice', scores: [null, null, null, null] },
                { name: 'Bob', scores: [null, null, null, null] },
                { name: 'Alice', scores: [null, null, null, null] },
                { name: 'Bob', scores: [null, null, null, null] },
                { name: 'Alice', scores: [null, null, null, null] },
                { name: 'Bob', scores: [null, null, null, null] },
                { name: 'Alice', scores: [null, null, null, null] },
                { name: 'Bob', scores: [null, null, null, null] },
                { name: 'Alice', scores: [null, null, null, null] },
                { name: 'Bob', scores: [null, null, null, null] },
                { name: 'Alice', scores: [null, null, null, null] },
                { name: 'Bob', scores: [null, null, null, null] },
                { name: 'Alice', scores: [null, null, null, null] },
                { name: 'Bob', scores: [null, null, null, null] },
                { name: 'Alice', scores: [null, null, null, null] },
                { name: 'Bob', scores: [null, null, null, null] },
                { name: 'Alice', scores: [null, null, null, null] },
                { name: 'Bob', scores: [null, null, null, null] },
                { name: 'Bob', scores: [null, null, null, null] },
                { name: 'Alice', scores: [null, null, null, null] },
                { name: 'Bob', scores: [null, null, null, null] }
                // Add more students as needed
            ],
            assignments: ['Assignment 1', 'Assignment 2', 'Assignment 3', 'Assignment 4']
        };
    },
    methods: {
        handleInput(sIndex, aIndex) {
            // Handle input changes if needed
        }
    }
};
</script>

<template>
    <div class="scrollable-container">
        <table class="score-table">
            <thead class="table-header">
                <tr>
                    <th>Student</th>
                    <th v-for="(assignment, index) in assignments" :key="index">{{ assignment }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(student, sIndex) in students" :key="sIndex">
                    <td>{{ student.name }}</td>
                    <td v-for="(score, aIndex) in student.scores" :key="aIndex" class="editable-cell">
                        <input type="text" v-model="student.scores[aIndex]" class="score-input" @input="handleInput(sIndex, aIndex)" />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<style scoped>
.scrollable-container {
    height: calc(100vh - 18rem);
    overflow-y: auto;
}
.table-header {
    position: sticky;
    top: 0;
    z-index: 10; /* Ensures the header stays above the body */
    background-color: white; /* Optional: Matches the body background */
}
.score-table {
    width: 100%;
    border-collapse: collapse;
    overflow-x: auto; /* Horizontal scrolling */
}

.score-table th,
.score-table td {
    border: 1px solid #ccc;
    padding: 8px;
}

.score-table th {
    background-color: #f2f2f2;
    text-align: left;
}

.score-table td {
    text-align: center;
    cursor: pointer;
}

.editable-cell input {
    width: 100%;
    box-sizing: border-box;
}

.score-input {
    border: none;
    outline: none;
    text-align: center;
}

/* Responsive adjustments */
@media screen and (max-width: 768px) {
    .score-table th,
    .score-table td {
        padding: 6px;
        font-size: 0.9em; /* Reduce font size */
    }
}

@media screen and (max-width: 576px) {
    .score-table th,
    .score-table td {
        padding: 4px;
        font-size: 0.8em; /* Further reduce font size */
    }
}

@media screen and (max-width: 400px) {
    .score-table th,
    .score-table td {
        padding: 2px;
        font-size: 0.7em; /* Further reduce font size */
    }
}
</style>
