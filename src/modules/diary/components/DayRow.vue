<template>
    <tr>
        <td>{{ day }}</td>
        <td v-for="(value, act) in activities">
            <input type="checkbox"/>
        </td>
    </tr>
    
</template>

<script lang="ts" setup>

const props = defineProps<{
    day : string,
    activities : { [key: string]: boolean }
}>()

</script>