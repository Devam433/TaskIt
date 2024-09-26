import React from 'react';

const AddTaskModal = ({
  isOpen,
  taskName,
  handleSubmit,
  setTaskName,
  toggleModal,
  title,
}) => {
  return (
    <div>
      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 ease-in-out">
          {/* Modal Content */}
          <div className="bg-white w-full max-w-lg p-8 rounded-xl shadow-2xl relative transform transition-transform duration-300 ease-in-out scale-95 sm:scale-100">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">{title}</h2>

            {/* Close Button */}
            <button
              className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
              onClick={toggleModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="taskName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Task Name
                </label>
                <input
                  type="text"
                  id="taskName"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  className="mt-2 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Enter task name"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 transition duration-200"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTaskModal;
