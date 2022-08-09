import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { createList, getLists, selectLists } from 'redux/tmdb';
import { getItem, setItem } from 'utils/localStorage';
import { CreateListForm, ListTable } from './components';

function ListsContainer(): JSX.Element {
	const name = useRef<HTMLInputElement>(null);
	const description = useRef<HTMLTextAreaElement>(null);
	const dispatch = useAppDispatch();
	const lists = useAppSelector(selectLists);

	useEffect(() => {
		const fillFieldsWithPreviousValues = () => {
			if (!name.current || !description.current) return;
			name.current.value = getItem('listName');
			description.current.value = getItem('listDescription');
			setFieldsInLocalStorage();
		};
		fillFieldsWithPreviousValues();
	}, []);

	const setFieldsInLocalStorage = () => {
		if (!name.current || !description.current) return;
		setItem('listName', name.current.value);
		setItem('listDescription', description.current.value);
	};

	const clearFieldsValues = () => {
		if (!name.current || !description.current) return;
		name.current.value = '';
		description.current.value = '';
		setFieldsInLocalStorage();
	};

	const create = async () => {
		const nameValue = name.current ? name.current.value : '';
		if (!nameValue) return alert(`The field 'Name' must be filled!`);
		if (lists.some((list) => list.name === nameValue)) {
			return alert(`The list '${nameValue}' already exists!`);
		}
		const descriptionValue = description.current
			? description.current.value
			: '';
		clearFieldsValues();
		await dispatch(
			createList({ name: nameValue, description: descriptionValue })
		);
		dispatch(getLists());
	};

	const formProps = {
		name: { _ref: name },
		description: { _ref: description },
		create,
	};

	const tableProps = { lists };

	return (
		<div id='lists_container'>
			<CreateListForm {...formProps} />
			{tableProps.lists.length ? <ListTable {...tableProps} /> : null}
		</div>
	);
}

export default ListsContainer;
