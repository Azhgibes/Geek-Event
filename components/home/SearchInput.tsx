import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SearchBar() {
  return (
    <div className="mx-auto mt-10 flex max-w-3xl gap-3">
      <Input
        placeholder="Найти мероприятие, город или организатора..."
        className="h-12 bg-zinc-900 text-white"
      />

      <Button className="h-12 px-6">
        <Search className="mr-2 h-4 w-4" />
        Найти
      </Button>
    </div>
  );
}
