import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./Store";

interface LifterState {
  id: string;
  firstName: string;
  lastName: string;
  age: string;
  gender: string;
  weight: string;
  bench: string;
  squat: string;
  deadlift: string;
  rating: {
    squat: number;
    bench: number;
    deadlift: number;
    overall: string;
    overallPercentage: number;
    ratingCalculated: boolean;
  };
}

const initialState: LifterState = {
  id: "",
  firstName: "",
  lastName: "",
  age: "",
  gender: "",
  weight: "",
  bench: "",
  squat: "",
  deadlift: "",
  rating: {
    squat: 0,
    bench: 0,
    deadlift: 0,
    overall: "",
    overallPercentage: 0,
    ratingCalculated: false,
  },
};

export const LifterSlice = createSlice({
  name: "lifter",
  initialState,
  reducers: {
    updateLifter(state, action) {
      const lifterUpdate = action.payload;

      if (lifterUpdate?.ratingCalculated) {
        state.rating = {
          squat: lifterUpdate.ratings.squat,
          bench: lifterUpdate.ratings.bench,
          deadlift: lifterUpdate.ratings.deadlift,
          overall: lifterUpdate.ratings.overall,
          overallPercentage: lifterUpdate.ratings.overallPercentage,
          ratingCalculated: lifterUpdate.ratingCalculated,
        };
      } else {
        state.id = lifterUpdate?.data.id;
        state.firstName = lifterUpdate?.data.firstName;
        state.lastName = lifterUpdate?.data.lastName;
        state.age = lifterUpdate?.data.age;
        state.gender = lifterUpdate?.data.gender;
        state.weight = lifterUpdate?.data.weight;
        state.bench = lifterUpdate?.data.bench;
        state.squat = lifterUpdate?.data.squat;
        state.deadlift = lifterUpdate?.data.deadlift;
        state.rating = initialState.rating;
      }
    },

    resetLifter(state) {
      state = initialState;
    },
  },
});

export const { updateLifter, resetLifter } = LifterSlice.actions;
export default LifterSlice.reducer;
