declare module "*.module.scss" {
  const classes: Record<string, string>;
  export default classes;
}

declare module "*.module.sass" {
  const classes: Record<string, string>;
  export default classes;
}

declare module "*.module.css" {
  const classes: Record<string, string>;
  export default classes;
}

declare module "*.glsl" {
  const classes: string;
  export default classes;
}

declare module "*.frag" {
  const classes: string;
  export default classes;
}

declare module "*.vert" {
  const classes: string;
  export default classes;
}
