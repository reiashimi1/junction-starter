import * as React from "react";
import { userStatusesAdmin } from "@/helpers/constants";
import SelectInput from "@/core/inputs/SelectInput";

const UserStatusFilter = ({ selectedValue, onSelect }) => {
  return (
    <div className="flex flex-1 sm:w-40 w-60">
      <SelectInput
        label="User Status"
        value={selectedValue}
        onChange={onSelect}
        id="userStatus"
        items={userStatusesAdmin}
        minWidth="300"
        className="flex-1"
      />
    </div>
  );
};

export default UserStatusFilter;
