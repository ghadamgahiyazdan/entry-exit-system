import React from 'react';
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

export interface TemployeeShift {
  id: string;
  name: string;
  status: 'حاضر' | 'غایب' | 'مرخصی' | 'تأخیر';
  shift: string;
  time: string;
  hours: number;
  date: string; // Added date field
}

interface TableSectionProps {
  employeeShifts: TemployeeShift[];
}

const TableSection: React.FC<TableSectionProps> = ({ employeeShifts }) => {
  return (
    <div className="w-full overflow-x-auto rounded-lg border-1 border-black">
      <Table className="w-full">
        <TableCaption>لیست حضور و غیاب کارمندان</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[20%] text-center">نام کارمند</TableHead>
            <TableHead className="w-[20%] text-center">وضعیت</TableHead>
            <TableHead className="w-[20%] text-center">شیفت</TableHead>
            <TableHead className="w-[20%] text-center">زمان</TableHead>
            <TableHead className="w-[20%] text-center">تاریخ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employeeShifts.map((employee, index) => (
            <TableRow
              key={employee.id}
              className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
            >
              <TableCell className="text-center font-medium">{employee.name}</TableCell>
              <TableCell className="text-center">{employee.status}</TableCell>
              <TableCell className="text-center">{employee.shift}</TableCell>
              <TableCell className="text-center">{employee.time}</TableCell>
              <TableCell className="text-center">{employee.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
        </TableFooter>
      </Table>
    </div>
  );
};

export default TableSection;