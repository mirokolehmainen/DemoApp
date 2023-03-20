import {
	IonHeader,
	IonToolbar,
	IonButtons,
	IonBackButton,
	IonTitle,
	IonContent,
	IonCard,
	IonCardHeader,
	IonCardTitle,
	IonCardSubtitle,
	IonCardContent,
	IonItem,
	IonIcon,
	IonLabel,
	useIonViewWillEnter,
	IonImg,
	IonButton,
	IonModal,
	IonFooter
} from '@ionic/react';
import { useState } from 'react';
import { RouteComponentProps } from 'react-router';
import useApi from '../hooks/useApi';
import { IonPage } from '@ionic/react';
import { bodyOutline, clipboardOutline, starHalfOutline, trophyOutline } from 'ionicons/icons';
import { DetailsResult } from '../hooks/useApi';

interface DetailsPageProps
	extends RouteComponentProps<{
		id: string;
	}> {}

const Details: React.FC<DetailsPageProps> = ({ match }, props) => {
	const [information, setInformation] = useState<DetailsResult | null>(null);
	const { getDetails } = useApi();

	useIonViewWillEnter(async () => {
		const id = match.params.id;
		const data = await getDetails(id);
		setInformation(data);
	});

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar color="primary">
					<IonButtons slot="start">
						<IonBackButton defaultHref="/movies" />
					</IonButtons>
					<IonTitle>{information?.Genre}</IonTitle>
				</IonToolbar>
			</IonHeader>

			<IonContent>
				{information && (
					<IonCard>
						<IonCardHeader>
							<IonCardTitle>{information.Title}</IonCardTitle>
							<IonCardSubtitle>{information.Year}</IonCardSubtitle>
						</IonCardHeader>
						<IonCardContent text-center>
							<IonImg src={information.Poster} />

							<IonItem lines="none">
								<IonIcon icon={starHalfOutline} slot="start" color="warning" />
								<IonLabel>{information.imdbRating}</IonLabel>
							</IonItem>
						</IonCardContent>
					</IonCard>
				)}

				<IonModal trigger="open-modal" initialBreakpoint={0.25} breakpoints={[0, 0.25, 0.5, 0.75]}>
					<IonContent className="ion-padding">
						<IonItem lines="none">
							<IonIcon icon={clipboardOutline} slot="start" />
							<IonLabel>{information?.Director}</IonLabel>
						</IonItem>

						<IonItem lines="none">
							<IonIcon icon={bodyOutline} slot="start" />
							<IonLabel className="ion-text-wrap">{information?.Actors}</IonLabel>
						</IonItem>

						<IonItem lines="none">
							<IonIcon icon={trophyOutline} slot="start" />
							<IonLabel className="ion-text-wrap">{information?.Awards}</IonLabel>
						</IonItem>

						<p className="ion-padding">{information?.Plot}</p>
					</IonContent>
				</IonModal>
			</IonContent>

			<IonFooter>
				<IonButton id="open-modal" expand="full">
					Show more
				</IonButton>
			</IonFooter>
		</IonPage>
	);
};

export default Details;