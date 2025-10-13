<template>
    <table class="text-white">
        <thead>
            <th>Day</th>
            <th v-for="col in cols">
                {{ col }}
            </th>   
        </thead>
        <tbody>
            <DayRow v-for="day in days" :day="day.name" :activities="day.activities"/>
        </tbody>
    </table>
</template>

<script lang="ts" setup>
import DayRow from '../components/DayRow.vue';

    const days = [{
        name: "Monday",
        activities: {
            "Gym": false,
            "Study": false,
            "Read": false,
            "Code": false,
            "Sleep": false,
            "Eat": false,
            "Walk": false
        }
    },
    {
        name: "Tuesday",
        activities: {
            "Gym": false,
            "Study": false,
            "Read": false,
            "Code": false,
            "Sleep": false,
            "Eat": false,
            "Walk": false
        }
    },
    {
        name: "Wednesday",      
        activities: {
            "Gym": false,
            "Study": false,
            "Read": false,
            "Code": false,
            "Sleep": false,
            "Eat": false,
            "Walk": false
        }
    },
    {
        name: "Thursday",
        activities: {
            "Gym": false,
            "Study": false,
            "Read": false,
            "Code": false,
            "Sleep": false,
            "Eat": false,
            "Walk": false
        }
    },
    {
        name: "Friday",
        activities: {
            "Gym": false,
            "Study": false,
            "Read": false,  
            "Code": false,
            "Sleep": false,
            "Eat": false,
            "Walk": false
        }
    },
    {
        name: "Saturday",
        activities: {
            "Gym": false,
            "Study": false,
            "Read": false,
            "Code": false,
            "Sleep": false,
            "Eat": false,
            "Walk": false
        }
    },
    {
        name: "Sunday",
        activities: {
            "Gym": false,
            "Study": false,
            "Read": false,
            "Code": false,
            "Sleep": false,
            "Eat": false,
            "Walk": false
        }
    }
]

const cols = ["Gym ", "Study ", "Read ", "Code ", "Sleep ", "Eat ", "Walk "]


</script>