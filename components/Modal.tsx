import React, { FC, useReducer } from "react";
import { useSelector } from "react-redux";
import UpdateUserModal from "./UpdateUserModal";
import AddUserModal from "./AddUserModal";

function formReducer(state: any, event: { target: { name: any; value: any } }) {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
}

const Modal: FC = () => {
  const [formData, setFormData] = useReducer(formReducer, {});
  const formId = useSelector((state: any) => state.app.client.formId);

  return (
    <div>
      {formId
        ? UpdateUserModal({ formId, formData, setFormData })
        : AddUserModal({ formData, setFormData })}
    </div>
  );
};

export default Modal;
