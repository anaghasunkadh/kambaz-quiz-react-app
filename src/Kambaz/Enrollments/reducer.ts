import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const localStorageKey = "enrollments";

// Load enrollments from localStorage or start with empty array
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
      // Create new enrollment with unique ID
      const newEnrollment: Enrollment = {
        _id: crypto.randomUUID(), // You can use uuid if preferred
        user: action.payload.user,
        course: action.payload.course,
      };
      state.enrollments.push(newEnrollment);

      // Persist updated enrollments to localStorage
      localStorage.setItem(localStorageKey, JSON.stringify(state.enrollments));
    },
    unenroll: (state, action: PayloadAction<{ user: string; course: string }>) => {
      // Remove enrollment matching user and course
      state.enrollments = state.enrollments.filter(
        (e) => !(e.user === action.payload.user && e.course === action.payload.course)
      );

      // Persist updated enrollments to localStorage
      localStorage.setItem(localStorageKey, JSON.stringify(state.enrollments));
    },
  },
});

export const { enroll, unenroll } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
