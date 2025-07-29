import { createSlice } from "@reduxjs/toolkit";
import * as db from "../../Database";

// Initial state from db.assignments
const initialState = {
  assignments: db.assignments
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment(state, action) {
      // action.payload is untyped — expect the whole assignment object (without _id)
      const newAssignment = {
        _id: (Math.random() * 1000000).toFixed(0), // generate simple ID string
        ...action.payload
      };
      state.assignments.push(newAssignment);
    },
    deleteAssignment(state, action) {
      // action.payload is the assignment _id to remove
      state.assignments = state.assignments.filter(
        (assignment) => assignment._id !== action.payload
      );
    },
    updateAssignment(state, action) {
      // action.payload is the updated assignment object with _id
      const idx = state.assignments.findIndex(a => a._id === action.payload._id);
      if (idx !== -1) {
        state.assignments[idx] = action.payload;
      }
    },
    // Add more reducers if needed, e.g. editAssignment for toggling edit mode
  }
});

export const { addAssignment, deleteAssignment, updateAssignment } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
