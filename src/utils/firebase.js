import { firebaseApp } from '../main'
import { getAuth } from 'firebase/auth'

const auth = getAuth(firebaseApp)
export { auth }
