"use client";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ExtraMedia = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-[1222px] w-full bg-transparent mx-auto rounded-[8px] px-[30px] py-[30px] flex flex-col border  border-[var(--createCampaing-border)] ">
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
            <h2 className="text-[20px] font-[600] text-[var(--black-color)]">
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
              <p className="text-[var(--campaing-form-paragraphs)] text-[14px] mt-4">
                იმ შემთხვევაში, თუ თქვენთვის სასურველი კონტენტის შექმნისთვის
                საჭიროა თქვენი ფოტოებისა და ვიდეობის გამოყენება კრეატორების
                მხირდან, გთხოვთ ატვირთოთ, რათა შეძლონ გამოყენება
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex w-full mx-auto gap-5 flex-wrap mt-5">
        <div className="w-full m-auto lg:max-w-[570px] flex flex-col gap-5 justify-center items-center border border-dashed pt-[21px] pb-[21px] rounded-[8px]">
          <div
            className={`w-[160px] ${
              file && "mb-[20px] "
            }h-[80px] flex items-center justify-center`}
          >
            {file ? (
              <div className="flex flex-col items-center justify-center gap-2 mt-2">
                <div className="flex py-[5px] flex-col items-center mt-2">
                  <Image
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    width={60}
                    height={60}
                    className="object-cover rounded"
                  />
                </div>
              </div>
            ) : (
              <div className="w-full flex-col flex items-center justify-center">
                <Image
                  src="/images/svg/gallery.svg"
                  width={40}
                  height={40}
                  alt="ატვირთე ფაილი"
                />
                <p className="text-[var(--campaing-form-paragraphs)] font-[700]">
                  ატვირთე ფაილი
                </p>
              </div>
            )}
          </div>

          <input
            type="file"
            id="fileInput1"
            className="hidden"
            onChange={handleFileChange}
          />

          <button
            className="w-[267px] px-2 py-3 rounded-[8px] cursor-pointer bg-[var(--button-bg)] text-[var(--white-color)]"
            onClick={() => document.getElementById("fileInput1")?.click()}
          >
            აირჩიე ფაილი
          </button>
        </div>

        <div className="w-full m-auto lg:max-w-[570px] gap-5 flex flex-col justify-center items-center border border-dashed  pt-[21px] pb-[21px] rounded-[8px]">
          <div className="w-[160px] h-[63px] flex items-center justify-center">
            <div className="flex flex-col items-center justify-center ">
              <div className="w-full flex-col flex items-center justify-center">
                <Image
                  src="/images/svg/upload.svg"
                  alt="ლინკი"
                  width={39}
                  height={39}
                />
                <p className="text-[var(--campaing-form-paragraphs)] font-[700]">
                  ატვირთე ლინკი
                </p>
              </div>
            </div>
          </div>

          <button className="w-[267px] px-2 py-3 rounded-[8px] cursor-pointer bg-[var(--button-bg)] text-[var(--white-color)]">
            აირჩიე ლინკი
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExtraMedia;
