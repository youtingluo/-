<script setup>
import axios from 'axios'
import { computed, onMounted, ref } from 'vue'
const apiKey = import.meta.env.VITE_APP_APIKEY
const sheetId = import.meta.env.VITE_APP_SHEETID
// Sheets API 的 URL
const range = '飲料廠商!A1:H10'
const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`
// 取得範圍內資料的函數
async function getSheetData() {
  try {
    const response = await axios.get(url)
    const values = response.data.values
    convertToObjects(values)
    hotpot.value = convertToObjects(values)
    hotpot.value.forEach((item) => {
      keys.value = Object.keys(item)
      keys.value.shift()
    })
    getType(keys.value[0])
  } catch (error) {
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
const hotpot = ref([])
// 取得物件 KEY
let keys = ref([])
// 篩選廠商
const selectedindustry = ref('火鍋店')
const selectedType = ref('')
const selected = ref('')
const type = ref([])
const filterType = ref([])
const filterCompany = computed(() => {
  if (!selectedType.value) {
    return []
  }
  return hotpot.value.filter((item) => {
    return item[selectedType.value].toString().includes(selected.value)
  })
})
// 整理資料格式

// 合併陣列
const getType = (objKey) => {
  selected.value = ''
  type.value = []
  selectedType.value = objKey
  hotpot.value.forEach((item) => {
    // 要合併每個物件的陣列
    type.value.push(item[selectedType.value])
  })
  // 移除重複陣列資料
  const res = type.value.reduce((pre, cur) => pre.concat(cur), [])
  const filterNull = res.filter((item) => item)
  const filterRepeat = [...new Set(filterNull.join().split(','))]
  filterType.value = filterRepeat
}
// -------- end -------
onMounted(() => {
  getSheetData()
})
</script>
<template>
  <div class="container">
    <div class="row mb-3">
      <div class="col">
        <h3 class="fs-6">行業</h3>
        <ul class="d-flex fs-3">
          <li>
            <button
              type="button"
              class="btn btn-outline-primary border-0"
              :class="{ active: selectedindustry === '飲料店' }"
              @click="selectedindustry = '飲料店'"
            >
              飲料店
            </button>
          </li>
          <li>
            <button
              type="button"
              class="btn btn-outline-primary border-0"
              :class="{ active: selectedindustry === '火鍋店' }"
              @click="selectedindustry = '火鍋店'"
            >
              火鍋店
            </button>
          </li>
          <li>
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
          </li>
        </ul>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col">
        <h3 class="fs-6">類型</h3>
        <ul class="d-flex fs-3">
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
      <template v-for="company in filterCompany" :key="company['編號']">
        <div class="col-6 col-lg-4 mb-3" v-if="company[selectedType]">
          <div class="bg-secondary py-3 rounded-5">
            <div class="d-flex justify-content-between px-4 mb-3">
              <div>
                <a :href="company['網址']" target="_blank" class="pe-3">{{ company['廠商'] }}</a>
              </div>
              <div>
                <a href="#"><i class="bi bi-heart"></i></a>
              </div>
            </div>
            <div class="row text-center">
              <div class="col-6" v-for="content in keys" :key="'123423' + content">
                <a href="#" class="btn btn-primary rounded-pill mb-3">{{ content }}</a>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
