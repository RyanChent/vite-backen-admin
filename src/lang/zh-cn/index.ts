export default Object.values(import.meta.globEager("./*.ts")).reduce(
  (self, { default: lang }) => ({ ...self, ...lang }),
  {}
);
