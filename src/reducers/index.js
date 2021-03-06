import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import bookmarks from './bookmarks';
import reference from './reference';
import scrollChapter from './scroll-chapter';
import searchResults from './search-results';
import searchTerms from './search-terms';
import settings from './settings';
import trays from './trays';
import wordDetails from './word-details';
import wordHighlight from './word-highlight';
import crossReferences from './cross-references';

const app = combineReducers( {
	bookmarks,
	crossReferences,
	reference,
	scrollChapter,
	searchResults,
	searchTerms,
	settings,
	trays,
	wordDetails,
	wordHighlight,
	routing: routerReducer
} );

export default app;
