import { SubmitHandler } from "react-hook-form";
import { createPlayer } from "../../services/API";
import { useMutation } from "@tanstack/react-query";
import { Player } from "../../utils/typing";
import { useNavigate } from "react-router";
import PlayerForm from "./PlayerForm";
import { useState } from "react";

const CreateEditPlayer = () => {
  // const [isLegend, setIsLegend] = useState(false);
  const navigate = useNavigate();

  const createPlayerMutation = useMutation({
    mutationFn: ({ player }: { player: Player }) => createPlayer({ player }),
    onSuccess: () => {
      console.log("Mutation function ran ok!");
      navigate("/players");
    },
    onError: (error) => {
      console.error("Error with mutation function", error);
    },
  });

  const handleSubmitForm: SubmitHandler<Player> = (data) => {
    // If there is no file submitted, we remove the attribute from formData
    if (!data.profilePic?.[0]) delete data.profilePic;

    // console.log(data);

    createPlayerMutation.mutate({ player: data });
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
          <PlayerForm
            onSubmit={handleSubmitForm}
            // isLegend={isLegend}
            // setIsLegend={setIsLegend}
          />
          {/* Player Card */}
          <div className="flex-1"></div>
        </div>
      </div>
    </div>
  );
};

export default CreateEditPlayer;
