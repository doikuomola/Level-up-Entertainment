// @ts-nocheck
// @ts-nocheck
import axios from "axios";
import React, { useEffect, useState } from "react";
import {Helmet} from "react-helmet";
import Genres from "../../components/Genres/Genres";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";
import useGenres from "../../Hooks/useGenres";

const Series = () => {
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState();
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState([]);
    const genreforURL = useGenres(selectedGenres);

    const fetchMovies = async () => {
        try {
            const { data } = await axios.get(
                `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
                // `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
            );
            setContent(data.results);
            setNumOfPages(data.total_pages);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchMovies();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, genreforURL]);

    return (
        <div>
            <span className="pageTitle">TV Series</span>
            <Helmet>
                <meta
                    name="description"
                    content="Explore new TV Series with genres"
                />
                <title>Explore TV Series</title>
            </Helmet>
            <Genres
                type="movie"
                selectedGenres={selectedGenres}
                genres={genres}
                setGenres={setGenres}
                setSelectedGenres={setSelectedGenres}
                setPage={setPage}
            />
            <div className="trending">
                {content &&
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
                            media_type="tv"
                            // @ts-ignore
                            vote_average={c.vote_average}
                        />
                    ))}
            </div>
            {numOfPages > 1 && (
                <CustomPagination setPage={setPage} numOfPages={numOfPages} />
            )}
        </div>
    );
};

export default Series;
