// Reference (credits) https://codepen.io/codesuey/pen/gZzwBJ
import { GiRunningShoe } from "react-icons/gi";
import { IconContext } from "react-icons";
import { PlayerFromDB } from "../../utils/typing";

interface PlayerCard {
  player: PlayerFromDB;
}

const PlayerCard = ({ player }: PlayerCard) => {
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
        src={image || "noPhoto.png"}
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

  // return (
  //   <div id="card">
  //     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 267.3 427.3">
  //       <clipPath id="svgPath">
  //         <path
  //           fill="#000"
  //           d="M265.3 53.9a33.3 33.3 0 0 1-17.8-5.5 32 32 0 0 1-13.7-22.9c-.2-1.1-.4-2.3-.4-3.4 0-1.3-1-1.5-1.8-1.9a163 163 0 0 0-31-11.6A257.3 257.3 0 0 0 133.7 0a254.9 254.9 0 0 0-67.1 8.7 170 170 0 0 0-31 11.6c-.8.4-1.8.6-1.8 1.9 0 1.1-.2 2.3-.4 3.4a32.4 32.4 0 0 1-13.7 22.9A33.8 33.8 0 0 1 2 53.9c-1.5.1-2.1.4-2 2v293.9c0 3.3 0 6.6.4 9.9a22 22 0 0 0 7.9 14.4c3.8 3.2 8.3 5.3 13 6.8 12.4 3.9 24.8 7.5 37.2 11.5a388.7 388.7 0 0 1 50 19.4 88.7 88.7 0 0 1 25 15.5v.1-.1c7.2-7 16.1-11.3 25-15.5a427 427 0 0 1 50-19.4l37.2-11.5c4.7-1.5 9.1-3.5 13-6.8 4.5-3.8 7.2-8.5 7.9-14.4.4-3.3.4-6.6.4-9.9V231.6 60.5v-4.6c.4-1.6-.3-1.9-1.7-2z"
  //         />
  //       </clipPath>
  //     </svg>
  //     <div id="card-inner">
  //       <div id="card-top">
  //         <div className="info">
  //           <div className="value">{rank}</div>
  //           <div className="position"></div>
  //           <div className="height">
  //             <div>{height / 100}m</div>
  //           </div>
  //           <div className="foot">
  //             <div>
  //               <IconContext.Provider value={{ className: "react-icon" }}>
  //                 <GiRunningShoe />
  //               </IconContext.Provider>
  //               <span>{foot}</span>
  //             </div>
  //           </div>
  //         </div>

  //         <div className="image">
  //           <img src={image ?? "noPhoto.png"} alt={`Photo of ${nickname}`} />
  //         </div>
  //         {/* <div className="backfont">SM</div> */}
  //       </div>
  //       <div id="card-bottom">
  //         <div className="name">{nickname}</div>
  //         <div className="stats">
  //           <div>
  //             <ul>
  //               <li>
  //                 <span>{speed}</span>
  //                 <span>pac</span>
  //               </li>
  //               <li>
  //                 <span>{shoot}</span>
  //                 <span>sho</span>
  //               </li>
  //               <li>
  //                 <span>{pass}</span>
  //                 <span>pas</span>
  //               </li>
  //             </ul>
  //           </div>
  //           <div>
  //             <ul>
  //               <li>
  //                 <span>{dribble}</span>
  //                 <span>dri</span>
  //               </li>
  //               <li>
  //                 <span>{defense}</span>
  //                 <span>def</span>
  //               </li>
  //               <li>
  //                 <span>{stamina}</span>
  //                 <span>phy</span>
  //               </li>
  //             </ul>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default PlayerCard;
