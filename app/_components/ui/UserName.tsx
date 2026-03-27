const UserName = ({ username }: { username: string }) => {
  return (
    <span className="text-[15px] font-medium text-foreground opacity-90">
      {username}
    </span>
  );
};

export default UserName;
