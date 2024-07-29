export type Child =
  | JQuery.htmlString
  | JQuery.TypeOrArray<JQuery.Node | JQuery<JQuery.Node>>;

export type MaybeChild = Child | null | undefined | boolean;

export type Children = Child | Child[];

// eslint-disable-next-line @typescript-eslint/ban-types
export type PropsWithChildren<P = {}> = P & {
  children?: Children;
};
