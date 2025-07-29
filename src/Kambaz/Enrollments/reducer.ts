import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


const localStorageKey = "enrollments";

// Load from localStorage or fallback to empty array
const storedEnrollments = localStorage.getItem(localStorageKey);
const initialEnrollments = storedEnrollments ? JSON.parse(storedEnrollments) : [];

interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

interface EnrollmentsState {
  enrollments: Enrollment[];
}

const initialState: EnrollmentsState = {
  enrollments: initialEnrollments,
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enroll: (state, action: PayloadAction<{ user: string; course: string }>) => {
      const newEnrollment = {
        _id: crypto.randomUUID(), // or use uuid
        user: action.payload.user,
        course: action.payload.course,
      };
      state.enrollments.push(newEnrollment);
      localStorage.setItem(localStorageKey, JSON.stringify(state.enrollments));
    },
    unenroll: (state, action: PayloadAction<{ user: string; course: string }>) => {
      state.enrollments = state.enrollments.filter(
        (e) => !(e.user === action.payload.user && e.course === action.payload.course)
      );
      localStorage.setItem(localStorageKey, JSON.stringify(state.enrollments));
    },
  },
});

export const { enroll, unenroll } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
