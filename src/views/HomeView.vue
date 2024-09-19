<script setup>
import axios from 'axios'
import { computed, onMounted, ref } from 'vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
const apiKey = import.meta.env.VITE_APP_APIKEY
const sheetId = import.meta.env.VITE_APP_SHEETID
// 取得資料
async function getSheetData(industry = '火鍋') {
  isLoading.value = true
  selectedindustry.value = industry
  const range = `${industry}!A1:O50`
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`
  try {
    const response = await axios.get(url)
    isLoading.value = false
    const values = response.data.values
    keys.value = values[0].slice(1, -1)
    hotpot.value = convertToObjects(values)
    console.log(hotpot.value)
    getType(keys.value[0])
  } catch (error) {
    isLoading.value = false
    console.error('Error fetching values:', error)
  }
}
// 轉換成陣列包物件的函數
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

const isLoading = ref(false)
const hotpot = ref([])
// 取得物件 KEY
const keys = ref([])
// 篩選廠商
const selectedindustry = ref('')
const selectedType = ref('')
const selected = ref('')
const filterType = ref([])
const filterCompany = computed(() => {
  if (!selected.value) {
    return hotpot.value.filter((item) => item[selectedType.value])
  }
  return hotpot.value.filter((item) => item[selectedType.value].toString().includes(selected.value))
})
// 合併陣列
const getType = (objKey) => {
  selected.value = ''
  const type = []
  selectedType.value = objKey
  hotpot.value.forEach((item) => {
    // 要合併每個物件的陣列
    type.push(item[selectedType.value])
  })
  // 移除重複陣列資料
  filterType.value = [...new Set(type.filter(Boolean).join().split(','))]
}
// -------- end -------
onMounted(() => {
  getSheetData()
})
</script>
<template>
  <Loading v-model:active="isLoading">
    <div class="loader"></div>
  </Loading>
  <div class="container">
    <h3 class="fs-6">行業</h3>
    <ul class="d-flex fs-3 mb-3">
      <li>
        <button
          type="button"
          class="btn btn-outline-primary border-0"
          :class="{ active: selectedindustry === '飲料' }"
          @click="getSheetData('飲料')"
        >
          飲料店
        </button>
      </li>
      <li>
        <button
          type="button"
          class="btn btn-outline-primary border-0"
          :class="{ active: selectedindustry === '火鍋' }"
          @click="getSheetData('火鍋')"
        >
          火鍋店
        </button>
      </li>
      <li>
        <button
          type="button"
          class="btn btn-outline-primary border-0"
          :class="{ active: selectedindustry === '挫冰店' }"
          @click="selectedindustry = '挫冰店'"
        >
          挫冰店
        </button>
      </li>
      <!-- <li>
        <button
          type="button"
          class="btn btn-outline-primary border-0"
          :class="{ active: selectedindustry === '燒烤店' }"
          @click="selectedindustry = '燒烤店'"
        >
          燒烤店
        </button>
      </li>
      <li>
        <button
          type="button"
          class="btn btn-outline-primary border-0"
          :class="{ active: selectedindustry === '挫冰店' }"
          @click="selectedindustry = '挫冰店'"
        >
          挫冰店
        </button>
      </li> -->
    </ul>

    <div class="row mb-3">
      <div class="col">
        <h3 class="fs-6">類型</h3>
        <ul class="d-flex fs-3 flex-wrap">
          <li v-for="objKey in keys" :key="objKey">
            <a
              href="#"
              class="btn btn-outline-primary border-0"
              :class="{ active: selectedType === objKey }"
              @click.prevent="getType(objKey)"
              >{{ objKey }}</a
            >
          </li>
        </ul>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col">
        <h3 class="fs-6">種類</h3>
        {{ selected }}
        <ul class="d-flex flex-wrap fs-3">
          <li v-for="item in filterType" :key="item">
            <a
              href="#"
              class="btn btn-outline-primary border-0"
              :class="{ active: selected === item }"
              @click.prevent="selected = item"
              >{{ item }}</a
            >
          </li>
        </ul>
      </div>
    </div>
    <h3 class="fs-6">廠商</h3>
    <div class="row">
      <div class="col-6 col-lg-3 mb-3" v-for="company in filterCompany" :key="company['編號']">
        <div class="bg-secondary py-3 rounded-5 h-100">
          <div class="d-flex justify-content-between px-4 mb-3">
            <div>
              <a :href="company['網址']" target="_blank" class="pe-3">{{ company['廠商'] }}</a>
            </div>
            <div>
              <a href="#"><i class="bi bi-heart"></i></a>
            </div>
          </div>
          <div class="row justify-content-between">
            <template v-for="value in Object.keys(company)" :key="value">
              <div
                class="col-6"
                v-if="company[value] && value !== '編號' && value !== '廠商' && value !== '網址'"
              >
                <div class="text-center px-2">
                  <button
                    type="button"
                    class="btn btn-primary text-secondary rounded-pill mb-3"
                    :class="[
                      { 'bg-warning': value === selectedType },
                      { 'text-dark': value === selectedType }
                    ]"
                  >
                    {{ value }}
                  </button>
                </div>
              </div></template
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.loader {
  width: 120px;
  height: 20px;
  border-radius: 20px;
  background: linear-gradient(orange 0 0) 0/0% no-repeat lightblue;
  animation: l2 2s infinite steps(10);
}
@keyframes l2 {
  100% {
    background-size: 110%;
  }
}
</style>
