export const goToReference = ( reference ) => {
	console.log( 'goToReference' );
	window.location.hash = javascripture.modules.reference.createReferenceLink( reference );
}

export const setTrayVisibilityFilter = ( filter ) => {
	return {
		type: 'SET_TRAY_VISIBILITY_FILTER',
		filter
	}
}

export const setWordHighlight = ( word ) => {
	return {
		type: 'SET_WORD_HIGHLIGHT',
		word
	}
}

export const removeWordHighlight = ( word ) => {
	return {
		type: 'REMOVE_WORD_HIGHLIGHT',
		word
	}
}

export const setScrollChapter = ( book, chapter ) => {
	return {
		book,
		chapter,
		type: 'SET_SCROLL_CHAPTER'
	}
}

export const addNextChapter = ( reference ) => {
	return {
		reference,
		type: 'ADD_NEXT_CHAPTER'
	}
}

export const addPreviousChapter = ( reference ) => {
	return {
		reference,
		type: 'ADD_PREVIOUS_CHAPTER'
	}
}

export const addBookmark = ( reference ) => {
	return {
		reference,
		type: 'ADD_BOOKMARK'
	}
}

export const removeBookmark = ( reference ) => {
	return {
		reference,
		type: 'REMOVE_BOOKMARK'
	}
}

export const settingsChange = ( settingName, settingValue ) => {
	var returnValue = {
		type: 'SETTINGS_CHANGE'
	}
	returnValue[ settingName ] = settingValue;

	return returnValue;
}

export const showCrossReferences = ( reference ) => {
	return {
		reference,
		type: 'SHOW_CROSS_REFERENCES'
	}
}

export const addWord = ( { strongsNumber, open, morphology } ) => {
	const searchParameters = {
		clusivity: 'exclusive',
		language: 'kjv',
		lemma: strongsNumber,
		range: 'verse',
	};

	// Send data to our worker.
	worker.postMessage( {
		task: 'search',
		parameters: searchParameters,
	} );

	return {
		strongsNumber,
		open,
		morphology,
		type: 'ADD_WORD',
	}
}

export const removeWord = ( strongsNumber ) => {
	return {
		strongsNumber,
		type: 'REMOVE_WORD'
	}
}

export const clearAll = () => {
	return {
		type: 'CLEAR_ALL'
	}
}

export const toggleWord = ( strongsNumber ) => {
	return {
		strongsNumber,
		type: 'TOGGLE_WORD'
	}
}

export const addSearch = ( terms, target ) => {
	// Send data to our worker.
	worker.postMessage( {
		task: target,
		parameters: terms
	} );

	return {
		open: true,
		target,
		terms,
		type: 'ADD_SEARCH'
	}
}

export const removeSearch = ( terms ) => {
	return {
		terms,
		type: 'REMOVE_SEARCH'
	}
}

export const toggleSearch = ( terms ) => {
	return {
		terms,
		type: 'TOGGLE_SEARCH'
	}
}

export const setCurrentVerse = ( terms, index ) => {
	return {
		index,
		terms,
		type: 'SET_CURRENT_VERSE'
	}
}

export const goToNextCurrentVerse = () => {
	return {
		type: 'GO_TO_NEXT_CURRENT_VERSE'
	}
}

export const goToPreviousCurrentVerse = () => {
	return {
		type: 'GO_TO_PREVIOUS_CURRENT_VERSE'
	}
}

