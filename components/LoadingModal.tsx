export default function LoadingModal() {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      id="wrapper"
    >
      <div className="w-[600px] flex flex-col">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-6 h-6 rounded-full animate-pulse bg-blue-700 dark:bg-violet-400"></div>
          <div className="w-6 h-6 rounded-full animate-pulse bg-blue-700 dark:bg-violet-400"></div>
          <div className="w-6 h-6 rounded-full animate-pulse bg-blue-700 dark:bg-violet-400"></div>
        </div>
      </div>
    </div>
  );
}
