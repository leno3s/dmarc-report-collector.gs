import type { IXmlParseEngine } from "./IXmlParseEngine";

export class XmlParseGasEngine
  implements
    IXmlParseEngine<
      GoogleAppsScript.XML_Service.Element,
      GoogleAppsScript.XML_Service.Document
    >
{
  parse(body: string): GoogleAppsScript.XML_Service.Document {
    return XmlService.parse(body);
  }

  getRoot(
    document: GoogleAppsScript.XML_Service.Document
  ): GoogleAppsScript.XML_Service.Element {
    return document.getRootElement();
  }

  getChild(
    node: GoogleAppsScript.XML_Service.Element,
    key: string
  ): GoogleAppsScript.XML_Service.Element | null {
    return node.getChild(key);
  }

  getChildren(
    node: GoogleAppsScript.XML_Service.Element,
    key: string
  ): GoogleAppsScript.XML_Service.Element[] {
    return node.getChildren(key);
  }

  getValue(node: GoogleAppsScript.XML_Service.Element): string {
    return node.getValue();
  }

  getChildValue(
    element: GoogleAppsScript.XML_Service.Element,
    key: string
  ): string {
    const child = this.getChild(element, key);
    if (!child) {
      return "";
    }
    return this.getValue(child);
  }
}
