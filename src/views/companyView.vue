<script setup>
import { computed, ref } from 'vue'

const hotpot = ref([
  {
    廠商: '某某食品',
    火鍋料: '魚丸,燕餃,玉子燒',
    肉類: ''
  },
  {
    廠商: '某某廠商',
    火鍋料: '魚卵麻糬,魚卵果,玉子燒,九層花枝翅,芝心包',
    肉類: ''
  }
])
// 篩選廠商
const selected = ref('')
const resCompany = computed(() => {
  return newData.filter((item) => item.gridient.toString().includes(selected.value))
})
// 整理資料格式
const newData = hotpot.value.map((item) => {
  return { company: item['廠商'], gridient: item['火鍋料'].split(','), meat: item['肉類'] }
})
console.log(newData)
//const company = newData.map((item) => item.company)
const gri = newData.map((item) => {
  const arr = [...item.gridient]
  return arr
})
console.log(gri)
const res = gri.reduce((pre, cur) => pre.concat(cur), [])
console.log(res)
// -------- end -------
</script>
<template>
  <div class="container">
    <div class="row mb-3">
      <div class="col">
        <h3 class="fs-6">行業</h3>
        <ul class="d-flex fs-3">
          <li><a href="#" class="btn btn-outline-primary border-0">飲料店</a></li>
          <li><a href="#" class="btn btn-outline-primary border-0">火鍋店</a></li>
          <li><a href="#" class="btn btn-outline-primary border-0">燒烤店</a></li>
          <li><a href="#" class="btn btn-outline-primary border-0">挫冰店</a></li>
        </ul>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col">
        <h3 class="fs-6">種類</h3>
        <ul class="d-flex fs-3">
          <li v-for="item in res" :key="item">
            <a href="#" class="btn btn-outline-primary border-0" @click.prevent="selected = item">{{
              item
            }}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col">
        <h3 class="fs-6">類型</h3>
        <ul class="d-flex fs-3">
          <li><a href="#" class="btn btn-outline-primary border-0">飲料店</a></li>
          <li><a href="#" class="btn btn-outline-primary border-0">火鍋店</a></li>
          <li><a href="#" class="btn btn-outline-primary border-0">燒烤店</a></li>
          <li><a href="#" class="btn btn-outline-primary border-0">挫冰店</a></li>
        </ul>
      </div>
    </div>
    <h3 class="fs-6">飲料廠商</h3>
    <div class="row">
      <div class="col-6 col-lg-3" v-for="item in resCompany" :key="item['廠商']">
        <div class="bg-secondary py-3 rounded-5">
          <div class="d-flex justify-content-between px-4 mb-3">
            <div>
              <a href="#" class="pe-3">{{ item.company }}</a>
            </div>
            <div>
              <a href="#"><i class="bi bi-heart"></i></a>
            </div>
          </div>
          <div class="row text-center">
            <div class="col-6" v-for="(n, i) in item.gridient" :key="i">
              <a href="#" class="btn btn-primary rounded-pill mb-3">{{ n }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
