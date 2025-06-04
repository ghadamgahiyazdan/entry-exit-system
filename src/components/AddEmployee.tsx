import React from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';

const AddEmployee = () => {
    return (
        <section className="col-span-3 lg:col-span-1 bg-gray-100 flex flex-col justify-center items-center p-6 gap-4 text-2xl border rounded-lg">
            <h1 className="text-center">اضافه کردن کارمند</h1>
            <form className="flex flex-col gap-3 w-full">
                <div className="flex items-center gap-2">
                    <Input id="employeeName" name="employeeName" className='bg-white flex-1' />
                    <Label htmlFor="employeeName" className="text-right whitespace-nowrap">
                        نام و نام خانوارگی
                    </Label>
                </div>

                <div className="flex items-center gap-2">
                    <Input id="userCode" name="userCode" className='bg-white flex-1' />
                    <Label htmlFor="userCode" className="text-right whitespace-nowrap">
                        کد کاربری
                    </Label>
                </div>
            </form>
            <Button className='w-10'>تایید</Button>
        </section>
    );
};

export default AddEmployee;