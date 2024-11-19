import { Header, Footer, Content, Blog } from './components';

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

export { Header, Footer, Content, Blog, type Year, type Month, type Article };
