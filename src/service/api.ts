/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const server = axios.create({
  baseURL: "http://localhost:3000/api",
});

const add_employee = (data: any) => server.post("employee/add", data);
const dell_employee = (data: any) => server.post("employee/dell", data);

const add_shift = (data: any) => server.post("shift/add", data);
const dell_shift = (data: any) => server.post("shift/dell", data);

const add_report = (data: any) => server.post("report/add", data);
const dell_report = (data: any) => server.post("report/dell", data);
const get_report = () => server.get("report/get");

export {
  add_employee,
  add_report,
  add_shift,
  dell_employee,
  dell_report,
  dell_shift,
  get_report,
};
