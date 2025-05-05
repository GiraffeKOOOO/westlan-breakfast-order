const useAdminCheck = (userDiscordId: string | undefined): boolean => {
  const staffIds = [
    import.meta.env.VITE_STAFF_1_ID,
    import.meta.env.VITE_STAFF_2_ID,
    import.meta.env.VITE_STAFF_3_ID,
    import.meta.env.VITE_STAFF_4_ID,
  ];

  return !!userDiscordId && staffIds.includes(userDiscordId);
};

export default useAdminCheck;
