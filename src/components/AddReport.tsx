"use client"
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { get_shift, get_employee, add_report } from '@/service/api';

interface Employee {
  employeeId: string;
  name: string;
}

interface Shift {
  id: string;
  title: string;
  description: string;
}

const AddReport = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<string>();
  const [selectedShift, setSelectedShift] = useState<string>();
  const [selectedStatus, setSelectedStatus] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [employeeResponse, shiftResponse] = await Promise.all([
          get_employee(),
          get_shift()
        ]);

        setEmployees(employeeResponse.data.data);
        setShifts(shiftResponse.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    if (!selectedEmployee || !selectedShift || !selectedStatus) {
      alert('لطفاً تمام فیلدها را پر کنید');
      return;
    }

    setIsSubmitting(true);
    try {
      add_report({
        employeeId: selectedEmployee,
        shiftId: selectedShift,
        status: selectedStatus
      });
      alert('گزارش با موفقیت ثبت شد');
      // Reset form
      setSelectedEmployee(undefined);
      setSelectedShift(undefined);
      setSelectedStatus(undefined);
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('خطا در ثبت گزارش');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="col-span-3 lg:col-span-1 bg-gray-100 flex flex-col justify-center items-center p-6 gap-4 text-2xl border rounded-lg">
      <h1 className="text-center">اضافه کردن گزارش</h1>
      <form className="flex flex-col justify-center items-center gap-3 w-full">
        <div className="flex items-center gap-2">
          <Select
            value={selectedEmployee}
            onValueChange={setSelectedEmployee}
            disabled={isLoading}
          >
            <SelectTrigger className="w-[180px] bg-white [&>span]:font-bold [&>span]:text-black">
              <SelectValue placeholder={isLoading ? "در حال بارگذاری..." : "کارمند"} />
            </SelectTrigger>
            <SelectContent>
              {employees.map(employee => (
                <SelectItem
                  key={employee.employeeId}
                  value={employee.employeeId}
                  className="font-bold text-black"
                >
                  {employee.employeeId}:={'>'}{employee.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Select
            value={selectedShift}
            onValueChange={setSelectedShift}
            disabled={isLoading}
          >
            <SelectTrigger className="w-[180px] bg-white [&>span]:font-bold [&>span]:text-black">
              <SelectValue placeholder={isLoading ? "در حال بارگذاری..." : "شیفت"} />
            </SelectTrigger>
            <SelectContent>
              {shifts.map(shift => (
                <SelectItem
                  key={shift.id}
                  value={shift.id.toString()}
                  className="font-bold text-black"
                >
                  {shift.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Select
            value={selectedStatus}
            onValueChange={setSelectedStatus}
            disabled={isLoading}
          >
            <SelectTrigger className="w-[180px] bg-white [&>span]:font-bold [&>span]:text-black">
              <SelectValue placeholder="وضعیت" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="تأخیر" className="font-bold text-black">تأخیر</SelectItem>
              <SelectItem value="مرخصی" className="font-bold text-black">مرخصی</SelectItem>
              <SelectItem value="غایب" className="font-bold text-black">غایب</SelectItem>
              <SelectItem value="حاضر" className="font-bold text-black">حاضر</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </form>
      <Button
        className='w-24'
        onClick={handleSubmit}
        disabled={isLoading || isSubmitting}
      >
        {isSubmitting ? 'در حال ثبت...' : 'تایید'}
      </Button>
    </section>
  );
};

export default AddReport;