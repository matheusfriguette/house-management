import { RoomContent } from "./_components/room-content";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return <RoomContent slug={slug} />;
}
