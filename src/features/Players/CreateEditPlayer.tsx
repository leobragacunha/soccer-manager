import { useForm, SubmitHandler } from "react-hook-form";
import { createPlayer } from "../../services/API";
import { useMutation } from "@tanstack/react-query";
import { Player } from "../../utils/typing";
import { removeBg } from "../../utils/helpers";
import { useNavigate } from "react-router";

const CreateEditPlayer = () => {
  // React-Hook-Form
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Player>({
    defaultValues: {
      name: "",
      nickName: "",
      foot: undefined,
      height: 175,
      speed: 50,
      stamina: 50,
      pass: 50,
      shoot: 50,
      dribble: 50,
      defense: 50,
    },
  });

  const navigate = useNavigate();
  const selectedFile = watch("profilePic");

  const createPlayerMutation = useMutation({
    mutationFn: (player: Player) => createPlayer(player),
    onSuccess: () => {
      console.log("Mutation function ran ok!");
      navigate("/players");
    },
    onError: (error) => {
      console.log("Error with mutation function", error);
    },
  });

  const onSubmit: SubmitHandler<Player> = (data) => {
    if (!data.profilePic?.[0]) delete data.profilePic;
    // console.log(data);
    createPlayerMutation.mutate(data);
  };

  return (
    <div className="flex h-screen flex-1 bg-[url(/cornerfieldFromCorner.jpg)] bg-cover">
      {/* Container with info */}
      <div className="m-4 flex flex-1 flex-col gap-4 rounded-[5px] bg-neutral-300/70 p-4">
        {/* Container header */}
        <div className="border-b-2 border-green-800 pb-4">
          <h1 className="text-5xl text-green-800">Create Player</h1>
        </div>
        {/* Content */}
        <div className="flex flex-1">
          {/* Form */}
          <form
            className="m-2 grid flex-[1_1_10%] grid-cols-4 grid-rows-[1fr_0.5fr_1fr_0.5fr_1fr_0.5fr_1fr_0.5fr_1fr_0.5fr_1fr_0.5fr_0.5fr_1fr_1fr] gap-2 gap-x-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label
              className="col-start-1 row-start-1 self-center"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className={`col-span-3 col-start-2 row-start-1 rounded-[5px] bg-white ${errors.name && "border-2 border-red-500/80"}`}
              type="text"
              id="name"
              {...register("name", { required: "Name is mandatory" })}
            />
            <p
              className={`col-span-3 col-start-2 row-start-2 text-sm ${errors.name && "text-red-500"}`}
            >
              {errors.name?.message}
            </p>

            <label className="row-start-3" htmlFor="nickName">
              Nick Name
            </label>
            <input
              className="col-start-2 row-start-3 rounded-[5px] bg-white"
              type="text"
              id="nickName"
              {...register("nickName")}
            />

            <label className="col-start-3 row-start-3 pl-12" htmlFor="height">
              Height (cm)
            </label>
            <input
              className="col-start-4 row-start-3 w-14 justify-self-end rounded-[5px] bg-white pl-2"
              type="number"
              id="height"
              {...register("height", {
                min: { value: 140, message: "The minimum height is 140cm." },
              })}
            />
            <p className="col-start-4 row-start-4 text-sm">
              {errors.height?.message}
            </p>

            <label className="col-start-1 row-start-5">
              Best Foot {errors.foot && <span>({errors.foot?.message})</span>}
            </label>
            <div className="col-span-3 col-start-2 row-start-5 flex gap-x-10">
              <div>
                <input
                  className="rounded-[5px] bg-white"
                  type="radio"
                  value="left"
                  id="left"
                  {...register("foot", { required: "mandatory" })}
                />
                <label htmlFor="left">Left</label>
              </div>
              <div className="col-start-3 row-start-5">
                <input
                  className="rounded-[5px] bg-white"
                  type="radio"
                  value="right"
                  id="right"
                  {...register("foot")}
                />
                <label htmlFor="right">Right</label>
              </div>
              <div className="col-start-4 row-start-5">
                <input
                  className="rounded-[5px] bg-white"
                  type="radio"
                  value="both"
                  id="both"
                  {...register("foot")}
                />
                <label htmlFor="both">Both</label>
              </div>
            </div>

            <label className="col-start-1 row-start-7" htmlFor="speed">
              Speed
            </label>
            <input
              className="col-start-2 row-start-7 w-14 justify-self-end rounded-[5px] bg-white pl-2"
              type="number"
              id="speed"
              {...register("speed", {
                min: { value: 1, message: "Speed must be bigger than 0." },
                max: {
                  value: 100,
                  message: "Speed must be smaller or equal 100.",
                },
              })}
            />
            <p className="col-start-2 row-start-8 text-sm">
              {errors.speed?.message}
            </p>

            <label className="col-start-3 row-start-7 pl-12" htmlFor="stamina">
              Stamina
            </label>
            <input
              className="col-start-4 row-start-7 w-14 justify-self-end rounded-[5px] bg-white pl-2"
              type="number"
              id="stamina"
              {...register("stamina", {
                min: { value: 1, message: "Stamina must be bigger than 0." },
                max: {
                  value: 100,
                  message: "Stamina must be smaller or equal 100.",
                },
              })}
            />
            <p className="col-start-4 row-start-8 text-sm">
              {errors.stamina?.message}
            </p>

            <label className="col-start-1 row-start-9" htmlFor="pass">
              Pass
            </label>
            <input
              className="col-start-2 row-start-9 w-14 justify-self-end rounded-[5px] bg-white pl-2"
              type="number"
              id="pass"
              {...register("pass", {
                min: { value: 1, message: "Pass must be bigger than 0." },
                max: {
                  value: 100,
                  message: "Pass must be smaller or equal 100.",
                },
              })}
            />
            <p className="col-start-2 row-start-10 text-sm">
              {errors.pass?.message}
            </p>

            <label className="col-start-3 row-start-9 pl-12" htmlFor="shoot">
              Shoot
            </label>
            <input
              className="col-start-4 row-start-9 w-14 justify-self-end rounded-[5px] bg-white pl-2"
              type="number"
              id="shoot"
              {...register("shoot", {
                min: { value: 1, message: "Shoot must be bigger than 0." },
                max: {
                  value: 100,
                  message: "Shoot must be smaller or equal 100.",
                },
              })}
            />
            <p className="col-start-4 row-start-10 text-sm">
              {errors.shoot?.message}
            </p>

            <label className="col-start-1 row-start-11" htmlFor="dribble">
              Dribble
            </label>
            <input
              className="col-start-2 row-start-11 w-14 justify-self-end rounded-[5px] bg-white pl-2"
              type="number"
              id="dribble"
              {...register("dribble", {
                min: { value: 1, message: "Dribble must be bigger than 0." },
                max: {
                  value: 100,
                  message: "Dribble must be smaller or equal 100.",
                },
              })}
            />
            <p className="col-start-2 row-start-12 text-sm">
              {errors.dribble?.message}
            </p>

            <label className="col-start-3 row-start-11 pl-12" htmlFor="defense">
              Defense
            </label>
            <input
              className="col-start-4 row-start-11 w-14 justify-self-end rounded-[5px] bg-white pl-2"
              type="number"
              id="defense"
              {...register("defense", {
                min: { value: 1, message: "Defense must be bigger than 0." },
                max: {
                  value: 100,
                  message: "Defense must be smaller or equal 100.",
                },
              })}
            />
            <p className="col-start-4 row-start-12 text-sm">
              {errors.defense?.message}
            </p>

            <input
              type="checkbox"
              id="isLegend"
              value="legend"
              className="col-start-1 row-start-13"
              {...register("isLegend")}
            />
            <label htmlFor="isLegend" className="col-start-2 row-start-13">
              He is a legend!
            </label>

            <label
              htmlFor="profilePic"
              className="col-span-2 col-start-1 row-start-14 w-40 cursor-pointer rounded-[5px] bg-green-800 p-2 text-center text-white transition duration-300 hover:bg-white hover:text-green-800"
            >
              Upload a profile pic
            </label>
            <input
              type="file"
              accept="image/*"
              id="profilePic"
              className="hidden"
              {...register("profilePic")}
            />
            <p className="col-span-2 col-start-2 row-start-14">
              {selectedFile &&
                selectedFile.length > 0 &&
                selectedFile?.[0].name}
            </p>

            <button
              className="col-span-2 col-start-1 row-start-15 w-30 cursor-pointer justify-self-start rounded-[5px] border-2 border-green-800 text-green-800 transition duration-300 hover:bg-white"
              type="reset"
            >
              Clear
            </button>
            <button
              className="col-span-2 col-start-4 row-start-15 w-30 justify-self-end-safe rounded-[5px] border-2 border-green-800 bg-green-800 text-white transition duration-300 hover:bg-white hover:text-green-800"
              type="submit"
            >
              Create
            </button>
          </form>
          {/* Player Card */}
          <div className="flex-1"></div>
        </div>
      </div>
    </div>
  );
};

export default CreateEditPlayer;
