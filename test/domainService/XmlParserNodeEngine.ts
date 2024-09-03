import xmldom from "xmldom";
import type { IXmlParseEngine } from "../../src/domainService/IXmlParseEngine";

export class XmlParserNodeEngine implements IXmlParseEngine<Element, Document> {
  parse(body: string): Document {
    const parser = new xmldom.DOMParser();
    return parser.parseFromString(body);
  }

  getRoot(document: Document): Element {
    for (let i = 0; i < document.childNodes.length; i++) {
      const child = document.childNodes.item(i);
      if (child?.nodeName === "feedback") return child as Element;
    }
    throw new Error("Element <feedback> is not found in root.");
  }

  getChild(element: Element, key: string): Element | null {
    for (let i = 0; i < element.childNodes.length; i++) {
      const child = element.childNodes.item(i);
      if (child?.nodeName === key) return child as Element;
    }
    return null;
  }

  getChildren(element: Element, key: string): Element[] {
    const children: Element[] = [];
    for (let i = 0; i < element.childNodes.length; i++) {
      const child = element.childNodes.item(i);
      if (child?.nodeName === key) children.push(child as Element);
    }
    return children;
  }

  getValue(node: Element): string {
    return node.textContent ?? "";
  }

  getChildValue(element: Element, key: string): string {
    const child = this.getChild(element, key);
    if (!child) {
      return "";
    }
    return this.getValue(child);
  }
}
