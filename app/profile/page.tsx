import Image from "next/image";
import Avatar from "../_components/Avatar";

// NOTE TEMPORARY
import avatar from "@/public/avatar.png";
import AddPost from "../(main)/feed/_components/AddPost";

const ProfilePage = () => {
  // const currentUser = prisma.User.read;
  return (
    <div className="min-h-[calc(100vh - 3rem)] bg-background text-foreground flex items-center justify-center">
      <div className="mt-4 md:mt-12 bg-white dark:bg-main border border-border w-full md:w-2xl rounded-3xl flex flex-col h-full p-5 relative">
        {/* Header Section: Name & Photo */}
        <div className="flex justify-between items-start w-full">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold">Abdulrahman Saad</h1>
            <div className="flex items-center gap-2">
              <span className="text-[15px] font-medium text-foreground opacity-90">
                _abdulr_hman
              </span>
            </div>
          </div>
          <Avatar size={96} className="rounded-full object-cover" />
        </div>

        {/* Bio Section */}
        <div className="mt-1">
          <p className="text-[15px] leading-relaxed whitespace-pre-line text-zinc-800 dark:text-zinc-200">
            20 Years{"\n"}
            Real Madrid 🤍⭐{"\n"}
            Trying to be better 🤲
          </p>
        </div>

        {/* Followers Section (Threads Style) */}
        <div className="mt-2 flex items-center gap-3">
          <div className="flex items-center">
            <div className="relative w-5 h-5 rounded-full border-2 border-background overflow-hidden">
              <Image
                src={avatar}
                alt="follower"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative w-5 h-5 -ml-2 rounded-full border-2 border-background overflow-hidden z-10">
              <Image
                src={avatar}
                alt="follower"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative w-5 h-5 -ml-2 rounded-full border-2 border-background overflow-hidden z-20">
              <Image
                src={avatar}
                alt="follower"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <span className="text-[14px] text-zinc-500 hover:underline cursor-pointer">
            29 followers
          </span>
        </div>

        <button className="mt-4 w-full py-1.5 border border-zinc-300 dark:border-zinc-700 rounded-xl font-semibold text-[15px] hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all cursor-pointer">
          Edit profile
        </button>

        <AddPost className={"border-none mt-2 px-0"} />
      </div>
    </div>
  );
};

export default ProfilePage;
