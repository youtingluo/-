<script setup>
import { ref } from 'vue'

const searchContent = ref('')
const input = ref(null)
</script>

<template>
  <div class="container">
    <div class="input-group bg-white">
      <button
        class="btn"
        type="button"
        @click="
          () => {
            searchContent = ''
          }
        "
      >
        <i class="bi bi-chevron-left"></i>
      </button>
      <input
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
  <div class="container mt-4" v-for="i in 20" :key="i">
    <div class="row mb-4">
      <div class="col">
        <h3 class="fs-6 text-black text-opacity-50">茶葉</h3>
        <ul class="d-flex flex-wrap fs-3">
          <li>
            <a href="#" class="btn btn-custom border-0">紅茶</a>
          </li>
          <li>
            <a href="#" class="btn btn-custom border-0">紅茶</a>
          </li>
          <li>
            <a href="#" class="btn btn-custom border-0">紅茶</a>
          </li>
          <li>
            <a href="#" class="btn btn-custom border-0">紅茶</a>
          </li>
          <li>
            <a href="#" class="btn btn-outline-primary border-0"> 更多 </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="container sticky-bottom bg-white py-3">
    <div class="row justify-content-between">
      <div class="col-4">
        <button type="button" class="btn btn-outline-primary btn-lg w-100">清空</button>
      </div>
      <div class="col-8">
        <button type="button" class="btn btn-primary text-white btn-lg w-100">套用</button>
      </div>
    </div>
  </div>
</template>
<style>
.height-100 {
  height: 400px;
}
</style>
