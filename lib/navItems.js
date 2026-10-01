const navItems = [
  { name: "Társadalmi felelősségvállalás", path: "/felelossegvallalas" },
  {
    name: "Népszerű témakörök",
    path: "#",
    children: [
      { name: "Jövőtervezés", path: "/szemelyes-jovotervezes" },
      { name: "Családtámogatás", path: "/csalad-tamogatas" },
      { name: "Vállalkozóknak", path: "/vallalkozas-tamogatas" },
    ],
  },
  { name: "Rólunk", path: "/rolunk" },
  { name: "Karrier", path: "/rolunk#karrier" },
  { name: "Blog", path: "/szakmai-blog" },
];

export default navItems;
