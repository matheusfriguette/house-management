import { createContext, useContext } from "react";

const SlugContext = createContext<string | undefined>(undefined);

export const SlugProvider = ({ slug, children }: { slug: string; children: React.ReactNode }) => (
  <SlugContext.Provider value={slug}>{children}</SlugContext.Provider>
);

export const useSlug = () => {
  const context = useContext(SlugContext);
  if (!context) {
    throw new Error("useSlug must be used within SlugProvider");
  }
  return context;
};
