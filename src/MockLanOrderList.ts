import BREAKFAST_OPTIONS from './Components/BreakfastOptions';

type MockOrder = {
  userName: string;
  orderType: string;
  completed: boolean;
};

const MockLanOrderList: MockOrder[] = [
  {
    userName: 'BobSwarley',
    orderType: BREAKFAST_OPTIONS.FAT_BASTARD,
    completed: false,
  },
  {
    userName: 'Johnnny',
    orderType: BREAKFAST_OPTIONS.SAUSAGE_AND_BACON,
    completed: false,
  },
  {
    userName: 'Randomness',
    orderType: BREAKFAST_OPTIONS.EGG_AND_BACON,
    completed: false,
  },
  {
    userName: 'AAAAAAAAA',
    orderType: BREAKFAST_OPTIONS.ONLY_EGG,
    completed: false,
  },
  {
    userName: 'SwahiliMahili',
    orderType: BREAKFAST_OPTIONS.FAT_BASTARD,
    completed: false,
  },
  {
    userName: 'PenPineapple',
    orderType: BREAKFAST_OPTIONS.FAT_BASTARD,
    completed: false,
  },
  // {
  //   userName: 'Shrek',
  //   orderType: BREAKFAST_OPTIONS.SAUSAGE_AND_BACON,
  //   completed: false,
  // },
  // { orderId: 7, userName: 'Fiona', orderType: BREAKFAST_OPTIONS.SAUSAGE_AND_EGG, completed: false },
  // { orderId: 8, userName: 'Donkey', orderType: BREAKFAST_OPTIONS.FAT_BASTARD, completed: false },
  // { orderId: 9, userName: 'Donkey', orderType: BREAKFAST_OPTIONS.FAT_BASTARD, completed: false },
  // {
  //   orderId: 10,
  //   userName: 'BobSwarley',
  //   orderType: BREAKFAST_OPTIONS.FAT_BASTARD,
  //   completed: false,
  // },
  // {
  //   orderId: 11,
  //   userName: 'Johnnny',
  //   orderType: BREAKFAST_OPTIONS.SAUSAGE_AND_BACON,
  //   completed: false,
  // },
  // {
  //   orderId: 12,
  //   userName: 'Randomness',
  //   orderType: BREAKFAST_OPTIONS.EGG_AND_BACON,
  //   completed: false,
  // },
  // { orderId: 13, userName: 'AAAAAAAAA', orderType: BREAKFAST_OPTIONS.ONLY_EGG, completed: false },
  // {
  //   orderId: 14,
  //   userName: 'SwahiliMahili',
  //   orderType: BREAKFAST_OPTIONS.FAT_BASTARD,
  //   completed: false,
  // },
  // {
  //   orderId: 15,
  //   userName: 'PenPineapple',
  //   orderType: BREAKFAST_OPTIONS.FAT_BASTARD,
  //   completed: false,
  // },
  // {
  //   orderId: 16,
  //   userName: 'Shrek',
  //   orderType: BREAKFAST_OPTIONS.SAUSAGE_AND_BACON,
  //   completed: false,
  // },
  // {
  //   orderId: 17,
  //   userName: 'Fiona',
  //   orderType: BREAKFAST_OPTIONS.SAUSAGE_AND_EGG,
  //   completed: false,
  // },
  // { orderId: 18, userName: 'Donkey', orderType: BREAKFAST_OPTIONS.FAT_BASTARD, completed: false },
  // { orderId: 19, userName: 'Donkey', orderType: BREAKFAST_OPTIONS.FAT_BASTARD, completed: false },
  // {
  //   orderId: 20,
  //   userName: 'BobSwarley',
  //   orderType: BREAKFAST_OPTIONS.FAT_BASTARD,
  //   completed: false,
  // },
  // {
  //   orderId: 21,
  //   userName: 'Johnnny',
  //   orderType: BREAKFAST_OPTIONS.SAUSAGE_AND_BACON,
  //   completed: false,
  // },
  // {
  //   orderId: 22,
  //   userName: 'Randomness',
  //   orderType: BREAKFAST_OPTIONS.EGG_AND_BACON,
  //   completed: false,
  // },
  // { orderId: 23, userName: 'AAAAAAAAA', orderType: BREAKFAST_OPTIONS.ONLY_EGG, completed: false },
  // {
  //   orderId: 24,
  //   userName: 'SwahiliMahili',
  //   orderType: BREAKFAST_OPTIONS.FAT_BASTARD,
  //   completed: false,
  // },
  // {
  //   orderId: 25,
  //   userName: 'PenPineapple',
  //   orderType: BREAKFAST_OPTIONS.FAT_BASTARD,
  //   completed: false,
  // },
  // {
  //   orderId: 26,
  //   userName: 'Shrek',
  //   orderType: BREAKFAST_OPTIONS.SAUSAGE_AND_BACON,
  //   completed: false,
  // },
  // {
  //   orderId: 27,
  //   userName: 'Fiona',
  //   orderType: BREAKFAST_OPTIONS.SAUSAGE_AND_EGG,
  //   completed: false,
  // },
  // { orderId: 28, userName: 'Donkey', orderType: BREAKFAST_OPTIONS.FAT_BASTARD, completed: false },
  // { orderId: 29, userName: 'Donkey', orderType: BREAKFAST_OPTIONS.FAT_BASTARD, completed: false },
  // {
  //   orderId: 30,
  //   userName: 'BobSwarley',
  //   orderType: BREAKFAST_OPTIONS.FAT_BASTARD,
  //   completed: false,
  // },
  // {
  //   orderId: 31,
  //   userName: 'Johnnny',
  //   orderType: BREAKFAST_OPTIONS.SAUSAGE_AND_BACON,
  //   completed: false,
  // },
  // {
  //   orderId: 32,
  //   userName: 'Randomness',
  //   orderType: BREAKFAST_OPTIONS.EGG_AND_BACON,
  //   completed: false,
  // },
  // { orderId: 33, userName: 'AAAAAAAAA', orderType: BREAKFAST_OPTIONS.ONLY_EGG, completed: false },
  // {
  //   orderId: 34,
  //   userName: 'SwahiliMahili',
  //   orderType: BREAKFAST_OPTIONS.FAT_BASTARD,
  //   completed: false,
  // },
  // {
  //   orderId: 35,
  //   userName: 'PenPineapple',
  //   orderType: BREAKFAST_OPTIONS.FAT_BASTARD,
  //   completed: false,
  // },
  // {
  //   orderId: 36,
  //   userName: 'Shrek',
  //   orderType: BREAKFAST_OPTIONS.SAUSAGE_AND_BACON,
  //   completed: false,
  // },
  // {
  //   orderId: 37,
  //   userName: 'Fiona',
  //   orderType: BREAKFAST_OPTIONS.SAUSAGE_AND_EGG,
  //   completed: false,
  // },
  // { orderId: 38, userName: 'Donkey', orderType: BREAKFAST_OPTIONS.FAT_BASTARD, completed: false },
  // { orderId: 39, userName: 'Donkey', orderType: BREAKFAST_OPTIONS.FAT_BASTARD, completed: false },
  // {
  //   orderId: 40,
  //   userName: 'BobSwarley',
  //   orderType: BREAKFAST_OPTIONS.FAT_BASTARD,
  //   completed: false,
  // },
  // {
  //   orderId: 41,
  //   userName: 'Johnnny',
  //   orderType: BREAKFAST_OPTIONS.SAUSAGE_AND_BACON,
  //   completed: false,
  // },
  // {
  //   orderId: 42,
  //   userName: 'Randomness',
  //   orderType: BREAKFAST_OPTIONS.EGG_AND_BACON,
  //   completed: false,
  // },
  // { orderId: 43, userName: 'AAAAAAAAA', orderType: BREAKFAST_OPTIONS.ONLY_EGG, completed: false },
  // {
  //   orderId: 44,
  //   userName: 'SwahiliMahili',
  //   orderType: BREAKFAST_OPTIONS.FAT_BASTARD,
  //   completed: false,
  // },
  // {
  //   orderId: 45,
  //   userName: 'PenPineapple',
  //   orderType: BREAKFAST_OPTIONS.FAT_BASTARD,
  //   completed: false,
  // },
  // {
  //   orderId: 46,
  //   userName: 'Shrek',
  //   orderType: BREAKFAST_OPTIONS.SAUSAGE_AND_BACON,
  //   completed: false,
  // },
  // {
  //   orderId: 47,
  //   userName: 'Fiona',
  //   orderType: BREAKFAST_OPTIONS.SAUSAGE_AND_EGG,
  //   completed: false,
  // },
  // { orderId: 48, userName: 'Donkey', orderType: BREAKFAST_OPTIONS.FAT_BASTARD, completed: false },
  // { orderId: 49, userName: 'Donkey', orderType: BREAKFAST_OPTIONS.FAT_BASTARD, completed: false },
  // {
  //   orderId: 50,
  //   userName: 'BobSwarley',
  //   orderType: BREAKFAST_OPTIONS.FAT_BASTARD,
  //   completed: false,
  // },
  // {
  //   orderId: 51,
  //   userName: 'Johnnny',
  //   orderType: BREAKFAST_OPTIONS.SAUSAGE_AND_BACON,
  //   completed: false,
  // },
  // {
  //   orderId: 52,
  //   userName: 'Randomness',
  //   orderType: BREAKFAST_OPTIONS.EGG_AND_BACON,
  //   completed: false,
  // },
  // { orderId: 53, userName: 'AAAAAAAAA', orderType: BREAKFAST_OPTIONS.ONLY_EGG, completed: false },
  // {
  //   orderId: 54,
  //   userName: 'SwahiliMahili',
  //   orderType: BREAKFAST_OPTIONS.FAT_BASTARD,
  //   completed: false,
  // },
  // {
  //   orderId: 55,
  //   userName: 'PenPineapple',
  //   orderType: BREAKFAST_OPTIONS.FAT_BASTARD,
  //   completed: false,
  // },
  // {
  //   orderId: 56,
  //   userName: 'Shrek',
  //   orderType: BREAKFAST_OPTIONS.SAUSAGE_AND_BACON,
  //   completed: false,
  // },
  // {
  //   orderId: 57,
  //   userName: 'Fiona',
  //   orderType: BREAKFAST_OPTIONS.SAUSAGE_AND_EGG,
  //   completed: false,
  // },
  // { orderId: 58, userName: 'Donkey', orderType: BREAKFAST_OPTIONS.FAT_BASTARD, completed: false },
  // { orderId: 59, userName: 'Donkey', orderType: BREAKFAST_OPTIONS.FAT_BASTARD, completed: false },
  // {
  //   orderId: 60,
  //   userName: 'BobSwarley',
  //   orderType: BREAKFAST_OPTIONS.FAT_BASTARD,
  //   completed: false,
  // },
  // {
  //   orderId: 61,
  //   userName: 'Johnnny',
  //   orderType: BREAKFAST_OPTIONS.SAUSAGE_AND_BACON,
  //   completed: false,
  // },
  // {
  //   orderId: 62,
  //   userName: 'Johnnny',
  //   orderType: BREAKFAST_OPTIONS.SAUSAGE_AND_BACON,
  //   completed: false,
  // },
  // {
  //   orderId: 63,
  //   userName: 'Like a really really really really really really name',
  //   orderType: BREAKFAST_OPTIONS.FAT_BASTARD,
  //   completed: false,
  // },
];

export default MockLanOrderList;
