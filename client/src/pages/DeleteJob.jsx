import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const action = async ({ params }) => {
  try {
    const { id } = params;
    await customFetch.delete(`/jobs/${id}`);
    toast.success("successfully deleted job");
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
  return redirect("../all-jobs");
};
