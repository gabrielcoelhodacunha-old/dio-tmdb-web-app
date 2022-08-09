import { TList } from 'common/types';
import { Table } from 'components';
import ListItem from './ListItem';

function ListTable({ lists }: Props): JSX.Element {
	const tableProps = {
		columns: ['Name', 'Description', 'Movies'],
		data: lists.map((list) => ListItem(list)),
	};
	return <Table {...tableProps} />;
}

type Props = {
	lists: TList[];
};

export default ListTable;
