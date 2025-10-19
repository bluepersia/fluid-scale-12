import { master as master0 } from "../../golden-master/0/master/engine/updater";
import { master as master1 } from "../../golden-master/1/master/engine/updater";
import { userFlowMaster as userFlowMaster0 } from "../../golden-master/0/master/engine/updater";
import { userFlowMaster as userFlowMaster1 } from "../../golden-master/1/master/engine/updater";
import { filterMasters } from "../../utils/masterFilter";
const masterCollection = filterMasters([master0, master1]);
const masterFlowCollection = filterMasters([userFlowMaster0, userFlowMaster1]);
const fullMasterFlowCollection = [userFlowMaster0, userFlowMaster1];
export { masterCollection, masterFlowCollection, fullMasterFlowCollection };
