import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import User from "@models/user";

export const POST = async(req) => {
    try {
        const { searchText } = await req.json();
        await connectToDB();
        const prompts = await Prompt.find({
            $or: [
                { tag: { $regex: searchText, $options: 'i' } },
                { creator: { $in: await User.find({ userName: { $regex: searchText, $options: 'i' } }).distinct('_id') } }
            ]
        }).populate('creator')

        return new Response(JSON.stringify(prompts), { status: 200})
    } catch (error) {
        return new Response("Failed to fetch prompts", { status: 500})
    }
}