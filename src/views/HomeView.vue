<script setup>
import axios from 'axios'
import { computed, nextTick, onMounted, ref } from 'vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
const apiKey = import.meta.env.VITE_APP_APIKEY
const sheetId = import.meta.env.VITE_APP_SHEETID
// 取得資料
const selectedindustry = ref('')
async function getSheetData(industry = '全部') {
  isLoading.value = true
  MultipleTypeArray.value = []
  selectedindustry.value = industry
  const range = `${industry}!A1:R30`
  let url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`
  // if (import.meta.env.DEV) {
  //   url = 'db.json'
  // }

  try {
    const response = await axios.get(url)
    isLoading.value = false
    // values 為正式資料
    const values = response.data.values

    keys.value = values[0].slice(1, -1)
    hotpot.value = convertToObjects(values)
    console.log(hotpot.value)
    convertToObjects(hotpot.value)
    getType()
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
  if (selectedindustry.value === '全部') {
    covertAllObjects(hotpot.value)
    return result
  }
  return result
}
// 全部的資料
const allIndustryData = ref([])
function covertAllObjects(array) {
  const categorizedData = array.reduce((acc, item) => {
    const filteredItem = Object.fromEntries(
      Object.entries(item).filter(([, value]) => value !== undefined || '')
    )

    if (!acc[item.類別]) {
      acc[item.類別] = []
    }
    acc[item.類別].push(filteredItem)
    return acc
  }, {})
  const data = []
  for (const key in categorizedData) {
    data.push({ [key]: categorizedData[key] })
  }

  allIndustryData.value = data
}
const isLoading = ref(false)
const hotpot = ref([])
// 取得物件 KEY
const keys = ref([])
// 篩選廠商
const selected = ref([])
const isLiked = ref(false)
const filterCompany = computed(() => {
  if (!selected.value.length) {
    return hotpot.value.filter((item) => {
      return MultipleTypeArray.value.every((type) => item[type])
    })
  } else {
    return hotpot.value.filter((item) => {
      // 檢查所有指定的 key 是否有值
      const hasAllKeysWithValue = MultipleTypeArray.value.every(
        (key) => item[key] && item[key].length > 0
      )
      // 檢查指定的 key 是否包含所有指定的 value
      const hasAllValues = MultipleTypeArray.value.some((key) =>
        selected.value.every((value) => item[key] && item[key].includes(value))
      )
      return hasAllKeysWithValue && hasAllValues
    })
  }
})
const scrollbox = ref(null)
const toScroll = () => {
  nextTick(() => {
    if (scrollbox.value) {
      setTimeout(() => {
        scrollbox.value.scrollIntoView(true)
      }, 500)
    }
  })
}

const isSearched = ref(false)
const searchContent = ref('')
const input = ref(null)
const showInput = () => {
  isSearched.value = true
  nextTick(() => {
    input.value.focus()
  })
}
const searchCompany = computed(() => {
  return hotpot.value.filter((item) => {
    const regex = new RegExp(searchContent.value.split('').join('.*'), 'i')
    return keys.value.some((key) => regex.test(item[key]))
  })
})
// 多選種類
const addMultipleItem = (item) => {
  const index = selected.value.indexOf(item)
  if (index > -1) {
    selected.value.splice(index, 1)
  } else {
    selected.value.push(item)
  }
}
// 多選類型
const MultipleTypeArray = ref([])
const addMultipleType = (item) => {
  const index = MultipleTypeArray.value.indexOf(item)
  if (index > -1) {
    MultipleTypeArray.value.splice(index, 1)
  } else {
    MultipleTypeArray.value.push(item)
  }
  getType()
}
// 合併陣列
const filterType = ref([])
const showAll = ref(false)
const getType = () => {
  const type = []
  hotpot.value.forEach((item) => {
    MultipleTypeArray.value.forEach((industryItem) => {
      // 要合併每個物件的陣列
      type.push(item[industryItem])
    })
  })
  selected.value = []
  // 移除重複陣列資料
  filterType.value = [...new Set(type.filter(Boolean).join().split(','))]
}
const displayedType = computed(() => {
  return showAll.value ? filterType.value : filterType.value.slice(0, 8)
})
// -------- end -------
onMounted(() => {
  getSheetData()
  console.log(scrollbox.value)
})
</script>
<template>
  <Loading v-model:active="isLoading">
    <div class="loader"></div>
  </Loading>
  <nav class="navbar bg-white shadow-sm mb-4 sticky-top">
    <div class="container">
      <div class="d-flex w-100" v-if="!isSearched">
        <div>
          <RouterLink class="navbar-brand" to="#">
            <img src="../assets/LOGO.png" alt="LOGO" />
          </RouterLink>
        </div>
        <div class="ms-auto">
          <button class="btn" type="button" @click="showInput">
            <i class="bi bi-search"></i>
          </button>
        </div>
      </div>
      <div class="input-group" v-else>
        <button
          class="btn"
          type="button"
          @click="
            () => {
              isSearched = false
              searchContent = ''
            }
          "
        >
          <i class="bi bi-chevron-left"></i>
        </button>
        <input
          @input="toScroll"
          ref="input"
          type="text"
          class="form-control border-0"
          placeholder="搜尋"
          v-model="searchContent"
        />
        <button class="btn" type="button" @click="searchContent = ''">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
    </div>
  </nav>
  <div class="container">
    <div class="border-bottom border-2 mb-4">
      <div class="mb-4">
        <h3 class="fs-6 text-black text-opacity-50">廠商行業</h3>
        <ul class="d-flex fs-3 mb-3 flex-wrap">
          <li>
            <button
              type="button"
              class="btn btn-custom border-0"
              :class="{ active: selectedindustry === '全部' }"
              @click="getSheetData('全部')"
            >
              全部
            </button>
          </li>
          <li>
            <button
              type="button"
              class="btn btn-custom border-0"
              :class="{ active: selectedindustry === '飲料' }"
              @click="getSheetData('飲料')"
            >
              飲料
            </button>
          </li>
          <li>
            <button
              type="button"
              class="btn btn-custom border-0"
              :class="{ active: selectedindustry === '火鍋' }"
              @click="getSheetData('火鍋')"
            >
              火鍋
            </button>
          </li>
          <li>
            <button
              type="button"
              class="btn btn-custom border-0"
              :class="{ active: selectedindustry === '剉冰' }"
              @click="getSheetData('剉冰')"
            >
              剉冰
            </button>
          </li>
          <li>
            <button
              type="button"
              class="btn btn-custom border-0"
              :class="{ active: selectedindustry === '燒烤' }"
              @click="getSheetData('燒烤')"
            >
              燒烤
            </button>
          </li>
          <li>
            <button
              type="button"
              class="btn btn-custom border-0"
              :class="{ active: selectedindustry === '烘焙' }"
              @click="getSheetData('烘焙')"
            >
              烘焙
            </button>
          </li>
        </ul>
      </div>
      <div class="row gx-2 mb-4" v-if="!(selectedindustry === '全部')">
        <div class="col">
          <h3 class="fs-6 text-black text-opacity-50">原物料種類</h3>
          <ul class="d-flex fs-3 flex-wrap">
            <li class="me-2">
              <a
                href="#"
                class="btn btn-custom border-0"
                :class="{ active: !MultipleTypeArray.length }"
                @click="MultipleTypeArray = []"
                >全部</a
              >
            </li>
            <li class="me-2" v-for="objKey in keys" :key="objKey">
              <a
                href="#"
                class="btn btn-custom border-0"
                :class="{ active: MultipleTypeArray.includes(objKey) }"
                @click.prevent="addMultipleType(objKey)"
                >{{ objKey }}</a
              >
            </li>
          </ul>
        </div>
      </div>
      <div class="row mb-4" v-if="MultipleTypeArray.length">
        <div class="col">
          <h3 class="fs-6 text-black text-opacity-50">類別細項</h3>
          <ul class="d-flex flex-wrap fs-3">
            <li class="me-2">
              <a
                href="#"
                class="btn btn-custom border-0"
                :class="{ active: !selected.length }"
                @click="selected = []"
                >全部</a
              >
            </li>
            <li v-for="item in displayedType" :key="item">
              <a
                href="#"
                class="btn btn-custom border-0"
                :class="{ active: selected.includes(item) }"
                @click.prevent="addMultipleItem(item)"
                >{{ item }}</a
              >
            </li>
            <li>
              <a
                href="#"
                class="btn btn-outline-primary border-0"
                v-if="filterType.length > 8"
                @click.prevent="showAll = !showAll"
              >
                {{ showAll ? '收起－' : '更多' }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <h3 ref="scrollbox" class="fs-6 text-black text-opacity-50">廠商</h3>
    <!-- 搜尋結果 -->
    <div class="row" v-if="searchContent.trim()">
      <h4>
        以下為 <span class="text-danger">{{ searchContent }} </span> 的搜尋結果
        <button type="button" class="btn btn-sm btn-danger" @click="searchContent = ''">Ｘ</button>
      </h4>
      <div class="col-6 col-lg-3 mb-3" v-for="company in searchCompany" :key="company['編號']">
        <div class="p-3 rounded-5 h-100 shadow-sm bg-white">
          <div class="d-flex justify-content-between mb-3">
            <div>
              <a :href="company['網址']" target="_blank" class="pe-3">{{ company['廠商'] }}</a>
            </div>
            <div>
              <a href="#"><i class="bi bi-heart"></i></a>
            </div>
          </div>
          <div class="d-flex flex-wrap">
            <template v-for="value in Object.keys(company)" :key="value">
              <div
                v-if="
                  company[value] &&
                  value !== '編號' &&
                  value !== '廠商' &&
                  value !== '網址' &&
                  value !== '類別'
                "
              >
                <span
                  class="badge rounded-pill text-bg-secondary fw-normal fs-6 me-2 mb-2"
                  :class="[
                    { 'bg-warning': MultipleTypeArray.includes(value) },
                    { 'text-dark': MultipleTypeArray.includes(value) }
                  ]"
                >
                  {{ value }}
                </span>
              </div></template
            >
          </div>
        </div>
      </div>
    </div>
    <!-- end -->
    <div class="row" v-else-if="selectedindustry !== '全部'">
      <div class="col-6 col-lg-3 mb-3" v-for="company in filterCompany" :key="company['編號']">
        <RouterLink :to="`company/${company['編號']}`">
          <div class="p-3 rounded-5 h-100 shadow-sm bg-white">
            <div class="d-flex justify-content-between mb-3">
              <div>
                <a :href="company['網址']" target="_blank" class="pe-3">{{ company['廠商'] }}</a>
              </div>
              <div>
                <i
                  v-if="isLiked"
                  class="bi bi-heart-fill fs-3 link-info"
                  @click.prevent="isLiked = !isLiked"
                ></i>
                <i
                  v-else
                  class="bi bi-heart fs-3 link-gray"
                  @click.prevent="isLiked = !isLiked"
                ></i>
              </div>
            </div>
            <div class="d-flex flex-wrap">
              <template v-for="value in Object.keys(company)" :key="value">
                <div
                  v-if="company[value] && value !== '編號' && value !== '廠商' && value !== '網址'"
                >
                  <span
                    class="badge rounded-pill text-bg-secondary fw-normal fs-6 me-2 mb-2"
                    :class="[
                      { 'bg-warning': MultipleTypeArray.includes(value) },
                      { 'text-dark': MultipleTypeArray.includes(value) }
                    ]"
                  >
                    {{ value }}
                  </span>
                </div>
              </template>
            </div>
          </div></RouterLink
        >
      </div>
    </div>
    <template v-if="selectedindustry === '全部' && !searchContent">
      <div v-for="industry in allIndustryData" :key="industry['編號']">
        <h3 class="fs-6 text-black text-opacity-50">{{ Object.keys(industry).toString() }}</h3>
        <div class="row">
          <div
            class="col-6 mb-3"
            v-for="company in industry[Object.keys(industry)]"
            :key="company['編號']"
          >
            <div class="p-3 rounded-5 h-100 shadow-sm bg-white">
              <div class="d-flex justify-content-between mb-3">
                <div>
                  <h2 class="fs-6">{{ company['廠商'] }}</h2>
                </div>
                <div>
                  <i
                    v-if="isLiked"
                    class="bi bi-heart-fill fs-3 link-info"
                    @click.prevent="isLiked = !isLiked"
                  ></i>
                  <i
                    v-else
                    class="bi bi-heart fs-3 link-gray"
                    @click.prevent="isLiked = !isLiked"
                  ></i>
                </div>
              </div>
              <div class="d-flex flex-wrap">
                <template v-for="value in Object.keys(company)" :key="value">
                  <div
                    v-if="
                      company[value] &&
                      value !== '編號' &&
                      value !== '廠商' &&
                      value !== '網址' &&
                      value !== '類別'
                    "
                  >
                    <span
                      class="badge rounded-pill text-bg-secondary fw-normal fs-6 me-2 mb-2"
                      :class="[
                        { 'bg-warning': MultipleTypeArray.includes(value) },
                        { 'text-dark': MultipleTypeArray.includes(value) }
                      ]"
                    >
                      {{ value }}
                    </span>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
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
