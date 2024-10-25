import { TagProvider } from "./context/tag-context";

export default function ImagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TagProvider>{children}</TagProvider>;
}