import { LabelledInput } from 'components';
import { RefObject } from 'react';

function SearchForm({ title, search }: Props): JSX.Element {
	const titleProps = {
		...title,
		label: 'Movie Title',
	};
	return (
		<form
			onSubmit={(event) => {
				event.preventDefault();
				search();
			}}
		>
			<LabelledInput {...titleProps} />
			<button>Search</button>
		</form>
	);
}

type Props = {
	title: {
		_ref: RefObject<HTMLInputElement>;
		onBlur(): void;
	};
	search(): void;
};

export default SearchForm;
