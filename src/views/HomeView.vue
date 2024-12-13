<script setup>
import axios from 'axios'
import { computed, onMounted, ref, watch, nextTick } from 'vue'
import Loading from 'vue-loading-overlay'
import { useRoute, useRouter } from 'vue-router'
import _ from 'lodash'
import { convertToObjects, covertAllObjects, extractMatchingKeys, merge } from '../utils/coverArray'
import IndustryComponent from '@/components/IndustryComponent.vue'
import IndustryListComponent from '@/components/IndustryListComponent.vue'
const router = useRouter()
const route = useRoute()
const apiKey = import.meta.env.VITE_APP_APIKEY
const sheetId = import.meta.env.VITE_APP_SHEETID
const selectedindustry = ref('全部')
const isLoading = ref(false)
const hotpot = ref([])
const allIndustryData = ref([])
async function getSheetData(industry = '全部') {
  isMatched = false
  isLoading.value = true
  selectedindustry.value = industry
  const range = `${industry}`
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`
  try {
    const response = await axios.get(url)
    isLoading.value = false
    const values = response.data.values
    keys.value = values[0].slice(2, -3)
    industryKey.value = values[0].slice(2, -2)
    hotpot.value = convertToObjects(values)
    allIndustryData.value = covertAllObjects(hotpot.value)

    if (route.query.search) {
      searchContent.value = route.query.search
      matchkeyword.value = MatchkeywordFn()
      matchTypeArray.value = extractMatchingKeys(hotpot.value, matchkeyword.value)
      searchCompany.value = searchCompanyFn(route.query.search) // 確保在數據載入完成後執行搜索
    } else {
      searchCompany.value = []
      matchTypeArray.value = []
      matchkeyword.value = []
    }
    MultipleTypeArray.value = route.query.MultipleTypeArray
      ? JSON.parse(route.query.MultipleTypeArray)
      : []
    getType()
  } catch (error) {
    isLoading.value = false
    console.error('Error fetching values:', error)
  }
}
// 取得物件 KEY
const industryKey = ref([])
const keys = ref([])
// 篩選廠商
const selected = ref([])
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

// 搜尋相關功能
const searchContent = ref('')
const input = ref(null)
const matchkeyword = ref([])
const matchTypeArray = ref([])
const searchCompany = ref([])
const scrollbox = ref(null)
const isInputZh = ref(false)
const compositionstart = () => {
  isInputZh.value = true
}
const compositionend = () => {
  isInputZh.value = false
}
// 子元件切換廠商類別
const industries = ['火鍋', '飲料', '剉冰', '燒烤', '烘焙', '早餐', '牛排']
const handleIndustryChange = (industry) => {
  router.push({ query: {} })
  selectedindustry.value = industry
  searchContent.value = ''
}
const handleSearchChange = async (newSearchContent) => {
  searchContent.value = newSearchContent

  // 當搜索內容變更時，只保留 search 參數
  router.replace({
    path: '/',
    query: {
      search: newSearchContent
    }
  })
  await getSheetData('全部')
  await nextTick(() => {
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

const toScroll = () => {
  if (isInputZh.value) return
  handleSearchChange(searchContent.value)
}
const debouncedSearch = _.debounce(toScroll, 600)
const scrollToTop = () => {
  window.scrollTo(0, 0)
  searchContent.value = ''
  matchkeyword.value = []
  matchTypeArray.value = []
  searchCompany.value = []
  router.replace({ query: {} })
}
watch(
  matchkeyword,
  () => {
    matchTypeArray.value = extractMatchingKeys(hotpot.value, matchkeyword.value)
    searchCompany.value = searchCompanyFn(route.query.search) //
  },
  { deep: true }
)
// 處理搜索內容變更
let filterMatchArr = ref([])

const MatchkeywordFn = () => {
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
  filterMatchArr.value = [...uniqueArray]
  return uniqueArray
}
let isMatched = true
const handleMatchKeywordArray = (keyword) => {
  if (!isMatched) {
    matchkeyword.value = []
    isMatched = true
  }
  const index = matchkeyword.value.indexOf(keyword)
  if (index > -1) {
    matchkeyword.value.splice(index, 1)
  } else {
    matchkeyword.value.push(keyword)
  }
}

const searchCompanyFn = (value) => {
  if (!value) {
    searchCompany.value = []
    return
  }
  const arr = hotpot.value.filter((item) => {
    // 檢查指定的 key 是否包含所有指定的 value
    const hasAllValues = industryKey.value.some((key) =>
      matchkeyword.value.some((value) => item[key] && item[key].includes(value))
    )
    return hasAllValues
  })
  return merge(arr)
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
function goCompany(industry) {
  router.push({
    path: `company/${industry}`,
    query: {
      search: searchContent.value,
      selectedindustry: selectedindustry.value,
      MultipleTypeArray: JSON.stringify(MultipleTypeArray.value),
      selected: JSON.stringify(selected.value)
    }
  })
}

onMounted(() => {
  getSheetData(selectedindustry.value)
  if (route.query.selectedindustry !== '全部' && route.query.selectedindustry) {
    getSheetData(route.query.selectedindustry)
    return
  }
})
watch(
  () => selectedindustry.value,
  () => {
    getSheetData(selectedindustry.value)
  }
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
        ref="input"
        type="text"
        class="form-control border-0"
        placeholder="搜尋食材/廠商"
        v-model="searchContent"
        @input="debouncedSearch"
        @compositionstart="compositionstart"
        @compositionend="compositionend"
      />

      <button class="btn btn-dark btn-sm rounded-0" type="button">
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
              class="btn btn-custom border-0 me-1"
              :class="{ active: selectedindustry === '全部' }"
              @click="handleIndustryChange('全部')"
            >
              全部
            </button>
          </li>
          <IndustryListComponent
            class="me-1"
            v-for="industry in industries"
            :key="industry"
            :selectedindustry="selectedindustry"
            @change-industry="handleIndustryChange"
            :industry="industry"
          />
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
            <li class="me-2" v-for="objKey in industryKey" :key="objKey">
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
            <li class="me-2" v-for="item in displayedType" :key="item">
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
                {{ showAll ? '收起－' : '更多+' }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <h3 class="fs-6 text-black text-opacity-50" v-if="selectedindustry !== '全部'">廠商</h3>
    <!-- 搜尋結果 -->
    <div v-if="route.query.search" ref="scrollbox">
      <p class="h5">
        以下為 <span class="text-danger">{{ route.query.search }} </span> 的搜尋結果
        <button type="button" class="btn btn-sm btn-danger me-2" @click.prevent="scrollToTop">
          <span class="material-symbols-outlined d-inline-block align-middle"> close </span>
        </button>
      </p>
      <div class="mb-2">
        已選取：<span
          v-for="selected in matchkeyword"
          :key="selected"
          class="badge rounded-pill text-bg-secondary fw-normal fs-6 bg-warning me-2 mb-1"
        >
          {{ selected }}
        </span>
      </div>
      <div class="pb-2">
        全部：<span
          class="btn bedge-custom rounded-pill me-1 mb-1"
          :class="{ active: matchkeyword.includes(keyword) }"
          v-for="keyword in filterMatchArr"
          :key="keyword"
          @click.prevent="handleMatchKeywordArray(keyword)"
          >{{ keyword }}</span
        >
      </div>
      <div class="text-center py-5" v-if="!searchCompany?.length">
        <img src="../assets/Empty.png" alt="無資料" />
      </div>
      <div class="row g-3" v-else>
        <div class="col-xxs-6 col-lg-3" v-for="company in searchCompany" :key="company['編號']">
          <IndustryComponent
            @go-company="goCompany"
            :company="company"
            :mutiple-type-array="matchTypeArray"
            :tag="['編號', '廠商', '網址', '類別', '公司簡介', '評測']"
          />
        </div>
      </div>
    </div>
    <!-- end -->
    <!-- 單獨廠商 -->
    <div class="row g-3" v-else-if="selectedindustry !== '全部' && !route.query.search">
      <template v-if="filterCompany.length">
        <div class="col-xxs-6 col-lg-3" v-for="company in filterCompany" :key="company['編號']">
          <IndustryComponent
            @go-company="goCompany"
            :company="company"
            :mutiple-type-array="MultipleTypeArray"
            :tag="['編號', '廠商', '網址', '評測']"
          />
        </div>
      </template>
      <template v-else>
        <div class="text-center py-5">
          <img src="../assets/Empty.png" alt="無資料" />
        </div>
      </template>
    </div>
    <!-- 全部廠商 -->
    <template v-if="selectedindustry === '全部' && !route.query.search">
      <div class="mb-4" v-for="industry in allIndustryData" :key="industry['編號']">
        <h3 class="fs-6 text-black text-opacity-50">{{ Object.keys(industry).toString() }}</h3>
        <div class="row g-3">
          <div
            class="col-xxs-6 col-lg-3"
            v-for="company in industry[Object.keys(industry)]"
            :key="company['編號']"
          >
            <IndustryComponent
              @go-company="goCompany"
              :company="company"
              :mutiple-type-array="MultipleTypeArray"
              :tag="['編號', '廠商', '網址', '類別', '公司簡介', '評測']"
            />
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
