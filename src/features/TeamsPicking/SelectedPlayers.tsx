import { Player } from "../../utils/typing";

const SelectedPlayers = ({
  selectedPlayers,
}: {
  selectedPlayers: Player[];
}) => {
  return (
    <>
      <p className="pb-2 text-green-800"> Selected Players</p>
      <ul className="flex h-full gap-4">
        {selectedPlayers.map((player: Player) => (
          <li key={player.id} className="h-full">
            <img
              className={`h-24 w-24 rounded-[100%] border-4 object-cover ${player.kind === "bronze" ? "border-[var(--color-bronze-border)]" : player.kind === "silver" ? "border-[var(--color-silver-border)]" : player.kind === "gold" ? "border-[var(--color-gold-border)]" : player.kind === "diamond" ? "border-[var(--color-diamond-border)]" : "border-[var(--color-legend-border)]"} `}
              src={player.imageurl || "/noPhoto.png"}
              alt={player.nickname}
              title={player.nickname}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default SelectedPlayers;
