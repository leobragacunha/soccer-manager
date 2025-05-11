import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { deletePlayer, getSinglePlayer, editPlayer } from "../../services/API";
import PlayerCard from "./PlayerCard";
import PlayerForm from "./PlayerForm";
import { Player } from "../../utils/typing";
import { SubmitHandler } from "react-hook-form";
import { useState } from "react";
import Spinner from "../../ui/Spinner";

const EditPlayer = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { playerId } = useParams();

  // Creating state for managing image removal.
  const [removePic, setRemovePic] = useState(false);

  const {
    data: player,
    isPending,
    error,
  } = useQuery({
    queryKey: ["player", playerId],
    queryFn: () => getSinglePlayer(playerId),
    enabled: !!playerId,
  });

  const editPlayerMutation = useMutation({
    mutationFn: ({ player }: { player: Player }) => editPlayer({ player }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["player", playerId] });
      navigate("/players");
    },
    onError: (error) => console.error("Could not edit player", error),
  });

  const deletePlayerMutation = useMutation({
    mutationFn: (id: string) => deletePlayer(id),
    onSuccess: () => navigate("/players"),
    onError: (error) => console.error("Error deleting player:", error),
  });

  const handleSubmitForm: SubmitHandler<Player> = (data) => {
    if (!data.profilePic?.[0]) delete data.profilePic;
    if (removePic) data.imageurl = null;

    console.log("data send for mutation", data);
    editPlayerMutation.mutate({ player: data });
  };

  if (isPending) return <Spinner />;
  if (error) return <div>Error:{error.message}</div>;

  console.log("player", player);

  return (
    <div className="flex h-screen flex-1 overflow-hidden bg-[url(/ballNet.jpg)] bg-cover">
      {/* Container with info */}
      <div className="m-4 flex flex-1 gap-4 rounded-[5px] bg-neutral-300/70 p-4">
        <div className="self-center">
          <PlayerForm
            player={player}
            removePic={removePic}
            setRemovePic={setRemovePic}
            onSubmit={handleSubmitForm}
          />
        </div>
        <div className="flex h-full flex-1 flex-col items-center justify-between">
          <div className="mt-20 scale-130">
            <PlayerCard player={player} />
          </div>
          <button
            className="mb-16 rounded-[5px] border-2 border-green-800 px-6 py-3 text-green-800 transition-all duration-300 hover:border-0 hover:bg-red-700 hover:text-white"
            onClick={() => deletePlayerMutation.mutate(playerId!)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPlayer;
