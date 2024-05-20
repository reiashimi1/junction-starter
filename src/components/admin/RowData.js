const RowData = ({ label, value, showBorder = true }) => (
  <div
    className={`flex flex-1 sm:flex-col flex-row sm:space-y-1 sm:justify-start justify-between sm:mb-0 mb-4 sm:pb-0 pb-2 ${showBorder ? "sm:border-none border-b border-indigo-700" : ""}`}
  >
    <div className="font-semibold text-lg text-indigo-800">{label}</div>
    <div className="text-lg italic">{(!!value || !label) ? value : "N/A"}</div>
  </div>
);

export default RowData;
