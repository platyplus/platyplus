/// <reference types="next" />
/// <reference types="next/types/global" />

declare module '*.module.less' {
  const classes: { readonly [key: string]: string }
  export default classes
}
