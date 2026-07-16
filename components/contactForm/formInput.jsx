export default function FormInput({
  type,
  name,
  formData,
  label,
  onChange,
  error,
  color,
}) {
  const inputValue = formData[name] || "";

  return (
    <div
      className={`input-wrapper w-full flex flex-col items-center justify-center  relative p-[10px] border-1  rounded-full bg-transparent my-[15px] transition-colors duration-300 ${
        error ? "border-red-900" : "border-zold"
      }`}
    >
      <input
        type={type}
        name={name}
        value={inputValue}
        onChange={onChange}
        placeholder=" "
        className="peer input-field w-full h-full bg-transparent outline-none py-[5px] text-text-alap"
      />

      <label
        className={`absolute left-[10px] top-[50%] -translate-y-[50%] text-base transition-all duration-300 pointer-events-none
        peer-focus:top-[0px] peer-focus:text-xs peer-focus:bg-[#e7ebe3] peer-[:not(:placeholder-shown)]:bg-[#e7ebe3] peer-focus:p-[5px] peer-focus:rounded-sm 
        peer-[:not(:placeholder-shown)]:p-[5px] peer-[:not(:placeholder-shown)]:top-[0px] peer-[:not(:placeholder-shown)]:text-xs
        ${error ? "text-red-800 peer-focus:text-red-800" : "text-text-alap peer-focus:text-text-alap"}`}
      >
        {label}
      </label>

      {error && (
        <span className="absolute bottom-[-20px] left-[10px] text-red-800 text-xs font-medium tracking-wide">
          {error}
        </span>
      )}
    </div>
  );
}
