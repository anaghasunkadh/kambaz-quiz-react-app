import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as assignmentsClient from "./client";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Assignment {
  title: string; // Now acting as unique ID
  description: string;
  points: number;
  dueDate: string;
  availableFrom: string;
  availableUntil: string;
  course: string;
}

interface AssignmentsState {
  assignments: Assignment[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AssignmentsState = {
  assignments: [],
  status: "idle",
  error: null,
};

export const fetchAssignmentsForCourse = createAsyncThunk(
  "assignments/fetchForCourse",
  async (courseId: string) => {
    const data = await assignmentsClient.findAssignmentsForCourse(courseId);
    return data as Assignment[];
  }
);

export const createAssignmentForCourse = createAsyncThunk(
  "assignments/createForCourse",
  async ({ courseId, assignment }: { courseId: string; assignment: Assignment }) => {
    const data = await assignmentsClient.createAssignmentForCourse(courseId, assignment);
    return data as Assignment;
  }
);

export const updateAssignmentAPI = createAsyncThunk(
  "assignments/update",
  async (assignment: Assignment) => {
    const data = await assignmentsClient.updateAssignment(assignment);
    return data as Assignment;
  }
);

export const deleteAssignmentAPI = createAsyncThunk(
  "assignments/delete",
  async (title: string) => {
    await assignmentsClient.deleteAssignment(title);
    return title;
  }
);

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssignmentsForCourse.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAssignmentsForCourse.fulfilled, (state, action: PayloadAction<Assignment[]>) => {
        state.status = "succeeded";
        state.assignments = action.payload;
      })
      .addCase(fetchAssignmentsForCourse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch assignments";
      })
      .addCase(createAssignmentForCourse.fulfilled, (state, action: PayloadAction<Assignment>) => {
        state.assignments.push(action.payload);
      })
      .addCase(updateAssignmentAPI.fulfilled, (state, action: PayloadAction<Assignment>) => {
        const idx = state.assignments.findIndex((a) => a.title === action.payload.title);
        if (idx !== -1) {
          state.assignments[idx] = action.payload;
        }
      })
      .addCase(deleteAssignmentAPI.fulfilled, (state, action: PayloadAction<string>) => {
        state.assignments = state.assignments.filter((a) => a.title !== action.payload);
      });
  },
});

export default assignmentsSlice.reducer;
