// External
import React from 'react';

// Internal
import strongsColor from '../strongs-color.js';
import WordSingle from '../../containers/word-single.js';

export default React.createClass( {
	render() {
		const word = this.props.word[ 0 ],
			lemma = this.props.word[ 1 ];

		let wordString;

		// Handle dvnNm
		if ( lemma === 'H3068' ) {
			var wordArray,
				wordArrayEnd = word.split( '<!dvnNm>' );
			if ( wordArrayEnd.length > 1 ) {
				wordArray = wordArrayEnd[0].split( '<dvnNm>' );
				if ( wordArrayEnd[ 1 ] ) {
					wordArray.push( wordArrayEnd[ 1 ] );
				}

				wordString = wordArray.map( ( word, index ) => {
					var textTransform;
					if ( index === 1 ) {
						textTransform = 'uppercase';
					}

					return <WordSingle lemma={ lemma } textTransform={ textTransform } word={ word } key={ index } />;
				}, this );
			}
		} else {
			wordString = <WordSingle lemma={ lemma } word={ word } />;
		}

		return (
			<span>{ wordString } </span>
		);
	}
} );
