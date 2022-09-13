const CopyrightFooter = ({ backgroundColor }: { backgroundColor?: string }): JSX.Element => {
  return (
    <div
      style={{
        backgroundColor: backgroundColor || "transparent",
        fontSize: "small",
        textAlign: "center",
      }}
    >
      &copy; {new Date().getFullYear()} {process.env.REACT_APP_COMPANY_NAME}. All rights reserved.
    </div>
  );
};

export default CopyrightFooter;
