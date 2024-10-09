import { useState, useEffect } from "react";
import { UserResolver } from "@satlantis/api-client";

import { splitUrlAndText } from "src/utils";

export type Post = {
  image: string;
  id: number;
};

const useFetchPosts = (profile: UserResolver | undefined, page: number) => {
  const [posts, setPosts] = useState<Post[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!profile || !page) return;
    (async () => {
      setLoading(true);
      const notes = await profile.getNotesFromRestAPI({ limit: 9, page });
      if (notes instanceof Error) {
        setLoading(false);
        throw notes;
      }
      const noteContent = notes
        .map((note) => {
          const [imageUrl] = splitUrlAndText(note.content);
          return {
            image: imageUrl,
            id: note.source.data.id as number,
          };
        })
        .filter((content) => !!content.image);
      setPosts((prevState) => {
        if (!prevState) return noteContent;
        const combinedArray = [...prevState, ...noteContent];
        const uniqueMap = new Map<string | number, Post>(
          combinedArray.map((item) => [item.id, item]),
        );
        return Array.from(uniqueMap.values());
      });
      setLoading(false);
    })();
  }, [profile, page, setPosts, setLoading]);

  return { posts, loading };
};

export default useFetchPosts;
