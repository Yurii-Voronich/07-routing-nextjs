import fetchNotes from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClientPage from "./notes.client";

interface NotesProps {
  params: Promise<{ slug: string[] }>;
}
const Notes = async ({ params }: NotesProps) => {
  const { slug } = await params;
  const status = slug[0] === "All" ? "" : slug[0];
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", status],
    queryFn: () => fetchNotes(1, "", status),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClientPage status={status} />
    </HydrationBoundary>
  );
};

export default Notes;
