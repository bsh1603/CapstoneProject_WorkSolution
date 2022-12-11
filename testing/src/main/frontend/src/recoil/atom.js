import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const {persistAtom} = recoilPersist();
// export const userState = atom({
//   key: "userState", //변수명
//   default: {
//     id: undefined,
//     name: undefined,
//     admin: undefined,
//   },
// });

export const userState = atom({
  key: "userState", //변수명
  default: {
    id: undefined,
    name: undefined,
    admin: undefined,
    email : undefined,
    phone : undefined
  },
  effects_UNSTABLE : [persistAtom]
});

export const memberState = atom({
  key: "memberState", // 변수명
  default: [],
  effects_UNSTABLE : [persistAtom]
});

export const workState = atom({
  key: "workState",
  default: [],
  effects_UNSTABLE : [persistAtom]

});

export const teamState = atom({
  key: "teamState", // 변수명
  default: [],
});

export const stockState = atom({
   key : "stockState",
   default : [],
});

export const clickState = atom({
    key: "clickState",
    default : false,
});

export const isWorkingState = atom({
  key: "isWorkingState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const chartState = atom({
  key: "chartState",
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export const barState = atom({
  key : "barState",
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export const doughnutState = atom({
  key : "doughnutState",
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export const barPayState = atom({
  key : "barPayState",
  default: {},
  effects_UNSTABLE: [persistAtom],
});
