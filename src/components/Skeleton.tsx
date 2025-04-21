import {Skeleton} from "@/src/components/ui/skeleton";

export default function Skeleton() {
  return (
    <div className="flex grid-cols-2 flex-col gap-5 pt-12 sm:grid md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} className="h-[30rem] w-full" />
      ))}
    </div>
  );
}
