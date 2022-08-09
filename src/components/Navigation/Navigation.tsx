import { TObject } from 'common/types';
import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch } from 'redux/hooks';
import { reset, getLists } from 'redux/tmdb';
import { deleteSession, isLoggedIn } from 'services/tmdb';

function Navigation(): JSX.Element {
	const navigateTo = useNavigate();
	const location = useLocation();
	const searchButton = useRef<HTMLButtonElement>(null);
	const listsButton = useRef<HTMLButtonElement>(null);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!isLoggedIn()) return;
		const toggleButtons = () => {
			const route = location.pathname.slice(1);
			const routes = { search: searchButton, lists: listsButton } as TObject;
			Object.keys(routes).forEach((key) => {
				routes[key].current.disabled = key === route;
			});
		};
		toggleButtons();
	}, [location.pathname]);

	useEffect(() => {
		if (!isLoggedIn()) return;
		dispatch(getLists());
	}, [dispatch]);

	const logOut = async () => {
		await deleteSession();
		dispatch(reset());
		navigateTo('/');
	};

	return (
		<>
			{isLoggedIn() && (
				<nav>
					<button ref={searchButton} onClick={() => navigateTo('search')}>
						Search
					</button>
					<button ref={listsButton} onClick={() => navigateTo('lists')}>
						Lists
					</button>
					<button onClick={logOut}>Log Out</button>
				</nav>
			)}
		</>
	);
}

export default Navigation;
