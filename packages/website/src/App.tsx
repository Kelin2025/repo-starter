import { useState } from "react";

export const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-4xl font-bold">Hello World</div>
      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setCount((count) => count + 1)}
      >
        Click me
      </button>
      <p className="mt-2 text-center">You clicked {count} times</p>
    </div>
  );
};
