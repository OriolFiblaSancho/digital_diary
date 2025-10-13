<template>
    <div class="text-white grid grid-rows-7">
        <DayRow v-for="day in days" :day="day" />
    </div>
</template>

<script lang="ts" setup>
import DayRow from '../components/DayRow.vue';

const days = [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ]

const cols = ["Gym", "Study", "Read", "Code", "Sleep", "Eat", "Walk"]


</script>