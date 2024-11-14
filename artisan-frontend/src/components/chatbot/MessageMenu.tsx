import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon, PencilIcon, TrashIcon } from "@heroicons/react/16/solid";

interface Props {
	deleteButton: () => void;
	editButton: () => void;
}

export default function MessageMenu({ deleteButton, editButton }: Props) {
	return (
		<Menu>
			<MenuButton className="inline-flex items-center gap-2 rounded-full focus:outline-none data-[hover]:bg-purple-400 data-[open]:bg-purple-700 data-[focus]:outline-1 data-[focus]:outline-white">
				<ChevronDownIcon className="size-6 fill-white/80" />
			</MenuButton>
			<MenuItems
				transition
				anchor="top end"
				className="w-40 origin-bottom-right rounded-xl z-[55] border border-white/5 bg-purple-600 p-2 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 translate-x-[-10px]rounded-br-sm"
			>
				<MenuItem>
					<button
						className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
						onClick={editButton}
					>
						<PencilIcon className="size-4 fill-white/30" />
						Edit
					</button>
				</MenuItem>
				<MenuItem>
					<button
						className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
						onClick={deleteButton}
					>
						<TrashIcon className="size-4 fill-white/30" />
						Delete
					</button>
				</MenuItem>
			</MenuItems>
		</Menu>
	);
}
