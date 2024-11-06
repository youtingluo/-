<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import Loading from 'vue-loading-overlay'
import ReviewComponent from '@/components/ReviewComponent.vue'
import { convertToObjects } from '../utils/coverArray'
const route = useRoute()
const company = ref({})
const apiKey = import.meta.env.VITE_APP_APIKEY
const sheetId = import.meta.env.VITE_APP_SHEETID
const isLoading = ref(false)
const hotpot = ref([])
const review = ref([])
async function getSheetData() {
  isLoading.value = true
  const range = `全部!A1:AA70`
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`
  try {
    const response = await axios.get(url)
    const values = response.data.values
    hotpot.value = convertToObjects(values)
    await getReview()
    await getCompany()
  } catch (error) {
    isLoading.value = false
    console.error('Error fetching values:', error)
  }
}
async function getReview() {
  isLoading.value = true
  const range = `評測`
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`
  try {
    isLoading.value = false
    const response = await axios.get(url)
    const values = response.data.values
    review.value = convertToObjects(values)
  } catch (error) {
    isLoading.value = false
    console.error('Error fetching values:', error)
  }
}
const matchReviewResult = ref([])
function getCompany() {
  const id = route.params.id
  const filter = hotpot.value.filter((item) => id.split(',').includes(item['編號']))
  company.value = filter[0]
  const reviewResult = review.value.filter((item) => item['廠商'] === company.value['廠商'])
  matchReviewResult.value = reviewResult
  isLoading.value = false
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
    <div class="row justify-content-center">
      <div class="col-lg-9">
        <div class="mb-5">
          <div class="d-flex justify-content-between">
            <h2 class="fs-3 placeholder-glow" v-if="!isLoading">
              <span :class="{ placeholder: isLoading }">{{ company['廠商'] }}</span>
            </h2>
            <div>
              <a :href="company['網址']" target="_blank" class="fs-3 me-3 link-dark"
                ><span class="material-symbols-outlined"> language </span></a
              >
              <a class="fs-3 text-dark"
                ><span class="material-symbols-outlined"> favorite </span></a
              >
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

        <ReviewComponent :review-content="matchReviewResult" />
        <div class="text-center py-3">
          <RouterLink :to="{ path: '/', query: route.query }" class="btn btn-primary"
            >回首頁</RouterLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.fill-symbol {
  font-variation-settings: 'FILL' 1;
}
</style>
