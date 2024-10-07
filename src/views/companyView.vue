<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import Loading from 'vue-loading-overlay'
const route = useRoute()
const company = ref({})
function getCompany() {
  console.log(route)

  const id = route.params.id
  const filter = hotpot.value.filter((item) => item['編號'] === id)
  company.value = filter[0]
  isLoading.value = false
}

const apiKey = import.meta.env.VITE_APP_APIKEY
const sheetId = import.meta.env.VITE_APP_SHEETID
const hotpot = ref([])
const isLoading = ref(false)
async function getSheetData() {
  isLoading.value = true
  const range = `全部!A1:AA70`
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`
  try {
    const response = await axios.get(url)
    const values = response.data.values
    hotpot.value = convertToObjects(values)
    getCompany()
  } catch (error) {
    isLoading.value = false
    console.error('Error fetching values:', error)
  }
}
function convertToObjects(array) {
  const keys = array[0]
  const result = []
  for (let i = 1; i < array.length; i++) {
    const obj = {}
    for (let j = 0; j < keys.length; j++) {
      obj[keys[j]] = array[i][j]
    }
    result.push(obj)
  }
  return result
}
onMounted(() => {
  getSheetData()
})
</script>
<template>
  <Loading v-model:active="isLoading">
    <div class="loader"></div>
  </Loading>
  <nav class="navbar bg-white shadow-sm mb-5 sticky-top">
    <div class="container">
      <div class="d-flex w-100">
        <div>
          <RouterLink class="navbar-brand" to="/">
            <img src="../assets/LOGO.png" alt="LOGO" />
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
  <div class="container">
    <div class="mb-5">
      <div class="d-flex justify-content-between">
        <h2 class="fs-3 placeholder-glow" v-if="!isLoading">
          <span :class="{ placeholder: isLoading }">{{ company['廠商'] }}</span>
        </h2>
        <div>
          <a :href="company['網址']" target="_blank" class="fs-3 me-3 link-dark"
            ><span class="material-symbols-outlined"> language </span></a
          >
          <a class="fs-3 text-dark"><span class="material-symbols-outlined"> favorite </span></a>
        </div>
      </div>

      <div>
        <h3 class="mt-3 fs-6">公司介紹</h3>
        <p v-if="!isLoading" class="placeholder-glow">
          <span :class="isLoading ? placeholder : ''">{{ company['公司簡介'] }}</span>
        </p>
      </div>
    </div>
    <p class="fs-6 mb-2">實際評測</p>
    <p class="fs-3 text-danger">規劃中，陸續更新，敬請期待！</p>
  </div>
</template>
