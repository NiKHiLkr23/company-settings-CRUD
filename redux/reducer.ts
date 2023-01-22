import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  client: { showUserModal: false, formId: undefined, deleteId: null },
};

export const ReducerSlice = createSlice({
  name: "company-settings",
  initialState,
  reducers: {
    toggleChangeAction: (state) => {
      state.client.showUserModal = !state.client.showUserModal;
    },
    updateAction: (state, action) => {
      state.client.formId = action.payload;
    },
    deleteAction: (state, action) => {
      state.client.deleteId = action.payload;
    },
  },
});

export const { toggleChangeAction, updateAction, deleteAction } =
  ReducerSlice.actions;

export default ReducerSlice.reducer;
