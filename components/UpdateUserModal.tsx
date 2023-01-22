import React, { FC } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toggleChangeAction } from "@/redux/reducer";
import { useDispatch } from "react-redux";
import moment from "moment";
import SuccessModal from "./SuccessModal";
import LoadingModal from "./LoadingModal";
import ErrorModal from "./ErrorModal";
import Endpoints from "@/pages/api/users/endpoints";

interface IPropTypes {
  formId: any;
  formData: any;
  setFormData: any;
}

const UpdateUserModal: FC<IPropTypes> = ({ formId, formData, setFormData }) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const onClose = () => {
    dispatch(toggleChangeAction());
  };

  const handleClose = (event: any) => {
    if (event.target.id === "wrapper") onClose();
  };

  // Get single user data
  const {
    isLoading,
    isError,
    data: userdata,
    error,
  } = useQuery(["users", formId], () => Endpoints.GetSingleUser(formId));

  // Update data
  const UpdateMutation = useMutation(
    () => Endpoints.UpdateUser(formId, formData),
    {
      onSuccess: () => {
        console.log("Data Successfully Updated");
      },
      onError: (err) => {
        console.log("Error", err);
      },
      onSettled: () => {
        queryClient.invalidateQueries("usersdata");
      },
    }
  );

  if (isLoading) return <LoadingModal />;
  if (isError) return <ErrorModal />;

  const { Name, Email, Role } = userdata;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let updated = Object.assign({}, userdata, formData);
    UpdateMutation.mutate(updated);
  };

  if (UpdateMutation.isLoading) return <LoadingModal />;
  if (UpdateMutation.isError) return <ErrorModal />;
  if (UpdateMutation.isSuccess) return <SuccessModal />;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="w-[600px] flex flex-col">
        <button className="text-white text-lg place-self-end" onClick={onClose}>
          X
        </button>
        <div className="bg-white p-2 rounded-2xl ">
          <form
            className=" grid md:grid-cols-2 gap-4 p-5"
            onSubmit={handleSubmit}
          >
            <div>
              <input
                type="text"
                onChange={setFormData}
                name="Name"
                defaultValue={Name}
                placeholder="Name"
                className="border w-full px-5 focus:outline-none rounded-md"
              />
            </div>
            <div>
              <input
                type="email"
                name="Email"
                defaultValue={Email}
                className="border w-full px-5 focus:outline-none rounded-md"
              />
            </div>
            <div>
              <input
                type="text"
                onChange={setFormData}
                name="Role"
                placeholder="Role"
                defaultValue={Role}
                className="border w-full px-5 focus:outline-none rounded-md"
              />
            </div>

            <div>
              <input
                defaultValue={moment(new Date(Date.now())).format("LLL")}
                name="LastLogin"
                readOnly
                className=" w-full px-5 focus:outline-none rounded-md"
              />
            </div>

            <button className="flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserModal;
