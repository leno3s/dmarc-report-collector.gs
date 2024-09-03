export interface IXmlParseEngine<T, S> {
  parse(body: string): S;
  getRoot(document: S): T;
  getChild(element: T, key: string): T | null;
  getChildren(element: T, key: string): T[];
  getValue(element: T): string;
  getChildValue(element: T, key: string): string;
}
