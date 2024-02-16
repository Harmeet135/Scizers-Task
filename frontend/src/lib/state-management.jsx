import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allCourses: [],
  filteredCourses: [],
};

export const coursesSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    setAllCourses: (state, action) => {
      state.allCourses = action.payload;
      state.filteredCourses = action.payload;
    },
    searchCourses: (state, action) => {
      const searchTerm = action.payload.toLowerCase().trim();
      state.filteredCourses = searchTerm === '' 
        ? state.allCourses 
        : state.allCourses.filter(course =>
           ( course.name && course.name.toLowerCase().includes(searchTerm))
          );
    }
  },
});

export const {  setAllCourses, searchCourses } = coursesSlice.actions;

export default coursesSlice.reducer;
