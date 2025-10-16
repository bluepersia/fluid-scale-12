import { fluidDataGlobal } from "./global";
import { fluidDataSiteLogo } from "./site-logo";
import { fluidDataHeader } from "./header";
import { fluidDataHero } from "./hero";
import { fluidDataHomePage } from "./home-page";
import { fluidDataCourseCard } from "./course-card";
import { fluidDataFooter } from "./footer";
import { fluidDataBtn } from "./btn";

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
