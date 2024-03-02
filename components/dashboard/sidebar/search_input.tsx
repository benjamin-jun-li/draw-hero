"use client";
import { useEffect, ChangeEvent, useState } from "react";
import qs from "query-string";
import { Search } from "lucide-react";
import { useDebounceValue } from "usehooks-ts";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

const SearchInput = () => {
  const router = useRouter();
  const [searchVal, setSearchVal] = useState("");
  const [debouncedSearchVal, _] = useDebounceValue(searchVal, 500);

  useEffect(() => {
    if (debouncedSearchVal.trim() !== "") {
      const url = qs.stringifyUrl(
        {
          url: "",
          query: {
            search: debouncedSearchVal,
          },
        },
        {
          skipEmptyString: true,
          skipNull: true,
        }
      );
      router.push(url);
    }
  }, [router, debouncedSearchVal]);

  return (
    <div className="w-full relative">
      <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        className="w-full max-w-[516px] pl-9 py-0 focus-visible:ring-transparent"
        placeholder="Search Boards"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchVal(e.target.value)
        }
        value={searchVal}
      />
    </div>
  );
};

export default SearchInput;
