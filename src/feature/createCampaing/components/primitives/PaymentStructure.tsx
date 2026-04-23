'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import FormError from './FormError';
import { PaymentStructureProps, PaymentType } from '../../type';
import { paymentTypeOptions } from '../../data/data';

const PaymentStructure = ({
  register,
  setValue,
  errors,
  selectedPaymentType,
}: PaymentStructureProps) => {
  const [isPaymentDropdownOpen, setPaymentDropdownOpen] = useState(false);
  const [isQuantityPopupOpen, setQuantityPopupOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const currentPaymentType =
    paymentTypeOptions.find((item) => item.value === selectedPaymentType) ??
    paymentTypeOptions[0];

  const handlePaymentTypeSelect = (value: PaymentType) => {
    setValue('payment_type', value, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setPaymentDropdownOpen(false);
    setQuantityPopupOpen(false);
  };

  return (
    <section className="bg-white shadow-[0px_12px_32px_-4px_rgba(0,19,86,0.06)] p-10 rounded-[1.5rem]">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-1">
        <div className="flex justify-center items-center bg-[#0040e0]/10 rounded-xl w-9 h-9 shrink-0">
          <Image
            src="/images/svg/payment.svg"
            width={20}
            height={20}
            alt="logo"
          />
        </div>
        <h2 className="font-bold text-[#171c20] text-2xl">
          გადახდის სტრუქტურა
        </h2>
      </div>
      <p className="mb-8 ml-12 text-[#434656] text-sm">
        განსაზღვრე როგორ მიიღებენ შემქმნელები ანაზღაურებას ამ კამპანიაში
      </p>

      <div className="space-y-8">
        {/* Payment Type Dropdown */}
        <div className="relative flex flex-col gap-2" ref={dropdownRef}>
          <label className="block mb-1 px-1 font-semibold text-[#0040e0] text-xs uppercase tracking-wide">
            შეთავაზების ტიპი
          </label>

          <button
            type="button"
            onClick={() => setPaymentDropdownOpen((prev) => !prev)}
            className="relative flex justify-between items-center bg-[#eff4f9] px-5 py-4 rounded-xl outline-none focus:ring-[#0040e0] focus:ring-2 w-full font-bold text-[#171c20] text-left transition-all"
          >
            <span>{currentPaymentType.label}</span>
            <motion.div
              animate={{ rotate: isPaymentDropdownOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center pointer-events-none"
            >
              <Image
                src="/images/svg/dropdown.svg"
                width={12}
                height={6}
                alt="dropDown"
              />
            </motion.div>
          </button>

          {isPaymentDropdownOpen && (
            <div className="top-full left-0 z-20 absolute mt-2 w-full">
              <div className="bg-white shadow-[0px_16px_40px_-4px_rgba(0,19,86,0.12)] border border-[#c4c5d9]/30 rounded-xl overflow-hidden">
                {paymentTypeOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      handlePaymentTypeSelect(option.value as PaymentType)
                    }
                    className="flex flex-col gap-1 hover:bg-[#eff4f9] px-5 py-3.5 w-full text-left transition-colors cursor-pointer"
                  >
                    <span className="font-bold text-[#171c20]">
                      {option.label}
                    </span>
                    <span className="text-[#434656] text-xs">
                      {option.description}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <input type="hidden" {...register('payment_type')} />
          <FormError message={errors.payment_type?.message} />
        </div>

        {/* Quantity & Amount */}
        <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="block mb-1 px-1 font-semibold text-[#0040e0] text-xs uppercase tracking-wide">
              მოცულობა
            </label>
            <input
              type="number"
              placeholder={currentPaymentType.quantityPlaceholder}
              {...register('payment_per_quantity')}
              onFocus={() => setQuantityPopupOpen(true)}
              className="bg-[#eff4f9] px-5 py-4 border-none rounded-xl outline-none focus:ring-[#0040e0] focus:ring-2 w-full font-bold text-[#171c20] transition-all [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              style={{ MozAppearance: 'textfield' }}
            />
            <FormError message={errors.payment_per_quantity?.message} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="block mb-1 px-1 font-semibold text-[#0040e0] text-xs uppercase tracking-wide">
              ფასი
            </label>
            <div className="relative">
              <span className="top-1/2 left-4 absolute font-bold text-[#434656] -translate-y-1/2 select-none">
                ₾
              </span>
              <input
                type="number"
                placeholder={currentPaymentType.amountPlaceholder}
                {...register('payment_amount')}
                className="bg-[#eff4f9] px-5 py-4 pl-10 border-none rounded-xl outline-none focus:ring-[#0040e0] focus:ring-2 w-full font-bold text-[#171c20] transition-all [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                style={{ MozAppearance: 'textfield' }}
              />
            </div>
            <FormError message={errors.payment_amount?.message} />
          </div>
        </div>

        {isQuantityPopupOpen && (
          <p className="bg-[#eff4f9] px-5 py-3 rounded-xl text-[#434656] text-sm">
            {currentPaymentType.helperText}
          </p>
        )}
      </div>
    </section>
  );
};

export default PaymentStructure;
