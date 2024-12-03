<script lang="ts">
	import {
		Date,
		List,
		Blog,
		Code,
		Title,
		Image,
		ListItem,
		Paragraph,
		Highlight,
		ExampleTree,
		ExampleSubtrees,
		ExampleVisualize,
		ExampleRemoveLeafNode,
		ExampleRemoveLeafNodeOutput,
		ExampleRemoveNodeWithOneChild,
		ExampleRemoveNodeWithTwoChildren,
		ExampleRemoveNodeWithOneChildOutput,
		ExampleRemoveRootNodeWithTwoChildren,
		ExampleRemoveNodeWithTwoChildrenOutput,
	} from '$lib';
	import Link from '$lib/components/Blog/Link/link.svelte';

	const NODE_CLASS_INIT_SNIPPET = {
		language: 'python',
		code: [
			'class Node:',
			'&nbsp;&nbsp;&nbsp;&nbsp;def __init__(self,&nbsp;&nbsp;key:&nbsp;&nbsp;int) -> None:',
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.key: int = key',
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.left: Node | None = None',
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.right: Node | None = None',
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.parent: Node | None = None',
		],
	};

	const BST_CLASS_INIT_SNIPPET = {
		language: 'python',
		code: [
			'class BST:',
			'&nbsp;&nbsp;&nbsp;&nbsp;def __init__(self,&nbsp;&nbsp;key:&nbsp;&nbsp;int) -> None:',
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.root: Node = Node(key=key)',
		],
	};

	const BST_CLASS_INSERT_SNIPPET = {
		language: 'python',
		code: [
			'def insert(self,&nbsp;&nbsp;key:&nbsp;&nbsp;int) -> None:',
			'&nbsp;&nbsp;&nbsp;&nbsp;node: Node = self.root',
			'',
			'&nbsp;&nbsp;&nbsp;&nbsp;while True:',
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if key < node.key:',
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if node.left is None:',
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;node.left = Node(key=key)',
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;node.left.parent = node',
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;break',
			'',
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;node = node.left',
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;else:',
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if node.right is None:',
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;node.right = Node(key=key)',
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;node.right.parent = node',
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;break',
			'',
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;node = node.right',
		],
	};

	const BST_CLASS_VISUALIZE_SNIPPET = {
		language: 'python',
		code: [
			'def visualize(',
			'&nbsp;&nbsp;&nbsp;&nbsp;self,',
			'&nbsp;&nbsp;&nbsp;&nbsp;node: Node | None,',
			'&nbsp;&nbsp;&nbsp;&nbsp;level: int = 0,',
			'&nbsp;&nbsp;&nbsp;&nbsp;prefix: str = "\\nL - Left child node\\nR - Right child node\\n\\nRoot--- ",',
			') -> None:',
			'&nbsp;&nbsp;&nbsp;&nbsp;if node:',
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print(" " * (level * 4) + prefix + str(object=node.key))',
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.visualize(node=node.left, level=level + 1, prefix="L--- ")',
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.visualize(node=node.right, level=level + 1, prefix="R--- ")',
		],
	};

	const BST_CLASS_SEARCH_SNIPPET = {
		language: 'python',
		code: [
			'def search(self,&nbsp;&nbsp;node:&nbsp;&nbsp;Node&nbsp;&nbsp;|&nbsp;&nbsp;None,&nbsp;&nbsp;key:&nbsp;&nbsp;int) -> Node | None:',
			'&nbsp;&nbsp;&nbsp;&nbsp;if node is None or node.key == key:',
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return node',
			'',
			'&nbsp;&nbsp;&nbsp;&nbsp;if node.key > key:',
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return self.search(node=node.left, key=key)',
			'&nbsp;&nbsp;&nbsp;&nbsp;else:',
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return self.search(node=node.right, key=key)',
		],
	};

	const BST_CLASS_REMOVE_SNIPPET = {
		language: 'python',
		code: [
			'def remove(self,&nbsp;&nbsp;key:&nbsp;&nbsp;int) -> None:',
			'&nbsp;&nbsp;&nbsp;&nbsp;found_node: Node | None = self.search(node=self.root, key=key)',
			'',
			'&nbsp;&nbsp;&nbsp;&nbsp;if found_node is None:',
			"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print(f'\\n{key} not found in the tree.')",
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return',
			'',
			'&nbsp;&nbsp;&nbsp;&nbsp;if found_node.left and found_node.right:',
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self._remove_two_children(node=found_node)',
			'&nbsp;&nbsp;&nbsp;&nbsp;elif found_node.left or found_node.right:',
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self._remove_one_child(node=found_node)',
			'&nbsp;&nbsp;&nbsp;&nbsp;else:',
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self._remove_leaf(node=found_node)',
		],
	};

	const BST_CLASS_REMOVE_LEAF_SNIPPET = {
		language: 'python',
		code: [
			'def _remove_leaf(self,&nbsp;&nbsp;node:&nbsp;&nbsp;Node) -> None:',
			'&nbsp;&nbsp;&nbsp;&nbsp;parent: Node = node.parent',
			'',
			'&nbsp;&nbsp;&nbsp;&nbsp;if parent.left == node:',
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;parent.left = None',
			'&nbsp;&nbsp;&nbsp;&nbsp;else:',
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;parent.right = None',
		],
	};

	const BST_CLASS_REMOVE_ONE_CHILD_SNIPPET = {
		language: 'python',
		code: [
			'def _remove_one_child(self,&nbsp;&nbsp;node:&nbsp;&nbsp;Node) -> None:',
			'&nbsp;&nbsp;&nbsp;&nbsp;parent: Node = node.parent',
			'&nbsp;&nbsp;&nbsp;&nbsp;child: Node = node.left if node.left else node.right',
			'',
			'&nbsp;&nbsp;&nbsp;&nbsp;if parent:',
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if parent.left == node:',
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;parent.left = child',
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;else:',
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;parent.right = child',
			'',
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;child.parent = parent',
			'&nbsp;&nbsp;&nbsp;&nbsp;else:',
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.root = child',
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.root.parent = None',
		],
	};

	const BST_CLASS_REMOVE_TWO_CHILDREN_SNIPPET = {
		language: 'python',
		code: [
			'def _remove_two_children(self,&nbsp;&nbsp;node:&nbsp;&nbsp;Node) -> None:',
			'&nbsp;&nbsp;&nbsp;&nbsp;parent: Node = node.parent',
			'&nbsp;&nbsp;&nbsp;&nbsp;successor: Node = self._get_successor(node=node if parent else node.right)',
			'&nbsp;&nbsp;&nbsp;&nbsp;successor_parent: Node = successor.parent',
			'',
			'&nbsp;&nbsp;&nbsp;&nbsp;node.key = successor.key',
			'',
			'&nbsp;&nbsp;&nbsp;&nbsp;successor_parent.left == successor',
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;successor_parent.left = successor.right',
			'&nbsp;&nbsp;&nbsp;&nbsp;elif successor_parent.right == successor:',
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;successor_parent.right = successor.right',
			'',
			'&nbsp;&nbsp;&nbsp;&nbsp;if successor.right:',
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;successor.right.parent = successor_parent',
		],
	};

	const BST_CLASS_GET_SUCCESSOR_SNIPPET = {
		language: 'python',
		code: [
			'def _get_successor(self,&nbsp;&nbsp;node:&nbsp;&nbsp;Node) -> Node | None:',
			'&nbsp;&nbsp;&nbsp;&nbsp;current: Node = node',
			'',
			'&nbsp;&nbsp;&nbsp;&nbsp;while current.left:',
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;current = current.left',
			'',
			'&nbsp;&nbsp;&nbsp;&nbsp;return current',
		],
	};

	const BST_INIT_SNIPPET = {
		language: 'python',
		code: ['if __name__ == "__main__":', '&nbsp;&nbsp;&nbsp;&nbsp;tree: BST = BST(key=20)'],
	};

	const BST_INSERT_SNIPPET = {
		language: 'python',
		code: [
			'tree.insert(key=10)',
			'tree.insert(key=30)',
			'tree.insert(key=9)',
			'tree.insert(key=15)',
			'tree.insert(key=25)',
			'tree.insert(key=35)',
		],
	};

	const BST_VISUALIZE_SNIPPET = {
		language: 'python',
		code: ['tree.visualize(node=tree.root)'],
	};

	const BST_SEARCH_SNIPPET = {
		language: 'python',
		code: [
			"print('\\nFound 30' if tree.search(node=tree.root, key=30) else '\\n30 not found') # Output: Found 30",
			'',
			"print('\\nFound 28' if tree.search(node=tree.root, key=28) else '\\n28 not found') # Output: 28 not found",
		],
	};

	const BST_REMOVE_LEAF_SNIPPET = {
		language: 'python',
		code: ['tree.remove(key=25)', '', "print('\\nRemove 25')", 'tree.visualize(node=tree.root)'],
	};

	const BST_REMOVE_ONE_CHILD_SNIPPET = {
		language: 'python',
		code: ['tree.remove(key=30)', '', "print('\\nRemove 30')", 'tree.visualize(node=tree.root)'],
	};

	const BST_REMOVE_TWO_CHILDREN_SNIPPET = {
		language: 'python',
		code: ['tree.remove(key=20)', '', "print('\\nRemove 20')", 'tree.visualize(node=tree.root)'],
	};
