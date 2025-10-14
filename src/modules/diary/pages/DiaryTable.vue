<template>
  <div class="p-4 w-full flex justify-center">
    <div class="w-full max-w-6xl overflow-x-auto rounded-lg border border-neutral-700 bg-neutral-800 shadow">
      <table class="min-w-full text-white text-xl text-center">
        <thead>
          <tr class="border-b border-neutral-700 bg-neutral-900/70">
            <th class="text-left px-3 py-2">Day</th>
            <th v-for="col in cols" :key="col.key" class="px-2 py-2 font-medium">
              {{ col.label }}
            </th>
            <th class="text-center align-middle w-10">
              <button 
                @click="toggleCreateModal()"
                class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-1 px-2 rounded flex items-center justify-center"
                style="margin: 0 auto;"
              >
                <span class="text-xl leading-none">+</span>
              </button>
            </th>
          </tr>
        </thead>

        <tbody>
          <template v-for="(day, i) in days" :key="day.name">
            <DayRow
              :index="i"
              :day="day.name"
              :activities="day.activities"
              :cols="cols"
              @update-activity="onUpdateActivity"
            />
            <tr>
              <td></td>
              <td :colspan="cols.length + 1" class="px-3 py-2 text-center align-middle">
                <input
                  v-model="day.highlight"
                  type="text"
                  placeholder="Highlight of the day"
                  class="w-full rounded px-2 py-1 bg-neutral-700 text-white text-center text-sm"
                />
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
  <CreateActivityModal v-if="viewCreateModal" @create="createNewActivity" @close="toggleCreateModal" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import DayRow from '../components/DayRow.vue'
import CreateActivityModal from '../components/CreateActivityModal.vue'
type Col = { key: string; label: string; type: 'checkbox' | 'text'; size?: string }

const cols = ref<Col[]>([
  { key: 'Gym', label: 'Gym', type: 'checkbox' },
  { key: 'Math', label: 'Math', type: 'checkbox' },
  { key: 'Read', label: 'Read', type: 'checkbox' },
  { key: 'SleepH', label: 'SleepH', type: 'text', size: 'sm' },
])

function createNewActivity(activity: { name: string; type: 'checkbox' | 'text'; size?: string }) {
  cols.value.push({ key: activity.name, label: activity.name, type: activity.type, size: activity.size })
  days.value.forEach(day => {
    day.activities[activity.name] = activity.type === 'checkbox' ? false : ''
  })
}

function createActivity(): Record<string, boolean | string> {
  const activity: Record<string, boolean | string> = {}
  cols.value.forEach(col => {
    activity[col.key] = col.type === 'checkbox' ? false : ''
  })
  return activity
}

const viewCreateModal = ref(false)

function toggleCreateModal() {
  viewCreateModal.value = !viewCreateModal.value
}

const dayNames = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

const days = ref(dayNames.map(name => ({ name, activities: createActivity(), highlight: '' })))

function onUpdateActivity(payload: { dayIndex: number; key: string; value: boolean | string }) {
  const { dayIndex, key, value } = payload
  days.value[dayIndex].activities[key] = value
}

// highlight is now handled directly via v-model in the bottom row
</script>