"use client";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFormContext } from "react-hook-form";
import { CampaignSchema } from "../../schema/schema";

const ExtraMedia = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [linkInput, setLinkInput] = useState("");
  const [showLinkInput, setShowLinkInput] = useState(false);

  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<CampaignSchema>();

  const media = watch("media") || [];

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      const fileUrl = URL.createObjectURL(selectedFile);

      const fileType = selectedFile.type.startsWith("image/")
        ? "image"
        : "video";

      const newMedia = [
        ...media,
        {
          name: selectedFile.name,
          url: fileUrl,
          type: fileType as "image" | "video",
        },
      ];

      setValue("media", newMedia);
    }
  };

  const handleAddLink = () => {
    if (linkInput.trim()) {
      const fileType = linkInput.match(/\.(jpg|jpeg|png|gif|webp)$/i)
        ? "image"
        : "video";

      const newMedia = [
        ...media,
        {
          name: `Link ${media.length + 1}`,
          url: linkInput,
          type: fileType as "image" | "video",
        },
      ];

      setValue("media", newMedia);
      setLinkInput("");
      setShowLinkInput(false);
    }
  };

  const handleRemoveMedia = (index: number) => {
    const updatedMedia = media.filter((_, i) => i !== index);
    setValue("media", updatedMedia);
  };

  return (
    <div className="max-w-[1222px] w-full bg-[var(--company-basics-bg)] mx-auto rounded-[8px] px-[30px] py-[30px] flex flex-col border border-[var(--createCampaing-border)]">
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

      {media.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-4">
          {media.map((item, index) => (
            <div
              key={index}
              className="relative border rounded-[8px] p-2 bg-[#FFFFFF1A] border-[#FFFFFF]"
            >
              {item.type === "image" ? (
                <Image
                  src={item.url}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="object-cover rounded"
                />
              ) : (
                <div className="w-[100px] h-[100px] flex items-center justify-center bg-gray-200 rounded">
                  <span className="text-xs">Video</span>
                </div>
              )}
              <button
                type="button"
                onClick={() => handleRemoveMedia(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
              >
                ×
              </button>
              <p className="text-xs mt-1 text-[var(--black-color)] truncate w-[100px]">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      )}

      {errors.media && (
        <p className="text-red-500 text-sm mt-2">{errors.media.message}</p>
      )}

      <div className="flex w-full mx-auto gap-5 flex-wrap mt-5">
        <div className="w-full m-auto lg:max-w-[570px] flex flex-col gap-5 justify-center items-center border border-dashed pt-[21px] pb-[21px] rounded-[8px] bg-[#FFFFFF1A] border-[#FFFFFF] shadow-[4px_5px_6px_0px_#FFFFFF66_inset] backdrop-blur-[7.5px]">
          <div
            className={`w-[160px] ${
              file && "mb-[20px]"
            } h-[80px] flex items-center justify-center`}
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
            accept="image/*,video/*"
            onChange={handleFileChange}
          />

          <button
            type="button"
            className="w-[267px] px-2 py-3 rounded-[8px] cursor-pointer bg-[var(--button-bg)] text-[var(--white-color)]"
            onClick={() => document.getElementById("fileInput1")?.click()}
          >
            აირჩიე ფაილი
          </button>
        </div>

        <div className="w-full m-auto lg:max-w-[570px] flex flex-col gap-5 justify-center items-center border border-dashed pt-[21px] pb-[21px] rounded-[8px] bg-[#FFFFFF1A] border-[#FFFFFF] shadow-[4px_5px_6px_0px_#FFFFFF66_inset] backdrop-blur-[7.5px]">
          {showLinkInput ? (
            <div className="w-full px-4 flex flex-col ">
              <input
                type="url"
                value={linkInput}
                onChange={(e) => setLinkInput(e.target.value)}
                placeholder="ჩასვით ლინკი..."
                className="w-full border rounded-[8px] px-3 py-2 text-[var(--black-color)] outline-none bg-white"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleAddLink}
                  className="flex-1 px-2 py-2 rounded-[8px] cursor-pointer bg-[var(--button-bg)] text-[var(--white-color)]"
                >
                  დამატება
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowLinkInput(false);
                    setLinkInput("");
                  }}
                  className="flex-1 px-2 py-2 rounded-[8px] cursor-pointer bg-gray-300 text-[var(--black-color)] "
                >
                  გაუქმება
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="w-[160px] h-[63px] flex items-center justify-center">
                <div className="flex flex-col items-center justify-center">
                  <div className="flex py-[5px] flex-col items-center mt-2">
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

              <button
                type="button"
                onClick={() => setShowLinkInput(true)}
                className="w-[267px] px-2 py-3 rounded-[8px] cursor-pointer bg-[var(--button-bg)] text-[var(--white-color)] mt-[15px]"
              >
                აირჩიე ლინკი
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExtraMedia;
