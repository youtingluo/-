<script setup>
import axios from 'axios'
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import Loading from 'vue-loading-overlay'
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()
const apiKey = import.meta.env.VITE_APP_APIKEY
const sheetId = import.meta.env.VITE_APP_SHEETID
// 取得資料
const selectedindustry = ref('')
const isLoading = ref(false)
async function getSheetData(industry = '全部') {
  isLoading.value = true
  selectedindustry.value = industry
  const range = `${industry}!A1:AA70`
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`
  try {
    const response = await axios.get(url)
    isLoading.value = false
    // values 為正式資料
    const values = response.data.values
    keys.value = values[0].slice(2, -1)
    hotpot.value = convertToObjects(values)
    convertToObjects(hotpot.value)
    MultipleTypeArray.value = route.query.MultipleTypeArray
      ? JSON.parse(route.query.MultipleTypeArray)
      : []
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
      const offset = 110 // 偏移量，與導航欄高度一致
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = scrollbox.value.getBoundingClientRect().top
      const offsetPosition = elementRect - bodyRect - offset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  })
}
const scrollToTop = () => {
  window.scrollTo(0, 0)
  isSearched.value = false
  searchContent.value = ''
}
const isSearched = ref(false)
const searchContent = ref('')
const input = ref(null)
const showInput = () => {
  isSearched.value = true
  input.value.focus()
}
const Matchkeyword = computed(() => {
  const results = []
  const keyword = searchContent.value
  hotpot.value.forEach((item) => {
    const regex = new RegExp(keyword, 'i')
    keys.value.forEach((key) => {
      if (regex.test(item[key])) {
        const matches = item[key].split(',').filter((word) => regex.test(word))
        results.push(...matches)
      }
    })
  })
  const uniqueArray = Array.from(new Set(results))
  return uniqueArray
})
const searchCompany = computed(() => {
  const keyWord = ref([])
  return hotpot.value.filter((item) => {
    //const regex = new RegExp(searchContent.value.split('').join('.*'), 'i') // 模糊搜尋
    const regex = new RegExp(searchContent.value, 'i')
    // 檢查每個 key 是否有匹配
    const hasMatch = keys.value.some((key) => {
      const match = regex.test(item[key])
      // 如果匹配到了，把完整字串加入到 matchedKeywords

      if (match) {
        keyWord.value.push(item[key])
      }
      return match
    })

    return hasMatch
  })
})
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
// 多選種類
const addMultipleItem = (item) => {
  const index = selected.value.indexOf(item)
  if (index > -1) {
    selected.value.splice(index, 1)
  } else {
    selected.value.push(item)
  }
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
  selected.value = route.query.selected ? JSON.parse(route.query.selected) : []
  // 移除重複陣列資料
  filterType.value = [...new Set(type.filter(Boolean).join().split(','))]
}
const displayedType = computed(() => {
  return showAll.value ? filterType.value : filterType.value.slice(0, 8)
})
// -------- end -------
function goCompany(id) {
  router.push({
    path: `company/${id}`,
    query: {
      selectedindustry: selectedindustry.value,
      MultipleTypeArray: JSON.stringify(MultipleTypeArray.value),
      selected: JSON.stringify(selected.value)
    }
  })
}

onMounted(() => {
  if (route.query.selectedindustry !== '全部' && route.query.selectedindustry) {
    getSheetData(route.query.selectedindustry)
    return
  }
  getSheetData()
})
// 回首頁
// function resetAndGoHome() {
//   router.push({ name: 'home', query: {} })
//   selectedindustry.value = '全部'
//   MultipleTypeArray.value = []
//   selected.value = []

//   getSheetData()
// }

watch(
  () => selectedindustry.value,
  () => {
    getSheetData(selectedindustry.value)
  },
  { deep: true }
)
</script>
<template>
  <Loading v-model:active="isLoading">
    <div class="loader"></div>
  </Loading>

  <div class="container py-3">
    <div class="input-group mb-3 search-bar shadow-sm">
      <button class="btn btn-light btn-sm rounded-0" type="button" @click="scrollToTop">
        <span class="material-symbols-outlined d-inline-block align-middle">
          chevron_backward
        </span>
      </button>
      <input
        @input="toScroll"
        ref="input"
        type="text"
        class="form-control border-0"
        placeholder="搜尋食材/廠商"
        v-model="searchContent"
      />

      <button class="btn btn-dark btn-sm rounded-0" type="button" @click="showInput">
        <span class="material-symbols-outlined"> search </span>
      </button>
    </div>
    <div class="border-bottom border-2 mb-4">
      <div class="mb-4">
        <h3 class="fs-6 text-black text-opacity-50">廠商行業</h3>
        <ul class="d-flex fs-3 mb-3 flex-wrap">
          <li>
            <button
              type="button"
              class="btn btn-custom border-0"
              :class="{ active: selectedindustry === '全部' }"
              @click="
                () => {
                  router.push({ query: {} })
                  selectedindustry = '全部'
                }
              "
            >
              全部
            </button>
          </li>
          <li>
            <button
              type="button"
              class="btn btn-custom border-0"
              :class="{ active: selectedindustry === '火鍋' }"
              @click="
                () => {
                  router.push({ query: {} })
                  selectedindustry = '火鍋'
                }
              "
            >
              火鍋
            </button>
          </li>
          <li>
            <button
              type="button"
              class="btn btn-custom border-0"
              :class="{ active: selectedindustry === '飲料' }"
              @click="
                () => {
                  router.push({ query: {} })
                  selectedindustry = '飲料'
                }
              "
            >
              飲料
            </button>
          </li>
          <li>
            <button
              type="button"
              class="btn btn-custom border-0"
              :class="{ active: selectedindustry === '剉冰' }"
              @click="
                () => {
                  router.push({ query: {} })
                  selectedindustry = '剉冰'
                }
              "
            >
              剉冰
            </button>
          </li>
          <li>
            <button
              type="button"
              class="btn btn-custom border-0"
              :class="{ active: selectedindustry === '燒烤' }"
              @click="
                () => {
                  router.push({ query: {} })
                  selectedindustry = '燒烤'
                }
              "
            >
              燒烤
            </button>
          </li>
          <li>
            <button
              type="button"
              class="btn btn-custom border-0"
              :class="{ active: selectedindustry === '烘焙' }"
              @click="
                () => {
                  router.push({ query: {} })
                  selectedindustry = '烘焙'
                }
              "
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
                @click="
                  () => {
                    MultipleTypeArray = []
                    selected = []
                  }
                "
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
                class="btn text-primary border-0"
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
    <h3 class="fs-6 text-black text-opacity-50" v-if="selectedindustry !== '全部'">廠商</h3>
    <!-- 搜尋結果 -->
    <div v-if="searchContent.trim()" ref="scrollbox">
      <p class="h5">
        以下為 <span class="text-danger">{{ searchContent }} </span> 的搜尋結果
        <button type="button" class="btn btn-sm btn-danger fs-6" @click.prevent="scrollToTop">
          <span class="material-symbols-outlined d-inline-block align-middle"> close </span>
        </button>
      </p>
      <div class="pb-2">
        <span
          class="badge rounded-pill text-bg-dark me-1 mb-1"
          v-for="keyword in Matchkeyword"
          :key="keyword"
          >{{ keyword }}</span
        >
      </div>
      <div class="text-center py-5" v-if="!searchCompany.length">
        <img src="../assets/Empty.png" alt="無資料" />
      </div>
      <div class="row gx-2">
        <div class="col-6 col-lg-3 mb-3" v-for="company in searchCompany" :key="company['編號']">
          <RouterLink target="_blank" :to="`/company/${company['編號']}`">
            <div class="p-3 rounded-5 h-100 shadow-sm bg-white">
              <div class="d-flex justify-content-between mb-3">
                <div>
                  <a :href="company['網址']" target="_blank" class="fs-6" @click.stop>{{
                    company['廠商']
                  }}</a>
                </div>
                <div>
                  <i
                    v-if="isLiked"
                    class="bi bi-heart-fill fs-4 link-info"
                    @click.prevent="isLiked = !isLiked"
                  ></i>
                  <i
                    v-else
                    class="bi bi-heart fs-4 link-gray"
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
                      value !== '類別' &&
                      value !== '公司簡介'
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
            </div></RouterLink
          >
        </div>
      </div>
    </div>
    <!-- end -->
    <!-- 單獨廠商 -->
    <div class="row gx-2" v-else-if="selectedindustry !== '全部'">
      <div class="col-6 col-lg-3 mb-3" v-for="company in filterCompany" :key="company['編號']">
        <a href="#" @click.prevent="goCompany(company['編號'])">
          <div class="p-3 rounded-5 h-100 shadow-sm bg-white">
            <div class="d-flex justify-content-between mb-3">
              <div>
                <a :href="company['網址']" target="_blank" class="fs-6" @click.stop>{{
                  company['廠商']
                }}</a>
              </div>
              <div>
                <i
                  v-if="isLiked"
                  class="bi bi-heart-fill fs-4 link-info"
                  @click.prevent="isLiked = !isLiked"
                ></i>
                <i
                  v-else
                  class="bi bi-heart fs-4 link-gray"
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
          </div></a
        >
      </div>
    </div>
    <!-- 全部廠商 -->
    <template v-if="selectedindustry === '全部' && !searchContent">
      <div class="mb-4" v-for="industry in allIndustryData" :key="industry['編號']">
        <h3 class="fs-6 text-black text-opacity-50">{{ Object.keys(industry).toString() }}</h3>
        <div class="row gx-2">
          <div
            class="col-6 col-lg-3 mb-3"
            v-for="company in industry[Object.keys(industry)]"
            :key="company['編號']"
          >
            <a href="#" @click.prevent="goCompany(company['編號'])">
              <div class="p-3 rounded-5 h-100 shadow-sm bg-white">
                <div class="d-flex justify-content-between mb-3">
                  <div>
                    <a :href="company['網址']" target="_blank" class="fs-6" @click.stop>{{
                      company['廠商']
                    }}</a>
                  </div>
                  <div>
                    <i
                      v-if="isLiked"
                      class="bi bi-heart-fill fs-4 link-info"
                      @click.prevent="isLiked = !isLiked"
                    ></i>
                    <i
                      v-else
                      class="bi bi-heart fs-4 link-gray"
                      @click.prevent="isLiked = !isLiked"
                    ></i>
                  </div>
                </div>
                <div class="d-flex flex-wrap">
                  <template v-for="value in Object.keys(company)" :key="value">
                    <div
                      v-if="
                        company[value] &&
                        !['編號', '廠商', '網址', '類別', '公司簡介'].includes(value)
                      "
                    >
                      <span class="badge rounded-pill text-bg-secondary fw-normal fs-6 me-2 mb-2">
                        {{ value }}
                      </span>
                    </div>
                  </template>
                </div>
              </div></a
            >
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<style scoped>
.search-bar {
  position: sticky;
  top: 54.66px;
}
</style>
