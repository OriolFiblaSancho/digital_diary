<template>
    <div class="fixed inset-0 z-50 bg-neutral-900/50 flex items-start justify-center p-4">
        <div class="w-full max-w-md mt-8 p-5 bg-neutral-800 rounded-lg shadow-xl">
            <h2 class="text-xl font-semibold mb-4 text-white">Create New Activity</h2>
            <form @submit="createAction">
                <div class="mb-4">
                    <label class="block text-white mb-2" for="activity-name">Activity Name</label>
                    <input id="activity-name" v-model="name" type="text" class="w-full px-3 py-2 rounded bg-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div class="mb-4">
                    <label class="block text-white mb-2" for="activity-type">Activity Type</label>
                    <select id="activity-type" v-model="type" class="w-full px-3 py-2 rounded bg-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <option value="checkbox">Checkbox</option>
                        <option value="text">Text</option>
                    </select>
                </div>
                <div v-if="type === 'text'" class="mb-4">
                    <label class="block text-white mb-2" for="activity-size">Activity Size</label>
                    <select id="activity-size" v-model="size" class="w-full px-3 py-2 rounded bg-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <option value="sm">Small</option>
                        <option value="md">Medium</option>
                        <option value="lg">Large</option>
                    </select>
                </div>
                <div class="flex justify-end gap-2">
                    <button :disabled="!name.trim()" type="submit" class="disabled:opacity-50 disabled:cursor-not-allowed bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded">Create</button>
                    <button @click="closeModal" type="button" class="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded">Cancel</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const emit = defineEmits<{
    (e: 'close'): void
    (e: 'create', activity: { name: string; type: 'checkbox' | 'text'; size?: 'sm' | 'md' | 'lg' }): void
}>()

const name = ref('')
const type = ref<'checkbox' | 'text'>('checkbox')
const size = ref<'sm' | 'md' | 'lg'>('sm')

function closeModal() {
    emit('close')
}

function createAction(e: Event) {
    e.preventDefault()
    if (!name.value.trim()) return
    const activity: { name: string; type: 'checkbox' | 'text'; size?: 'sm' | 'md' | 'lg' } = {
        name: name.value.trim(),
        type: type.value
    }
    if (type.value === 'text') {
        activity.size = size.value
    }
    emit('create', activity)
    name.value = ''
    type.value = 'checkbox'
    size.value = 'sm'
    emit('close')
}
</script>