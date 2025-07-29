import { createSlice } from "@reduxjs/toolkit";
import { courses as initialCourses } from "../Database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  courses: initialCourses,
  course: {
    _id: "",
    name: "",
    number: "",
    startDate: "",
    endDate: "",
    department: "",
    credits: 0,
    description: "",
    author: "",
    image: "",
  },
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourse: (state, { payload }) => {
      state.course = payload;
    },
    addCourse: (state, { payload }) => {
      const newCourse = {
        _id: uuidv4(),
        name: payload.name || "",
        number: payload.number || "",
        startDate: payload.startDate || "",
        endDate: payload.endDate || "",
        department: payload.department || "",
        credits: payload.credits || 0,
        description: payload.description || "",
        author: payload.author || "",
        image: payload.image || "",
      };
      state.courses.push(newCourse);
    },
    deleteCourse: (state, { payload }) => {
      state.courses = state.courses.filter(course => course._id !== payload);
    },
    updateCourse: (state, { payload }) => {
      state.courses = state.courses.map(course =>
        course._id === payload._id ? payload : course
      );
    },
  },
});

export const { setCourse, addCourse, deleteCourse, updateCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
