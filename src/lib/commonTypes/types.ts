export type AboutUsType = {
  fullName: string;
  img: string;
  github: string;
  nameKey: string;
  roleKey: string;
  bioKey: string;
};

export type ErrorPopUpProps = {
  onClick: () => void;
  error: string;
};
