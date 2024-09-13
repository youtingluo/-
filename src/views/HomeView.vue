<script setup></script>

<template>
  <div class="container">
    <div class="bg-secondary p-3 mb-4 rounded-5">
      <h2 class="fs-5">
        <a href="#" class="pe-3">開南食品</a>
        <a href="#"><i class="bi bi-heart"></i></a>
      </h2>

      <ul class="ps-0 d-flex">
        <li>
          <span class="badge rounded-pill text-bg-primary text-secondary px-3 me-3">茶葉</span>
        </li>
        <li>
          <span class="badge rounded-pill text-bg-primary text-secondary px-3 me-3">茶葉</span>
        </li>
        <li>
          <span class="badge rounded-pill text-bg-primary text-secondary px-3 me-3">茶葉</span>
        </li>
      </ul>
      <div>
        <h3 class="mt-5 fs-5">公司介紹</h3>
        <p>
          開南食品成立於1986年， 從販售珍珠奶茶原物料起家， 深耕產業三十多年來，
          堅守食品安全的第一防線，秉持著安心飲食的精神，不斷開發與推出新產品， 致力於提供顧客最好、
          最安全的食品烘焙、 珍珠奶茶原物料， 也協助了無數茶飲、餐飲店家成功創業，
          未來我們會繼續傾聽您的聲音， 與您分享最新的產品及新知， 持續追求100%
          的顧客滿意度，朝向更專業服務邁進。
        </p>
      </div>
    </div>

    <div class="text-bg-primary text-secondary p-3 mb-3 rounded-5">
      <h2 class="fs-5">
        實際評測
        <img src="../assets/r-Photoroom.png" alt="" />
      </h2>
      <ul class="ps-0 d-flex">
        <li>
          <button
            type="button"
            class="review-btn btn btn-secondary text-primary badge rounded-pill me-3 active"
          >
            茶葉
          </button>
          <button
            type="button"
            class="review-btn btn btn-secondary text-primary badge rounded-pill me-3"
          >
            茶葉
          </button>
        </li>
        <li>
          <button
            type="button"
            class="review-btn btn btn-secondary text-primary badge rounded-pill me-3"
          >
            茶葉
          </button>
        </li>
        <li>
          <button
            type="button"
            class="review-btn btn btn-secondary text-primary badge rounded-pill me-3"
          >
            茶葉
          </button>
        </li>
      </ul>

      <div class="text-info mb-3">
        <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i
        ><i class="bi bi-star-half"></i>
      </div>
      <p>
        綠茶泡開後有明顯的苦澀味，不能放超過四個小時，否則會變酸。茶葉品質中等，適合搭配蜂蜜調味
      </p>
      <h2 class="fs-5">同意評價數</h2>
      <div>
        <div class="d-inline-block me-1">
          <img class="rounded-circle" src="../assets/Shape.png" alt="avatar" />
        </div>

        <div class="d-inline-block me-1">
          <img class="rounded-circle" src="../assets/Shape.png" alt="avatar" />
        </div>

        <span class="badge text-bg-light px-1">+1</span>
      </div>
    </div>

    <div>
      <a href="#" class="btn btn-info rounded-5 me-3">同意評價</a>
      <RouterLink class="btn btn-info rounded-5" to="/">回到首頁</RouterLink>
    </div>
  </div>
</template>

<style scoped></style>
