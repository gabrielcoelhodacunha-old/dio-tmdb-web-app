import { TMovie } from 'common/types';
import { Table } from 'components';
import MovieItem from './MovieItem';

function MovieTable({ movies }: Props): JSX.Element {
	const tableProps = {
		columns: ['Movie', 'Lists'],
		data: movies.map((movie) => MovieItem(movie)),
	};
	return <Table {...tableProps} />;
}

type Props = {
	movies: TMovie[];
};

export default MovieTable;
