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
	} from '$lib';

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
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;node = node.left',
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;else:',
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if node.right is None:',
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;node.right = Node(key=key)',
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;node.right.parent = node',
			'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;break',
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

	const BST_INIT_SNIPPET = {
		language: 'python',
		code: ['if __name__ == "__main__":', '&nbsp;&nbsp;&nbsp;&nbsp;tree: BST = BST(key=20)'],
	};

	const BST_INSERT_SNIPPET = {
		language: 'python',
		code: [
			'if __name__ == "__main__":',
			'&nbsp;&nbsp;&nbsp;&nbsp;tree: BST = BST(key=20)',
			'&nbsp;&nbsp;&nbsp;&nbsp;tree.insert(key=10)',
			'&nbsp;&nbsp;&nbsp;&nbsp;tree.insert(key=30)',
			'&nbsp;&nbsp;&nbsp;&nbsp;tree.insert(key=9)',
			'&nbsp;&nbsp;&nbsp;&nbsp;tree.insert(key=15)',
			'&nbsp;&nbsp;&nbsp;&nbsp;tree.insert(key=25)',
			'&nbsp;&nbsp;&nbsp;&nbsp;tree.insert(key=35)',
		],
	};

	const BST_VISUALIZE_SNIPPET = {
		language: 'python',
		code: [
			'if __name__ == "__main__":',
			'&nbsp;&nbsp;&nbsp;&nbsp;tree: BST = BST(key=20)',
			'&nbsp;&nbsp;&nbsp;&nbsp;tree.insert(key=10)',
			'&nbsp;&nbsp;&nbsp;&nbsp;tree.insert(key=30)',
			'&nbsp;&nbsp;&nbsp;&nbsp;tree.insert(key=9)',
			'&nbsp;&nbsp;&nbsp;&nbsp;tree.insert(key=15)',
			'&nbsp;&nbsp;&nbsp;&nbsp;tree.insert(key=25)',
			'&nbsp;&nbsp;&nbsp;&nbsp;tree.insert(key=35)',
			'',
			'&nbsp;&nbsp;&nbsp;&nbsp;tree.visualize(node=tree.root)',
		],
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
	<Highlight>Code Implementation</Highlight>
</Title>
<Paragraph>
	First, we need to define the Node class, which will be used to represent each node in the BST.
</Paragraph>
<Paragraph>
	<Highlight>BST.py</Highlight>
</Paragraph>
<Code codeSnippet={NODE_CLASS_INIT_SNIPPET} />
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
<Paragraph>
	Next, we need to define the <Highlight>BST</Highlight> class, which will be used to represent the entire
	BST.
</Paragraph>
<Paragraph>
	<Highlight>BST.py</Highlight>
</Paragraph>
<Code codeSnippet={BST_CLASS_INIT_SNIPPET} />
<List>
	<ListItem>
		<Highlight>Root</Highlight> - The root node of the BST.
	</ListItem>
</List>
<Paragraph>
	<Highlight>BST.py</Highlight>
</Paragraph>
<Code codeSnippet={BST_INIT_SNIPPET} />
<Paragraph>
	Here, we have initialized a BST with a root node of 20. However, a tree with only a root is not
	sufficient, so let's implement a function to <Highlight>insert</Highlight> additional nodes.
</Paragraph>
<Paragraph>
	<Highlight>BST.py</Highlight>
</Paragraph>
<Code codeSnippet={BST_CLASS_INSERT_SNIPPET} />
<List>
	<ListItem>
		<Highlight>Key</Highlight> - The key value of the node to be inserted.
	</ListItem>
</List>
<Paragraph>How it works:</Paragraph>
<List>
	<ListItem>Start at the root of the tree.</ListItem>
	<ListItem>
		Compare the <Highlight>key</Highlight> to the current node's key.
	</ListItem>
	<ListItem>
		If the <Highlight>key</Highlight> is smaller, move to the left child.
	</ListItem>
	<ListItem>
		If the <Highlight>key</Highlight> is larger or equal, move to the right child.
	</ListItem>
	<ListItem>
		Repeat until a <Highlight>None</Highlight> child is found.
	</ListItem>
	<ListItem>Create a new node at that position.</ListItem>
	<ListItem>Set the new node's parent to the current node.</ListItem>
</List>
<Paragraph>
	Now that we have a function to insert nodes into the BST, let's insert some additional nodes.
</Paragraph>
<Paragraph>
	<Highlight>BST.py</Highlight>
</Paragraph>
<Code codeSnippet={BST_INSERT_SNIPPET} />
<Paragraph>
	We have added the nodes <Highlight>10</Highlight>, <Highlight>30</Highlight>, <Highlight
		>9</Highlight
	>, <Highlight>15</Highlight>, <Highlight>25</Highlight>, and <Highlight>35</Highlight> to our BST,
	but visualizing it is challenging. Let’s create a function to print the BST for better clarity.
</Paragraph>
<Paragraph>
	<Highlight>BST.py</Highlight>
</Paragraph>
<Code codeSnippet={BST_CLASS_VISUALIZE_SNIPPET} />
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
<Paragraph>How it works:</Paragraph>
<List>
	<ListItem>
		If the current node is not <Highlight>None</Highlight>, it prints the node's key, indented based
		on its depth level.
	</ListItem>
	<ListItem>
		The function recursively calls itself for the left and right child nodes of the current node.
	</ListItem>
	<ListItem>
		The left child uses a prefix of <Highlight>"L--- "</Highlight> and increases the level by 1.
	</ListItem>
	<ListItem>
		The right child uses a prefix of <Highlight>"R--- "</Highlight> and increases the level by 1.
	</ListItem>
</List>
<Paragraph>
	<Highlight>BST.py</Highlight>
</Paragraph>
<Code codeSnippet={BST_VISUALIZE_SNIPPET} />
<Paragraph>
	Let's use the visualize function to print it, as shown in <Highlight>Figure 3</Highlight>.
</Paragraph>
<Image
	width="1288"
	height="978"
	src={ExampleVisualize}
	alt="An example diagram showing a binary search tree."
/>
