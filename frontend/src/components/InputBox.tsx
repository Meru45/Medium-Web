import { ChangeEvent } from "react";

interface InputBoxPropType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

export function InputBox({
  label,
  placeholder,
  onChange,
  type,
}: InputBoxPropType) {
  return (
    <div className="">
      <label className="block mb-2 text-sm font-semibold text-black pt-4">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        id="first_name"
        className="border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
