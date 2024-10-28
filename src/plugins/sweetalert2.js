import Swal from 'sweetalert2'
// 創建一個基礎的 Swal 實例，設定預設選項
export const swal = Swal.mixin({
  confirmButtonColor: '#3e7f41',
  cancelButtonColor: '#d33',
  confirmButtonText: '確定',
  cancelButtonText: '取消'
})

// 定義常用的提示方法
export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true
})

// 創建 Vue plugin
export default {
  install: (app) => {
    // 註冊全域屬性
    app.config.globalProperties.$swal = swal
    app.config.globalProperties.$toast = Toast

    // 提供 inject 使用的 key
    app.provide('$swal', swal)
    app.provide('$toast', Toast)
  }
}
