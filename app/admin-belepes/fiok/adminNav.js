import { VscListFilter } from "react-icons/vsc";
import { FaRegNewspaper } from "react-icons/fa";
import { FaUsersGear, FaRegStar } from "react-icons/fa6";

const navItem = [
  {
    name: "Áttekintés",
    path: "/admin-belepes/fiok",
    icon: <VscListFilter />,
  },
  {
    name: "Bejegyzések",
    path: "/admin-belepes/fiok/bejegyzesek",
    icon: <FaRegNewspaper />,
  },
  {
    name: "Felhasználók",
    path: "/admin-belepes/fiok/felhasznalok",
    icon: <FaUsersGear />,
  },
  {
    name: "Értékelések",
    path: "/admin-belepes/fiok/ertekelesek",
    icon: <FaRegStar />,
  },
];

export default navItem;
