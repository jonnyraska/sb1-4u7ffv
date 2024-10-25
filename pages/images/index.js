import { useState } from "react";
import { ImageGrid } from "@/components/images/image-grid";
import { ImageToolbar } from "@/components/images/image-toolbar";
import { TagProvider } from "@/context/tag-context";

export default function ImagesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  return (
    <TagProvider>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-[#0d3366] mb-2">Images</h1>
          <p className="text-gray-500">
            Manage your image library and organize with tags
          </p>
        </div>

        <ImageToolbar 
          onSearch={setSearchQuery}
          selectedTags={selectedTags}
          onTagSelect={setSelectedTags}
        />
        
        <ImageGrid 
          searchQuery={searchQuery}
          selectedTags={selectedTags}
        />
      </div>
    </TagProvider>
  );
}