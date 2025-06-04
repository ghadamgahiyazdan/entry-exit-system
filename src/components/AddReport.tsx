import React from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
const AddReport = () => {
    return (
      <section className="col-span-3 lg:col-span-1 bg-gray-100 flex flex-col justify-center items-center p-6 gap-4 text-2xl border rounded-lg">
        <h1 className="text-center">اضافه کردن گزارش</h1>
        <form className="flex flex-col gap-3 w-full">
          <div className="flex items-center gap-2">
            <Input id="reportEmployeeName" name="reportEmployeeName" className='bg-white flex-1' />
            <Label htmlFor="reportEmployeeName" className="text-right whitespace-nowrap">
              نام کارمند
            </Label>
          </div>

          <div className="flex items-center gap-2">
            <Input id="reportShift" name="reportShift" className='bg-white flex-1' />
            <Label htmlFor="reportShift" className="text-right whitespace-nowrap">
              شیفت
            </Label>
          </div>

          <div className="flex items-center gap-2">
            <Input id="reportEmployeeName2" name="reportEmployeeName2" className='bg-white flex-1' />
            <Label htmlFor="reportEmployeeName2" className="text-right whitespace-nowrap">
              نام کارمند
            </Label>
          </div>
        </form>
        <Button className='w-10'>تایید</Button>
      </section>
    );
};

export default AddReport;