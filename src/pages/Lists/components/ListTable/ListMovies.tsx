import { TMovie } from 'common/types';
import { forwardRef, useRef } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { getLists, removeMovieFromList } from 'redux/tmdb';

function ListMovies({ listId, items }: Props): JSX.Element {
	const dispatch = useAppDispatch();
	const select = useRef<HTMLSelectElement>(null);
	const hasItems = items.length > 0;

	const _removeMovieFromList = async () => {
		if (!select.current) return;
		await dispatch(
			removeMovieFromList({ movieId: select.current.value, listId })
		);
		dispatch(getLists());
	};

	const selectProps = { disabled: !hasItems, items };
	const removeProps = {
		text: 'Remove movie',
		onClick: _removeMovieFromList,
		disabled: !hasItems,
	};

	return (
		<div>
			<Select ref={select} {...selectProps} />
			<Button {...removeProps} />
		</div>
	);
}

type Props = {
	listId: string;
	items: TMovie[];
};

const Select = forwardRef<HTMLSelectElement, SelectProps>(
	({ disabled, items }, ref) => (
		<select disabled={disabled} ref={ref}>
			{items.map((item) => (
				<option key={item.id} value={item.id}>
					{item.title}
				</option>
			))}
		</select>
	)
);

type SelectProps = {
	disabled: boolean;
	items: TMovie[];
};

function Button({ text, onClick, disabled }: ButtonProps) {
	return (
		<button onClick={onClick} disabled={disabled}>
			{text}
		</button>
	);
}

type ButtonProps = {
	text: string;
	onClick(): void;
	disabled: boolean;
};

export default ListMovies;
