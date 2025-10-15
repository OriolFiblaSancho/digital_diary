<template>
  <div class="p-4 w-auto h-full flex flex-col gap-2 justify-center">
    <div class="w-auto max-w-6xl overflow-x-auto rounded-lg border border-neutral-700 bg-neutral-800 shadow">
      <table class="min-w-full text-white text-xl text-center mb-1">
        <thead>
          <tr class="border-b border-neutral-700 bg-neutral-900/70">
            <th class="text-left px-3 py-2 w-30">Day</th>
            <th v-for="col in cols" :key="col.key" class="px-2 font-medium">
              {{ col.label }}
            </th>
            <th class="text-center align-middle w-15">
              <button 
                @click="toggleCreateModal()"
                class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-1 px-2 rounded flex items-center justify-center"
                style="margin: 0 auto;"
              >
                <Icon icon="heroicons:plus-16-solid" />
              </button>
            </th>
            <th></th>
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
              <td :colspan="cols.length" class="  py-1 text-center align-middle overflow-none">
                <input
                  v-model="day.highlight"
                  type="text"
                  placeholder="Highlight of the day"
                  class="w-full rounded px-2 py-1 bg-neutral-700 text-white text-center text-sm"
                  maxlength="50"
                />
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      
    </div>
    <button 
        @click="toggleCalendar()"
        class=" bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
        style="margin: 0 auto;"
      >
        Calendar
      </button>
  </div>
  
  <CreateActivityModal v-if="viewCreateModal" @create="createNewActivity" @close="toggleCreateModal" />

  <!-- Calendar overlay -->
  <div
    v-if="viewCalendar"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    @click.self="toggleCalendar"
  >
    <div class="relative bg-neutral-900 rounded-lg shadow-xl border border-neutral-700 p-2">
      <button
        @click="toggleCalendar"
        aria-label="Close calendar"
        class="absolute -top-3 -right-3 inline-flex h-8 w-8 z-99 items-center justify-center rounded-full bg-neutral-800 border border-neutral-600 text-neutral-200 hover:bg-neutral-700 hover:text-white"
      >
        ✕
      </button>
      <VCalendar
        is-dark
        show-weeknumbers
        class="min-w-[320px] md:min-w-[640px]"
        v-model="selectedDate"
        :attributes="calendarAttributes"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import DayRow from '../components/DayRow.vue'
import CreateActivityModal from '../components/CreateActivityModal.vue'
import { Icon } from '@iconify/vue';
import { useDiaryWeekStore } from '@/modules/diary/stores/useDiaryWeekstore';
import { storeToRefs } from 'pinia';
import type { CalendarDay } from '@/modules/common/interfaces/CalendarDay.interface';

type Col = { key: string; label: string; type: 'checkbox' | 'text'; size?: string }

const cols = ref<Col[]>([
  { key: 'Gym', label: 'Gym', type: 'checkbox' },
  { key: 'Math', label: 'Math', type: 'checkbox' },
  { key: 'Read', label: 'Read', type: 'checkbox' },
  { key: 'SleepH', label: 'SleepH', type: 'text', size: 'sm' },
])
const dayNames = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

const days = ref(dayNames.map(name => ({ name, activities: createActivity(), highlight: '' })))

const viewCalendar = ref(false)
const viewCreateModal = ref(false)

const weekStore = useDiaryWeekStore()

weekStore.setDayId(3,2,23)

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

function toggleCalendar() {
  viewCalendar.value = !viewCalendar.value
}

function toggleCreateModal() {
  viewCreateModal.value = !viewCreateModal.value
}


function onUpdateActivity(payload: { dayIndex: number; key: string; value: boolean | string }) {
  const { dayIndex, key, value } = payload
  days.value[dayIndex].activities[key] = value
}

// Calendar things
const selectedDate = ref<Date>(new Date())
const calendarAttributes = ref([
  {
    key: 'today',
    dates: new Date(),
    highlight: {
      color: 'indigo',
      fillMode: 'light',
    },
  },
])
</script>