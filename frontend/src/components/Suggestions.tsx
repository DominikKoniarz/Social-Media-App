import SuggestionsItem from "./SuggestionsItem";
import { Suggestion } from "../../../types/socket.io";

type Props = {
	suggestions: Suggestion[];
};

const Suggestions = ({ suggestions }: Props) => {
	return (
		<div className="hidden p-4 bg-white 2xl:block w-fit h-fit shrink-0">
			<p className="mb-2 text-lg font-bold uppercase text-neutral-900 font-family1">
				Suggestions
			</p>
			<ul className="flex flex-col gap-y-4">
				{suggestions.map((suggestion) => (
					<SuggestionsItem key={suggestion.id} suggestion={suggestion} />
				))}
			</ul>
		</div>
	);
};
export default Suggestions;
