// UI Components
import {
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
import { ProfileIMG } from './assets';

type Article = {
	name: string;
	url: string;
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
};
