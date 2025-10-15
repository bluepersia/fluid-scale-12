import { docCloneGlobal } from "./global";
import { docCloneSiteLogo } from "./site-logo";
import { docCloneHomePage } from "./home-page";
import { docCloneHeader } from "./header";
import { docCloneHero } from "./hero";
import { docCloneCourseCard } from "./course-card";
import { docCloneFooter } from "./footer";
import { docCloneBtn } from "./btn";
import { DocumentClone } from "../../../../../../../src/parsing/serialization/docSerializer.types";

const docClone: DocumentClone = {
  styleSheets: [
    docCloneGlobal,
    docCloneSiteLogo,
    docCloneHomePage,
    docCloneHeader,
    docCloneHero,
    docCloneCourseCard,
    docCloneFooter,
    docCloneBtn,
  ],
};

export { docClone };
