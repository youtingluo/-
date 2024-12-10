<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/utils/firebase'
import { convertToObjects } from '../../utils/coverArray'
import IndustryComponent from '@/components/IndustryComponent.vue'
import { useRouter } from 'vue-router'
import { useFavoriteStore } from '@/store/favorite'
const favoriteStore = useFavoriteStore()
const router = useRouter()
const apiKey = import.meta.env.VITE_APP_APIKEY
const sheetId = import.meta.env.VITE_APP_SHEETID
const isLoading = ref(false)
const userId = ref(null)
const hotpot = ref([])
const companys = ref(favoriteStore.favorites)
const filterFav = ref([])
async function getSheetData() {
  isLoading.value = true
  const range = `全部`
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`
  try {
    const response = await axios.get(url)
    const values = await response.data.values
    hotpot.value = convertToObjects(values)
    getLike()
  } catch (error) {
    isLoading.value = false
    console.error('Error fetching values:', error)
  }
}
const getLike = () => {
  const filteredHotpot = hotpot.value.filter((item) => companys.value.includes(item['廠商']))
  filterFav.value = merge(filteredHotpot)
}

const merge = (arr) => {
  const mergedData = {}
  arr.forEach((obj) => {
    const vendor = obj['廠商']
    if (!mergedData[vendor]) {
      mergedData[vendor] = {}
    }
    for (const key in obj) {
      if (key === '廠商') continue // 跳過 "廠商" 鍵
      if (mergedData[vendor][key]) {
        const newValues = obj[key].split(',').map((item) => item.trim())
        const existingValues = mergedData[vendor][key].split(',').map((item) => item.trim())
        const mergedValues = Array.from(new Set([...existingValues, ...newValues])).join(',')
        mergedData[vendor][key] = mergedValues
      } else {
        mergedData[vendor][key] = obj[key]
      }
    }
  })

  const mergeArray = Object.keys(mergedData).map((vendor) => ({
    廠商: vendor,
    ...mergedData[vendor]
  }))

  return mergeArray
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    userId.value = user.uid
  }
})
function goCompany(industry) {
  router.push({
    path: `company/${industry}`,
    query: {
      search: '',
      selectedindustry: '',
      MultipleTypeArray: [],
      selected: []
    }
  })
}
onMounted(async () => {
  await getSheetData()
  await favoriteStore.loadFavorites()
})
</script>
<template>
  <div class="container py-3">
    <h1 class="mb-4 text-center">收藏項目</h1>
    <div class="row g-3">
      <div class="col-6 col-lg-3" v-for="item in filterFav" :key="item">
        <IndustryComponent
          @go-company="goCompany"
          :company="item"
          :mutiple-type-array="[]"
          :tag="['編號', '廠商', '網址', '類別', '公司簡介', '評測']"
        />
      </div>
    </div>
  </div>
</template>
