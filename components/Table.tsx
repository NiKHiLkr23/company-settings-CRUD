import React from "react";
import Image from "next/image";
import DataTable, { TableColumn } from "react-data-table-component";
import { IUser } from "@/types/Types";
import { useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import DeleteModal from "./DeleteModal";
import Endpoints from "@/pages/api/users/endpoints";
import {
  deleteAction,
  toggleChangeAction,
  updateAction,
} from "@/redux/reducer";

interface IPropTypes {
  users: any;
}
const Table: React.FC<IPropTypes> = ({ users }) => {
  const deleteId = useSelector((state: any) => state.app.client.deleteId);
  const queryClient = useQueryClient();

  const visible = useSelector((state: any) => state.app.client.showUserModal);
  const dispatch = useDispatch();

  // Triggered when clicked on Edit button ...dispatches the updateuserModal and updateActiom
  const onUpdate = (id: any) => {
    dispatch(toggleChangeAction(id));
    if (visible) {
      dispatch(updateAction(id));
    }
  };

  //triggered when clicked on delete button ...dispatches deleteuserModal and assigns the deleteAction with userid
  const onDelete = (id: any) => {
    if (!visible) {
      dispatch(deleteAction(id));
    }
  };

  //triggered on confirmation of deletion of user data.. calls the axios endpoint for deletion of data.. updates the user page with table data
  const deletehandler = async () => {
    if (deleteId) {
      await Endpoints.DeleteUser(deleteId);
      await queryClient.invalidateQueries("usersdata");
      await dispatch(deleteAction(null));
    }
  };

  // removes the assigned userid from deleteAction
  const cancelhandler = async () => {
    await dispatch(deleteAction(null));
  };

  //Default function provided by create-data-table-component to handle selectedRows (checkboxes)
  // const handleChange = (selectedRows: any) => {
  //   console.log("Selected Rows: ", selectedRows);
  // };

  // Customizing the Table Column "Name"
  const NameAndEmail = ({ user }: { user: IUser }) => (
    <div className="flex space-x-2">
      <Image
        src={user.Image}
        alt="dp"
        width={100}
        height={100}
        className="w-10 h-10 rounded-full "
      />

      <div className="">
        {} <div>{user.Name}</div>{" "}
        <div
          data-tag="allowRowEvents"
          style={{
            color: "grey",
            overflow: "hidden",
            textOverflow: "ellipses",
          }}
        >
          {" "}
          {} {user.Email}{" "}
        </div>{" "}
      </div>
    </div>
  );

  const columns: TableColumn<IUser>[] = [
    {
      name: "Name",
      selector: (row) => row.Name,
      sortable: true,
      minWidth: "320px",
      maxWidth: "600px",
      cell: (row) => <NameAndEmail user={row} />,
    },

    {
      name: "Status",
      selector: (row) => row.Status,
      sortable: true,
      maxWidth: "120px",
      cell: (row) =>
        row.Status === true ? (
          <div className="flex items-center mb-3 bg-green-100 rounded-xl mt-3 text-[10px] px-2 font-semibold text-green-500 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-3 h-3 mr-1 text-green-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
              />
            </svg>
            Active
          </div>
        ) : (
          <div className=" flex items-center mb-3 bg-gray-200 rounded-xl mt-3  px-2 text-[10px] font-semibold text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-3 h-3 mr-1"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm3 10.5a.75.75 0 000-1.5H9a.75.75 0 000 1.5h6z"
                clipRule="evenodd"
              />
            </svg>
            Invited
          </div>
        ),
    },

    {
      name: "Role",
      selector: (row) => row.Role,
      sortable: true,
      maxWidth: "150px",
      cell: (row) => (
        <div className="text-gray-400 font-semibold text-xs">{row.Role}</div>
      ),
    },
    {
      name: "Last Login",
      maxWidth: "400px",
      sortable: true,
      cell: (row) => (
        <div className="flex space-x-6 ">
          <div className="w-[100px]">{row.LastLogin}</div>
          <button className="p-1 " onClick={() => onUpdate(row.id)}>
            <PencilIcon className="h-5 w-5" />
          </button>
          <button className="p-1" onClick={() => onDelete(row.id)}>
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <DataTable
        columns={columns}
        data={users}
        selectableRows
        pagination
        // onSelectedRowsChange={handleChange}
      />
      {deleteId ? (
        <DeleteModal
          deletehandler={deletehandler}
          cancelhandler={cancelhandler}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Table;
