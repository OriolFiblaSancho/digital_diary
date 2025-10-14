<template>
    <tr>
        <td class="text-left">{{ day }}</td>
        <td v-for="(value, act) in activities">
            <input class="w-6 h-6" type="checkbox"/>
        </td>
    </tr>
    
</template>

<script lang="ts" setup>

const props = defineProps<{
    day : string,
    activities : { [key: string]: boolean }
}>()

</script>