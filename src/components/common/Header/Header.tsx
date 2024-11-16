import type { ReactNode } from "react";

interface HeaderProps {
  children: ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return (
    <h2 className="lg:text-[2rem] md:text-[2rem] sm:text-[1.6rem] font-semibold">
      {children}
    </h2>
  );
};

// Header.propTypes = {
//   label: PropTypes.string,
//   size: PropTypes.oneOf(["lg", "md", "sm"])
// };

export default Header;
