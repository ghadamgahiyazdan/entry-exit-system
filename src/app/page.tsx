import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const employeeShifts = [
  {
    id: "EMP001",
    name: "علی محمدی",
    status: "حاضر",
    shift: "شیفت صبح",
    time: "۸:۰۰ - ۱۶:۰۰",
    hours: 8,
  },
  {
    id: "EMP002",
    name: "فاطمه احمدی",
    status: "غایب",
    shift: "شیفت عصر",
    time: "۱۶:۰۰ - ۲۴:۰۰",
    hours: 8,
  },
  {
    id: "EMP003",
    name: "رضا حسینی",
    status: "مرخصی",
    shift: "شیفت شب",
    time: "۰۰:۰۰ - ۸:۰۰",
    hours: 8,
  },
  {
    id: "EMP004",
    name: "زهرا کریمی",
    status: "حاضر",
    shift: "شیفت صبح",
    time: "۸:۰۰ - ۱۶:۰۰",
    hours: 8,
  },
  {
    id: "EMP005",
    name: "محمد رضایی",
    status: "تأخیر",
    shift: "شیفت عصر",
    time: "۱۶:۰۰ - ۲۴:۰۰",
    hours: 7.5,
  },
]

export default function EmployeeShiftTable() {
  const totalHours = employeeShifts.reduce((sum, shift) => sum + shift.hours, 0)

  return (
    <Table className="w-full">
      <TableCaption>لیست حضور و غیاب کارمندان</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[25%] text-center">نام کارمند</TableHead>
          <TableHead className="w-[25%] text-center">وضعیت</TableHead>
          <TableHead className="w-[25%] text-center">شیفت</TableHead>
          <TableHead className="w-[25%] text-center">زمان</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {employeeShifts.map((employee) => (
          <TableRow key={employee.id}>
            <TableCell className="text-center font-medium">{employee.name}</TableCell>
            <TableCell className="text-center">{employee.status}</TableCell>
            <TableCell className="text-center">{employee.shift}</TableCell>
            <TableCell className="text-center">{employee.time}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
      </TableFooter>
    </Table>
  )
}