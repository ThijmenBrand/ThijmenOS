type Dimentions = {
  height: number;
  width: number;
  fullScreen?: boolean;
}

export interface WindowOptions extends Dimentions {
  title: string;
}

export default	WindowOptions;