</script>

<title>Pinkz | Binary Search Tree</title>
<Title>Binary Search Tree - BST</Title>
<Date>Date: 27/11/2024</Date>
<Title>
	<Highlight>Introduction</Highlight>
</Title>
<Paragraph>
	A <Highlight>Binary Search Tree (BST)</Highlight> is a data structure where each node would have a
	maximun of two children; a left and right child node. A BST makes searching, inserting, and deleting
	much efficient.
</Paragraph>
<Image
	width="2015"
	height="777"
	src={ExampleTree}
	alt="An example diagram showing a binary search tree."
/>
<Paragraph>
	<Highlight>Figure 1</Highlight> illustrates an example of a BST where <Highlight>node A</Highlight
	> is the root. The <Highlight>root node</Highlight> serves as the origin of the BST, with all other
	nodes, such as <Highlight>B</Highlight> and <Highlight>C</Highlight>, branching off as <Highlight>
		child nodes
	</Highlight>.
</Paragraph>
<Paragraph>There are some important properties to keep in mind when working with BSTs.</Paragraph>
<List>
	<ListItem>
		The <Highlight>left subtree</Highlight> of a node contains only nodes with keys less than the node's
		key.
	</ListItem>
	<ListItem>
		The <Highlight>right subtree</Highlight> of a node contains only nodes with keys greater than the
		node's key.
	</ListItem>
	<ListItem>The left and right subtrees must also be BSTs.</ListItem>
	<ListItem>
		There should be no duplicate nodes in the BST. But a BST may have two node with the same key.
	</ListItem>
