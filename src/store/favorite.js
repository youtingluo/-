// stores/favoriteStore.js
import { defineStore } from 'pinia'
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  query,
  where,
  getDocs
} from 'firebase/firestore'
import { auth } from '@/utils/firebase'
export const useFavoriteStore = defineStore('favorite', {
  state: () => ({
    favorites: [], // 存儲收藏的店家名稱
    isProcessing: false, // 新增處理狀態追蹤
    isInitialized: false // 新增初始化狀態
  }),

  actions: {
    isFavorite(storeName) {
      return this.favorites.includes(storeName)
    },

    async toggleFavorite(storeName) {
      // 防止同時多次操作
      if (this.isProcessing) return

      const db = getFirestore()
      const user = auth.currentUser

      if (!user) {
        throw new Error('請先登入')
      }

      try {
        // 標記正在處理
        this.isProcessing = true

        const q = query(
          collection(db, 'users', user.uid, 'favorites'),
          where('storeName', '==', storeName)
        )
        const querySnapshot = await getDocs(q)

        if (querySnapshot.empty) {
          // 新增收藏
          await addDoc(collection(db, 'users', user.uid, 'favorites'), {
            storeName,
            addedAt: new Date()
          })

          // 立即更新本地狀態
          this.favorites.push(storeName)
        } else {
          // 刪除收藏
          querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref)
          })

          // 立即更新本地狀態
          this.favorites = this.favorites.filter((name) => name !== storeName)
        }
      } catch (error) {
        console.error('收藏操作失敗', error)
        throw error
      } finally {
        // 重置處理狀態
        this.isProcessing = false
      }
    },

    async loadFavorites() {
      // 避免重複載入
      if (this.isInitialized) return false
      const db = getFirestore()
      const user = auth.currentUser
      if (!user) {
        this.isInitialized = true
        this.favorites = []
        return
      }

      try {
        const favoritesRef = collection(db, 'users', user.uid, 'favorites')
        const snapshot = await getDocs(favoritesRef)

        this.favorites = snapshot.docs.map((doc) => doc.data().storeName)
        // 標記已初始化
        this.isInitialized = true
      } catch (error) {
        console.error('載入收藏失敗', error)
      }
    },
    // 新增初始化方法
    async initializeFavorites() {
      await this.loadFavorites()
    }
  }
})
