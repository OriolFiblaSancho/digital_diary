<template>
    <table class="text-white w-200 h-100 text-2xl text-center">
        <thead>
            <tr>
                <th class="text-left px-3 py-2">Day</th>
                <th v-for="col in cols" :key="col" class="px-3 py-2">
                    {{ col }}
                </th>
            </tr>   
        </thead>
        <tbody>
            <DayRow v-for="day in days" :key="day.name" :day="day.name" :activities="day.activities"/>
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
            "Eat": true,
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

const cols = ["Gym", "Study", "Read", "Code", "Sleep", "Eat", "Walk"]
</script>