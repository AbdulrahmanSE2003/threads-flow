const AddPost = () => {
  return (
    <div
      className={`flex justify-start items-center gap-4 border-b border-border p-6 pb-4`}
    >
      {/* NOTE: Image goes here */}
      <div className={`rounded-full bg-amber-500 w-9 h-9`} />
      <input
        className={`grow focus:outline-none text-sm`}
        type="text"
        placeholder="What's New!"
      />
      <button
        className={`border text-sm text-foreground/90 hover:text-foreground cursor-pointer p-3.5 py-1.5 border-border rounded-lg active:scale-75 duration-500 tracking-wide font-semibold`}
      >
        Post
      </button>
    </div>
  );
};

export default AddPost;
