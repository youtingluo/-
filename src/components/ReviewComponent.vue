<script setup>
import { defineProps } from 'vue'

defineProps({
  reviewContent: {
    type: Array,
    default: () => []
  }
})
</script>
<template>
  <div v-if="reviewContent.length">
    <div class="row g-3">
      <div class="col-lg-6" v-for="item in reviewContent" :key="item['品項']">
        <div class="p-3 mb-3 rounded-5 bg-light h-100">
          <div class="d-flex justify-content-between">
            <div>
              <h3 class="fs-5">
                <img class="rounded-circle me-2" src="../assets/Shape.png" alt="avatar" />管理員
              </h3>

              <p class="star-null fs-5 d-flex align-items-center">
                <span class="text-info">{{ item['星級'] }} </span>
                <span
                  v-for="index in 5"
                  :key="index"
                  :class="{
                    'material-symbols-outlined fill-symbol text-info': index <= item['星級'],
                    'material-symbols-outlined fill-symbol': index > item['星級']
                  }"
                >
                  star
                </span>
              </p>
            </div>
            <div>
              <img src="../assets/r-Photoroom.png" alt="mark" />
            </div>
          </div>

          <p class="fs-4 text-primary">{{ item['品項'] }}</p>
          <p>
            {{ item['實際評測'] }}
          </p>
          <div class="d-flex justify-content-between align-items-center">
            <span
              ><span class="material-symbols-outlined fill-symbol text-primary">
                thumb_up
              </span></span
            >

            <button type="button" class="btn btn-outline-primary" disabled>
              <i class="bi bi-hand-thumbs-up"></i>
              同意評價
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="d-flex flex-column align-items-center">
    <img class="mb-3" src="../assets/Empty.png" alt="尚無資料" />
  </div>
</template>

<style scoped>
.star-null {
  color: #cdcdcd;
}
</style>
