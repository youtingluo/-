<script setup>
import { auth } from '../utils/firebase'

const user = auth.currentUser
if (user) {
  console.log('用戶已登入')
} else {
  console.log('用戶沒有登入')
}
</script>
<template>
  <nav class="navbar bg-white shadow-sm sticky-top">
    <div class="container">
      <div class="d-flex w-100">
        <div>
          <a href="#" class="navbar-brand">
            <img src="../assets/LOGO.png" alt="LOGO" />
          </a>
        </div>
        <div class="ms-auto">
          <div class="dropdown">
            <button
              class="btn bg-transparent border-0 dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span
                class="material-symbols-outlined text-primary d-inline-block align-middle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                account_circle </span
              >會員
            </button>

            <ul class="dropdown-menu">
              <li>
                <RouterLink class="dropdown-item" to="/contribute">前往投稿</RouterLink>
              </li>
              <li><a class="dropdown-item" href="#">會員中心</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <RouterLink class="dropdown-item" to="/contribute">登出</RouterLink>
              </li>
            </ul>
            <RouterLink class="btn btn-primary" to="login">登入/註冊</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
