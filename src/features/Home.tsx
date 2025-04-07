function Home() {
  return (
    <div className="relative h-screen w-screen bg-[url(/fieldLineFocused.jpg)] bg-cover">
      <div className="absolute top-[50%] left-[50%] w-[50vw] -translate-1/2 rounded-[5px] bg-neutral-300/70 p-12">
        <div className="flex items-center justify-center">
          <img
            src="/soccer-player.png"
            alt="Soccer Manager Logo"
            className="inline-block h-auto w-32"
          />
          <h1 className="lato-regular-italic inline-block text-5xl text-green-800">
            Soccer Manager
          </h1>
        </div>
        <div className="space-y-2">
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
      </div>
    </div>
  );
}

export default Home;
