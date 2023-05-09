import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  { id: '0', name: 'Anastasiya Rushanskia' },
  { id: '1', name: 'Aleksandra Rushanskaia' },
  { id: '2', name: 'Vladislav Sirotkin' },
]

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
})

export default userSlice.reducer
