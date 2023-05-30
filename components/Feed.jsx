'use client'
import {useEffect, useState} from "react";
import PromptCard from './PromptCard'
import SkeletonCard from "./SkeletonCard";

const PromptCardList = ({data, handleTagClick}) => {
    return (
        <div className="mt-16 prompt_layout">
            {
                data.length ? data.map((prompt) =>
                    <PromptCard
                        key={prompt._id}
                        prompt={prompt}
                        handleTagClick={handleTagClick}
                    />
                ) :
                    <p className="desc text-center">
                        Be the first in create a new and amazing AI Prompt
                    </p>
            }
        </div>
    )
}

const PromptSkeletonList = () => {
    return (
        <div className="mt-16 prompt_layout">
            {
                Array.from({ length: 4 }).map((i) => <SkeletonCard key={i}/>)
            }
        </div>
    )
}
const Feed = () => {
    const [searchText, setSearchText] = useState('')
    const [prompts, setPrompts] = useState([])
    const [isLoading, setLoading] = useState(true)

    const handleSearchChange = (e) => {
        setSearchText(e.target.value)
    }

    const fetchPrompts = async () => {
        setLoading(true)
        const response = await fetch('/api/prompt');
        const data = await response.json()
        setPrompts(data)
        setLoading(false)
    }

    const searchPrompts = async () => {
        setLoading(true)
        const response = await fetch('/api/prompt/search', {
            method: 'POST',
            body: JSON.stringify({
                searchText: searchText
            })
        });
        const data = await response.json()
        setPrompts(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchPrompts()
    }, []);

    useEffect(() => {
        if(searchText && searchText.length >= 3) {
            searchPrompts()
        } else if(!searchText) {
            fetchPrompts()
        }
    }, [searchText]);

    return (
        <section className="feed">
            <form
                className="relative w-full flex-center"
            >
                <input
                    type="text"
                    placeholder="Search for a tag or username"
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className="search_input peer"
                />
            </form>
            {
                prompts.length ?
                    (
                        isLoading ?
                            <PromptSkeletonList />
                            :
                            <PromptCardList
                                data={prompts}
                                handleTagClick={() => {}}
                            />
                    )
                    :
                    <p className="desc text-center">
                        {
                            searchText?
                            `No prompts found by ${searchText}`
                                :
                            '¡Be the first in create a new and amazing AI prompt!'
                        }
                    </p>
            }


        </section>
    );
};

export default Feed;