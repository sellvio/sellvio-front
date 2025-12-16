"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFormContext } from "react-hook-form";
import { CampaignSchema } from "../../schema/schema";
import Link from "next/link";

const ExtraMedia = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null); // ერთჯერადი preview-სთვის (არასავალდებული)
  const [linkInput, setLinkInput] = useState("");
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [showAllFiles, setShowAllFiles] = useState(false);
  const [showAllLinks, setShowAllLinks] = useState(false);

  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<CampaignSchema>();

  // რეგისტრაცია რომ Zod-მა იცოდეს media ველი
  register("media");

  const media = watch("media") || [];

  // გამოყოფა ფაილები და ლინკები
  const fileMedia = media.filter((item: any) => item.source === "file");
  const linkMedia = media.filter((item: any) => item.source === "link");

  const displayedFiles = showAllFiles ? fileMedia : fileMedia.slice(0, 5);
  const remainingFilesCount = fileMedia.length - 5;

  const displayedLinks = showAllLinks ? linkMedia : linkMedia.slice(0, 5);
  const remainingLinksCount = linkMedia.length - 5;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    const selectedFile = e.target.files[0];
    setFile(selectedFile); // preview-სთვის (არასავალდებული)

    const fileUrl = URL.createObjectURL(selectedFile);
    const fileType = selectedFile.type.startsWith("image/") ? "image" : "video";

    const newMediaItem = {
      name: selectedFile.name,
      url: fileUrl,
      type: fileType as "image" | "video",
      source: "file" as const,
      file: selectedFile, // ნამდვილი File ობიექტი API-სთვის
    };

    const updatedMedia = [...media, newMediaItem];
    setValue("media", updatedMedia, { shouldValidate: true });
  };

  const handleAddLink = () => {
    if (!linkInput.trim()) return;

    const fileType = /\.(jpg|jpeg|png|gif|webp|mp4|webm|mov)$/i.test(linkInput)
      ? linkInput.match(/\.mp4|\.webm|\.mov/i)
        ? "video"
        : "image"
      : "image"; // უბრალო გამოცნობა

    const newMediaItem = {
      name: `ლინკი ${media.length + 1}`,
      url: linkInput.trim(),
      type: fileType as "image" | "video",
      source: "link" as const,
    };

    const updatedMedia = [...media, newMediaItem];
    setValue("media", updatedMedia, { shouldValidate: true });

    setLinkInput("");
    setShowLinkInput(false);
  };

  const handleRemoveMedia = (index: number) => {
    const updatedMedia = media.filter((_: any, i: number) => i !== index);
    setValue("media", updatedMedia, { shouldValidate: true });
  };

  return (
    <div className="max-w-[1222px] w-full bg-[var(--company-basics-bg)] mx-auto rounded-[8px] px-[30px] py-[30px] flex flex-col border border-[var(--createCampaing-border)]">
      {/* Header - გახსნა/დახურვა */}
      <div className="flex flex-col">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setOpen((prev) => !prev)}
        >
          <div className="flex items-center gap-2">
            <Image
              src="/images/svg/upload.svg"
              width={22}
              height={22}
              alt="upload"
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
              alt="dropdown"
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
                საჭიროა თქვენი ფოტოებისა და ვიდეოების გამოყენება კრეატორების
                მხრიდან, გთხოვთ ატვირთოთ, რათა შეძლონ გამოყენება
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ატვირთული მედია - preview */}
      {(fileMedia.length > 0 || linkMedia.length > 0) && (
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-8">
          {fileMedia.length > 0 && (
            <div>
              <h3 className="font-bold text-[var(--black-color)] mb-3">
                ატვირთული ფაილები
              </h3>
              <div className="flex flex-wrap gap-4 max-h-[220px] overflow-y-auto pr-2">
                {displayedFiles.map((item: any, idx: number) => {
                  const originalIndex = media.findIndex((m: any) => m === item);
                  return (
                    <div
                      key={originalIndex}
                      className="relative border rounded-[8px] p-2 bg-[#FFFFFF1A] border-[#FFFFFF] flex items-center gap-2 max-w-[300px]"
                    >
                      <Image
                        src="/images/svg/gallery.svg"
                        width={20}
                        height={20}
                        alt="file"
                      />
                      <span className="text-sm truncate">{item.name}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveMedia(originalIndex)}
                        className="absolute top-[-8px] right-[-8px] bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                      >
                        ×
                      </button>
                    </div>
                  );
                })}

                {fileMedia.length > 5 && !showAllFiles && (
                  <button
                    type="button"
                    onClick={() => setShowAllFiles(true)}
                    className="border rounded-[8px] p-2 bg-[#FFFFFF1A] border-[#FFFFFF]"
                  >
                    +{remainingFilesCount}
                  </button>
                )}

                {showAllFiles && fileMedia.length > 5 && (
                  <button
                    type="button"
                    onClick={() => setShowAllFiles(false)}
                    className="border rounded-[8px] p-2 bg-[#FFFFFF1A] border-[#FFFFFF]"
                  >
                    ნაკლები
                  </button>
                )}
              </div>
            </div>
          )}

          {linkMedia.length > 0 && (
            <div>
              <h3 className="font-bold text-[var(--black-color)] mb-3">
                დამატებული ლინკები
              </h3>
              <div className="flex flex-wrap gap-4 max-h-[220px] overflow-y-auto pr-2">
                {displayedLinks.map((item: any, idx: number) => {
                  const originalIndex = media.findIndex((m: any) => m === item);
                  return (
                    <div
                      key={originalIndex}
                      className="relative border rounded-[8px] p-2 bg-[#FFFFFF1A] border-[#FFFFFF] flex items-center gap-2 max-w-[300px]"
                    >
                      <Image
                        src="/images/svg/upload.svg"
                        width={20}
                        height={20}
                        alt="link"
                      />
                      <Link
                        href={item.url}
                        target="_blank"
                        className="text-sm truncate"
                      >
                        {item.url}
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleRemoveMedia(originalIndex)}
                        className="absolute top-[-8px] right-[-8px] bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                      >
                        ×
                      </button>
                    </div>
                  );
                })}

                {linkMedia.length > 5 && !showAllLinks && (
                  <button
                    type="button"
                    onClick={() => setShowAllLinks(true)}
                    className="border rounded-[8px] p-2 bg-[#FFFFFF1A] border-[#FFFFFF]"
                  >
                    +{remainingLinksCount}
                  </button>
                )}

                {showAllLinks && linkMedia.length > 5 && (
                  <button
                    type="button"
                    onClick={() => setShowAllLinks(false)}
                    className="border rounded-[8px] p-2 bg-[#FFFFFF1A] border-[#FFFFFF]"
                  >
                    ნაკლები
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ატვირთვის ღილაკები */}
      <div className="flex flex-col md:flex-row gap-5 mt-8">
        {/* ფაილის ატვირთვა */}
        <div className="flex-1 flex flex-col items-center">
          <div className="border border-dashed rounded-[8px] bg-[#FFFFFF1A] border-[#FFFFFF] shadow-[4px_5px_6px_0px_#FFFFFF66_inset] backdrop-blur-[7.5px] pt-[21px] pb-[21px] w-full max-w-[570px] flex flex-col items-center gap-5">
            <Image
              src="/images/svg/gallery.svg"
              width={40}
              height={40}
              alt="ატვირთე ფაილი"
            />
            <p className="text-[var(--campaing-form-paragraphs)] font-[700]">
              ატვირთე ფაილი
            </p>

            <input
              type="file"
              id="fileInputExtra"
              className="hidden"
              accept="image/*,video/*"
              onChange={handleFileChange}
            />

            <button
              type="button"
              onClick={() => document.getElementById("fileInputExtra")?.click()}
              className="w-[267px] px-2 py-3 rounded-[8px] bg-[var(--button-bg)] text-[var(--white-color)] cursor-pointer"
            >
              აირჩიე ფაილი
            </button>
          </div>
        </div>

        {/* ლინკის დამატება */}
        <div className="flex-1 flex flex-col items-center">
          <div className="border border-dashed rounded-[8px] bg-[#FFFFFF1A] border-[#FFFFFF] shadow-[4px_5px_6px_0px_#FFFFFF66_inset] backdrop-blur-[7.5px] pt-[21px] pb-[21px] w-full max-w-[570px] flex flex-col items-center gap-5">
            {showLinkInput ? (
              <div className="w-full px-6 flex flex-col gap-4">
                <input
                  type="url"
                  placeholder="ჩასვით ლინკი..."
                  value={linkInput}
                  onChange={(e) => setLinkInput(e.target.value)}
                  className="w-full border rounded-[8px] px-3 py-2 bg-white text-[var(--black-color)] outline-none"
                />
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={handleAddLink}
                    className="flex-1 py-2 rounded-[8px] bg-[var(--button-bg)] text-white"
                  >
                    დამატება
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowLinkInput(false);
                      setLinkInput("");
                    }}
                    className="flex-1 py-2 rounded-[8px] bg-gray-300 text-[var(--black-color)]"
                  >
                    გაუქმება
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Image
                  src="/images/svg/upload.svg"
                  width={39}
                  height={39}
                  alt="ლინკი"
                />
                <p className="text-[var(--campaing-form-paragraphs)] font-[700]">
                  ატვირთე ლინკი
                </p>

                <button
                  type="button"
                  onClick={() => setShowLinkInput(true)}
                  className="w-[267px] px-2 py-3 rounded-[8px] bg-[var(--button-bg)] text-[var(--white-color)] cursor-pointer mt-4"
                >
                  აირჩიე ლინკი
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ვალიდაციის შეცდომა */}
      {errors.media && (
        <p className="text-red-500 text-sm mt-4">
          {(errors.media as any)?.message}
        </p>
      )}
    </div>
  );
};

export default ExtraMedia;
