<template>
  <nav class="navbar bg-white shadow-sm mb-5 sticky-top">
    <div class="container">
      <div class="d-flex w-100">
        <div>
          <a href="#" class="navbar-brand" @click.prevent="resetAndGoHome">
            <img src="/src/assets/LOGO.png" alt="LOGO" />
          </a>
        </div>
      </div>
    </div>
  </nav>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            {{ form.name }}
            <label for="contactName" class="form-label">聯絡人名稱(必填)</label>
            <input
              type="text"
              class="form-control"
              id="contactName"
              placeholder="聯絡人名稱"
              v-model="form.name"
            />
          </div>
          <div class="mb-3">
            <label for="company" class="form-label">代表單位（公司）</label>
            <input type="text" class="form-control" id="company" placeholder="聯絡人名稱" />
          </div>
          <p class="form-label">聯絡資訊</p>
          <div class="form-floating mb-2">
            <input type="email" class="form-control" id="email" placeholder="信箱(必填)" />
            <label for="email">信箱(必填)</label>
          </div>
          <div class="form-floating mb-3">
            <input type="tel" class="form-control" id="tel" placeholder="聯絡電話" />
            <label for="tel">聯絡電話</label>
          </div>
          <select
            @change="form.cooperateCompany = ''"
            class="form-select mb-3"
            aria-label="回饋種類"
            v-model="form.type"
          >
            <option selected disabled value="">回饋種類</option>
            <option>合作聯繫</option>
            <option>實際評測</option>
          </select>
          <div v-if="form.type === '合作聯繫'">
            <div class="form-floating mb-2">
              <input
                type="text"
                class="form-control"
                id="cooperateCompany"
                placeholder="公司(必填)"
                v-model="form.cooperateCompany"
              />
              <label for="cooperateCompany" class="form-label">公司(必填)</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                id="case"
                placeholder="合作方案"
                v-model="form.case"
              />
              <label for="case" class="form-label">合作方案</label>
            </div>
          </div>
          <div v-else-if="form.type === '實際評測'">
            <div class="form-floating mb-2">
              <input
                type="text"
                class="form-control"
                id="recipe"
                placeholder="食譜"
                v-model="form.recipe"
              />
              <label for="recipe" class="form-label">食譜</label>
            </div>
            <div class="form-floating mb-2">
              <input
                type="text"
                class="form-control"
                id="manufacturer"
                placeholder="廠商"
                v-model="form.manufacturer"
              />
              <label for="manufacturer" class="form-label">廠商</label>
            </div>
            <div class="form-floating mb-2">
              <textarea
                class="form-control"
                id="experience"
                maxlength="200"
                rows="5"
                v-model="form.experience"
              ></textarea>

              <label for="experience" class="form-label">心得</label>
            </div>
          </div>
          <button type="submit" class="btn btn-primary w-100">寄出信件</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { user } from '../../main'
console.log(user)
const form = ref({
  name: '',
  company: '',
  email: '',
  phone: '',
  type: '',
  cooperateCompany: '',
  case: '',
  recipe: '',
  manufacturer: '',
  experience: ''
})
const handleSubmit = async () => {
  try {
    const response = await fetch('https://formspree.io/f/mzzbbjkj', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        聯絡人名稱: form.value.name,
        代表單位: form.value.email,
        信箱: form.value.email,
        電話: form.value.phone,
        type: form.value.type,
        cooperateCompany: form.value.cooperateCompany,
        case: form.value.case,
        recipe: form.value.recipe,
        manufacturer: form.value.manufacturer,
        experience: form.value.experience
      })
    })
    if (response.ok) {
      alert('Email sent successfully!')
      form.value = {}
    } else {
      alert('Failed to send email.')
    }
  } catch (error) {
    console.error('Error:', error)
    alert('Error occurred while sending email.')
  }
}
</script>
