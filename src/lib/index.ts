import {
	Blog,
	Date,
	Title,
	Quote,
	Header,
	Footer,
	Content,
	Paragraph,
	Highlight,
} from './components';

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
	Blog,
	Date,
	Title,
	Quote,
	Header,
	Footer,
	Content,
	Paragraph,
	Highlight,
	type Year,
	type Month,
	type Article,
};
