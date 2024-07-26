import { motion } from "framer-motion";

interface MobileSearchBarPropsType {
  isOpen: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  inputValue: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MobileSearchBar = ({ isOpen, handleSubmit, inputValue, handleInputChange }: MobileSearchBarPropsType) => {
  return (
    <>
      {isOpen && (
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: isOpen ? "8rem" : 0 }}
          transition={{ duration: 0.1 }}
          className={`mobile-search-bar md:hidden fixed top-0 z-20 w-full h-20 bg-white shadow-card px-6 py-4 transition-all`}
        >
          <form className="w-full" onSubmit={handleSubmit}>
            <input
              id="searchBar"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              className=" w-full h-12 border border-solid border-Gray-3 rounded-[50px] indent-5"
            />
          </form>
        </motion.div>
      )}
    </>
  );
};

export default MobileSearchBar;
