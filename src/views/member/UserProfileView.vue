<!-- components/UserProfile.vue -->
<template>
  <div class="container mt-5">
    <h1 class="mb-4">會員中心</h1>
    <div class="card">
      <div class="card-body">
        <p class="card-title h5 text-primary">個人資料</p>
        <form>
          <div class="mb-3">
            <label for="email" class="form-label">電子郵件</label>
            <input
              type="email"
              class="form-control"
              id="email"
              :value="authStore.user.email"
              disabled
            />
          </div>
          <div class="mb-3">
            <div v-if="isEditing">
              <label for="displayName" class="form-label">暱稱</label>
              <input
                class="form-control mb-2"
                type="text"
                v-model="newDisplayName"
                :placeholder="authStore.user.displayName"
              />
              <button type="button" class="btn btn-primary me-2" @click="updateProfileInfo">
                儲存
              </button>
              <button type="button" class="btn btn-outline-primary" @click="isEditing = false">
                取消
              </button>
            </div>
            <div v-else>
              <label for="displayName" class="form-label">暱稱</label>
              <input
                type="text"
                class="form-control mb-2"
                id="displayName"
                :placeholder="authStore.user.displayName"
                disabled
              />
              <button type="button" @click="editProfileName" class="btn btn-primary">
                修改暱稱
              </button>
            </div>
          </div>
          <hr />
          {{ authStore.profileId }}
          <div class="mb-3" v-if="authStore.profileId === 'password'">
            <p class="card-title h5 text-primary">修改密碼</p>
            <div class="row">
              <div class="col-6">
                <label for="oldPassword" class="form-label">舊密碼</label>
                <input
                  type="password"
                  class="form-control"
                  id="oldPassword"
                  placeholder="輸入舊密碼"
                  v-model="currentPassword"
                />
              </div>
              <div class="col-6">
                <label for="newPassword" class="form-label">新密碼</label>
                <input
                  type="password"
                  class="form-control"
                  id="newPassword"
                  placeholder="輸入新密碼"
                  v-model="newPassword"
                />
              </div>
              <div class="col-12 col-lg-6 mt-2">
                <button
                  type="button"
                  class="btn btn-primary w-100"
                  @click.prevent="updateUserPassword"
                  :disabled="!currentPassword || !newPassword"
                >
                  確認修改
                </button>
                <p v-if="error" class="text-danger mt-3">{{ error }}</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/store/auth'
//const toast = inject('$toast')
const authStore = useAuthStore()
const isEditing = ref(false)
const newDisplayName = ref('')
const error = ref(null)
const currentPassword = ref('')
const newPassword = ref('')
const editProfileName = () => {
  isEditing.value = true
  newDisplayName.value = authStore.user.displayName
}
const updateProfileInfo = async () => {
  try {
    await authStore.updateDisplayName(newDisplayName.value)
    isEditing.value = false
    newDisplayName.value = ''
  } catch (err) {
    err.value = '個人資訊更新失敗: ' + err.message
  }
}
const updateUserPassword = async () => {
  error.value = null
  try {
    await authStore.reauthenticate(currentPassword.value)
    await authStore.updatePassword(newPassword.value)
    console.log('密碼更新成功')
  } catch (err) {
    error.value = '密碼更新失敗: ' + err.message
  }
}
</script>
