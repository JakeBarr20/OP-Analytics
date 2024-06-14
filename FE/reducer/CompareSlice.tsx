import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./Store";

interface CompareState {
  firstName: string;
  lastName: string;
  age: string;
  gender: string;
  weight: string;
  bench: string;
  squat: string;
  deadlift: string;
  rating: string;
  isSingle: boolean;
  activeFilters: any;
}

const initialState: CompareState = {
  firstName: "",
  lastName: "",
  age: "",
  gender: "",
  weight: "",
  bench: "",
  squat: "",
  deadlift: "",
  rating: "",
  isSingle: false,
  activeFilters: {},
};

export const CompareSlice = createSlice({
  name: "compare",
  initialState,
  reducers: {
    updateCompare(state, action) {
      const lifterUpdate = action.payload;
      if (lifterUpdate?.data?.gender === "M") state.gender = "Male";
      if (lifterUpdate?.data?.gender === "F") state.gender = "Female";
      if (lifterUpdate.isSingle) {
        state.bench = lifterUpdate?.data?.bench.slice(0, -2);
        state.squat = lifterUpdate?.data?.squat.slice(0, -2);
        state.deadlift = lifterUpdate?.data?.deadlift.slice(0, -2);
      } else {
        state.bench = lifterUpdate?.data?.bench;
        state.squat = lifterUpdate?.data?.squat;
        state.deadlift = lifterUpdate?.data?.deadlift;
      }
      state.firstName = lifterUpdate?.data?.name;
      state.age = lifterUpdate?.data?.age;
      state.weight = lifterUpdate?.data?.weight.slice(1);
      state.rating = initialState?.rating;
      state.isSingle = lifterUpdate?.isSingle;
      state.activeFilters = lifterUpdate?.activeFilters;
    },

    resetLifter(state) {
      state = initialState;
    },
  },
});

export const { updateCompare, resetLifter } = CompareSlice.actions;
export default CompareSlice.reducer;
