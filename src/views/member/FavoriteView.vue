<script setup>
import { onMounted, ref } from 'vue'
import { onAuthStateChanged } from 'firebase/auth'
import { useFavoriteStore } from '@/store/favorite'
import { doc, getDoc } from 'firebase/firestore'
import { db, auth } from '@/utils/firebase'
const favoriteStore = useFavoriteStore()
const favorites = ref([])
const newFavorite = ref('')
const userId = ref(null)
onAuthStateChanged(auth, (user) => {
  if (user) {
    userId.value = user.uid
    fetchFavorites()
  }
})

const fetchFavorites = async () => {
  if (userId.value) {
    const docRef = doc(db, 'cities', 'LA')
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data())
    } else {
      console.log('No such document!')
    }
  }
}
onMounted(() => {
  const fav = favoriteStore.getFavoriteStores(userId)
  console.log(fav)
})
</script>
<template>
  <div class="container">
    {{ userId }} / {{ favorites }} / new {{ newFavorite }}
    <h1>收藏項目</h1>
    <input v-model="newFavorite" placeholder="輸入收藏項目" />
    <button type="button" @click="handleAddFavorite">添加收藏</button>
    <ul></ul>
  </div>
</template>
