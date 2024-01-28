export const getEnvsVariable = () => {
  return {
    VITE_SECRET: import.meta.env.VITE_SECRET,
  };
};
