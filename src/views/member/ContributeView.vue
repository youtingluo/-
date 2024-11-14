<template>
  <div class="container py-3">
    <h1 class="mb-4 text-center">投稿</h1>
    <div class="row justify-content-center mb-3">
      <div class="col-lg-8">
        <VForm ref="sendForm" @submit="onSubmit" v-slot="{ errors }">
          <div class="mb-3">
            <label for="contactName" class="form-label"
              >聯絡人名稱<span class="text-danger">*</span></label
            >
            <VField
              name="聯絡人"
              type="text"
              class="form-control"
              id="contactName"
              placeholder="聯絡人名稱"
              v-model.trim="form.name"
              rules="required"
              :class="{ 'is-invalid': errors['聯絡人'] }"
            />
            <ErrorMessage name="聯絡人" class="invalid-feedback" />
          </div>
          <div class="mb-3">
            <label for="company" class="form-label">代表單位(公司)</label>
            <VField
              name="company"
              type="text"
              class="form-control"
              id="company"
              placeholder="單位名稱"
              v-model.trim="form.company"
            />
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">聯絡信箱<span class="text-danger">*</span></label>
            <VField
              name="聯絡信箱"
              type="email"
              class="form-control"
              id="email"
              placeholder="聯絡信箱"
              v-model.trim="form.email"
              rules="required|email"
              :class="{ 'is-invalid': errors['聯絡信箱'] }"
            />
            <ErrorMessage name="聯絡信箱" class="invalid-feedback" />
          </div>
          <div class="mb-3">
            <label for="tel" class="form-label">聯絡電話</label>
            <VField
              name="聯絡電話"
              type="tel"
              class="form-control"
              id="tel"
              placeholder="聯絡電話"
              v-model.number.trim="form.phone"
              rules="numeric|min:8"
              :class="{ 'is-invalid': errors['聯絡電話'] }"
            />
            <ErrorMessage name="聯絡電話" class="invalid-feedback" />
          </div>
          <hr />
          <VField
            @change="cleanType"
            class="form-select mb-3"
            name="回饋方案"
            aria-label="回饋方案"
            v-model="form.type"
            rules="required"
            :class="{ 'is-invalid': errors['回饋方案'] }"
            as="select"
          >
            <option disabled value="">選擇回饋方案</option>
            <option value="合作聯繫">合作聯繫</option>
            <option value="實際評測">實際評測</option>
          </VField>
          <div v-if="form.type === '合作聯繫'">
            <div class="mb-2">
              <label for="cooperateCompany" class="form-label"
                >公司<span class="text-danger">*</span></label
              >
              <VField
                name="公司名稱"
                type="text"
                class="form-control"
                id="cooperateCompany"
                placeholder="公司名稱"
                v-model.trim="form.cooperateCompany"
                rules="required"
                :class="{ 'is-invalid': errors['公司名稱'] }"
              />
              <ErrorMessage name="公司名稱" class="invalid-feedback" />
            </div>
            <div class="mb-3">
              <label for="case" class="form-label"
                >合作方案<span class="text-danger">*</span></label
              >
              <VField
                name="合作內容"
                type="text"
                class="form-control"
                id="case"
                placeholder="合作內容"
                v-model="form.cooperateContent"
                rows="4"
                as="textarea"
                rules="required"
                :class="{ 'is-invalid': errors['合作內容'] }"
              ></VField>
              <ErrorMessage name="合作內容" class="invalid-feedback" />
            </div>
          </div>
          <div v-else-if="form.type === '實際評測'">
            <div class="row mb-2">
              <div class="col">
                <label for="manufacturer" class="form-label"
                  >廠商<span class="text-danger">*</span></label
                >
                <VField
                  name="食品廠商"
                  id="manufacturer"
                  type="text"
                  class="form-control"
                  placeholder="食品廠商"
                  aria-label="First name"
                  v-model.trim="form.manufacturer"
                  rules="required"
                  :class="{ 'is-invalid': errors['食品廠商'] }"
                />
                <ErrorMessage name="食品廠商" class="invalid-feedback" />
              </div>
              <div class="col">
                <label for="recip" class="form-label">食材<span class="text-danger">*</span></label>
                <VField
                  name="食材"
                  id="recip"
                  type="text"
                  class="form-control"
                  placeholder="範例：珍珠/紅茶/貢丸"
                  v-model.trim="form.recipe"
                  rules="required"
                  :class="{ 'is-invalid': errors['食材'] }"
                />
                <ErrorMessage name="食材" class="invalid-feedback" />
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label" for="experience"
                >食譜與心得<span class="text-danger">*</span></label
              >
              <VField
                name="食譜與心得"
                class="form-control"
                placeholder="食譜作法必填,包含心得,最少200字"
                id="experience"
                rows="8"
                v-model="form.experience"
                as="textarea"
                rules="required|min:200"
                :class="{ 'is-invalid': errors['食譜與心得'] }"
              ></VField>
              <ErrorMessage name="食譜與心得" class="invalid-feedback" />
            </div>
          </div>
          <button type="submit" class="btn btn-primary w-100" :disabled="isLoading">
            <span
              v-if="isLoading"
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            寄出信件
          </button>
        </VForm>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
const toast = inject('$toast')
const swal = inject('$swal')
const isLoading = ref(false)
const sendForm = ref(null)
const form = ref({
  name: '',
  company: '',
  email: '',
  phone: '',
  type: '',
  cooperateCompany: '',
  cooperateContent: '',
  manufacturer: '',
  recipe: '',
  experience: ''
})
const cleanType = () => {
  form.value.manufacturer = ''
  form.value.recipe = ''
  form.value.experience = ''
  form.value.cooperateCompany = ''
  form.value.cooperateContent = ''
}

const onSubmit = async () => {
  isLoading.value = true
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
        合作方案: form.value.cooperateContent,
        食品廠商: form.value.manufacturer,
        食材: form.value.recipe,
        食譜與心得: form.value.experience
      })
    })
    if (response.ok) {
      isLoading.value = false
      toast.fire({
        icon: 'success',
        title: '信件寄出成功'
      })
      sendForm.value.resetForm()
    }
  } catch (error) {
    isLoading.value = false
    console.error('Error:', error)
    swal.fire({
      icon: 'error',
      title: '信件寄出失敗'
    })
  }
}
</script>
