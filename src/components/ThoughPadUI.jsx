const ThoughPadUI = ({ heading, para }) => {
  return (
    <div>
      <h1 className="text-white text-2xl font-bold mb-2">
        {heading || "Welcome to ThoughtPad"}
      </h1>
      <p className="text-white text-lg">
        {para ||
          "Your personal space to write down thoughts, ideas, and notes."}
      </p>
    </div>
  );
};

export default ThoughPadUI;
