import img1 from "@assets/images/suggestionsImages/suggestion1.png";
import img2 from "@assets/images/suggestionsImages/suggestion2.png";
import img3 from "@assets/images/suggestionsImages/suggestion3.png";
import img4 from "@assets/images/suggestionsImages/suggestion4.png";
import img5 from "@assets/images/suggestionsImages/suggestion5.png";
import SuggestionsItem from "./SuggestionsItem";

const Suggestions = () => {
  const imageSources: string[] = [img1, img2, img3, img4, img5];

  return (
    <div className="hidden p-4 bg-white md:block w-fit h-fit">
      <p className="pb-2 text-lg font-normal uppercase text-neutral-900 font-family1">
        suggestions
      </p>
      <ul className="flex flex-col space-y-4">
        {imageSources.map((src, index) => (
          <SuggestionsItem key={index} src={src} alt={`Image ${+index + 1}`} />
        ))}
      </ul>
    </div>
  );
};
export default Suggestions;
