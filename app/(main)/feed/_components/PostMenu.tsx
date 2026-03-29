"use client";

import { deletePost } from "@/actions/post.actions";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/app/_components/ui/dropdown-menu";
import { Trash2, User2 } from "lucide-react";

const PostMenu = ({ postId }: { postId: string }) => {
  return (
    <DropdownMenuContent className={`w-fit`}>
      <DropdownMenuItem asChild>
        <button
          onClick={() => deletePost(postId)}
          className={`flex justify-between items-center w-full`}
        >
          <span>View Profile</span>
          <User2 />
        </button>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem variant="destructive" asChild>
        <button
          onClick={() => deletePost(postId)}
          className={`flex justify-between items-center w-full`}
        >
          <span>Delete</span>
          <Trash2 />
        </button>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};

export default PostMenu;
