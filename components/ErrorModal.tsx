import { toggleChangeAction } from "@/redux/reducer";
import { useDispatch } from "react-redux";

export default function ErrorModal() {
  const dispatch = useDispatch();
  const handler = () => {
    dispatch(toggleChangeAction());
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      id="wrapper"
    >
      <div className="w-[600px] flex flex-col">
        <button
          className="text-white text-lg place-self-end "
          onClick={handler}
        >
          X
        </button>
        <div className="bg-red-300 p-2 rounded-2xl ">
          Oops Something went Wrong...
        </div>
      </div>
    </div>
  );
}
