import React, { FC } from "react";
import { useQueryClient, useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { toggleChangeAction } from "@/redux/reducer";
import moment from "moment";
import SuccessModal from "./SuccessModal";
import LoadingModal from "./LoadingModal";
import ErrorModal from "./ErrorModal";
import Endpoints from "@/pages/api/users/endpoints";

interface IPropTypes {
  formData: any;
  setFormData: any;
}

const AddUser: FC<IPropTypes> = ({ formData, setFormData }) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const onClose = () => {
    dispatch(toggleChangeAction());
  };

  const handleClose = (event: any) => {
    if (event.target.id === "wrapper") onClose();
  };

  // POST request to create new User and add it to the the database
  const addMutation = useMutation(Endpoints.CreateUser, {
    onSuccess: () => {
      console.log("User Data Successfully Added");
    },
    onError: (err) => {
      console.log("there was an error", err);
    },
    onSettled: () => {
      queryClient.invalidateQueries("usersdata");
    },
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (Object.keys(formData).length == 0)
      return console.log("Please Enter the Details...");
    let { Name, Email, Role, Status } = formData;
    const model = {
      Image: `https://github.com/NiKHiLkr23/company-settings-CRUD/blob/f56fbeabecaa90f9700aad3b9e99dbb95cd82f93/public/images/ProfilePicture${Math.floor(
        Math.random() * 6
      )}.jpg?raw=true`,
      Name,
      Email,
      Role,
      LastLogin: `${moment(new Date(Date.now())).format("LLL")}`,
      Status,
    };

    addMutation.mutate(model);
  };

  // show Loading(Modal) screen when User Creation inProcess
  if (addMutation.isLoading) {
    return (
      <div>
        <LoadingModal />
      </div>
    );
  }

  // show Error(Modal) screen is case of Error
  if (addMutation.isError) {
    return (
      <div>
        <ErrorModal />
      </div>
    );
  }

  // show Success(Modal) screen when New User is successfully created
  if (addMutation.isSuccess) return <SuccessModal />;

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
                placeholder="Name"
                className="border w-full px-5 focus:outline-none rounded-md"
              />
            </div>
            <div>
              <input
                type="email"
                onChange={setFormData}
                name="Email"
                placeholder="Email"
                className="border w-full px-5 focus:outline-none rounded-md"
              />
            </div>
            <div>
              <input
                type="text"
                onChange={setFormData}
                name="Role"
                placeholder="Role"
                className="border w-full px-5 focus:outline-none rounded-md"
              />
            </div>

            <div>
              <input
                defaultValue={moment(new Date(Date.now())).format("LLL")}
                name="LastLogin"
                className=" w-full px-5 focus:outline-none rounded-md"
              />
            </div>

            <button
              type="submit"
              className="flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
