import { master as master0 } from "../golden-master/0/master/engine/index";
import { master as master1 } from "../golden-master/1/master/engine/index";
import { filterMasters } from "../utils/masterFilter";
const masterCollection = filterMasters([master0, master1]);

export { masterCollection };
