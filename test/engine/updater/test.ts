function getWinner(eventBus: EventBus, goldenId: string, property: string) {
  return getEventByPayload(eventBus, UPDATE_FLUID_PROPERTIES, {
    goldenId,
    property,
  });
}
