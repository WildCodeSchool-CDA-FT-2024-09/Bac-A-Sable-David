export type Repo = {
  id: string;
  name: string;
  url: string;
  status: Status;
  languages:Lang[]
};

export type Lang = {
  id: number;
  name: string;
};

export type Status = {
  id: number;
  name: string;
};
