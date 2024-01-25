type Props = { fetchStatus: string };
export default function ErrorDisplay({ fetchStatus }: Props) {
	return (
		<p
			className={`${
				fetchStatus === "Signed in succesfully!"
					? "text-green-500"
					: "text-red-500"
			} pt-1 mx-auto w-fit text-center`}
		>
			{fetchStatus}
		</p>
	);
}
