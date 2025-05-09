// Reference (credits) https://codepen.io/codesuey/pen/gZzwBJ
import { GiRunningShoe } from "react-icons/gi";
import { IconContext } from "react-icons";
import { PlayerCard as PlayerCardInterface } from "../../utils/typing";

const PlayerCard = ({ player }: PlayerCardInterface) => {
  const {
    name,
    nickname,
    foot,
    height,
    speed,
    stamina,
    pass,
    shoot,
    dribble,
    defense,
    rank,
    kind,
    imageurl: image,
  } = player;

  return (
    <div
      className={`relative -mx-12 -my-4 grid h-80 w-80 grid-cols-[0.7fr_1fr_0.8fr_1fr] grid-rows-9 border-2 border-red-100 px-20 pt-14 pb-16 ${kind === "bronze" && "bg-[url(/cardBronze.png)] mask-[url(/cardBronze.png)] bg-contain bg-center bg-no-repeat mask-contain mask-center mask-no-repeat text-[var(--color-bronze-text)]"} ${kind === "silver" && "bg-[url(/cardSilver.png)] mask-[url(/cardSilver.png)] bg-contain bg-center bg-no-repeat mask-contain mask-center mask-no-repeat text-[var(--color-silver-text)]"} ${kind === "gold" && "bg-[url(/cardGold.png)] mask-[url(/cardGold.png)] bg-contain bg-center bg-no-repeat mask-contain mask-center mask-no-repeat text-[var(--color-gold-text)]"} ${kind === "diamond" && "bg-[url(/cardDiamond.png)] mask-[url(/cardDiamond.png)] bg-contain bg-center bg-no-repeat mask-contain mask-center mask-no-repeat text-[var(--color-diamond-text)]"} ${kind === "legend" && "bg-[url(/cardLegend.png)] mask-[url(/cardLegend.png)] bg-contain bg-center bg-no-repeat mask-contain mask-center mask-no-repeat text-[var(--color-legend-text)]"} `}
    >
      {/* lines separating grades */}
      <span
        className={`absolute top-[59%] left-[26%] w-39 border-t-2 ${kind === "bronze" && "border-[var(--color-bronze-border)]"} ${kind === "silver" && "border-[var(--color-silver-border)]"} ${kind === "gold" && "border-[var(--color-gold-border)]"} ${kind === "diamond" && "border-[var(--color-diamond-border)]"} ${kind === "legend" && "border-[var(--color-legend-border)]"}`}
      />
      <span
        className={`absolute top-[59%] left-[50%] h-18 border-l-2 ${kind === "bronze" && "border-[var(--color-bronze-border)]"} ${kind === "silver" && "border-[var(--color-silver-border)]"} ${kind === "gold" && "border-[var(--color-gold-border)]"} ${kind === "diamond" && "border-[var(--color-diamond-border)]"} ${kind === "legend" && "border-[var(--color-legend-border)]"}`}
      />
      <span
        className={`absolute top-[81.5%] left-[44%] w-10 border-t-2 ${kind === "bronze" && "border-[var(--color-bronze-border)]"} ${kind === "silver" && "border-[var(--color-silver-border)]"} ${kind === "gold" && "border-[var(--color-gold-border)]"} ${kind === "diamond" && "border-[var(--color-diamond-border)]"} ${kind === "legend" && "border-[var(--color-legend-border)]"}`}
      />
      <span className="col-1 col-span-2 row-1 pl-2 text-2xl font-bold">
        {rank}
      </span>
      <span className="col-1 col-span-2 row-3 pl-2 font-bold">
        {height / 100}m
      </span>
      <div className="z-2 col-1 col-span-2 row-5 flex gap-1">
        <IconContext.Provider value={{ className: "react-icon" }}>
          <GiRunningShoe />
        </IconContext.Provider>
        <span className="self-center capitalize">{foot}</span>
      </div>
      <img
        className="absolute top-[14%] left-[38%] z-1 h-30"
        src={image || "/noPhoto.png"}
        alt={`Photo of ${nickname || name}`}
      />
      <span className="col-1 col-span-4 row-6 space-y-1 self-center justify-self-center uppercase">
        {nickname}
      </span>
      <span className="col-1 row-7 w-full pl-2 text-left">{speed}</span>
      <span className="col-2 row-7">PAC</span>
      <span className="col-1 row-8 w-full pl-2 text-left">{shoot}</span>
      <span className="col-2 row-8 pr-2">SHO</span>
      <span className="col-1 row-9 w-full pl-2 text-left">{pass}</span>
      <span className="col-2 row-9 pr-2">PAS</span>
      <span className="col-3 row-7 text-right">{dribble}</span>
      <span className="col-4 row-7 pl-1">DRI</span>
      <span className="col-3 row-8 w-full text-right">{defense}</span>
      <span className="col-4 row-8 pl-1">DEF</span>
      <span className="col-3 row-9 w-full text-right">{stamina}</span>
      <span className="col-4 row-9 pl-1">PHY</span>
    </div>
  );
};

export default PlayerCard;
