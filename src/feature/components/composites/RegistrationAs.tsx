import Link from 'next/link';
import { RegistrationAsProps } from '../type';

const RegistrationAs = ({
  bussines,
  creator,
  accountInfo,
  creatorAuth,
  businessAuth,
}: RegistrationAsProps) => {
  return (
    <div>
      <p className="mt-[33px] font-bold text-[18px] text-[var(--auth-text-dark)] text-center">
        {accountInfo}
        <Link href={`/${businessAuth}?type=bussines`}>
          <span className="ml-[4px] text-[var(--auth-registrationas-text)]">
            {bussines}
          </span>
        </Link>
        <span className="mx-[4px]">ან</span>
        <Link href={`/${creatorAuth}?type=creator`}>
          <span className="text-[var(--auth-registrationas-text)]">
            {creator}
          </span>
        </Link>
      </p>
    </div>
  );
};

export default RegistrationAs;
