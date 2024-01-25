import Suggestions from "@components/Suggestions";
import NotificationHeader from "./NotificationHeader";
import Notification from "./Notification";
import useGetSuggestions from "hooks/useGetSuggestions";

const NotificationPage = () => {
	const { data: suggestions, isLoading } = useGetSuggestions();

	return (
		<section className="flex h-full gap-16 px-3 py-2 md:px-8 2xl:px-32 w-fit">
			<div className="relative flex flex-col gap-4 ">
				<NotificationHeader />
				<ul className="h-full mx-auto space-y-4 overflow-y-auto notifications w-fit">
					<Notification />
					<Notification />
					<Notification />
					<Notification />
					<Notification />
					<Notification />
					<Notification />
					<Notification />
					<Notification />
					<Notification />
					<Notification />
					<Notification />
				</ul>
			</div>
			{!isLoading && suggestions && suggestions?.length > 0 && (
				<Suggestions suggestions={suggestions} />
			)}
		</section>
	);
};
export default NotificationPage;
