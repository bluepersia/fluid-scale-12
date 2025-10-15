async function waitUntil(conditionFn: () => boolean, interval = 100) {
  while (!conditionFn()) {
    await new Promise((resolve) => setTimeout(resolve, interval));
  }
}

export { waitUntil };
