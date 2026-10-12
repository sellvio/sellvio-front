type StateMessageProps = {
  children: React.ReactNode;
  tone?: "default" | "error";
};

const StateMessage = ({ children, tone = "default" }: StateMessageProps) => (
  <p
    className={`w-full px-[15px] py-4 text-[15px] ${
      tone === "error" ? "text-[#E53935]" : "text-[var(--buisness-card-info)]"
    }`}
  >
    {children}
  </p>
);

export default StateMessage;
