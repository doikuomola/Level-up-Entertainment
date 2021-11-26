/* eslint-disable react-hooks/exhaustive-deps */
import { LinearProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";
import "./Trending.css";

const Trending = () => {
    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1);
    const fetchTrending = async () => {
        try {
            const { data } = await axios.get(
                `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
            );
            setContent(data.results);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchTrending();
    }, [page]);

    return (
        <div>
            <span className="pageTitle">Trending</span>
           
            <div className="trending">
                {content ? (
                    content.map((c) => (
                        <SingleContent
                            // @ts-ignore
                            key={c.id}
                            // @ts-ignore
                            id={c.id}
                            // @ts-ignore
                            title={c.title || c.name}
                            // @ts-ignore
                            poster={c.poster_path}
                            // @ts-ignore
                            date={c.first_air_date || c.release_date}
                            // @ts-ignore
                            media_type={c.media_type}
                            // @ts-ignore
                            vote_average={c.vote_average}
                        />
                    ))
                ) : (
                    <LinearProgress />
                )}
            </div>
            <CustomPagination setPage={setPage} />
        </div>
    );
};

export default Trending;
