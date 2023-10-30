import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const PasswordVisibilityButton = ({ visibility, handlePasswordVisibility }) => {
  return (
    <button
      className="btn btn-sm btn-ghost text-neutral-500 font-inter font-extralight absolute inset-y-[6px] right-0 pr-3 flex items-center hover:bg-transparent"
      type="button"
      onClick={handlePasswordVisibility}
    >
      {visibility ? (
        <AiOutlineEyeInvisible className="text-2xl" />
      ) : (
        <AiOutlineEye className="text-2xl" />
      )}
    </button>
  );
};

export default PasswordVisibilityButton;
