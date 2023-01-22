import { useDispatch } from "react-redux";
import { toggleChangeAction } from "@/redux/reducer";

export default function SuccessModal() {
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

        <div className="min-h-screen px-4 text-center">
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div className="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
            <div className="text-lg font-medium leading-6 text-gray-900">
              Sucessful
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                User Information Sucessfully Updated and Saved
              </p>
            </div>

            <div className="mt-4">
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={handler}
              >
                Got it, thanks!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
