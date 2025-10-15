import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDiaryWeekStore = defineStore('diaryWeek', () => {
    const day_id = ref<number | null>(null) 

    function setDayId(day_n: number, month_n: number , year_n: number) {
        day_id.value = `${day_n}${month_n}${year_n} ` as unknown as number
        console.log(day_id.value)
    }

    return {
        day_id,
        setDayId
    }
})