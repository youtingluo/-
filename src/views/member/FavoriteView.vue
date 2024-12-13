<script setup>
import axios from 'axios'
import { onMounted, ref, computed } from 'vue'
import { convertToObjects, merge } from '../../utils/coverArray'
import IndustryComponent from '@/components/IndustryComponent.vue'
import { useRouter } from 'vue-router'
import { useFavoriteStore } from '@/store/favorite'
import Loading from 'vue-loading-overlay'
const favoriteStore = useFavoriteStore()
const router = useRouter()
const apiKey = import.meta.env.VITE_APP_APIKEY
const sheetId = import.meta.env.VITE_APP_SHEETID
const isLoading = ref(false)
const hotpot = ref([])
async function getSheetData() {
  isLoading.value = true
  const range = `全部`
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`
  try {
    const response = await axios.get(url)
    const values = await response.data.values
    hotpot.value = convertToObjects(values)
    isLoading.value = false
  } catch (error) {
    isLoading.value = false
    console.error('Error fetching values:', error)
  }
}

const processData = (data) => {
  const result = merge(data.filter((item) => favoriteStore.favorites.includes(item['廠商'])))
  return result
}
const computedData = computed(() => {
  return processData(hotpot.value)
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
onMounted(() => {
  getSheetData()
})
</script>
<template>
  <Loading v-model:active="isLoading">
    <div class="loader"></div>
  </Loading>
  <div class="container py-3">
    <h1 class="mb-4 text-center">收藏項目</h1>

    <div class="row g-3">
      <template v-if="computedData.length">
        <div class="col-6 col-lg-3" v-for="item in computedData" :key="item">
          <IndustryComponent
            @go-company="goCompany"
            :company="item"
            :mutiple-type-array="[]"
            :tag="['編號', '廠商', '網址', '類別', '公司簡介', '評測']"
          />
        </div>
      </template>
      <template v-else>
        <div class="text-center">
          <img class="text-center" src="@/assets/Empty.png" alt="尚無資料" />
        </div>
      </template>
    </div>
  </div>
</template>
