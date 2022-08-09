import { TList } from 'common/types';
import ListDescription from './ListDescription';
import ListMovies from './ListMovies';
import ListName from './ListName';

function ListItem({ id, name, description, items }: TList) {
	const nameProps = { id, name };
	const descriptionProps = { description };
	const moviesProps = { listId: id, items };
	return {
		Name: <ListName {...nameProps} />,
		Description: <ListDescription {...descriptionProps} />,
		Movies: <ListMovies {...moviesProps} />,
	};
}

export default ListItem;
