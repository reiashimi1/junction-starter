import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import emptyLottie from "@/images/empty-lottie.json";
import Lottie from "@/core/Lottie";
import SearchInput from "@/core/inputs/SearchInput";
import { isArrayEmpty } from "@/helpers/functions";
import MobileDataTable from "@/core/datatable/MobileDataTable";

const DataTable = ({
  rows = [],
  columns,
  selectedRows,
  setSelectedRows,
  allowCheckboxSelection = true,
  getData,
  dependencies = [],
  buttons = [],
  allowSearch = true,
  totalCount = 0,
}) => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [s, setS] = useState("");

  const handleRowSelection = (e) => {
    if (allowCheckboxSelection) {
      setSelectedRows(e.row);
    }
  };

  const handlePagination = (model) => {
    const { page, pageSize } = model;
    setPage(page);
    setPageSize(pageSize);
  };

  const handleSearch = (value) => {
    setS(value);
  };

  useEffect(() => {
    let params = { page: page + 1, limit: pageSize };
    if (allowSearch && !!s) {
      params.s = s;
      params.q = s;
    }
    getData(params);
  }, [page, pageSize, s, ...dependencies]);

  return (
    <div className="w-full">
      <div
        className={`flex sm:flex-row flex-col ${allowSearch ? "sm:justify-between" : "sm:justify-end"} my-4`}
      >
        {allowSearch && (
          <div className="flex relative sm:w-1/3 sm:mb-0 mb-4">
            <SearchInput qs={s} onSearch={handleSearch} />
          </div>
        )}
        {!isArrayEmpty(buttons) &&
          buttons.map((button, index) => <div key={index}>{button}</div>)}
      </div>
      {!isArrayEmpty(rows) ? (
        <>
          <div className="bg-slate-50 rounded-xl md:block hidden">
            <DataGrid
              rows={rows}
              columns={columns.map((col) => ({
                ...col,
                flex: 1,
              }))}
              autoHeight
              pageSizeOptions={[5, 10, 15, 20, 25, 30]}
              onPaginationModelChange={handlePagination}
              selectionModel={selectedRows}
              onRowClick={handleRowSelection}
              pagination
              paginationMode="server"
              paginationModel={{ page, pageSize }}
              onRowSelectionModelChange={handleRowSelection}
              checkboxSelection={allowCheckboxSelection}
              showColumnVerticalBorder={false}
              rowCount={totalCount}
            />
          </div>
          <div className="md:hidden block">
            <MobileDataTable
              rows={rows}
              columns={columns}
              page={page}
              pageCount={totalCount}
              onPageChange={handlePagination}
            />
          </div>
        </>
      ) : (
        <Lottie
          animation={emptyLottie}
          className="flex flex-1 object-contain md:w-1/3 md:h-1/3 sm:w-1/2 sm:h-1/2 w-2/3 h-2/3"
          text="No data"
        />
      )}
    </div>
  );
};

export default DataTable;
