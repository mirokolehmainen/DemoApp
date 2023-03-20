import {
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonSearchbar,
	IonItem,
	IonLabel,
	IonSelect,
	IonSelectOption,
	IonAvatar,
	IonIcon,
	IonList,
	IonImg,
	IonPage,
	useIonLoading,
	useIonAlert
} from '@ionic/react';
import { useState, useEffect } from 'react';
import useApi from '../hooks/useApi';
import { SearchType } from '../hooks/useApi';
import { gameControllerOutline, tvOutline, videocamOutline } from 'ionicons/icons';

const Home: React.FC = () => {
	const { searchData } = useApi();

	const [searchTerm, setSearchTerm] = useState('');
	const [type, setType] = useState<SearchType>(SearchType.all);
	const [results, setResults] = useState([]);

	const [present, dismiss] = useIonLoading();
	const [presentAlert] = useIonAlert();

useEffect(() => {
	if (searchTerm === '') {
		setResults([]);
		return;
	}
	const loadData = async () => {
		present('Loading...');
		const result = await searchData(searchTerm, type);
		if (result.Search) {
			setResults(result.Search);
		} else {
			presentAlert('No results found :(');
		}
		dismiss();
	};
	loadData();
}, [searchTerm, type]);
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar color="primary">
					<IonTitle>My Movie Search</IonTitle>
				</IonToolbar>
			</IonHeader>

			<IonContent>
				<IonSearchbar
					value={searchTerm}
					debounce={300}
					onIonChange={(e) => setSearchTerm(e.detail.value!)}
				></IonSearchbar>

				<IonItem>
					<IonLabel>Select Searchtype</IonLabel>
					<IonSelect value={type} onIonChange={(e) => setType(e.detail.value)}>
						<IonSelectOption value="">All</IonSelectOption>
						<IonSelectOption value="movie">Movie</IonSelectOption>
						<IonSelectOption value="series">Series</IonSelectOption>
						<IonSelectOption value="episode">Episode</IonSelectOption>
					</IonSelect>
				</IonItem>

				<IonList>
					{results.map((item: any) => (
						<IonItem button routerLink={`/movies/${item.imdbID}`} key={item.imdbID}>
							<IonAvatar slot="start">{item.Poster && <IonImg src={item.Poster} />}</IonAvatar>

							<IonLabel className="ion-text-wrap">{item.Title}</IonLabel>

							{item.Type === 'movie' && <IonIcon slot="end" icon={videocamOutline} />}
							{item.Type === 'series' && <IonIcon slot="end" icon={tvOutline} />}
							{item.Type === 'game' && <IonIcon slot="end" icon={gameControllerOutline} />}
						</IonItem>
					))}
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default Home;