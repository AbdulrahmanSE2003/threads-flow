import { capitalizeFirstLetter, cn } from "@/lib/utils";

const PageHeader = ({
  page,
  className,
}: {
  page: string | null;
  className?: string;
}) => {
  page = page?.split("/")[1] || "Feed";
  const pageTitle = capitalizeFirstLetter(page ?? "Feed");

  return (
    <h6
      className={cn(
        `my-3 font-semibold tracking-wider text-[14px] cursor-default`,
        className,
      )}
    >
      {pageTitle}
    </h6>
  );
};

export default PageHeader;
