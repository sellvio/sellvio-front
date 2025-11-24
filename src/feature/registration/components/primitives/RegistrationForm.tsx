'use client';
import { Button } from '@/components/ui/button';
import ReUsableInput from '@/feature/Authorization/components/primitives/ReusableInput';
import { RegistrationFormProps } from '@/feature/registrationSocials/type';
import React from 'react';
import DatePicker from 'react-datepicker';
import { Controller } from 'react-hook-form';
import { Calendar } from 'lucide-react';
import 'react-datepicker/dist/react-datepicker.css';

interface RegistrationFormPropsExtended extends RegistrationFormProps {
  onSubmit: (e: React.FormEvent) => void;
  control: any;
}

const RegistrationForm: React.FC<RegistrationFormPropsExtended> = ({
  register,
  errors,
  onSubmit,
  control,
}) => {
  return (
    <form className="space-y-[22px] mt-[20px]" onSubmit={onSubmit}>
      <div className="space-y-[12px]">
        <ReUsableInput
          label="სახელი"
          id="first_name"
          type="text"
          placeholder="შეიყვანე სახელი"
          register={register}
          errors={errors}
        />
        <ReUsableInput
          label="გვარი"
          id="last_name"
          type="text"
          placeholder="შეიყვანე გვარი"
          register={register}
          errors={errors}
        />
        <ReUsableInput
          label="ზედმეტსახელი"
          id="nickname"
          type="text"
          placeholder="შეიყვანე ზედმეტსახელი"
          register={register}
          errors={errors}
        />

        <div className="flex flex-col gap-[16px] pt-[22px] rounded-[12px] w-full min-h-[94px]">
          <label
            htmlFor="date_of_birth"
            className="flex items-center gap-[16px] font-bold text-[18px] cursor-pointer"
          >
            დაბადების თარიღი
          </label>
          <div className="relative w-full">
            <Controller
              control={control}
              name="date_of_birth"
              render={({ field }) => (
                <div className="relative">
                  <DatePicker
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    dateFormat="dd.MM.yyyy"
                    placeholderText="აირჩიე თარიღი"
                    showYearDropdown
                    showMonthDropdown
                    dropdownMode="select"
                    maxDate={new Date()}
                    yearDropdownItemNumber={100}
                    scrollableYearDropdown
                    className="px-[18px] py-[17px] border border-[var(--auth-input-border)] rounded-[8px] focus:outline-[var(--auth-border)] w-full min-h-[56px] font-bold text-[18px] cursor-pointer"
                    wrapperClassName="w-full"
                  />
                  <Calendar
                    className="top-1/2 right-[18px] absolute text-gray-400 -translate-y-1/2 pointer-events-none"
                    size={20}
                  />
                </div>
              )}
            />
            {errors.date_of_birth?.message && (
              <p className="mt-[4px] text-[10px] text-red-600">
                {String(errors.date_of_birth?.message)}
              </p>
            )}
          </div>
        </div>
      </div>

      <Button variant="auth" type="submit">
        შემდეგი
      </Button>
    </form>
  );
};

export default RegistrationForm;
