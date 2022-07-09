export interface IToaster {
  title: string;
  message: string;
  type: IEnumToaster;
}

export enum IEnumToaster {
  error = 'error',
  success = 'success',
  info = 'info',
  warning = 'warning',
}
