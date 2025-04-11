import LogoTitle from "../ui/LogoTitle";
import MainMenu from "../ui/MainMenu";

const Home = () => {
  return (
    // Div for background
    <div className="relative h-screen w-screen bg-[url(/fieldLineFocused.jpg)] bg-cover">
      {/* Text container */}
      <div className="absolute top-[50%] left-[50%] w-[50vw] -translate-1/2 rounded-[5px] bg-neutral-300/70 px-12 py-8">
        {/* Image and title */}
        <LogoTitle kind="title" />

        {/* Text */}
        <div className="mt-4 space-y-2">
          <p className="text-lg">
            Soccer Manager is a project to train both typescript and forms.
          </p>
          <p className="text-lg">
            To make it cooler, it has a sports theme, and the main goal is to
            create a record of soccer players who I play with!!!
          </p>
          <p className="text-lg">
            Finally, it also has a section to create teams based on the selected
            players (this might be useful for us to pick more competitive teams
            when we play!)
          </p>
        </div>

        {/* Buttons */}
        <div>
          <MainMenu />
        </div>
      </div>
    </div>
  );
};

export default Home;
