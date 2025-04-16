type LogoTitleProps = {
  kind: "title" | "sidebar";
};

const LogoTitle = ({ kind }: LogoTitleProps): React.JSX.Element => {
  return (
    <div
      className={`mb-8 flex items-center justify-center ${kind === "sidebar" && "p-4"}`}
    >
      <img
        src="/soccer-player.png"
        alt="Soccer Manager Logo"
        className={`inline-block h-auto ${kind === "title" ? "w-32" : "w-18"}`}
      />
      <h1
        className={`lato-regular-italic inline-block text-green-800 ${kind === "title" ? "text-5xl" : "text-2xl"}`}
      >
        Soccer Manager
      </h1>
    </div>
  );
};

export default LogoTitle;
