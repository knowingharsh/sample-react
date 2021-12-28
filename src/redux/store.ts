import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user.slice';

export const store = configureStore({
  reducer: {
    users: userReducer
  },
  middleware: [
    store => next => action => {
      console.group(action.type)
      console.info('dispatching', action)
      let result = next(action)
      console.log('next state', store.getState())
      console.groupEnd()
      return result
    }
  ]
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;