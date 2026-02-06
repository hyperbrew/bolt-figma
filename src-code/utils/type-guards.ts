/**
 * Type guards for Figma Plugin API nodes
 *
 * These type guard functions help TypeScript narrow node types,
 * making it easier to work with Figma's API in a type-safe manner.
 *
 * @example
 * ```ts
 * import { isComponentNode, isTextNode, hasChildren } from "./utils/type-guards";
 *
 * const node = figma.currentPage.selection[0];
 *
 * if (isTextNode(node)) {
 *   // TypeScript knows node is TextNode here
 *   console.log(node.characters);
 * }
 *
 * if (hasChildren(node)) {
 *   // TypeScript knows node has children property
 *   console.log(node.children.length);
 * }
 * ```
 */

// ============================================
// Core Node Type Guards
// ============================================

export function isComponentNode(node: BaseNode | null): node is ComponentNode {
  return node?.type === "COMPONENT";
}

export function isComponentSetNode(
  node: BaseNode | null,
): node is ComponentSetNode {
  return node?.type === "COMPONENT_SET";
}

export function isInstanceNode(node: BaseNode | null): node is InstanceNode {
  return node?.type === "INSTANCE";
}

export function isFrameNode(node: BaseNode | null): node is FrameNode {
  return node?.type === "FRAME";
}

export function isGroupNode(node: BaseNode | null): node is GroupNode {
  return node?.type === "GROUP";
}

export function isSectionNode(node: BaseNode | null): node is SectionNode {
  return node?.type === "SECTION";
}

export function isTextNode(node: BaseNode | null): node is TextNode {
  return node?.type === "TEXT";
}

export function isPageNode(node: BaseNode | null): node is PageNode {
  return node?.type === "PAGE";
}

export function isDocumentNode(node: BaseNode | null): node is DocumentNode {
  return node?.type === "DOCUMENT";
}

// ============================================
// Shape Node Type Guards
// ============================================

export function isRectangleNode(node: BaseNode | null): node is RectangleNode {
  return node?.type === "RECTANGLE";
}

export function isEllipseNode(node: BaseNode | null): node is EllipseNode {
  return node?.type === "ELLIPSE";
}

export function isLineNode(node: BaseNode | null): node is LineNode {
  return node?.type === "LINE";
}

export function isPolygonNode(node: BaseNode | null): node is PolygonNode {
  return node?.type === "POLYGON";
}

export function isStarNode(node: BaseNode | null): node is StarNode {
  return node?.type === "STAR";
}

export function isVectorNode(node: BaseNode | null): node is VectorNode {
  return node?.type === "VECTOR";
}

export function isBooleanOperationNode(
  node: BaseNode | null,
): node is BooleanOperationNode {
  return node?.type === "BOOLEAN_OPERATION";
}

// ============================================
// Media Node Type Guards
// ============================================

export function isSliceNode(node: BaseNode | null): node is SliceNode {
  return node?.type === "SLICE";
}

// ============================================
// Composite Type Guards
// ============================================

/**
 * Checks if a node can have children.
 * Useful for traversing the node tree.
 */
export function hasChildren(
  node: BaseNode | null,
): node is
  | FrameNode
  | GroupNode
  | ComponentNode
  | ComponentSetNode
  | InstanceNode
  | BooleanOperationNode
  | SectionNode
  | PageNode {
  if (!node) return false;
  return (
    node.type === "FRAME" ||
    node.type === "GROUP" ||
    node.type === "COMPONENT" ||
    node.type === "COMPONENT_SET" ||
    node.type === "INSTANCE" ||
    node.type === "BOOLEAN_OPERATION" ||
    node.type === "SECTION" ||
    node.type === "PAGE"
  );
}

/**
 * Checks if a node is a container type (frame, group, component, or section).
 * Excludes instances since they can't be directly edited.
 */
export function isContainerNode(
  node: BaseNode | null,
): node is FrameNode | GroupNode | ComponentNode | SectionNode {
  if (!node) return false;
  return (
    node.type === "FRAME" ||
    node.type === "GROUP" ||
    node.type === "COMPONENT" ||
    node.type === "SECTION"
  );
}

/**
 * Checks if a node is a shape (rectangle, ellipse, polygon, star, line, or vector).
 */
export function isShapeNode(
  node: BaseNode | null,
): node is
  | RectangleNode
  | EllipseNode
  | PolygonNode
  | StarNode
  | LineNode
  | VectorNode {
  if (!node) return false;
  return (
    node.type === "RECTANGLE" ||
    node.type === "ELLIPSE" ||
    node.type === "POLYGON" ||
    node.type === "STAR" ||
    node.type === "LINE" ||
    node.type === "VECTOR"
  );
}

/**
 * Checks if a node is a component-related node (component, component set, or instance).
 */
export function isComponentRelatedNode(
  node: BaseNode | null,
): node is ComponentNode | ComponentSetNode | InstanceNode {
  if (!node) return false;
  return (
    node.type === "COMPONENT" ||
    node.type === "COMPONENT_SET" ||
    node.type === "INSTANCE"
  );
}

/**
 * Checks if a node can have fills applied.
 */
export function hasFills(
  node: BaseNode | null,
): node is
  | FrameNode
  | ComponentNode
  | InstanceNode
  | RectangleNode
  | EllipseNode
  | PolygonNode
  | StarNode
  | VectorNode
  | TextNode
  | BooleanOperationNode {
  if (!node) return false;
  return (
    node.type === "FRAME" ||
    node.type === "COMPONENT" ||
    node.type === "INSTANCE" ||
    node.type === "RECTANGLE" ||
    node.type === "ELLIPSE" ||
    node.type === "POLYGON" ||
    node.type === "STAR" ||
    node.type === "VECTOR" ||
    node.type === "TEXT" ||
    node.type === "BOOLEAN_OPERATION"
  );
}

/**
 * Checks if a node can have strokes applied.
 */
export function hasStrokes(
  node: BaseNode | null,
): node is
  | FrameNode
  | ComponentNode
  | InstanceNode
  | RectangleNode
  | EllipseNode
  | PolygonNode
  | StarNode
  | LineNode
  | VectorNode
  | TextNode
  | BooleanOperationNode {
  if (!node) return false;
  return (
    node.type === "FRAME" ||
    node.type === "COMPONENT" ||
    node.type === "INSTANCE" ||
    node.type === "RECTANGLE" ||
    node.type === "ELLIPSE" ||
    node.type === "POLYGON" ||
    node.type === "STAR" ||
    node.type === "LINE" ||
    node.type === "VECTOR" ||
    node.type === "TEXT" ||
    node.type === "BOOLEAN_OPERATION"
  );
}

/**
 * Checks if a node supports corner radius.
 */
export function hasCornerRadius(
  node: BaseNode | null,
): node is FrameNode | ComponentNode | InstanceNode | RectangleNode {
  if (!node) return false;
  return (
    node.type === "FRAME" ||
    node.type === "COMPONENT" ||
    node.type === "INSTANCE" ||
    node.type === "RECTANGLE"
  );
}

/**
 * Checks if a node supports auto-layout.
 */
export function supportsAutoLayout(
  node: BaseNode | null,
): node is FrameNode | ComponentNode {
  if (!node) return false;
  return node.type === "FRAME" || node.type === "COMPONENT";
}
