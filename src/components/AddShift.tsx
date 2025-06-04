import React from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';


const AddShift = () => {
    return (
        <section className="col-span-3 lg:col-span-1 bg-gray-100 flex flex-col justify-center items-center p-6 gap-4 text-2xl border rounded-lg">
            <h1 className="text-center">اضافه کردن شیفت</h1>
            <form className="flex flex-col gap-3 w-full">
                <div className="flex items-center gap-2">
                    <Input id="shiftName" name="shiftName" className='bg-white flex-1' />
                    <Label htmlFor="shiftName" className="text-right whitespace-nowrap">
                        نام
                    </Label>
                </div>

                <div className="flex items-center gap-2">
                    <Input id="shiftDescription" name="shiftDescription" className='bg-white flex-1' />
                    <Label htmlFor="shiftDescription" className="text-right whitespace-nowrap">
                        توضیحات
                    </Label>
                </div>
            </form>
            <Button className='w-10'>تایید</Button>
        </section>
    );
};

export default AddShift;