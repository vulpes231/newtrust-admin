// Sidebar.jsx
import React from "react";
import { motion } from "framer-motion";
import { sideBarLinks } from "../constants/constants";
import Logo from "./Logo";
import { useDispatch, useSelector } from "react-redux";
import { selectNavSlice, setActiveLink } from "../features/navSlice";
import { slideLeft, container, card } from "../style/variants";
import { styles } from "../style";
import {
  LucideArrowDownCircle,
  LucideChartBar,
  LucideCircleDollarSign,
  LucideCog,
  LucideFolderClock,
  LucideHome,
  LucideUserCog,
  LucideUserLock,
} from "lucide-react";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { activeLink } = useSelector(selectNavSlice);

  return (
    <motion.aside
      variants={slideLeft}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`hidden lg:block col-span-1 bg-white/90 dark:bg-slate-800/20 text-slate-600 dark:text-slate-300 p-0 !shadow-lg`}
    >
      <div className="flex flex-col gap-10">
        <span className="py-2 px-4">
          <Logo />
        </span>

        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-4 mt-5"
        >
          {sideBarLinks.map((link) => {
            const icon =
              link.id === "dashboard" ? (
                <LucideHome />
              ) : link.id === "admins" ? (
                <LucideUserCog />
              ) : link.id === "users" ? (
                <LucideUserLock />
              ) : link.id === "transactions" ? (
                <LucideCircleDollarSign />
              ) : link.id === "positions" ? (
                <LucideArrowDownCircle />
              ) : link.id === "savings" ? (
                <LucideChartBar />
              ) : link.id === "plans" ? (
                <LucideFolderClock />
              ) : link.id === "verifications" ? (
                <LucideUserLock />
              ) : null;
            return (
              <motion.span
                variants={card}
                key={link.id}
                onClick={() => dispatch(setActiveLink(link.id))}
                className={`cursor-pointer py-2 px-4 transition-colors duration-300 
								${
                  activeLink === link.id
                    ? `bg-[#5156be] font-medium shadow-md text-white`
                    : `hover:bg-slate-300/20 dark:hover:bg-slate-700/30`
                } capitalize flex items-start gap-2`}
              >
                {icon}
                {link.name}
              </motion.span>
            );
          })}
        </motion.div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
