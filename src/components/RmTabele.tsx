"use client";

import { useEffect, useState } from 'react';
import { get_employee, get_shift, dell_employee, dell_shift } from '@/service/api';

interface Employee {
  id: number;
  name: string;
  employeeId: number;
}

interface Shift {
  id: number;
  title: string;
  description: string;
}

const RmTable = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [empRes, shiftRes] = await Promise.all([
          get_employee(),
          get_shift()
        ]);
        
        setEmployees(empRes.data.data);
        setShifts(shiftRes.data.data);
      } catch (err) {
        console.error('خطا در دریافت داده‌ها:', err);
        setError('خطا در دریافت اطلاعات از سرور');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // لاگ داده‌ها هر بار که تغییر کنند
  useEffect(() => {
    console.log('Employees:', employees);
  }, [employees]);

  useEffect(() => {
    console.log('Shifts:', shifts);
  }, [shifts]);

  const handleDeleteEmployee = async (id: number) => {
    if (confirm('آیا از حذف این کارمند اطمینان دارید؟')) {
      try {
        await dell_employee(id); // توجه: ارسال داده به شکل آبجکت
        setEmployees(prev => prev.filter(emp => emp.id !== id));
      } catch (error) {
        console.error('خطا در حذف کارمند:', error);
        setError('خطا در حذف کارمند');
      }
    }
  };

  const handleDeleteShift = async (id: number) => {
    if (confirm('آیا از حذف این شیفت اطمینان دارید؟')) {
      try {
        await dell_shift(id); // توجه: ارسال داده به شکل آبجکت
        setShifts(prev => prev.filter(shift => shift.id !== id));
      } catch (error) {
        console.error('خطا در حذف شیفت:', error);
        setError('خطا در حذف شیفت');
      }
    }
  };

  if (loading) {
    return <div className="text-center py-8">در حال بارگذاری...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className='w-screen grid grid-cols-1 lg:grid-cols-2 gap-8 p-6'>
      {/* بخش کارمندان */}
      <div className='bg-white rounded-lg shadow-md p-6'>
        <h2 className='text-2xl font-bold mb-4 text-gray-800'>لیست کارمندان</h2>
        <div className='space-y-4'>
          {employees.map(emp => (
            <div key={emp.id} className='flex justify-between items-center bg-gray-50 p-4 rounded-lg'>
              <div>
                <h3 className='font-semibold text-gray-700'>{emp.name}</h3>
                <p className='text-sm text-gray-500'>کد کارمندی: {emp.employeeId}</p>
              </div>
              <button
                onClick={() => handleDeleteEmployee(emp.id)}
                className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors'
              >
                حذف
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* بخش شیفت‌ها */}
      <div className='bg-white rounded-lg shadow-md p-6'>
        <h2 className='text-2xl font-bold mb-4 text-gray-800'>لیست شیفت‌ها</h2>
        <div className='space-y-4'>
          {shifts.map(shift => (
            <div key={shift.id} className='flex justify-between items-center bg-gray-50 p-4 rounded-lg'>
              <div>
                <h3 className='font-semibold text-gray-700'>{shift.title}</h3>
                <p className='text-sm text-gray-500'>{shift.description}</p>
              </div>
              <button
                onClick={() => handleDeleteShift(shift.id)}
                className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors'
              >
                حذف
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RmTable;
