import { getState, updateWindowWidth } from "./engineState";
import { removeElement } from "./engineState";
import { ElementState, FluidProperty, FluidPropertyState } from "./index.types";

let update = () => {
  updateWindowWidth();
  const { visibleEls, pendingHiddenEls } = getState();

  //Flush pending elements
  for (const elState of pendingHiddenEls) {
    updateElement(elState);
  }

  //Update visible elements
  for (const elState of visibleEls) {
    updateElement(elState);
  }
};

update = update;

function updateElement(elState: ElementState) {
  const { el } = elState;

  if (!el.isConnected) {
    removeElement(elState);
    return;
  }

  const { fluidProperties } = elState;
  const stateUpdates: Map<string, FluidPropertyState> = new Map();
  for (const fluidProperty of fluidProperties) {
    const { property, orderID } = fluidProperty.metaData;
    if (!stateUpdates.has(property)) {
      stateUpdates.set(property, {
        property,
        value: "",
        orderID,
      });
    }
    const stateUpdate: FluidPropertyState | undefined = updateFluidProperty(
      fluidProperty,
      stateUpdates.get(property)
    );
    if (stateUpdate) {
      stateUpdates.set(property, stateUpdate);
    }
  }

  for (const [property, stateUpdate] of stateUpdates) {
    el.style.setProperty(property, stateUpdate.value);
  }
}

function updateFluidProperty(
  fluidProperty: FluidProperty,
  currentPropertyState: FluidPropertyState | undefined
): FluidPropertyState | undefined {
  if (
    currentPropertyState &&
    fluidProperty.metaData.orderID < currentPropertyState.orderID
  )
    return;
}

export { updateElement, updateFluidProperty };
