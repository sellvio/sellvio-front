"use client";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadFile } from "../../data/data";
import Button from "../../../myProfile/components/primirtives/button";

const ExtraMedia = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="max-w-[1222px] w-full bg-transparent mx-auto rounded-[8px] px-[30px] py-[30px] flex flex-col border">
      <div className="flex flex-col">
        <div
          className="flex items-center justify-between max-w-[1222px] cursor-pointer"
          onClick={() => setOpen((prev) => !prev)}
        >
          <div className="flex items-center gap-2">
            <Image
              src="/images/svg/upload.svg"
              width={22}
              height={22}
              alt="logo"
            />
            <h2 className="text-[20px] font-[600] text-[#000000]">
              გსურთ დამატებით მედიის ატვირთვა?
            </h2>
          </div>

          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src="/images/svg/dropdown.svg"
              width={12}
              height={6}
              alt="dropDown"
            />
          </motion.div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="text-[#000000AD] text-[14px] mt-4">
                იმ შემთხვევაში, თუ თქვენთვის სასურველი კონტენტის შექმნისთვის
                საჭიროა თქვენი ფოტოებისა და ვიდეობის გამოყენება კრეატორების
                მხირდან, გთხოვთ ატვირთოთ, რათა შეძლონ გამოყენება
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="flex w-full mx-auto gap-5 flex-wrap mt-5">
        {UploadFile.map((eachElement) => (
          <div
            key={eachElement.id}
            className="w-[570px] flex flex-col gap-5 justify-center items-center border border-dashed  pt-[21px] pb-[21px] bg-[#0866FF05] rounded-[8px]"
          >
            <Image
              src={eachElement.img}
              width={40}
              height={40}
              alt={eachElement.title}
            />
            <p className="text-[#000000A3] font-[700]">{eachElement.title}</p>

            <Button
              text="აირჩიე ფაილი"
              size="w-[267px] px-2 py-3 rounded-[8px] cursor-pointer"
              color="bg-[#0866FF] text-[#ffffff]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExtraMedia;
