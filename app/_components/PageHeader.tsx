import { capitalizeFirstLetter } from "@/lib/utils";

const PageHeader = ({ page }: { page: string | null }) => {
  page = page?.split("/")[1] || "Feed";
  const pageTitle = capitalizeFirstLetter(page ?? "Feed");

  return (
    <h6
      className={`my-3 font-semibold tracking-wider text-[14px] cursor-default`}
    >
      {pageTitle}
    </h6>
  );
};

export default PageHeader;
