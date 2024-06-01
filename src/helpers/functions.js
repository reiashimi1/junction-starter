import moment from "moment";
import DefaultBadge from "@/core/badges/DefaultBadge";
import API from "@/helpers/APIServices/API";
import { API_URL } from "@/helpers/APIServices/API_URL";

export const isObjectEmpty = (obj = {}) => {
  return !obj ? true : Object.keys(obj).length === 0;
};

export const isArrayEmpty = (arr = []) => {
  return !arr ? true : arr?.length === 0;
};

export const dateFormatter = (
  dateString,
  existingFormat = "YYYY-MM-DD HH:mm:ss",
  format = "DD/MM/YYYY",
) => {
  if (!dateString) {
    return "N/A";
  }
  const date = moment(dateString, existingFormat).toDate();
  return moment(date).format(format);
};

export const amountFormatter = (
  amount = 0,
  currencyCode = "EUR",
  locales = "en-US",
  maximumFractionDigits = 2,
) => {
  const options = { minimumFractionDigits: 2, maximumFractionDigits };
  const formattedAmount = parseFloat(amount.toString()).toLocaleString(
    locales,
    options,
  );
  return `${formattedAmount} ${currencyCode}`;
};

export const fileToBase64 = (file) => {
  if (!file) {
    return Promise.resolve("");
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === "string") {
        const splitArray = reader.result.split("base64,");
        resolve(splitArray[1]);
      } else {
        reject(new Error("Failed to read file as DataURL."));
      }
    };
    reader.onerror = (error) => reject(error);
  });
};

export const ProgressStatusBadge = ({ status }) => {
  switch (status.toLowerCase()) {
    case "pending":
      return <DefaultBadge label={status} color="default" />;
      break;
    case "processing":
      return <DefaultBadge label={status} color="info" />;
      break;
    case "delivered":
      return <DefaultBadge label={status} color="success" />;
      break;
    case "cancelled":
      return <DefaultBadge label={status} color="error" />;
      break;
    default:
      return <DefaultBadge label={status} color="default" />;
  }
};

export const ActiveStatusBadge = ({ status }) => {
  switch (status) {
    case 0:
    case "inactive":
      return <DefaultBadge label="Inactive" color="warning" />;
      break;
    case 1:
    case "active":
      return <DefaultBadge label="Active" color="secondary" />;
      break;
    default:
      return <DefaultBadge label="N/A" color="default" />;
  }
};