</List>
<Image
	width="2035"
	height="918"
	src={ExampleSubtrees}
	alt="An example BST, showing the left and right subtrees of a node."
/>
<Paragraph>
	<Highlight>Figure 2</Highlight> illustrates an example of a BST that adheres to the defined properties.
	The root node has a key of 20, with all keys in the left subtree being less than 20 and all keys in
	the right subtree being greater. Additionally, each subtree is itself a BST, maintaining these same
	properties.
</Paragraph>
<Title>
	<Highlight>Node Class</Highlight>
</Title>
<Paragraph>
	First, we need to define the Node class, which will be used to represent each node in the BST.
</Paragraph>
<Paragraph>
	<Highlight>BST.py - Node Class</Highlight>
</Paragraph>
<Code codeSnippet={NODE_CLASS_INIT_SNIPPET} />
<Paragraph>
	<Highlight>Attributes:</Highlight>
</Paragraph>
<List>
	<ListItem><Highlight>Key</Highlight> - The key value of the node.</ListItem>
	<ListItem>
		<Highlight>Left</Highlight> - A reference to the left child node, it can be <Highlight
			>None</Highlight
		> if no node is associated.
	</ListItem>
	<ListItem>
		<Highlight>Right</Highlight> - A reference to the right child node, it can be <Highlight
			>None</Highlight
		> if no node is associated.
	</ListItem>
	<ListItem>
		<Highlight>Parent</Highlight> - A reference to the parent node, when the node is the root, it will
		be <Highlight>None</Highlight>.
	</ListItem>
</List>
<Title>
	<Highlight>BST Class</Highlight>
</Title>
<Paragraph>
	Next, we need to define the <Highlight>BST</Highlight> class, which will be used to represent the entire
	BST.
</Paragraph>
<Paragraph>
	<Highlight>BST.py - BST Class</Highlight>
</Paragraph>
<Code codeSnippet={BST_CLASS_INIT_SNIPPET} />
<Paragraph>
	<Highlight>Attributes:</Highlight>
</Paragraph>
<List>
	<ListItem>
		<Highlight>Root</Highlight> - The root node of the BST.
	</ListItem>
</List>
<Paragraph>
	<Highlight>BST.py</Highlight>
</Paragraph>
<Code codeSnippet={BST_INIT_SNIPPET} />
<Title>
	<Highlight>Adding a Node</Highlight>
