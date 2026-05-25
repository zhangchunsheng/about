import { ref, onMounted, watch } from 'vue'
import { useLocale } from './useLocale'

const API_BASE = 'https://about.luomor.com/about'

export function useWorkExperience() {
  const { currentLocale } = useLocale()
  const experiences = ref(null)
  const grouped = ref({})
  const loading = ref(true)
  const error = ref(null)

  async function fetchData() {
    try {
      loading.value = true
      error.value = null
      const endpoint = currentLocale.value === 'en'
        ? `${API_BASE}/workExperienceEn?jsonp=0`
        : `${API_BASE}/workExperience?jsonp=0`

      const res = await fetch(endpoint)
      const json = await res.json()

      console.log('Fetched work experience data:', json)
      if (json.code === 200) {
        experiences.value = json.result.work_experiences
        grouped.value = groupByTag(experiences.value)
      }
    } catch (e) {
      error.value = e
      console.error('Failed to fetch work experience:', e)
    } finally {
      loading.value = false
    }
  }

  function groupByTag(items) {
    const tagOrder = []
    const tagMap = {}

    for (const item of items) {
      const tag = item.tag
      if (!tagMap[tag]) {
        tagOrder.push(tag)
        tagMap[tag] = []
      }
      tagMap[tag].push(item)
    }

    // Sort items within each group by start_time descending
    for (const tag of tagOrder) {
      tagMap[tag].sort((a, b) => parseYear(b.start_time) - parseYear(a.start_time))
    }

    // Sort groups by tag name descending (newest company first)
    tagOrder.sort((a, b) => b.localeCompare(a))

    const groups = {}
    for (let i = 0; i < tagOrder.length; i++) {
      groups[`${i + 1}_${tagOrder[i]}`] = tagMap[tagOrder[i]]
    }
    return groups
  }

  function parseYear(time) {
    if (!time) return 0
    return parseInt(time.replace(/\D/g, '').substring(0, 4), 10) || 0
  }

  onMounted(fetchData)
  watch(currentLocale, fetchData)

  return { experiences, grouped, loading, error, fetch: fetchData }
}
