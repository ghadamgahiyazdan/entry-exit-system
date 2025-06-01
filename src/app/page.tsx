import React from 'react';
import TableSection, { TemployeeShift } from '@/components/TableSection';

const employeeShifts: TemployeeShift[] = [
  {
    id: "EMP001",
    name: "علی محمدی",
    status: "حاضر",
    shift: "شیفت صبح",
    time: "۸:۰۰ - ۱۶:۰۰",
    hours: 8,
    date: "۱۴۰۲/۰۵/۱۵" // Added date field
  },
  {
    id: "EMP002",
    name: "فاطمه احمدی",
    status: "غایب",
    shift: "شیفت عصر",
    time: "۱۶:۰۰ - ۲۴:۰۰",
    hours: 0,
    date: "۱۴۰۲/۰۵/۱۵" // Added date field
  },
  {
    id: "EMP003",
    name: "رضا حسینی",
    status: "مرخصی",
    shift: "شیفت شب",
    time: "۰۰:۰۰ - ۸:۰۰",
    hours: 0,
    date: "۱۴۰۲/۰۵/۱۵" // Added date field
  },
  {
    id: "EMP004",
    name: "زهرا کریمی",
    status: "حاضر",
    shift: "شیفت صبح",
    time: "۸:۰۰ - ۱۶:۰۰",
    hours: 8,
    date: "۱۴۰۲/۰۵/۱۵" // Added date field
  },
  {
    id: "EMP005",
    name: "محمد رضایی",
    status: "تأخیر",
    shift: "شیفت عصر",
    time: "۱۶:۰۰ - ۲۴:۰۰",
    hours: 7.5,
    date: "۱۴۰۲/۰۵/۱۵" // Added date field
  },
]

const Page = () => {
  return (
    <section className="container mx-auto p-4">
      <TableSection employeeShifts={employeeShifts}/>
    </section>
  );
};

export default Page;