</Title>
<Paragraph>
	Here, we have initialized a BST with a root node of 20. However, a tree with only a root is not
	sufficient, so let's implement a function to <Highlight>insert</Highlight> additional nodes.
</Paragraph>
<Paragraph>
	<Highlight>BST.py - BST Class</Highlight>
</Paragraph>
<Code codeSnippet={BST_CLASS_INSERT_SNIPPET} />
<Paragraph>
	<Highlight>Attributes:</Highlight>
</Paragraph>
<List>
	<ListItem>
		<Highlight>Key</Highlight> - The key value of the node to be inserted.
	</ListItem>
</List>
<Paragraph>
	Now that we have a function to insert nodes into the BST, let's insert some additional nodes.
</Paragraph>
<Paragraph>
	<Highlight>BST.py</Highlight>
</Paragraph>
<Code codeSnippet={BST_INSERT_SNIPPET} />
<Title>
	<Highlight>Printing the BST</Highlight>
</Title>
<Paragraph>
	We have added the nodes <Highlight>10</Highlight>, <Highlight>30</Highlight>, <Highlight
		>9</Highlight
	>, <Highlight>15</Highlight>, <Highlight>25</Highlight>, and <Highlight>35</Highlight> to our BST,
	but we need a way to actually confirm that they were added. Let’s create a function to print the BST
	for better clarity.
</Paragraph>
<Paragraph>
	<Highlight>BST.py - BST Class</Highlight>
</Paragraph>
<Code codeSnippet={BST_CLASS_VISUALIZE_SNIPPET} />
<Paragraph>
	<Highlight>Attributes:</Highlight>
</Paragraph>
<List>
	<ListItem>
		<Highlight>Node</Highlight> - The current node in the tree being visualized. If it's None, the function
		stops processin.
	</ListItem>
	<ListItem>
		<Highlight>Level</Highlight> - The depth level of the current node in the tree. It starts at 0 for
		the root and increments for child nodes.
	</ListItem>
	<ListItem>
		<Highlight>Prefix</Highlight> - A string to differentiate the root, left, and right nodes visually.
	</ListItem>
</List>
<Paragraph>
	<Highlight>BST.py</Highlight>
</Paragraph>
<Code codeSnippet={BST_VISUALIZE_SNIPPET} />
<Paragraph>
	Let's use the visualize function to print it, as shown in <Highlight>Figure 3</Highlight> below:
</Paragraph>
<Image width="1288" height="978" src={ExampleVisualize} alt="Visualization of the BST." />
<Title>
	<Highlight>Searching for a Node</Highlight>
</Title>
<Paragraph>
	Now we need a way to search for a node in the BST. Let's implement a function to <Highlight>
		search
	</Highlight>.
</Paragraph>
<Paragraph>
	<Highlight>BST.py - BST Class</Highlight>
</Paragraph>
<Code codeSnippet={BST_CLASS_SEARCH_SNIPPET} />
<Paragraph>
	<Highlight>Attributes:</Highlight>
</Paragraph>
<List>
	<ListItem>
		<Highlight>Key</Highlight> - The key value to search for.
	</ListItem>
	<ListItem>
		<Highlight>Node</Highlight> - The current node in the tree being searched.
	</ListItem>
</List>
<Paragraph>
	Lets use the <Highlight>search</Highlight> functrion to search for a node with a key of <Highlight
		>30</Highlight
	> and <Highlight>28</Highlight>.
</Paragraph>
<Paragraph>
	<Highlight>BST.py</Highlight>
</Paragraph>
<Code codeSnippet={BST_SEARCH_SNIPPET} />
<Title>
	<Highlight>Removing a Node</Highlight>
</Title>
<Paragraph>
	Finally, we have to implement a <Highlight>remove</Highlight> function to remove a node from the BST.
	But there are <Highlight>three cases</Highlight> to consider when deleting a node.
</Paragraph>
<Paragraph>
	<Highlight>BST.py - BST Class</Highlight>
</Paragraph>
<Code codeSnippet={BST_CLASS_REMOVE_SNIPPET} />
<Paragraph>
	<Highlight>Attributes:</Highlight>
</Paragraph>
<List>
	<ListItem>
		<Highlight>Key</Highlight> - The key value of the node to be removed.
	</ListItem>
</List>
<Paragraph>
	<Highlight>Case 1:</Highlight> Deleting a node with no children (a leaf node):
</Paragraph>
<Image
	width="1210"
	height="494"
	src={ExampleRemoveLeafNode}
	alt="Removing a leaf node from a BST."
