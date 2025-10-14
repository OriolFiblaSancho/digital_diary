<template>
    <tr class="odd:bg-neutral-800 even:bg-neutral-700">
        <td class="px-2 py-2 text-left font-medium">
            {{ day }}
        </td>

        <td v-for="col in cols" :key="col.key" class="px-2 py-2 text-center">
            <template v-if="col.type === 'checkbox'">
                <input type="checkbox" :checked="activities[col.key] as boolean"
                    @change="onCheckboxChange($event, col.key)" class="h-5 w-5 text-indigo-500 accent-indigo-500" />
            </template>

            <template v-else>
                <input type="text" :value="activities[col.key] as string" @input="onTextInput($event, col.key)"
                    :class="['rounded px-2 py-1 bg-neutral-700 text-white text-sm',
                        col.size === 'sm' ? 'w-24' : col.size === 'md' ? 'w-40' : 'w-64']"
                />
            </template>
        </td>
    </tr>
</template>

<script lang="ts" setup>

const props = defineProps<{
    day: string
    activities: Record<string, boolean | string>
    cols: { key: string; label: string; type: 'checkbox' | 'text'; size?: string }[]
    index?: number
}>()

const emit = defineEmits<{
    (e: 'update-activity', payload: { dayIndex: number; key: string; value: boolean | string }): void
}>()

function onCheckboxChange(e: Event, key: string) {
    const target = e.target as HTMLInputElement
    emit('update-activity', { dayIndex: props.index ?? 0, key, value: target.checked })
}

function onTextInput(e: Event, key: string) {
    const target = e.target as HTMLInputElement
    emit('update-activity', { dayIndex: props.index ?? 0, key, value: target.value })
}
</script>