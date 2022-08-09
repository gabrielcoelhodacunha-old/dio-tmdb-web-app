import { useAppDispatch } from 'redux/hooks';
import { deleteList, getLists } from 'redux/tmdb';

function ListName({ id, name }: Props): JSX.Element {
	const dispatch = useAppDispatch();

	async function _deleteList() {
		await dispatch(deleteList({ id }));
		dispatch(getLists());
	}

	return (
		<div>
			<button onClick={_deleteList}>Delete list</button>
			<p>{name}</p>
		</div>
	);
}

type Props = {
	id: string;
	name: string;
};

export default ListName;
