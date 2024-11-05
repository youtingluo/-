<template>
  <div class="p-3 mb-3 rounded-5 bg-light">
    <div class="d-flex justify-content-between">
      <div>
        <h3 class="fs-5">
          <img class="rounded-circle me-2" src="../assets/Shape.png" alt="avatar" />管理員
        </h3>

        <p class="star-null fs-5 d-flex align-items-center">
          <span class="text-info">4.0</span>
          <span class="material-symbols-outlined fill-symbol text-info"> star </span
          ><span class="material-symbols-outlined fill-symbol text-info"> star </span
          ><span class="material-symbols-outlined fill-symbol text-info"> star </span>
          <span class="material-symbols-outlined fill-symbol text-info"> star </span>
          <span class="material-symbols-outlined fill-symbol"> star </span>
        </p>
      </div>
      <div>
        <img src="../assets/r-Photoroom.png" alt="mark" />
      </div>
    </div>

    <ul class="ps-0 d-flex">
      <li>
        <span class="badge rounded-pill text-bg-secondary fw-normal fs-6 me-2 mb-2"> 茶葉 </span>
      </li>
      <li>
        <span class="badge rounded-pill text-bg-secondary fw-normal fs-6 me-2 mb-2"> 糖漿 </span>
      </li>
      <li>
        <span class="badge rounded-pill text-bg-secondary fw-normal fs-6 me-2 mb-2"> 奶類 </span>
      </li>
    </ul>
    <p>綠茶泡開後有明顯的苦澀味，不能放超過四個小時，否則會變酸。茶葉品質中等，適合搭配蜂蜜調味</p>
    <div class="d-flex justify-content-between align-items-center">
      <span
        ><span class="material-symbols-outlined fill-symbol text-primary"> thumb_up </span></span
      >

      <button type="button" class="btn btn-outline-primary" disabled>
        <i class="bi bi-hand-thumbs-up"></i>
        同意評價
      </button>
    </div>
  </div>
</template>

<style scoped>
.star-null {
  color: #cdcdcd;
}
</style>
