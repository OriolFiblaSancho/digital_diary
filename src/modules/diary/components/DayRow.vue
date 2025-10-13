<template>
    <div class="border border-neutral-600 p-2 flex justify-between">
        <div>{{ day }}</div>
    </div>
</template>

<script lang="ts" setup>

const props = defineProps<{
    day : string
}>()

</script>