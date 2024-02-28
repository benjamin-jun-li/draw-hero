import { UserButton } from "@clerk/nextjs";

const Home = () => {
	return <main>
        <p>this is a page for logged in users</p>
        <UserButton />
    </main>;
};

export default Home;
