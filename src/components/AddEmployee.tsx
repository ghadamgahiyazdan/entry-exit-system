"use client"
import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { add_employee } from '@/service/api';
import { useRefreshStore } from '@/store/RefreshStore';

interface EmployeeFormData {
    name: string;
    employeeId: string;
}

const AddEmployee = () => {
    const [formData, setFormData] = useState<EmployeeFormData>({
        name: '',
        employeeId: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const {setRefresh} = useRefreshStore();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await add_employee(formData);
            setFormData({
                name: '',
                employeeId: ''
            });
            alert('کارمند با موفقیت اضافه شد');
            setRefresh()
        } catch {
            alert('خطا در اضافه کردن کارمند');
        }
    };

    return (
        <section className="col-span-3 lg:col-span-1 bg-gray-100 flex flex-col justify-center items-center p-6 gap-4 text-2xl border rounded-lg">
            <h1 className="text-center">اضافه کردن کارمند</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
                <div className="flex items-center gap-2">
                    <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className='bg-white flex-1'
                        required
                    />
                    <Label htmlFor="name" className="text-right whitespace-nowrap">
                        نام و نام خانوادگی
                    </Label>
                </div>

                <div className="flex items-center gap-2">
                    <Input
                        id="employeeId"
                        name="employeeId"
                        value={formData.employeeId}
                        onChange={handleChange}
                        className='bg-white flex-1'
                        required
                    />
                    <Label htmlFor="employeeId" className="text-right whitespace-nowrap">
                        کد کاربری
                    </Label>
                </div>
                <Button type="submit" className='w-24 self-end'>تایید</Button>
            </form>
        </section>
    );
};

export default AddEmployee;