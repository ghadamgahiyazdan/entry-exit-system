import React from 'react';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const AddReport = () => {
  return (
    <section className="col-span-3 lg:col-span-1 bg-gray-100 flex flex-col justify-center items-center p-6 gap-4 text-2xl border rounded-lg">
      <h1 className="text-center">اضافه کردن گزارش</h1>
      <form className="flex flex-col justify-center items-center gap-3 w-full">
        <div className="flex items-center gap-2">
          {/*employee*/}
          <Select>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="کارمند" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="employee1">کارمند 1</SelectItem>
              <SelectItem value="employee2">کارمند 2</SelectItem>
              <SelectItem value="employee3">کارمند 3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          {/*shift*/}
          <Select>
            <SelectTrigger className="w-[180px]  bg-white">
              <SelectValue placeholder="شیفت" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="morning">صبح</SelectItem>
              <SelectItem value="afternoon">عصر</SelectItem>
              <SelectItem value="night">شب</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          {/*status*/}
          <Select>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="وضعیت" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="تأخیر">تأخیر</SelectItem>
              <SelectItem value="مرخصی">مرخصی</SelectItem>
              <SelectItem value="غایب">غایب</SelectItem>
              <SelectItem value="حاضر">حاضر</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </form>
      <Button className='w-10'>تایید</Button>
    </section>
  );
};

export default AddReport;