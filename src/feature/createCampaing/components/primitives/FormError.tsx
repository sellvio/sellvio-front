'use client';

import { FormErrorProps } from '@/feature/common/type';
import Image from 'next/image';

export default function FormError({ message }: FormErrorProps) {
  return (
    <div className="relative flex items-center gap-[8px] min-h-[8px]">
      {message && (
        <div className="absolute flex items-center gap-[8px]">
          <div className="w-[13px] lg:w-[16px] h-[13px] lg:h-[16px]">
            <Image
              src="/images/headerIcons/svg/alert-circle.svg"
              alt="error"
              width={16}
              height={16}
            />
          </div>
          <p className="text-[#E53935] text-[11px]">{message}</p>
        </div>
      )}
    </div>
  );
}
