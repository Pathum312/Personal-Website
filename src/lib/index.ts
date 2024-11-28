// UI Components
import {
	Line,
	Code,
	List,
	Link,
	Blog,
	Date,
	Title,
	Quote,
	Image,
	Header,
	Footer,
	Content,
	ListItem,
	Paragraph,
	Highlight,
} from './components';

// Assets
import { ProfileIMG, ExampleTree, ExampleSubtrees, ExampleVisualize } from './assets';

type Article = {
	name: string;
	url: string;
	tag: string;
	date: string;
};

type Month = {
	name: string;
	articles: Article[];
};

type Year = {
	year: string;
	months: Month[];
};

export {
	Line,
	Code,
	List,
	Link,
	Blog,
	Date,
	Title,
	Quote,
	Image,
	Header,
	Footer,
	Content,
	ListItem,
	Paragraph,
	Highlight,
	type Year,
	type Month,
	type Article,
	ProfileIMG,
	ExampleTree,
	ExampleSubtrees,
	ExampleVisualize,
};
