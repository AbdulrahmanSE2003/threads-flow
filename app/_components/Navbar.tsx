import { AtSign } from "lucide-react";

const Navbar = () => {
  return (
    <nav
      className={`h-full fixed max-md:hidden top-0 bottom-0 left-0 w-16 flex justify-center items-start z-10 p-5`}
    >
      <AtSign
        className={`opacity-80 hover:opacity-100 transition-opacity duration-300 cursor-pointer`}
      />
    </nav>
  );
};

export default Navbar;
