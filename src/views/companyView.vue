<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import Loading from 'vue-loading-overlay'
import { convertToObjects } from '../utils/coverArray'
import ReviewComponent from '@/components/ReviewComponent.vue'
import { useFavoriteStore } from '@/store/favorite'
import ScrollToTop from '@/components/ScrollToTop.vue'
const favoriteStore = useFavoriteStore()
const route = useRoute()
const company = ref({})
const apiKey = import.meta.env.VITE_APP_APIKEY
const sheetId = import.meta.env.VITE_APP_SHEETID
const isLoading = ref(false)
const hotpot = ref([])
const review = ref([])
const companyIntroduce = ref([])
const intro = ref({})
async function getSheetData() {
  isLoading.value = true
  const range = `全部`
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`
  try {
    const response = await axios.get(url)
    const values = await response.data.values
    hotpot.value = convertToObjects(values)
    await getReview()
    await getCompanyData()
  } catch (error) {
    isLoading.value = false
    console.error('Error fetching values:', error)
  } finally {
    isLoading.value = false
  }
}
async function getCompanyData() {
  const range = `Supply0介紹`
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`
  try {
    const response = await axios.get(url)
    const values = await response.data.values
    companyIntroduce.value = convertToObjects(values)
    getCompanyIntro()
  } catch (error) {
    console.error('Error fetching values:', error)
  }
}
async function getReview() {
  const range = `評測`
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`
  try {
    const response = await axios.get(url)
    const values = await response.data.values
    review.value = convertToObjects(values)
    getCompany()
    isLoading.value = false
  } catch (error) {
    isLoading.value = false
    console.error('Error fetching values:', error)
  }
}
let localIsFavorite = ref(false)
const matchReviewResult = ref([])
function getCompany() {
  const id = route.params.id
  const filter = hotpot.value.filter((item) => id.split(',').includes(item['編號']))
  company.value = filter[0]
  localIsFavorite.value = favoriteStore.isFavorite(company.value['廠商'])
  const reviewResult = review.value.filter((item) => item['廠商'] === company.value['廠商'])
  matchReviewResult.value = reviewResult
}
const getCompanyIntro = () => {
  const companyIntro = companyIntroduce.value.filter(
    (item) => item['廠商'] === company.value['廠商']
  )

  intro.value = companyIntro[0]
}
const handleToggleFavorite = async () => {
  try {
    // 立即更新本地狀態
    localIsFavorite.value = !localIsFavorite.value
    // 等待 store 完成操作
    await favoriteStore.toggleFavorite(company.value['廠商'])
  } catch (error) {
    // 如果操作失敗，回復本地狀態
    localIsFavorite.value = favoriteStore.isFavorite(company.value['廠商'])
    console.error(error)
  }
}
defineProps({
  id: { type: String, required: true },
  query: { type: Object }
})
onMounted(() => {
  getSheetData()
})
</script>
<template>
  <Loading v-model:active="isLoading">
    <div class="loader"></div>
  </Loading>
  <ScrollToTop />
  <!-- <MouseFollowing /> -->
  <div class="container py-3">
    <div class="row justify-content-center">
      <div class="col-lg-9">
        <div class="mb-5">
          <div class="d-flex justify-content-between align-items-center">
            <h2 class="fs-3 d-flex align-items-center mb-0" v-if="!isLoading">
              {{ company['廠商'] }}
              <a
                :href="company['網址']"
                target="_blank"
                :title="`${company['廠商']}官網`"
                class="d-inline-block link-gray"
                ><span class="material-symbols-outlined px-2 py-3"> language </span></a
              >
            </h2>

            <div>
              <div class="d-inline-block cursor-pointer">
                <span
                  :title="localIsFavorite ? '移除收藏' : '加入收藏'"
                  @click.stop="handleToggleFavorite"
                  class="material-symbols-outlined link-info p-2"
                  :class="localIsFavorite ? 'fill-symbol' : 'none'"
                >
                  favorite
                </span>
              </div>
            </div>
          </div>
          <div class="mb-3" v-if="company['公司簡介']">
            <h3 class="mt-3 fs-6">公司介紹</h3>

            <p v-if="!isLoading" class="placeholder-glow text-justify">
              <span :class="isLoading ? placeholder : ''">{{ company['公司簡介'] }}</span>
            </p>
          </div>
          <hr />
          <div v-if="intro['公司大綱']">
            <h3 class="mt-3 fs-6">SUPPLY0 評價</h3>
            <p v-if="!isLoading" class="placeholder-glow">
              <span :class="isLoading ? placeholder : ''">{{ intro?.['公司大綱'] }}</span>
            </p>
          </div>
        </div>
        <p class="fs-6 mb-2">實際評測</p>
        <ReviewComponent :review-content="matchReviewResult" />
        <div class="text-center py-3">
          <RouterLink to="/contribute" class="btn btn-primary me-2">前往投稿</RouterLink>
          <RouterLink :to="{ path: '/', query: route.query }" class="btn btn-primary"
            >回首頁</RouterLink
          >
        </div>
      </div>
    </div>
  </div>
</template>
