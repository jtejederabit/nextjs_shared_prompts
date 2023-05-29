import Feed from "@components/Feed";

const Home = () => {
    return (
        <section className="w-full flex-center flex-col">
            <h1 className="head_text text-center">
                Discover & Share
                <br/>
                <span className="orange_gradient text-center">AI-Prowered Prompts</span>
            </h1>
            <p className="desc text-center">
                Promptopia is an open-source AI propmting tool for modern worlds to discover,
                create and share creative propmts
            </p>

            <Feed />
        </section>
    );
};

export default Home;

