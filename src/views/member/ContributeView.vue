<template>
  <nav class="navbar bg-white shadow-sm mb-3 sticky-top">
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
            {{ form }}
            <label for="contactName" class="form-label"
              >聯絡人名稱<span class="text-danger">*</span></label
            >
            <input
              type="text"
              class="form-control"
              id="contactName"
              placeholder="聯絡人名稱"
              v-model="form.name"
            />
          </div>
          <div class="mb-3">
            <label for="company" class="form-label">代表單位(公司)</label>
            <input
              type="text"
              class="form-control"
              id="company"
              placeholder="單位名稱"
              v-model="form.company"
            />
          </div>
          <div class="mb-3">
            <label for="email" class="form-label"
              >聯絡信箱 <span class="text-danger">*</span></label
            >
            <input
              type="email"
              class="form-control"
              id="email"
              placeholder="聯絡信箱"
              v-model="form.email"
            />
          </div>
          <div class="mb-3">
            <label for="tel" class="form-label">聯絡電話</label>
            <input
              type="text"
              class="form-control"
              id="tel"
              placeholder="聯絡電話"
              v-model="form.phone"
            />
          </div>
          <hr />

          <select class="form-select mb-3" aria-label="回饋方案" v-model="form.type">
            <option disabled value="">選擇回饋方案</option>
            <option>合作聯繫</option>
            <option>實際評測</option>
          </select>
          <div v-if="form.type === '合作聯繫'">
            <div class="mb-2">
              <label for="cooperateCompany" class="form-label"
                >公司<span class="text-danger">*</span></label
              >
              <input
                type="text"
                class="form-control"
                id="cooperateCompany"
                placeholder="公司名稱"
                v-model="form.cooperateCompany"
              />
            </div>
            <div class="mb-3">
              <label for="case" class="form-label">合作方案</label>
              <textarea
                type="text"
                class="form-control"
                id="case"
                placeholder="合作內容"
                v-model="form.case"
                rows="4"
              ></textarea>
            </div>
          </div>
          <div v-else-if="form.type === '實際評測'">
            <div class="row mb-2">
              <div class="col">
                <label for="manufacturer" class="form-label">廠商</label>
                <input
                  id="manufacturer"
                  type="text"
                  class="form-control"
                  placeholder="食品廠商"
                  aria-label="First name"
                  v-model="form.manufacturer"
                />
              </div>
              <div class="col">
                <label for="recip" class="form-label">食材</label>
                <input
                  id="recip"
                  type="text"
                  class="form-control"
                  placeholder="範例：珍珠/紅茶/貢丸"
                  v-model="form.recipe"
                />
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label" for="experience">食譜與心得</label>
              <textarea
                class="form-control"
                placeholder="食譜作法必填,包含心得,最少200字"
                id="experience"
                minlength="200"
                rows="8"
                v-model="form.experience"
              ></textarea>
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
  manufacturer: '',
  recipe: '',
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
        代表單位: form.value.company,
        聯絡信箱: form.value.email,
        聯絡電話: form.value.phone,
        回饋方案: form.value.type,
        公司名稱: form.value.cooperateCompany,
        合作方案: form.value.case,
        食品廠商: form.value.manufacturer,
        食材: form.value.recipe,
        食譜與心得: form.value.experience
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
