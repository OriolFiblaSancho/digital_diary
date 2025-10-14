<template>
    <tr class="bg-neutral-800 border-t border-neutral-700">
            <td rowspan="2" class="text-center font-medium align-middle">
            {{ day }}
        </td>

        <td v-for="col in cols" :key="col.key" class="w-30 pt-1 text-center">
            <template v-if="col.type === 'checkbox'">
                <input type="checkbox" :checked="activities[col.key] as boolean"
                    @change="onCheckboxChange($event, col.key)" class="h-5 w-5 text-indigo-500 accent-indigo-500" />
            </template>

            <template v-else>
                <input type="text" :value="activities[col.key] as string" @input="onTextInput($event, col.key)"
                    :class="['rounded bg-neutral-700 text-white text-center text-xl',
                        col.size === 'sm' ? 'w-12' : col.size === 'md' ? 'w-24' : 'w-64']"
                    :maxlength=" col.size === 'sm' ? '3' : col.size === 'md' ? '8' : '24' "
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