<script setup>
import { ref, watch } from 'vue'
import { useFavoriteStore } from '@/store/favorite'
const favoriteStore = useFavoriteStore()
// 本地狀態，用於立即反饋
const props = defineProps({
  company: Object,
  mutipleTypeArray: Array,
  tag: Array
})
const localIsFavorite = ref(favoriteStore.isFavorite(props.company['廠商']))
const isLoading = ref(false)
//console.log(props.company['廠商'])

const handleToggleFavorite = async () => {
  // 防止重複點擊
  if (isLoading.value) return

  try {
    // 立即更新本地狀態
    localIsFavorite.value = !localIsFavorite.value

    // 開始載入
    isLoading.value = true

    // 等待 store 完成操作
    await favoriteStore.toggleFavorite(props.company['廠商'])
  } catch (error) {
    // 如果操作失敗，回復本地狀態
    localIsFavorite.value = favoriteStore.isFavorite(props.company['廠商'])
    console.error(error)
  } finally {
    // 結束載入
    isLoading.value = false
  }
}
// 監聽 store 中的收藏狀態變化
watch(
  () => favoriteStore.favorites,
  (newFavorites) => {
    localIsFavorite.value = newFavorites.includes(props.company['廠商'])
  },
  { deep: true }
)
defineEmits(['goCompany'])
import { onMounted } from 'vue'
onMounted(async () => {
  await favoriteStore.loadFavorites()
})
</script>
<template>
  <a
    class="text-decoration-none cursor-pointer"
    @click.prevent="$emit('goCompany', company['編號'])"
  >
    <div class="industry-card px-3 py-2 rounded-5 h-100 bg-white">
      <div class="d-flex flex-wrap justify-content-between align-items-center">
        <div>
          <span class="text-gray">{{ company['廠商'] }}</span>

          <span v-if="company['評測']" class="badge rounded-pill bg-info fw-normal ms-1">
            new
          </span>
        </div>
        <div class="d-flex align-items-center">
          <!-- <a @click.stop :href="company['網址']" target="_blank" class="link-gray d-inline-block"
            ><span class="material-symbols-outlined p-2"> language </span></a
          > -->
          <a
            @click.stop
            :href="company['網址']"
            target="_blank"
            class="link link-primary d-inline-block text-decoration-none py-2"
            ><span class="link-primary">
              Go
              <span class="material-symbols-outlined d-inline-block align-middle fs-5">
                open_in_new
              </span>
            </span></a
          >
          <div>
            <span
              @click.stop="handleToggleFavorite"
              class="material-symbols-outlined link-gray p-2"
              :class="localIsFavorite ? 'fill-symbol' : 'none'"
            >
              favorite
            </span>
          </div>
        </div>
      </div>
      <div class="d-flex flex-wrap py-2">
        <template v-for="value in Object.keys(company)" :key="value">
          <div v-if="!tag.includes(value)">
            <span
              class="badge rounded-pill text-bg-secondary fw-normal fs-6 me-2 mb-2"
              :class="[{ 'bg-warning': mutipleTypeArray.includes(value) }]"
            >
              {{ value }}
            </span>
          </div>
        </template>
      </div>
    </div></a
  >
</template>

<style>
.industry-card {
  transition: 0.3s ease;
  &:hover {
    box-shadow: 0 0.225rem 0.225rem #00000013;
  }
}
.link {
  display: inline-block;
  padding: 5px;
  text-align: center;
  transition: 0.2s;
  &:hover {
    transform: translateY(-5px);
  }
}
</style>
