import { NextPage } from "next";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { toggleChangeAction } from "@/redux/reducer";
import Image from "next/image";
import Header from "@/components/Header";
import Table from "@/components/Table";
import Modal from "@/components/Modal";
import LoadingModal from "@/components/LoadingModal";
import ErrorModal from "@/components/ErrorModal";
import Endpoints from "./api/users/endpoints";
import download from "public/images/download-cloud-2-line.svg";

const Users: NextPage = () => {
  const visible = useSelector((state: any) => state.app.client.showUserModal);

  const dispatch = useDispatch();
  const handler = () => {
    dispatch(toggleChangeAction());
  };

  // Fecth/GET  Users data
  const {
    data: usersdata,
    isLoading,
    error,
  } = useQuery("usersdata", () => Endpoints.GetUsers());

  if (isLoading) {
    return <LoadingModal />;
  }

  if (error) {
    return <ErrorModal />;
  }

  return (
    <div>
      <Header />
      <main className="max-w-4xl mx-auto border border-gray-100">
        <div className=" mt-5 p-2  flex flex-col">
          <div className="flex ">
            <div className="">
              <div className="flex">
                <p className="font-semibold text-xl pt-2 px-4">Users</p>
                <p className="bg-green-100 rounded-xl mt-3  px-2 font-semibold text-green-700 ">
                  {`${usersdata?.length}`} users
                </p>
              </div>
              <p className="pl-4 text-gray-400">
                Manage your team meanbers and their account permissions here.
              </p>
            </div>
            <div className="flex grow justify-end items-center  space-x-4">
              <button className="flex p-2 px-4 border border-gray-200 rounded-lg space-x-2 cursor-not-allowed">
                <Image src={download} alt="download" />
                <p>Download CSV</p>
              </button>
              <button
                className="flex space-x-2 p-2 px-4 border border-gray-200 rounded-lg text-white bg-blue-500"
                onClick={handler}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                <p>Add User</p>
              </button>
            </div>
          </div>
          <hr />
        </div>
        <Table users={usersdata} />
        {visible ? <Modal /> : <></>}
      </main>
    </div>
  );
};

export default Users;
