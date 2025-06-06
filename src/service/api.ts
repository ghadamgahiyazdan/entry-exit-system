/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const server = axios.create({
  baseURL: "http://localhost:3000/api",
});

const add_employee = (data: any) => server.post("employee/add", data);

// اصلاح ارسال داده در DELETE به صورت { data: { ... } }
const dell_employee = (employeeId: number) => server.delete("employee/dell", { data: { employeeId } });

const get_employee = () => server.get("employee/get");

const add_shift = (data: any) => server.post("shift/add", data);

const dell_shift = (shiftId: number) => server.delete("shift/dell", { data: { shiftId } });

const get_shift = () => server.get("shift/get");

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
  get_employee,
  get_shift,
  get_report,
};
