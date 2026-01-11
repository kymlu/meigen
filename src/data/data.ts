export type Motto = {
  id: number;
  text: string;
  author?: string;
  scene?: string;
}

export const testMottoList: Motto[] = [
  {
    id: 0,
    text: "Sample",
    author: "Author ABC",
    scene: "Festival ABC"
  },
  {
    id: 0.1,
    text: "Sample no author",
    scene: "Festival DEF"
  },
  {
    id: 0.2,
    text: "Sample no scene",
    author: "Author XYZ"
  },
  {
    id: 0.3,
    text: "Sample no author or scene"
  },
  {
    id: 0.4,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  }
]

export const mainMottoList: Motto[] = [
  {
    id: 1,
    text: "KATIE DANCE TIME!",
    author: "らくだガール"
  },
  {
    id: 2,
    text: "今が一番タイミング！",
  },
  {
    id: 3,
    text: "オーケイティー",
    author: "らくだガール"
  },
  {
    id: 4,
    text: "みんなが本当にすごい。",
    author: "しまたろう"
  },
  {
    id: 5,
    text: "名言名言名言名言名言",
    author: "誰々A",
    scene: "場面A"
  },
  {
    id: 6,
    text: "名言名言名言",
    author: "誰々B",
    scene: "場面B"
  },
  {
    id: 7,
    text: "名言名言名言名言名言名言名言名言",
    author: "誰々C",
  },
]