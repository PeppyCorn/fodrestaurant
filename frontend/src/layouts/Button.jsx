import React from "react";

const Button = (props) => {
  return (
    <div>
      <button className=" px-6 py-1 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all rounded-full">
        {props.title}
      </button>
    </div>
  );
};

export default Button;