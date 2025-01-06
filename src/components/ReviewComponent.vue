<script setup>
defineProps({
  reviewContent: {
    type: Array,
    default: () => []
  }
})
// let rating = 2.5
// const fullStar = Math.floor(rating) // 3
// const halfStar = rating % 1 !== 0 // true
// const nullStar = 5 - fullStar - halfStar
// console.log(fullStar, halfStar, nullStar)
</script>
<template>
  <div v-if="reviewContent.length">
    <div class="p-3 mb-3 rounded-5 bg-light h-100">
      <div class="d-flex justify-content-between align-items-center">
        <h3 class="fs-5">
          <img class="rounded-circle me-2" src="../assets/Shape.png" alt="avatar" />管理員
        </h3>
        <div>
          <img src="../assets/r-Photoroom.png" alt="mark" />
        </div>
      </div>
      <div class="review pt-2 pb-3" v-for="item in reviewContent" :key="item['品項']">
        <p class="star-null fs-5 d-flex align-items-center mb-1">
          <span class="text-info text-center pe-1">{{ item['星級'] }} </span>
          <span
            v-for="index in Math.floor(item['星級'])"
            :key="index"
            class="material-symbols-outlined fill-symbol text-info"
          >
            star
          </span>
          <span v-if="item['星級'] % 1 !== 0" class="material-symbols-outlined text-info">
            star_half
          </span>
          <span
            v-for="index in 5 - Math.floor(item['星級']) - (item['星級'] % 1 !== 0)"
            :key="index"
            class="material-symbols-outlined fill-symbol"
          >
            star
          </span>
        </p>
        <p class="fs-4 text-primary">{{ item['品項'] }}</p>
        <div class="d-flex flex-wrap flex-md-nowrap justify-content-center">
          <a class="mb-2 mb-md-0" :href="item['影片']" target="_blank">
            <img
              v-if="item['圖片']"
              class="object-cover rounded-3 shadow-sm"
              :src="item['圖片']"
              :alt="item['品項']"
              width="150"
            />
          </a>
          <p class="ms-md-2">
            {{ item['實際評測'] }}
          </p>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="d-flex flex-column align-items-center">
    <img class="mb-3" src="../assets/Empty.png" alt="尚無資料" />
  </div>
</template>
<style>
.review {
  border-bottom: 2px solid rgba(205, 205, 205, 0.3);
  &:last-child {
    border-bottom: none;
  }
}
</style>
