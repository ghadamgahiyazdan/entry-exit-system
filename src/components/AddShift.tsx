"use client"
import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { add_shift } from '@/service/api';
import { useRefreshStore } from '@/store/RefreshStore';

interface ShiftFormData {
  title: string;
  description: string;
}

const AddShift = () => {
  const {setRefresh} = useRefreshStore();
  const [formData, setFormData] = useState<ShiftFormData>({
    title: '',
    description: ''
  });
  const [startShift, setStartShift] = useState('');
  const [endShift, setEndShift] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTimeChange = (e: ChangeEvent<HTMLInputElement>, type: 'start' | 'end') => {
    const { value } = e.target;
    if (type === 'start') {
      setStartShift(value);
    } else {
      setEndShift(value);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Combine description with time information
      const submissionData = {
        ...formData,
        description: `${formData.description} | زمان شروع: ${startShift} | زمان پایان: ${endShift}`
      };
      
      await add_shift(submissionData);
      setFormData({
        title: '',
        description: ''
      });
      setStartShift('');
      setEndShift('');
      alert('شیفت جدید با موفقیت ثبت شد');
      setRefresh();
    } catch (error) {
      console.error('خطا در ثبت شیفت:', error);
      alert('خطا در ثبت اطلاعات. لطفاً مجدداً تلاش نمایید');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="col-span-3 lg:col-span-1 bg-gray-100 flex flex-col justify-center items-center p-6 gap-4 text-2xl border rounded-lg">
      <h1 className="text-center font-bold text-3xl text-gray-800">افزودن شیفت جدید</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Input 
              id="title" 
              name="title" 
              value={formData.title}
              onChange={handleChange}
              className='bg-white flex-1 text-right'
              required
              placeholder="نام شیفت"
              disabled={isSubmitting}
            />
            <Label htmlFor="title" className="text-right whitespace-nowrap text-lg">
              نام شیفت
            </Label>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Input 
              id="description" 
              name="description" 
              value={formData.description}
              onChange={handleChange}
              className='bg-white flex-1 text-right'
              placeholder="توضیحات شیفت"
              disabled={isSubmitting}
            />
            <Label htmlFor="description" className="text-right whitespace-nowrap text-lg">
              توضیحات
            </Label>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Input 
              type="time"
              id="startShift"
              value={startShift}
              onChange={(e) => handleTimeChange(e, 'start')}
              className='bg-white flex-1 text-right'
              required
              disabled={isSubmitting}
            />
            <Label htmlFor="startShift" className="text-right whitespace-nowrap text-lg">
              زمان شروع شیفت
            </Label>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Input 
              type="time"
              id="endShift"
              value={endShift}
              onChange={(e) => handleTimeChange(e, 'end')}
              className='bg-white flex-1 text-right'
              required
              disabled={isSubmitting}
            />
            <Label htmlFor="endShift" className="text-right whitespace-nowrap text-lg">
              زمان پایان شیفت
            </Label>
          </div>
        </div>
        
        <Button 
          type="submit" 
          className='w-32 self-end mt-4'
          disabled={isSubmitting}
        >
          {isSubmitting ? 'در حال ثبت...' : 'ثبت شیفت'}
        </Button>
      </form>
    </section>
  );
};

export default AddShift;