/>
<Paragraph>
	<Highlight>BST.py - BST Class</Highlight>
</Paragraph>
<Code codeSnippet={BST_CLASS_REMOVE_LEAF_SNIPPET} />
<Paragraph>
	<Highlight>Attributes:</Highlight>
</Paragraph>
<List>
	<ListItem>
		<Highlight>Node</Highlight> - The node to be removed.
	</ListItem>
</List>
<Paragraph>
	<Highlight>Case 2:</Highlight> Deleting a node with one child:
</Paragraph>
<Image
	width="1503"
	height="632"
	src={ExampleRemoveNodeWithOneChild}
	alt="Removing a node with one child."
/>
<Paragraph>
	<Highlight>BST.py - BST Class</Highlight>
</Paragraph>
<Code codeSnippet={BST_CLASS_REMOVE_ONE_CHILD_SNIPPET} />
<Paragraph>
	<Highlight>Attributes:</Highlight>
</Paragraph>
<List>
	<ListItem>
		<Highlight>Node</Highlight> - The node to be removed.
	</ListItem>
</List>
<Paragraph>
	<Highlight>Case 3:</Highlight> Deleting a node with both children:
</Paragraph>
<Image
	width="1828"
	height="663"
	src={ExampleRemoveNodeWithTwoChildren}
	alt="Removing a node with two children."
/>
<Image
	width="1878"
	height="657"
	src={ExampleRemoveRootNodeWithTwoChildren}
	alt="Removing a root node with two children."
/>
<Paragraph>
	<Highlight>BST.py - BST Class</Highlight>
</Paragraph>
<Code codeSnippet={BST_CLASS_REMOVE_TWO_CHILDREN_SNIPPET} />
<Paragraph>
	<Highlight>Attributes:</Highlight>
</Paragraph>
<List>
	<ListItem>
		<Highlight>Node</Highlight> - The node to be removed.
	</ListItem>
</List>
<Paragraph>
	<Highlight>BST.py - BST Class</Highlight>
</Paragraph>
<Code codeSnippet={BST_CLASS_GET_SUCCESSOR_SNIPPET} />
<Paragraph>
	<Highlight>Attributes:</Highlight>
</Paragraph>
<List>
	<ListItem>
		<Highlight>Node</Highlight> - The node to get the successor of.
	</ListItem>
</List>
<Paragraph>
	Now that the <Highlight>remove</Highlight> function is implemented, we can remove a node from the tree.
	To start with, let's remove the <Highlight>leaf node 25</Highlight> from the BST created in the earlier
	sections.
</Paragraph>
<Paragraph>
	<Highlight>BST.py</Highlight>
</Paragraph>
<Code codeSnippet={BST_REMOVE_LEAF_SNIPPET} />
<Image width="885" height="1005" src={ExampleRemoveLeafNodeOutput} alt="Removed a leaf node" />
<Paragraph>
	Next, let's remove the <Highlight>node 30</Highlight>, which has <Highlight>one child</Highlight> from
	the BST.
</Paragraph>
<Paragraph>
	<Highlight>BST.py</Highlight>
</Paragraph>
<Code codeSnippet={BST_REMOVE_ONE_CHILD_SNIPPET} />
<Image
	width="1232"
	height="954"
	src={ExampleRemoveNodeWithOneChildOutput}
	alt="Removed a node with one child"
/>
<Paragraph>
	Finally, let's remove the <Highlight>node 20</Highlight>, which has <Highlight
		>two children</Highlight
	>
</Paragraph>
<Paragraph>
	<Highlight>BST.py</Highlight>
</Paragraph>
<Code codeSnippet={BST_REMOVE_TWO_CHILDREN_SNIPPET} />
<Image
	width="1358"
	height="837"
	src={ExampleRemoveNodeWithTwoChildrenOutput}
	alt="Removed a node with two children"
/>
<Title>
	<Highlight>Resources</Highlight>
</Title>
<List>
	<ListItem>
		GitHub: <Link
			href="https://github.com/Pathum312/Algorithm-Logic/blob/development/BST/bst.py"
			content="bst.py"
		/>
	</ListItem>
	<ListItem>
		Reading Material: <Link
			href="https://www.geeksforgeeks.org/binary-search-tree/"
			content="Binary Search Tree - GeeksforGeeks"
		/>
	</ListItem>
</List>
<Title alignment="center">
	<Highlight>Related Articles</Highlight>
</Title>
<Blog tag="DataStructures" />
