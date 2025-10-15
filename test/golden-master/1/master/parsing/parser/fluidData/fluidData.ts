import { fluidDataBtn } from "./btn";
import { fluidDataCourseCard } from "./course-card";
import { fluidDataFooter } from "./footer";
import { fluidDataHeader } from "./header";
import { fluidDataHero } from "./hero";
import { fluidDataSiteLogo } from "./site-logo";
import { fluidDataHomePage } from "./home-page";
import { fluidDataGlobal } from "./global";

const fluidData = {
  ...fluidDataGlobal,
  ...fluidDataBtn,
  ...fluidDataCourseCard,
  ...fluidDataFooter,
  ...fluidDataHeader,
  ...fluidDataHero,
  ...fluidDataSiteLogo,
  ...fluidDataHomePage,
};

export { fluidData };
