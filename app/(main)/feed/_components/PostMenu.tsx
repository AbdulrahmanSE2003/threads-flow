"use client";

import { deletePost } from "@/actions/post.actions";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/app/_components/ui/dropdown-menu";
import { Trash2, User2 } from "lucide-react";
import Link from "next/link";

const PostMenu = ({
  postId,
  isOwner,
  author,
}: {
  postId: string;
  isOwner: boolean;
  author: string;
}) => {
  return (
    <DropdownMenuContent className={`w-fit`}>
      <DropdownMenuItem asChild>
        <Link
          href={`/profile/${author}`}
          className={`flex justify-between items-center w-full`}
        >
          <span>View Profile</span>
          <User2 />
        </Link>
      </DropdownMenuItem>
      {isOwner && (
        <>
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
        </>
      )}
    </DropdownMenuContent>
  );
};

export default PostMenu;
