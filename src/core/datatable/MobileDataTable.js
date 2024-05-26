import Pagination from "@mui/material/Pagination";
import * as React from "react";

const MobileDataTable = ({
  rows = [],
  columns = [],
  page,
  totalCount,
  onPageChange,
}) => {
  const handlePagination = (e, value) => {
    onPageChange({ page: value, pageSize: 10 });
  };

  return (
    <div>
      {rows.map((row) => (
        <div
          key={row.id}
          className="bg-white p-2 mx-2 my-4 rounded-lg shadow-xl"
        >
          {columns.map((column, index) => (
            <div
              key={`${row.id}-${column.field}`}
              className={`flex justify-between items-center my-1 ${index + 1 !== columns.length ? "border-b-2 border-orange-100" : ""} p-2`}
            >
              <div className="w-1/4 font-semibold">{column.headerName}</div>
              <div className="w-2/3 text-end">
                {!!column?.valueGetter || !!column.renderCell
                  ? !!column?.valueGetter
                    ? column.valueGetter({ row })
                    : column.renderCell({ row })
                  : row[column.field]}
              </div>
            </div>
          ))}
        </div>
      ))}
      <Pagination
        count={totalCount}
        page={page + 1}
        onChange={handlePagination}
        showFirstButton
        showLastButton
        color="primary"
      />
    </div>
  );
};

export default MobileDataTable;
