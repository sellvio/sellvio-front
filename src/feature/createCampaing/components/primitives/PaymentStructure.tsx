'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useMemo, useRef, useState } from 'react';
import { paymentTypeOptions } from '../../../../../feature/createCampaing/data/data';
import FormError from './FormError';
import { PaymentStructureProps, PaymentType } from '../../type';

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
    <div className="flex flex-col bg-[var(--company-basics-bg)] mx-auto px-[30px] py-[30px] border border-[var(--createCampaing-border)] rounded-[8px] w-full">
      <div className="flex flex-col gap-[26px]">
        <div className="flex flex-col">
          <div className="flex">
            <Image
              src="/images/svg/payment.svg"
              width={22}
              height={22}
              alt="logo"
            />
            <h2 className="font-[600] text-[27px] text-[var(--black-color)]">
              გადახდის სტრუქტურა
            </h2>
          </div>
          <p className="text-[14px] text-[var(--campaing-form-paragraphs)]">
            განსაზღვრე როგორ მიიღებენ შემქმნელები ანაზღაურებას ამ კამპანიაში
          </p>
        </div>

        <div className="flex flex-col gap-[27px]">
          <div className="relative flex flex-col gap-[15px]" ref={dropdownRef}>
            <h3 className="mb-[16px] font-[700] text-[18px] text-[var(--black-color)]">
              შეთავაზების ტიპი
            </h3>

            <button
              type="button"
              onClick={() => setPaymentDropdownOpen((prev) => !prev)}
              className="relative flex justify-between items-center bg-[#FFFFFF1A] shadow-[4px_5px_6px_0px_#FFFFFF66_inset] backdrop-blur-[7.5px] p-[18px] pr-14 border border-[#FFFFFF] rounded-[8px] outline-none w-full font-[700] text-[var(--black-color)] text-left"
            >
              <span>{currentPaymentType.label}</span>

              <motion.div
                animate={{ rotate: isPaymentDropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="right-4 absolute flex items-center pointer-events-none"
              >
                <Image
                  src="/images/svg/dropdown.svg"
                  width={12}
                  height={6}
                  alt="dropDown"
                />
              </motion.div>
            </button>

            <AnimatePresence>
              {isPaymentDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="top-[100%] left-0 z-20 absolute mt-2 w-full"
                >
                  <div className="bg-[#FFFFFF1A] shadow-[4px_5px_6px_0px_#FFFFFF33] backdrop-blur-[7.5px] border border-[#FFFFFF] rounded-[8px] overflow-hidden">
                    {paymentTypeOptions.map((option) => (
                      <motion.button
                        key={option.value}
                        type="button"
                        onClick={() => handlePaymentTypeSelect(option.value)}
                        className="flex flex-col gap-[4px] hover:bg-[#FFFFFF33] px-4 py-3 w-full text-left transition-colors cursor-pointer"
                        whileTap={{ scale: 0.99 }}
                      >
                        <span className="font-[700] text-[var(--black-color)]">
                          {option.label}
                        </span>
                        <span className="text-[13px] text-[var(--campaing-form-paragraphs)]">
                          {option.description}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <input type="hidden" {...register('payment_type')} />
            <FormError message={errors.payment_type?.message} />
          </div>
          <div className="flex flex-col gap-[18px]">
            <h3 className="font-[700] text-[18px] text-[var(--black-color)]">
              შეთავაზების ტიპი
            </h3>
            <div className="flex gap-4">
              <div className="relative flex flex-col gap-[15px] w-full">
                <input
                  type="number"
                  placeholder={'რაოდენობა'}
                  {...register('payment_per_quantity')}
                  onFocus={() => setQuantityPopupOpen(true)}
                  className="bg-[#FFFFFF1A] shadow-[4px_5px_6px_0px_#FFFFFF66_inset] backdrop-blur-[7.5px] p-[18px] border border-[#FFFFFF] rounded-[8px] outline-none w-full font-[700] text-[var(--black-color)] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  style={{ MozAppearance: 'textfield' }}
                />

                <FormError message={errors.payment_per_quantity?.message} />
              </div>

              <div className="flex flex-col flex-1 gap-[15px] min-w-[250px] max-w-[900px]">
                <input
                  type="number"
                  placeholder={'თანხა'}
                  {...register('payment_amount')}
                  className="bg-[#FFFFFF1A] shadow-[4px_5px_6px_0px_#FFFFFF66_inset] backdrop-blur-[7.5px] p-[18px] border border-[#FFFFFF] rounded-[8px] outline-none w-full overflow-hidden font-[700] text-[var(--black-color)] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none text:sm"
                  style={{ MozAppearance: 'textfield' }}
                />

                <FormError message={errors.payment_amount?.message} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentStructure;
