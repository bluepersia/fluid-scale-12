import { ruleBatchesBtn } from "./btn";
import { ruleBatchesHeader } from "./header";
import { ruleBatchesHero } from "./hero";
import { ruleBatchesHomePage } from "./home-page";
import { ruleBatchesCourseCard } from "./course-card";
import { ruleBatchesFooter } from "./footer";
import { ruleBatchesSiteLogo } from "./site-logo";
import { ruleBatchesGlobal } from "./global";
import { RuleBatch } from "../../../../../../../src/parsing/parser/docParser.types";

const ruleBatches: RuleBatch[][] = [
  ruleBatchesGlobal,
  ruleBatchesSiteLogo,
  ruleBatchesHeader,
  ruleBatchesHero,
  ruleBatchesHomePage,
  ruleBatchesCourseCard,
  ruleBatchesFooter,
  ruleBatchesBtn,
];

export { ruleBatches };
